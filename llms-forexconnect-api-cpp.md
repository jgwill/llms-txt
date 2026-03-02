# ForexConnect API — Complete C++ Guide for Linux

> **Document ID**: `llms-forexconnect-api-cpp`  
> **Version**: 1.0.0 · **Updated**: 2026-03-02  
> **Source**: fxcodebase.com wiki + jgt-broker-native codebase (`jgt-broker-native/`)  
> **Audience**: LLMs generating C++ code that links against the ForexConnect SDK on Linux

This document provides exhaustive guidance for writing C++17 code that uses the ForexConnect API (FXCM broker) on Linux. It covers SDK setup, session lifecycle, order operations, price history retrieval, table queries, error handling, and the full jgt-broker-native architecture. All patterns shown are verified against working code in `jgt-broker-native/`.

---

## AI Usage Notes

- **Always use `--demo` flag** in any generated code or CLI suggestion during development. Never auto-execute real-money orders.
- **O2G2 namespace is deprecated** (not updated since 2015). The constants still work but prefer the string literals they map to when writing new code.
- `O2G2Ptr<T>` is a COM-style ref-counting smart pointer — do NOT use `delete` on objects returned via `O2G2Ptr`. Call `.release()` or let the smart pointer go out of scope.
- `sample_tools` from the gehtsoft SDK provides Win32-like primitives (`CreateEvent`, `WaitForSingleObject`, `HANDLE`) on Linux. This is **not** raw POSIX — use the `sample_tools` headers, not `<windows.h>`.
- All SDK interfaces use **raw C strings** (`const char*`), not `std::string`. Always call `.c_str()`.
- The API is **event-driven and asynchronous**. You must implement listener interfaces and use events (via `sample_tools`) to synchronize.

---

## Table of Contents

1. [SDK Setup and Installation](#1-sdk-setup-and-installation)
2. [CMake Build System](#2-cmake-build-system)
3. [Core API Concepts](#3-core-api-concepts)
4. [Session Lifecycle](#4-session-lifecycle)
5. [Listener Interfaces](#5-listener-interfaces)
6. [Login Rules and Initial Data](#6-login-rules-and-initial-data)
7. [Request Factory and Value Maps](#7-request-factory-and-value-maps)
8. [Order Operations](#8-order-operations)
9. [Trade and Order Queries](#9-trade-and-order-queries)
10. [Historical Price Data](#10-historical-price-data)
11. [Account Information](#11-account-information)
12. [Broker-Agnostic Architecture (jgt-broker-native)](#12-broker-agnostic-architecture-jgt-broker-native)
13. [Configuration and Credentials](#13-configuration-and-credentials)
14. [JSON Output Pattern](#14-json-output-pattern)
15. [CLI Tool Pattern](#15-cli-tool-pattern)
16. [Common Errors and Pitfalls](#16-common-errors-and-pitfalls)
17. [Key Type Reference](#17-key-type-reference)
18. [O2G2 Constants Reference](#18-o2g2-constants-reference)
19. [Complete Working Examples](#19-complete-working-examples)

---

## 1. SDK Setup and Installation

### SDK Location

```
libs/opt/ForexConnectAPI/
├── include/          # Headers: ForexConnect.h (main), O2G2.h, etc.
└── lib/              # libForexConnect.so (and versioned variants)

libs/opt/gehtsoft/forex-connect/samples/Linux/cpp/sample_tools/
├── include/          # sample_tools.h, Threading/Interlocked.h
└── lib/              # libsample_tools.so
```

### sample_tools Build (64-bit)

The SDK ships sample_tools as 32-bit. Must rebuild for 64-bit Linux:

```bash
cd libs/opt/gehtsoft/forex-connect/samples/Linux/cpp/sample_tools
mkdir build64 && cd build64
cmake ..
make
# Output: sample_tools/lib/libsample_tools.so
```

### SDK Connection Parameters

```
URL:        https://www.fxcorporate.com/Hosts.jsp
Connection: "Demo"   (demo account)
            "Real"   (live account — NEVER in development)
```

### Required Include

```cpp
#include <ForexConnect.h>   // Full SDK: sessions, requests, responses, readers
#include <sample_tools.h>   // Linux Win32 emulation: CreateEvent, WaitForSingleObject, HANDLE
```

### Linker Flags

```cmake
target_link_libraries(mytarget
    ForexConnect      # -lForexConnect → libForexConnect.so
    sample_tools      # -lsample_tools → libsample_tools.so
    pthread
)
# rpath so binaries find .so at runtime:
set_target_properties(mytarget PROPERTIES
    LINK_FLAGS "-Wl,-rpath,${FOREXCONNECT_LIB}:${SAMPLE_TOOLS_LIB}"
)
```

---

## 2. CMake Build System

Full working CMakeLists.txt for a project structured like `jgt-broker-native`:

```cmake
cmake_minimum_required(VERSION 3.14)
project(jgt-broker-native VERSION 0.1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# SDK paths (relative to project root)
set(FOREXCONNECT_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../libs/opt/ForexConnectAPI")
set(FOREXCONNECT_INCLUDE "${FOREXCONNECT_DIR}/include")
set(FOREXCONNECT_LIB     "${FOREXCONNECT_DIR}/lib")

set(SAMPLE_TOOLS_DIR     "${CMAKE_CURRENT_SOURCE_DIR}/../libs/opt/gehtsoft/forex-connect/samples/Linux/cpp/sample_tools")
set(SAMPLE_TOOLS_INCLUDE "${SAMPLE_TOOLS_DIR}/include")
set(SAMPLE_TOOLS_LIB     "${SAMPLE_TOOLS_DIR}/lib")

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)

# Shared library containing core broker logic
add_library(jgtbroker SHARED
    src/common/config.cpp
    src/common/json_output.cpp
    src/common/session_helper.cpp
    src/providers/fxcm/fxcm_provider.cpp
)

target_include_directories(jgtbroker PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}/include
    ${CMAKE_CURRENT_SOURCE_DIR}/third_party
    ${FOREXCONNECT_INCLUDE}
    ${SAMPLE_TOOLS_INCLUDE}
)

target_link_directories(jgtbroker PUBLIC
    ${FOREXCONNECT_LIB}
    ${SAMPLE_TOOLS_LIB}
)

target_link_libraries(jgtbroker PUBLIC
    ForexConnect
    sample_tools
    pthread
)

if(${CMAKE_SYSTEM} MATCHES "Linux")
    target_compile_definitions(jgtbroker PRIVATE _XOPEN_SOURCE=600)
    target_compile_options(jgtbroker PRIVATE -fPIC)
    set_target_properties(jgtbroker PROPERTIES
        LINK_FLAGS "-Wl,-rpath,$ORIGIN:${FOREXCONNECT_LIB}:${SAMPLE_TOOLS_LIB}"
    )
endif()

# CLI executables — each links to jgtbroker
set(CLI_TOOLS fxopen fxclose fxaddorder fxrmorder fxtr fxhistdata)
foreach(tool ${CLI_TOOLS})
    add_executable(${tool} src/cli/${tool}.cpp)
    target_link_libraries(${tool} PRIVATE jgtbroker)
    target_include_directories(${tool} PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
        ${CMAKE_CURRENT_SOURCE_DIR}/third_party
        ${FOREXCONNECT_INCLUDE}
        ${SAMPLE_TOOLS_INCLUDE}
    )
    set_target_properties(${tool} PROPERTIES
        LINK_FLAGS "-Wl,-rpath,$ORIGIN/../lib:${FOREXCONNECT_LIB}:${SAMPLE_TOOLS_LIB}"
    )
endforeach()

install(TARGETS jgtbroker ${CLI_TOOLS}
    RUNTIME DESTINATION bin
    LIBRARY DESTINATION lib
)
```

### Build Commands

```bash
cd jgt-broker-native
mkdir -p build && cd build
cmake ..
make -j$(nproc)
# Binaries: build/bin/fxopen, build/bin/fxaddorder, etc.
# Library:  build/lib/libjgtbroker.so
```

---

## 3. Core API Concepts

### Object Model

The ForexConnect API uses COM-style reference counting. Every interface has `addRef()` / `release()`. Use `O2G2Ptr<T>` to automate this:

```cpp
// Manual (error-prone):
IO2GSession* session = CO2GTransport::createSession();
// ... use ...
session->release();  // MUST call or leak

// Smart pointer (preferred):
O2G2Ptr<IO2GRequestFactory> factory = session->getRequestFactory();
// factory->release() called automatically when O2G2Ptr goes out of scope
```

### Key Interfaces

| Interface | How to Get | Purpose |
|-----------|-----------|---------|
| `IO2GSession` | `CO2GTransport::createSession()` | Root object, login/logout |
| `IO2GLoginRules` | `session->getLoginRules()` | Login-time table snapshots |
| `IO2GRequestFactory` | `session->getRequestFactory()` | Build all requests |
| `IO2GResponseReaderFactory` | `session->getResponseReaderFactory()` | Parse responses |
| `IO2GValueMap` | `factory->createValueMap()` | Request parameters |
| `IO2GRequest` | `factory->createOrderRequest(vm)` | Sendable request |
| `IO2GResponse` | via listener `onRequestCompleted()` | Server response |
| `IO2GPermissionChecker` | `loginRules->getPermissionChecker()` | Order type availability |
| `IO2GTradingSettingsProvider` | `loginRules->getTradingSettingsProvider()` | Lot sizes, pip values |
| `IO2GTimeframeCollection` | `factory->getTimeFrameCollection()` | Valid timeframes |

### Table Manager vs Non-Table Manager

**Table Manager** (not used in jgt-broker-native):
- Preloads all tables into memory
- Provides live table change subscriptions (`IO2GTableListener`)
- Accessible via `SummaryTable` (only mode that supports it)
- Performance penalty — constant recalculation

**Non-Table Manager** (used in jgt-broker-native):
- Fetch tables on demand via `createRefreshTableRequest*`
- Implement `IO2GResponseListener` to receive responses
- Better performance for CLI/single-shot tools
- Must calculate `PipCost` and `P/L` manually

**jgt-broker-native uses Non-Table Manager exclusively.**

---

## 4. Session Lifecycle

### Session Creation and Login

```cpp
#include <ForexConnect.h>
#include <sample_tools.h>

// 1. Create session (reference-counted, use O2G2Ptr or manual release)
IO2GSession* session = CO2GTransport::createSession();

// 2. Attach status listener BEFORE calling login
session->subscribeSessionStatus(mySessionListener);

// 3. Login (async — returns immediately)
session->login(
    "YOUR_USERNAME",
    "YOUR_PASSWORD",
    "https://www.fxcorporate.com/Hosts.jsp",
    "Demo"   // or "Real"
);

// 4. Wait for Connected or LoginFailed via listener event
// (see FxcmSessionListener below)

// 5. Subscribe response listener after connected
session->subscribeResponse(myResponseListener);

// 6. ... use session ...

// 7. Logout (also async)
session->logout();
// Wait for Disconnected status via listener

// 8. Unsubscribe and release
session->unsubscribeResponse(myResponseListener);
session->unsubscribeSessionStatus(mySessionListener);
session->release();
```

### Session Status Codes (`IO2GSessionStatus::*`)

```cpp
enum O2GSessionStatus {
    Disconnected,
    Connecting,
    TradingSessionRequested,  // multi-account: must call setTradingSession()
    Connected,
    Reconnecting,
    Disconnecting,
    ConnectedWithAdditionalProblems
};
```

### Trading Session Selection (Multi-Account)

When `TradingSessionRequested` fires, you must call `setTradingSession()`:

```cpp
void onSessionStatusChanged(O2GSessionStatus status) override {
    if (status == IO2GSessionStatus::TradingSessionRequested) {
        if (!sessionId_.empty()) {
            session_->setTradingSession(sessionId_.c_str(), pin_.c_str());
        } else {
            // Auto-select first available session
            O2G2Ptr<IO2GSessionDescriptorCollection> descs =
                session_->getTradingSessionDescriptors();
            if (descs && descs->size() > 0) {
                O2G2Ptr<IO2GSessionDescriptor> desc = descs->get(0);
                session_->setTradingSession(desc->getID(), pin_.c_str());
            }
        }
    }
}
```

---

## 5. Listener Interfaces

### Session Status Listener (IO2GSessionStatus)

Full implementation pattern used in jgt-broker-native:

```cpp
#include <ForexConnect.h>
#include <sample_tools.h>  // for HANDLE, CreateEvent, WaitForSingleObject, etc.

class FxcmSessionListener : public IO2GSessionStatus {
public:
    FxcmSessionListener(IO2GSession* session,
                         const std::string& sessionId = "",
                         const std::string& pin = "")
        : session_(session), sessionId_(sessionId), pin_(pin),
          refCount_(1), connected_(false), disconnected_(false), error_(false)
    {
        // sample_tools provides CreateEvent on Linux
        sessionEvent_ = CreateEvent(0, FALSE, FALSE, 0);
    }

    ~FxcmSessionListener() { CloseHandle(sessionEvent_); }

    // COM ref counting — required by interface
    long addRef()  override { return ++refCount_; }
    long release() override {
        long rc = --refCount_;
        if (rc == 0) delete this;
        return rc;
    }

    void onSessionStatusChanged(O2GSessionStatus status) override {
        switch (status) {
            case IO2GSessionStatus::Connected:
                connected_    = true;
                disconnected_ = false;
                SetEvent(sessionEvent_);
                break;
            case IO2GSessionStatus::Disconnected:
                connected_    = false;
                disconnected_ = true;
                SetEvent(sessionEvent_);
                break;
            case IO2GSessionStatus::TradingSessionRequested:
                if (!sessionId_.empty()) {
                    session_->setTradingSession(sessionId_.c_str(), pin_.c_str());
                } else {
                    O2G2Ptr<IO2GSessionDescriptorCollection> descs =
                        session_->getTradingSessionDescriptors();
                    if (descs && descs->size() > 0) {
                        O2G2Ptr<IO2GSessionDescriptor> desc = descs->get(0);
                        session_->setTradingSession(desc->getID(), pin_.c_str());
                    }
                }
                break;
            default:
                break;
        }
    }

    void onLoginFailed(const char* error) override {
        error_    = true;
        errorMsg_ = error ? error : "Unknown login error";
        SetEvent(sessionEvent_);
    }

    // Wait up to timeoutMs for event (default 30s)
    bool waitEvents(int timeoutMs = 30000) {
        return WaitForSingleObject(sessionEvent_, timeoutMs) == 0;
    }

    void reset() {
        connected_    = false;
        disconnected_ = false;
        error_        = false;
        errorMsg_.clear();
        ResetEvent(sessionEvent_);
    }

    bool isConnected()          const { return connected_; }
    bool hasError()             const { return error_; }
    const std::string& errorMessage() const { return errorMsg_; }

private:
    IO2GSession*          session_;
    std::string           sessionId_;
    std::string           pin_;
    volatile unsigned int refCount_;
    bool                  connected_;
    bool                  disconnected_;
    bool                  error_;
    std::string           errorMsg_;
    HANDLE                sessionEvent_;   // sample_tools Win32 emulation
};
```

### Response Listener (IO2GResponseListener)

Used to capture async responses from `session->sendRequest()`:

```cpp
class FxcmResponseListener : public IO2GResponseListener {
public:
    FxcmResponseListener(IO2GSession* session)
        : session_(session), refCount_(1)
    {
        responseEvent_ = CreateEvent(0, FALSE, FALSE, 0);
    }

    ~FxcmResponseListener() { CloseHandle(responseEvent_); }

    long addRef()  override { return ++refCount_; }
    long release() override {
        long rc = --refCount_;
        if (rc == 0) delete this;
        return rc;
    }

    // Call this before sendRequest() to arm the listener for a specific request
    void setRequestID(const char* requestId) {
        requestId_ = requestId ? requestId : "";
        ResetEvent(responseEvent_);
        response_  = nullptr;
        orderId_.clear();
        errorMsg_.clear();
    }

    void onRequestCompleted(const char* requestId, IO2GResponse* response) override {
        if (requestId_ == requestId) {
            response_ = response;
            if (response_) response_->addRef();

            // Extract order ID for CreateOrder responses
            if (response && response->getType() == CreateOrderResponse) {
                O2G2Ptr<IO2GResponseReaderFactory> factory =
                    session_->getResponseReaderFactory();
                if (factory) {
                    O2G2Ptr<IO2GOrderResponseReader> reader =
                        factory->createOrderResponseReader(response);
                    if (reader) orderId_ = reader->getOrderID();
                }
            }
            SetEvent(responseEvent_);
        }
    }

    void onRequestFailed(const char* requestId, const char* error) override {
        if (requestId_ == requestId) {
            errorMsg_ = error ? error : "Request failed";
            SetEvent(responseEvent_);
        }
    }

    void onTablesUpdates(IO2GResponse* data) override {
        // Used only in table-manager mode or live streaming; not needed for CLI tools
    }

    bool waitEvents(int timeoutMs = 30000) {
        return WaitForSingleObject(responseEvent_, timeoutMs) == 0;
    }

    IO2GResponse*      getResponse() const { return response_; }
    const std::string& getOrderID()  const { return orderId_; }
    const std::string& getError()    const { return errorMsg_; }

private:
    IO2GSession*          session_;
    volatile unsigned int refCount_;
    std::string           requestId_;
    IO2GResponse*         response_ = nullptr;
    std::string           orderId_;
    std::string           errorMsg_;
    HANDLE                responseEvent_;
};
```

### Listener Registration Pattern

```cpp
// Subscribe BEFORE login
session->subscribeSessionStatus(sessionListener);

// Login
session->login(user, pass, url, connection);

// Wait for Connected
sessionListener->waitEvents();

// Subscribe response listener AFTER Connected
session->subscribeResponse(responseListener);

// ...operations...

// Unsubscribe BEFORE release
session->unsubscribeResponse(responseListener);
session->unsubscribeSessionStatus(sessionListener);
responseListener->release();
sessionListener->release();
session->release();
```

---

## 6. Login Rules and Initial Data

After login, `getLoginRules()` provides pre-loaded table snapshots — no request needed:

```cpp
O2G2Ptr<IO2GLoginRules> loginRules = session->getLoginRules();

// Get initial accounts snapshot
O2G2Ptr<IO2GResponse> accountsResp =
    loginRules->getTableRefreshResponse(O2GTableType::Accounts);

// Get offers (instruments) snapshot
O2G2Ptr<IO2GResponse> offersResp =
    loginRules->getTableRefreshResponse(O2GTableType::Offers);

// Get orders snapshot
O2G2Ptr<IO2GResponse> ordersResp =
    loginRules->getTableRefreshResponse(O2GTableType::Orders);

// Get trades snapshot
O2G2Ptr<IO2GResponse> tradesResp =
    loginRules->getTableRefreshResponse(O2GTableType::Trades);
```

### Permission Checker

```cpp
O2G2Ptr<IO2GPermissionChecker> checker = loginRules->getPermissionChecker();

// Check before creating order type:
if (checker->canCreateMarketCloseOrder(instrument) == PermissionEnabled) {
    // use TrueMarketClose
} else {
    // fall back to TrueMarketOpen with reversed direction
}
```

### Trading Settings Provider

```cpp
O2G2Ptr<IO2GTradingSettingsProvider> tsp =
    loginRules->getTradingSettingsProvider();

// Base unit size (e.g. 1000 for micro, 10000 for mini, 100000 for standard)
int baseUnit = tsp->getBaseUnitSize(instrument, accountRow);

// Entry order distance constraints (in pips)
int condDistStop  = tsp->getCondDistEntryStop(instrument);   // min pips for stop entry
int condDistLimit = tsp->getCondDistEntryLimit(instrument);  // min pips for limit entry
```

### Finding an Offer (Instrument)

```cpp
IO2GOfferRow* getOffer(IO2GSession* session, const std::string& instrument) {
    O2G2Ptr<IO2GLoginRules> loginRules = session->getLoginRules();
    O2G2Ptr<IO2GResponse> response = loginRules->getTableRefreshResponse(Offers);
    O2G2Ptr<IO2GResponseReaderFactory> factory = session->getResponseReaderFactory();
    O2G2Ptr<IO2GOffersTableResponseReader> reader =
        factory->createOffersTableReader(response);

    for (int i = 0; i < reader->size(); ++i) {
        O2G2Ptr<IO2GOfferRow> offer = reader->getRow(i);
        if (offer &&
            instrument == offer->getInstrument() &&
            strcmp(offer->getSubscriptionStatus(), "T") == 0) {
            return offer.Detach();  // Detach transfers ownership to caller
        }
    }
    return nullptr;
}
```

**Key fields on `IO2GOfferRow`:**
```cpp
offer->getInstrument()        // "EUR/USD"
offer->getOfferID()           // internal ID used in order requests
offer->getBid()               // current bid price
offer->getAsk()               // current ask price
offer->getPointSize()         // pip/point size (e.g. 0.0001 for EUR/USD)
offer->getSubscriptionStatus()// "T" = tradeable, "V" = visible only
```

### Finding an Account

```cpp
IO2GAccountRow* getAccount(IO2GSession* session, const std::string& accountId = "") {
    O2G2Ptr<IO2GLoginRules> loginRules = session->getLoginRules();
    O2G2Ptr<IO2GResponse> response = loginRules->getTableRefreshResponse(Accounts);
    O2G2Ptr<IO2GResponseReaderFactory> factory = session->getResponseReaderFactory();
    O2G2Ptr<IO2GAccountsTableResponseReader> reader =
        factory->createAccountsTableReader(response);

    for (int i = 0; i < reader->size(); ++i) {
        O2G2Ptr<IO2GAccountRow> account = reader->getRow(i);
        if (!account) continue;
        if (!accountId.empty() && accountId != account->getAccountID()) continue;

        // Only use accounts not in margin call, type 32 or 36
        if (strcmp(account->getMarginCallFlag(), "N") == 0 &&
            (strcmp(account->getAccountKind(), "32") == 0 ||
             strcmp(account->getAccountKind(), "36") == 0)) {
            return account.Detach();
        }
    }
    return nullptr;
}
```

**Key fields on `IO2GAccountRow`:**
```cpp
account->getAccountID()       // "12345678"
account->getBalance()         // account balance (double)
account->getM2MEquity()       // mark-to-market equity
account->getMarginCallFlag()  // "N" = no margin call
account->getAccountKind()     // "32" or "36" = tradeable hedged/netting
```

---

## 7. Request Factory and Value Maps

All orders and data requests are built via `IO2GRequestFactory`:

```cpp
O2G2Ptr<IO2GRequestFactory> factory = session->getRequestFactory();

// Create an empty parameter map
O2G2Ptr<IO2GValueMap> valuemap = factory->createValueMap();

// Populate parameters
valuemap->setString(Command,   O2G2::Commands::CreateOrder);
valuemap->setString(OrderType, O2G2::Orders::TrueMarketOpen);
valuemap->setString(AccountID, account->getAccountID());
valuemap->setString(OfferID,   offer->getOfferID());
valuemap->setString(BuySell,   "B");          // "B" or "S"
valuemap->setInt(Amount,       1000);         // in units (baseUnit * lots)
valuemap->setDouble(Rate,      1.09500);      // for entry orders only
valuemap->setString(CustomID,  "my-tag");     // optional label

// Create the request
O2G2Ptr<IO2GRequest> request = factory->createOrderRequest(valuemap);
if (!request) {
    std::cerr << "Error: " << factory->getLastError() << std::endl;
}

// Get request ID for listener tracking
std::string requestId = request->getRequestID();

// Arm listener, then send
responseListener->setRequestID(requestId);
session->sendRequest(request);

// Wait for response (async → sync via event)
if (!responseListener->waitEvents()) {
    std::cerr << "Timeout" << std::endl;
}
```

### ValueMap Setter Methods

```cpp
valuemap->setString(key, const char* value)
valuemap->setInt(key, int value)
valuemap->setDouble(key, double value)
valuemap->setBool(key, bool value)
```

### Standard ValueMap Keys (string constants)

```cpp
// From ForexConnect.h (actual constant names used in code):
Command       // "Command"
OrderType     // "Type"
AccountID     // "AccountID"
OfferID       // "OfferID"
BuySell       // "BuySell"
Amount        // "Lot"
Rate          // "Rate"
RateStop      // "Stop"
RateLimit     // "Limit"
TradeID       // "TradeID"
OrderID       // "OrderID"
CustomID      // "CustomID"
TimeInForce   // "TimeInForce"
```

---

## 8. Order Operations

### 8.1 Open Market Order (TrueMarketOpen)

```cpp
BrokerResult openMarketOrder(IO2GSession* session,
                              FxcmResponseListener* respListener,
                              const std::string& instrument,
                              const std::string& buySell,
                              int lots) {
    BrokerResult result;

    O2G2Ptr<IO2GAccountRow> account = getAccount(session);
    if (!account) { result.success = false; result.error = "No valid account"; return result; }

    O2G2Ptr<IO2GOfferRow> offer = getOffer(session, instrument);
    if (!offer) { result.success = false; result.error = "Invalid instrument"; return result; }

    int amount = getBaseUnitSize(session, instrument, account) * lots;

    O2G2Ptr<IO2GRequestFactory> factory = session->getRequestFactory();
    O2G2Ptr<IO2GValueMap> vm = factory->createValueMap();
    vm->setString(Command,   O2G2::Commands::CreateOrder);
    vm->setString(OrderType, O2G2::Orders::TrueMarketOpen);
    vm->setString(AccountID, account->getAccountID());
    vm->setString(OfferID,   offer->getOfferID());
    vm->setString(BuySell,   buySell.c_str());
    vm->setInt(Amount,       amount);
    vm->setString(CustomID,  "my-market-open");

    O2G2Ptr<IO2GRequest> req = factory->createOrderRequest(vm);
    if (!req) { result.success = false; result.error = factory->getLastError(); return result; }

    respListener->setRequestID(req->getRequestID());
    session->sendRequest(req);

    if (!respListener->waitEvents()) {
        result.success = false; result.error = "Timeout"; return result;
    }
    if (!respListener->getError().empty()) {
        result.success = false; result.error = respListener->getError(); return result;
    }

    result.success  = true;
    result.order_id = respListener->getOrderID();
    result.status   = "executed";
    return result;
}
```

### 8.2 Close Position (TrueMarketClose)

```cpp
// Step 1: Find the open trade for the instrument
IO2GTradeRow* findTrade(IO2GSession* session,
                         FxcmResponseListener* respListener,
                         const std::string& accountId,
                         const std::string& offerId) {
    O2G2Ptr<IO2GRequestFactory> factory = session->getRequestFactory();
    O2G2Ptr<IO2GRequest> req =
        factory->createRefreshTableRequestByAccount(Trades, accountId.c_str());
    respListener->setRequestID(req->getRequestID());
    session->sendRequest(req);
    if (!respListener->waitEvents()) return nullptr;

    O2G2Ptr<IO2GResponse> resp = respListener->getResponse();
    if (!resp) return nullptr;

    O2G2Ptr<IO2GResponseReaderFactory> readerFact = session->getResponseReaderFactory();
    O2G2Ptr<IO2GTradesTableResponseReader> reader =
        readerFact->createTradesTableReader(resp);

    for (int i = 0; i < reader->size(); ++i) {
        O2G2Ptr<IO2GTradeRow> trade = reader->getRow(i);
        if (!offerId.empty() &&
            strcmp(trade->getOfferID(), offerId.c_str()) != 0) continue;
        return trade.Detach();
    }
    return nullptr;
}

// Step 2: Create close order
BrokerResult closePosition(IO2GSession* session,
                            FxcmResponseListener* respListener,
                            const std::string& instrument,
                            int lots = 0) {
    BrokerResult result;

    O2G2Ptr<IO2GAccountRow> account = getAccount(session);
    O2G2Ptr<IO2GOfferRow>   offer   = getOffer(session, instrument);

    O2G2Ptr<IO2GTradeRow> trade =
        findTrade(session, respListener,
                  account->getAccountID(), offer->getOfferID());
    if (!trade) {
        result.success = false;
        result.error   = "No open position for " + instrument;
        return result;
    }

    O2G2Ptr<IO2GLoginRules>       loginRules  = session->getLoginRules();
    O2G2Ptr<IO2GPermissionChecker> permChecker = loginRules->getPermissionChecker();
    O2G2Ptr<IO2GRequestFactory>   factory     = session->getRequestFactory();
    O2G2Ptr<IO2GValueMap>         vm          = factory->createValueMap();

    vm->setString(Command, O2G2::Commands::CreateOrder);

    // Use TrueMarketClose if available, else TrueMarketOpen with reversed side
    if (permChecker->canCreateMarketCloseOrder(instrument.c_str()) == PermissionEnabled) {
        vm->setString(OrderType, O2G2::Orders::TrueMarketClose);
        vm->setString(TradeID,   trade->getTradeID());
    } else {
        vm->setString(OrderType, O2G2::Orders::TrueMarketOpen);
    }

    vm->setString(AccountID, trade->getAccountID());
    vm->setString(OfferID,   trade->getOfferID());

    // Reverse direction: Buy to close Sell position, Sell to close Buy
    const char* closeDir = (strcmp(trade->getBuySell(), O2G2::Buy) == 0)
                            ? O2G2::Sell : O2G2::Buy;
    vm->setString(BuySell, closeDir);

    int closeAmt = (lots > 0)
                   ? getBaseUnitSize(session, instrument, account) * lots
                   : trade->getAmount();
    vm->setInt(Amount, closeAmt);
    vm->setString(CustomID, "my-market-close");

    O2G2Ptr<IO2GRequest> req = factory->createOrderRequest(vm);
    if (!req) { result.success = false; result.error = factory->getLastError(); return result; }

    respListener->setRequestID(req->getRequestID());
    session->sendRequest(req);

    if (!respListener->waitEvents()) {
        result.success = false; result.error = "Timeout"; return result;
    }
    if (!respListener->getError().empty()) {
        result.success = false; result.error = respListener->getError(); return result;
    }

    result.success  = true;
    result.trade_id = trade->getTradeID();
    result.status   = "closed";
    return result;
}
```

### 8.3 Place Entry Order (StopEntry / LimitEntry)

Entry orders are placed at a price level away from current market price.
- **StopEntry (SE)**: placed ABOVE market for Buy, or BELOW market for Sell
- **LimitEntry (LE)**: placed BELOW market for Buy, or ABOVE market for Sell

```cpp
// Determine entry order type based on rate vs current market
std::string determineEntryOrderType(double bid, double ask,
                                     double rate, const std::string& buySell,
                                     double pointSize,
                                     int condDistLimit, int condDistStop) {
    double diff = (buySell == "B" || buySell == O2G2::Buy)
                  ? rate - ask
                  : bid - rate;
    int pips = static_cast<int>(std::floor(diff / pointSize + 0.5));

    if (pips >= 0) {
        if (pips <= condDistStop) return "";  // too close to market
        return O2G2::Orders::StopEntry;
    } else {
        if (-pips <= condDistLimit) return "";  // too close to market
        return O2G2::Orders::LimitEntry;
    }
}

BrokerResult placeEntryOrder(IO2GSession* session,
                              FxcmResponseListener* respListener,
                              const std::string& instrument,
                              const std::string& buySell,
                              double rate,
                              double stopLoss,  // 0 = no stop
                              int lots) {
    BrokerResult result;

    O2G2Ptr<IO2GAccountRow> account = getAccount(session);
    O2G2Ptr<IO2GOfferRow>   offer   = getOffer(session, instrument);

    O2G2Ptr<IO2GLoginRules>           loginRules = session->getLoginRules();
    O2G2Ptr<IO2GTradingSettingsProvider> tsp     = loginRules->getTradingSettingsProvider();

    int baseUnit     = tsp->getBaseUnitSize(instrument.c_str(), account);
    int amount       = baseUnit * lots;
    int condDistStop = tsp->getCondDistEntryStop(instrument.c_str());
    int condDistLim  = tsp->getCondDistEntryLimit(instrument.c_str());

    std::string orderType = determineEntryOrderType(
        offer->getBid(), offer->getAsk(), rate, buySell,
        offer->getPointSize(), condDistLim, condDistStop);

    if (orderType.empty()) {
        result.success = false;
        result.error   = "Price too close to current market";
        return result;
    }

    O2G2Ptr<IO2GRequestFactory> factory = session->getRequestFactory();
    O2G2Ptr<IO2GValueMap>       vm      = factory->createValueMap();
    vm->setString(Command,   O2G2::Commands::CreateOrder);
    vm->setString(OrderType, orderType.c_str());
    vm->setString(AccountID, account->getAccountID());
    vm->setString(OfferID,   offer->getOfferID());
    vm->setString(BuySell,   buySell.c_str());
    vm->setInt(Amount,       amount);
    vm->setDouble(Rate,      rate);
    vm->setString(CustomID,  "my-entry");

    if (stopLoss > 0.0) {
        vm->setDouble(RateStop, stopLoss);  // attach stop loss
    }

    O2G2Ptr<IO2GRequest> req = factory->createOrderRequest(vm);
    if (!req) { result.success = false; result.error = factory->getLastError(); return result; }

    respListener->setRequestID(req->getRequestID());
    session->sendRequest(req);

    if (!respListener->waitEvents()) {
        result.success = false; result.error = "Timeout"; return result;
    }
    if (!respListener->getError().empty()) {
        result.success = false; result.error = respListener->getError(); return result;
    }

    result.success  = true;
    result.order_id = respListener->getOrderID();
    result.status   = "placed";
    return result;
}
```

### 8.4 Delete Pending Order (DeleteOrder)

```cpp
BrokerResult removeOrder(IO2GSession* session,
                          FxcmResponseListener* respListener,
                          const std::string& accountId,
                          const std::string& orderId) {
    BrokerResult result;

    O2G2Ptr<IO2GRequestFactory> factory = session->getRequestFactory();
    O2G2Ptr<IO2GValueMap>       vm      = factory->createValueMap();
    vm->setString(Command,   O2G2::Commands::DeleteOrder);
    vm->setString(AccountID, accountId.c_str());
    vm->setString(OrderID,   orderId.c_str());
    vm->setString(CustomID,  "my-remove");

    O2G2Ptr<IO2GRequest> req = factory->createOrderRequest(vm);
    if (!req) { result.success = false; result.error = factory->getLastError(); return result; }

    respListener->setRequestID(req->getRequestID());
    session->sendRequest(req);

    if (!respListener->waitEvents()) {
        result.success = false; result.error = "Timeout"; return result;
    }
    if (!respListener->getError().empty()) {
        result.success = false; result.error = respListener->getError(); return result;
    }

    result.success = true;
    result.status  = "removed";
    return result;
}
```

---

## 9. Trade and Order Queries

### List Orders

```cpp
std::vector<OrderInfo> listOrders(IO2GSession* session,
                                   FxcmResponseListener* respListener,
                                   const std::string& accountId) {
    std::vector<OrderInfo> orders;

    O2G2Ptr<IO2GRequestFactory> factory = session->getRequestFactory();
    O2G2Ptr<IO2GRequest> req =
        factory->createRefreshTableRequestByAccount(Orders, accountId.c_str());

    respListener->setRequestID(req->getRequestID());
    session->sendRequest(req);
    if (!respListener->waitEvents()) return orders;

    O2G2Ptr<IO2GResponse> resp = respListener->getResponse();
    if (!resp) return orders;

    O2G2Ptr<IO2GResponseReaderFactory>    readerFact = session->getResponseReaderFactory();
    O2G2Ptr<IO2GOrdersTableResponseReader> reader    =
        readerFact->createOrdersTableReader(resp);

    for (int i = 0; i < reader->size(); ++i) {
        O2G2Ptr<IO2GOrderRow> row = reader->getRow(i);
        OrderInfo oi;
        oi.order_id   = row->getOrderID();
        oi.account_id = row->getAccountID();
        oi.offer_id   = row->getOfferID();
        oi.buy_sell   = row->getBuySell();
        oi.order_type = row->getType();
        oi.status     = row->getStatus();
        oi.amount     = row->getAmount();
        oi.rate       = row->getRate();
        orders.push_back(oi);
    }
    return orders;
}
```

**Key fields on `IO2GOrderRow`:**
```cpp
row->getOrderID()     // e.g. "123456789"
row->getAccountID()   // account
row->getOfferID()     // instrument internal ID
row->getBuySell()     // "B" or "S"
row->getType()        // "SE" (StopEntry), "LE" (LimitEntry), "OM" (OpenMarket), etc.
row->getStatus()      // "W" (waiting), "E" (executing)
row->getAmount()      // units
row->getRate()        // entry price level
```

### List Trades

```cpp
std::vector<TradeInfo> listTrades(IO2GSession* session,
                                   FxcmResponseListener* respListener,
                                   const std::string& accountId) {
    std::vector<TradeInfo> trades;

    O2G2Ptr<IO2GRequestFactory> factory = session->getRequestFactory();
    O2G2Ptr<IO2GRequest> req =
        factory->createRefreshTableRequestByAccount(Trades, accountId.c_str());

    respListener->setRequestID(req->getRequestID());
    session->sendRequest(req);
    if (!respListener->waitEvents()) return trades;

    O2G2Ptr<IO2GResponse> resp = respListener->getResponse();
    if (!resp) return trades;

    O2G2Ptr<IO2GResponseReaderFactory>     readerFact = session->getResponseReaderFactory();
    O2G2Ptr<IO2GTradesTableResponseReader> reader     =
        readerFact->createTradesTableReader(resp);

    for (int i = 0; i < reader->size(); ++i) {
        O2G2Ptr<IO2GTradeRow> row = reader->getRow(i);
        TradeInfo ti;
        ti.trade_id   = row->getTradeID();
        ti.account_id = row->getAccountID();
        ti.offer_id   = row->getOfferID();
        ti.buy_sell   = row->getBuySell();
        ti.amount     = row->getAmount();
        ti.open_rate  = row->getOpenRate();
        ti.commission = row->getCommission();
        ti.rollover   = row->getRolloverInterest();
        trades.push_back(ti);
    }
    return trades;
}
```

**Key fields on `IO2GTradeRow`:**
```cpp
row->getTradeID()          // "T123456"
row->getAccountID()
row->getOfferID()
row->getBuySell()          // "B" or "S"
row->getAmount()           // open units
row->getOpenRate()         // entry price
row->getCommission()       // commission charged
row->getRolloverInterest() // overnight swap
row->getOpenTime()         // DATE (OLE date format)
```

### Table Refresh Request Variants

```cpp
// All rows for account:
factory->createRefreshTableRequestByAccount(Orders, accountId.c_str())
factory->createRefreshTableRequestByAccount(Trades, accountId.c_str())
factory->createRefreshTableRequestByAccount(Accounts, accountId.c_str())

// Specific offer (instrument):
factory->createRefreshTableRequest(Offers)

// Table type enum values:
Accounts, Orders, Trades, ClosedTrades, Messages, Offers
```

---

## 10. Historical Price Data

Historical data requires Non-Table Manager mode. Use `createMarketDataSnapshotRequestInstrument`:

```cpp
std::vector<HistBar> getHistoricalPrices(IO2GSession* session,
                                          FxcmResponseListener* respListener,
                                          const std::string& instrument,
                                          const std::string& timeframe,
                                          const std::string& dateFrom = "",
                                          const std::string& dateTo   = "") {
    std::vector<HistBar> bars;

    O2G2Ptr<IO2GRequestFactory> factory = session->getRequestFactory();
    if (!factory) return bars;

    // Get timeframe object by string name
    O2G2Ptr<IO2GTimeframeCollection> tfc = factory->getTimeFrameCollection();
    O2G2Ptr<IO2GTimeframe> tf = tfc->get(timeframe.c_str());
    if (!tf) {
        std::cerr << "Invalid timeframe: " << timeframe << std::endl;
        return bars;
    }

    // Base request (can be reused with fillMarketDataSnapshotRequestTime)
    O2G2Ptr<IO2GRequest> request =
        factory->createMarketDataSnapshotRequestInstrument(
            instrument.c_str(), tf, tf->getQueryDepth());

    // Parse date range strings to OLE DATE
    DATE dtFrom = 0, dtTo = 0;
    if (!dateFrom.empty()) {
        struct tm tmFrom = {0};
        sscanf(dateFrom.c_str(), "%d-%d-%d %d:%d:%d",
               &tmFrom.tm_year, &tmFrom.tm_mon, &tmFrom.tm_mday,
               &tmFrom.tm_hour, &tmFrom.tm_min, &tmFrom.tm_sec);
        tmFrom.tm_year -= 1900;
        tmFrom.tm_mon  -= 1;
        CO2GDateUtils::CTimeToOleTime(&tmFrom, &dtFrom);
    }
    if (!dateTo.empty()) {
        struct tm tmTo = {0};
        sscanf(dateTo.c_str(), "%d-%d-%d %d:%d:%d",
               &tmTo.tm_year, &tmTo.tm_mon, &tmTo.tm_mday,
               &tmTo.tm_hour, &tmTo.tm_min, &tmTo.tm_sec);
        tmTo.tm_year -= 1900;
        tmTo.tm_mon  -= 1;
        CO2GDateUtils::CTimeToOleTime(&tmTo, &dtTo);
    }

    // Paginate backwards through history
    DATE dtFirst = dtTo;
    do {
        factory->fillMarketDataSnapshotRequestTime(request, dtFrom, dtFirst, false);
        respListener->setRequestID(request->getRequestID());
        session->sendRequest(request);

        if (!respListener->waitEvents()) break;

        O2G2Ptr<IO2GResponse> resp = respListener->getResponse();
        if (!resp || resp->getType() != MarketDataSnapshot) break;

        O2G2Ptr<IO2GResponseReaderFactory> readerFact =
            session->getResponseReaderFactory();
        O2G2Ptr<IO2GMarketDataSnapshotResponseReader> reader =
            readerFact->createMarketDataSnapshotReader(resp);

        if (reader->size() == 0) break;

        // Track first bar date for pagination
        if (std::fabs(dtFirst - reader->getDate(0)) <= 0.0001) break;
        dtFirst = reader->getDate(0);

        // Iterate newest-first (reverse to store chronologically)
        for (int i = reader->size() - 1; i >= 0; --i) {
            HistBar bar;
            bar.datetime  = formatDate(reader->getDate(i));
            bar.bid_open  = reader->getBidOpen(i);
            bar.bid_high  = reader->getBidHigh(i);
            bar.bid_low   = reader->getBidLow(i);
            bar.bid_close = reader->getBidClose(i);
            bar.ask_open  = reader->getAskOpen(i);
            bar.ask_high  = reader->getAskHigh(i);
            bar.ask_low   = reader->getAskLow(i);
            bar.ask_close = reader->getAskClose(i);
            bar.volume    = reader->getVolume(i);
            bars.push_back(bar);
        }
    } while (dtFirst - dtFrom > 0.0001);

    return bars;
}
```

### Date Conversion Utilities

```cpp
// OLE DATE to struct tm (for display)
static std::string formatDate(DATE date) {
    struct tm tmBuf = {0};
    CO2GDateUtils::OleTimeToCTime(date, &tmBuf);
    std::ostringstream ss;
    ss << std::setw(4) << tmBuf.tm_year + 1900 << "-"
       << std::setw(2) << std::setfill('0') << tmBuf.tm_mon + 1 << "-"
       << std::setw(2) << std::setfill('0') << tmBuf.tm_mday << " "
       << std::setw(2) << std::setfill('0') << tmBuf.tm_hour << ":"
       << std::setw(2) << std::setfill('0') << tmBuf.tm_min << ":"
       << std::setw(2) << std::setfill('0') << tmBuf.tm_sec;
    return ss.str();
}

// struct tm to OLE DATE (for requests)
struct tm tmDate = {0};
tmDate.tm_year = 2025 - 1900;  // years since 1900
tmDate.tm_mon  = 0;             // 0-based month
tmDate.tm_mday = 1;
DATE oleDate;
CO2GDateUtils::CTimeToOleTime(&tmDate, &oleDate);
```

### Valid Timeframe Strings

```
m1   m5   m15   m30   H1   H2   H3   H4   H6   H8   D1   W1   M1
```

Use `tfc->get("H1")` — returns nullptr if invalid.

### MarketDataSnapshotResponseReader Fields

```cpp
reader->size()            // bar count in this batch
reader->getDate(i)        // DATE (OLE format) of bar i
reader->getBidOpen(i)     // bid OHLC
reader->getBidHigh(i)
reader->getBidLow(i)
reader->getBidClose(i)
reader->getAskOpen(i)     // ask OHLC
reader->getAskHigh(i)
reader->getAskLow(i)
reader->getAskClose(i)
reader->getVolume(i)      // tick volume
```

---

## 11. Account Information

### Get Account Balance from Login Rules (no request needed)

```cpp
O2G2Ptr<IO2GLoginRules> loginRules = session->getLoginRules();
O2G2Ptr<IO2GResponse> resp = loginRules->getTableRefreshResponse(Accounts);
O2G2Ptr<IO2GResponseReaderFactory> readerFact = session->getResponseReaderFactory();
O2G2Ptr<IO2GAccountsTableResponseReader> reader =
    readerFact->createAccountsTableReader(resp);

for (int i = 0; i < reader->size(); ++i) {
    O2G2Ptr<IO2GAccountRow> row = reader->getRow(i);
    std::cout << "Account: " << row->getAccountID()
              << " Balance: "  << row->getBalance()
              << " Equity: "   << row->getM2MEquity()
              << std::endl;
}
```

### AccountRow Fields

```cpp
row->getAccountID()       // string ID
row->getBalance()         // double: cash balance
row->getM2MEquity()       // double: mark-to-market equity (including open P/L)
row->getMarginCallFlag()  // "N" = no margin call
row->getAccountKind()     // "32"=hedging, "36"=netting
```

---

## 12. Broker-Agnostic Architecture (jgt-broker-native)

The codebase wraps all ForexConnect calls behind an abstract interface for broker independence.

### IBrokerProvider Interface

```cpp
// include/broker/IBrokerProvider.h
namespace jgt {

class IBrokerProvider {
public:
    virtual ~IBrokerProvider() = default;

    // Session
    virtual bool login(const std::string& user, const std::string& password,
                       const std::string& url, const std::string& connection,
                       const std::string& session_id = "",
                       const std::string& pin = "") = 0;
    virtual void logout() = 0;
    virtual bool isConnected() const = 0;

    // Account
    virtual BrokerResult getAccounts() = 0;

    // NORTH: Order Execution
    virtual BrokerResult openMarketOrder(const std::string& instrument,
                                         const std::string& buy_sell, int lots) = 0;
    virtual BrokerResult closePosition(const std::string& instrument,
                                        const std::string& trade_id = "",
                                        int lots = 0) = 0;
    virtual BrokerResult placeEntryOrder(const std::string& instrument,
                                          const std::string& buy_sell,
                                          double rate, double stop_loss, int lots) = 0;
    virtual BrokerResult removeOrder(const std::string& order_id) = 0;

    // Query
    virtual BrokerResult listOrders(const std::string& instrument = "") = 0;
    virtual BrokerResult listTrades(const std::string& instrument = "") = 0;

    // EAST: Price Data
    virtual BrokerResult getHistoricalPrices(const std::string& instrument,
                                              const std::string& timeframe,
                                              const std::string& date_from = "",
                                              const std::string& date_to = "") = 0;
    virtual std::string providerName() const = 0;
};

} // namespace jgt
```

### Data Structures

```cpp
namespace jgt {

struct AccountInfo {
    std::string account_id;
    double balance;
    double equity;
    double used_margin;
    std::string account_kind;
};

struct OrderInfo {
    std::string order_id, account_id, offer_id, instrument;
    std::string buy_sell;    // "B" or "S"
    std::string order_type;  // "SE", "LE", "OM", etc.
    std::string status;      // "W" (waiting), "E" (executing)
    int amount;
    double rate, stop, limit;
    std::string time_in_force;
};

struct TradeInfo {
    std::string trade_id, account_id, offer_id, instrument;
    std::string buy_sell;
    int amount;
    double open_rate, close_rate, gross_pl, commission, rollover;
    std::string open_time;
};

struct HistBar {
    std::string datetime;
    double bid_open, bid_high, bid_low, bid_close;
    double ask_open, ask_high, ask_low, ask_close;
    int volume;
};

struct BrokerResult {
    bool success;
    std::string error;
    std::string order_id, trade_id, status;
    double open_rate, close_rate, gross_pl;
    std::vector<OrderInfo>   orders;
    std::vector<TradeInfo>   trades;
    std::vector<HistBar>     bars;
    std::vector<AccountInfo> accounts;
};

} // namespace jgt
```

### SessionHelper: RAII Login

```cpp
// include/broker/session_helper.h
class SessionHelper {
public:
    static std::unique_ptr<IBrokerProvider> createAndLogin(bool demo = true);
    static std::unique_ptr<IBrokerProvider> createAndLogin(const BrokerConfig& config);
};

// RAII logout guard
class SessionGuard {
public:
    explicit SessionGuard(IBrokerProvider* p) : provider_(p) {}
    ~SessionGuard() { if (provider_) provider_->logout(); }
private:
    IBrokerProvider* provider_;
};
```

Usage in CLIs:

```cpp
auto provider = jgt::SessionHelper::createAndLogin(demo);
if (!provider) { jgt::writeJsonError("Login failed"); return 1; }
jgt::SessionGuard guard(provider.get());   // auto-logout on scope exit

auto result = provider->openMarketOrder(instrument, direction, lots);
jgt::writeJsonResult(result);
return result.success ? 0 : 1;
```

### Project Structure

```
jgt-broker-native/
├── CMakeLists.txt
├── include/broker/
│   ├── IBrokerProvider.h       # Abstract interface + data structs
│   ├── fxcm_provider.h         # FXCM/ForexConnect implementation
│   ├── session_helper.h        # RAII SessionHelper + SessionGuard
│   ├── config.h                # BrokerConfig, loadConfig(), parseCredentialArgs()
│   └── json_output.h           # toJson(), writeJsonResult(), writeJsonError()
├── src/
│   ├── common/
│   │   ├── config.cpp           # Load ~/.jgt/config.json + env vars
│   │   ├── json_output.cpp      # Serialize BrokerResult → JSON
│   │   └── session_helper.cpp   # Create FxcmProvider, login
│   ├── providers/fxcm/
│   │   └── fxcm_provider.cpp    # All ForexConnect SDK calls
│   └── cli/
│       ├── fxopen.cpp           # Market open CLI
│       ├── fxclose.cpp          # Market close CLI
│       ├── fxaddorder.cpp       # Entry order CLI
│       ├── fxrmorder.cpp        # Remove order CLI
│       ├── fxtr.cpp             # List orders/trades CLI
│       └── fxhistdata.cpp       # Download historical prices CLI
└── third_party/nlohmann/
    └── json_minimal.h           # Minimal JSON builder (no full nlohmann dependency)
```

---

## 13. Configuration and Credentials

### Config File: `~/.jgt/config.json`

```json
{
  "user":       "your_username",
  "password":   "your_password",
  "url":        "https://www.fxcorporate.com/Hosts.jsp",
  "session_id": "",
  "pin":        "",
  "account_id": "",
  "data_dir":   "/path/to/data"
}
```

### Environment Variable Overrides

```bash
export JGTFX_USER=your_username
export JGTFX_PASSWORD=your_password
export JGTPY_DATA=/path/to/data
```

Env vars always override the config file.

### loadConfig() Implementation Pattern

```cpp
BrokerConfig loadConfig(bool demo) {
    BrokerConfig cfg;
    cfg.url        = "https://www.fxcorporate.com/Hosts.jsp";
    cfg.connection = demo ? "Demo" : "Real";

    // Try ~/.jgt/config.json
    const char* home = std::getenv("HOME");
    if (!home) return cfg;
    std::string configPath = std::string(home) + "/.jgt/config.json";
    std::ifstream f(configPath);
    if (f.is_open()) {
        // parse JSON and populate cfg fields
    }

    // Env vars override file
    if (const char* u = std::getenv("JGTFX_USER"))     cfg.user     = u;
    if (const char* p = std::getenv("JGTFX_PASSWORD")) cfg.password = p;
    if (const char* d = std::getenv("JGTPY_DATA"))     cfg.data_dir = d;

    return cfg;
}
```

---

## 14. JSON Output Pattern

All 6 CLIs output JSON to stdout. `jgt-transact` parses this JSON.

### Output Format

**Success (market open):**
```json
{"success":true,"order_id":"123456789","status":"executed"}
```

**Success (entry order):**
```json
{"success":true,"order_id":"987654321","status":"placed"}
```

**Success (list):**
```json
{
  "success": true,
  "orders": [
    {"order_id":"123","instrument":"EUR/USD","buy_sell":"B","order_type":"SE","status":"W","amount":1000,"rate":1.09500}
  ],
  "trades": []
}
```

**Error:**
```json
{"success":false,"error":"No open position for XAU/USD"}
```

### Exit Codes

```
0 = success
1 = failure
```

---

## 15. CLI Tool Pattern

Every CLI follows the same structure:

```cpp
// src/cli/fxopen.cpp
#include "broker/session_helper.h"
#include "broker/json_output.h"
#include "broker/config.h"
#include <iostream>

static void printUsage() {
    std::cout << "Usage: fxopen [--demo|--real] -i INSTRUMENT -d B|S [-n LOTS]\n";
}

int main(int argc, char* argv[]) {
    std::string instrument, direction;
    int lots = 1;
    bool demo = true;

    // Parse args
    for (int i = 1; i < argc; ++i) {
        std::string arg = argv[i];
        if      (arg == "--demo")                              { demo = true; }
        else if (arg == "--real")                              { demo = false; }
        else if ((arg == "-i") && i + 1 < argc)               { instrument = argv[++i]; }
        else if ((arg == "-d") && i + 1 < argc)               { direction  = argv[++i]; }
        else if ((arg == "-n") && i + 1 < argc)               { lots = std::atoi(argv[++i]); }
        else if (arg == "-h" || arg == "--help")               { printUsage(); return 0; }
    }

    // Validate
    if (instrument.empty() || direction.empty()) {
        jgt::writeJsonError("Missing required: -i INSTRUMENT -d DIRECTION");
        return 1;
    }

    // Login (RAII)
    auto provider = jgt::SessionHelper::createAndLogin(demo);
    if (!provider) { jgt::writeJsonError("Login failed"); return 1; }
    jgt::SessionGuard guard(provider.get());

    // Execute
    auto result = provider->openMarketOrder(instrument, direction, lots);

    // Output JSON
    jgt::writeJsonResult(result);
    return result.success ? 0 : 1;
}
```

### All 6 CLI Tools

| CLI | Method Called | Required Args |
|-----|--------------|---------------|
| `fxopen` | `openMarketOrder(instrument, dir, lots)` | `-i`, `-d` |
| `fxclose` | `closePosition(instrument, tradeId, lots)` | `-i` or `--trade-id` |
| `fxaddorder` | `placeEntryOrder(instrument, dir, rate, stop, lots)` | `-i`, `-d`, `-r` |
| `fxrmorder` | `removeOrder(orderId)` | `-id` |
| `fxtr` | `listOrders()` + `listTrades()` | optional `-table`, `-i` |
| `fxhistdata` | `getHistoricalPrices(inst, tf, from, to)` | `-i`, `-tf` |

### Usage Examples

```bash
# Market orders (NORTH — ALWAYS --demo in dev)
fxopen   --demo -i EUR/USD -d B -n 1
fxclose  --demo -i EUR/USD
fxclose  --demo --trade-id T123456

# Entry stop order with stop loss
fxaddorder --demo -i XAU/USD -d S -r 5100.0 -x 5250.0 -n 1

# Delete pending order
fxrmorder --demo -id 987654321

# List orders and trades
fxtr --demo -table orders
fxtr --demo -table trades
fxtr --demo -table all -i EUR/USD

# Historical prices
fxhistdata --demo -i EUR/USD -tf H1
fxhistdata --demo -i EUR/USD -tf D1 --from "2025-01-01" --to "2025-12-31" -o prices.json
fxhistdata --demo -i EUR/USD -tf H1 --csv -o prices.csv
```

---

## 16. Common Errors and Pitfalls

### Session / Login

| Error | Cause | Fix |
|-------|-------|-----|
| `Login failed` | Wrong credentials or URL | Check `~/.jgt/config.json` or env vars |
| Hangs in `waitEvents()` | `TradingSessionRequested` not handled | Always handle `TradingSessionRequested` in session listener |
| `Can't connect to price server` | HTTP instead of HTTPS | URL must be `https://` not `http://` |
| Listener never fires | Forgot `subscribeSessionStatus` before `login` | Always subscribe BEFORE calling login |
| Memory leak on session objects | Forgot `release()` | Use `O2G2Ptr<T>` or call `.release()` |

### Orders

| Error | Cause | Fix |
|-------|-------|-----|
| `Price too close to market` | Rate within `condDist*` pips | Check `tsp->getCondDistEntryStop()` |
| `createOrderRequest` returns nullptr | Invalid ValueMap | Check `factory->getLastError()` |
| Wrong order type chosen | StopEntry vs LimitEntry confusion | Use `determineEntryOrderType()` |
| No account found | Account in margin call or wrong kind | Filter `MarginCallFlag="N"` and kind `32`/`36` |
| Offer not found | Wrong instrument string or not subscribed | Check `subscriptionStatus == "T"` |

### Historical Data

| Error | Cause | Fix |
|-------|-------|-----|
| `Invalid timeframe` | Wrong TF string | Use exact: `m1 m5 m15 m30 H1 H2 H3 H4 H6 H8 D1 W1 M1` |
| No bars returned | Date range has no data | Verify market was open in that period |
| Pagination loop | Old `dtFirst` equals new | Always check `std::fabs(dtFirst - reader->getDate(0)) > 0.0001` |

### Linux-Specific

| Issue | Fix |
|-------|-----|
| `HANDLE`/`CreateEvent` not found | Include `<sample_tools.h>` — provides Win32 emulation |
| 32-bit library mismatch | Rebuild `sample_tools` as 64-bit (`mkdir build64 && cmake .. && make`) |
| `.so` not found at runtime | Add rpath: `-Wl,-rpath,/path/to/libs` or set `LD_LIBRARY_PATH` |
| `_XOPEN_SOURCE` errors | Add `target_compile_definitions(... _XOPEN_SOURCE=600)` |

---

## 17. Key Type Reference

### DATE (OLE Automation Date)

`DATE` is a `double` representing days since December 30, 1899. Use SDK utilities:

```cpp
#include <ForexConnect.h>
// DATE is typedef double

// Convert local struct tm → OLE DATE
struct tm tm = {0};
tm.tm_year = 2025 - 1900;
tm.tm_mon  = 0;  // January
tm.tm_mday = 15;
DATE oleDate;
CO2GDateUtils::CTimeToOleTime(&tm, &oleDate);

// Convert OLE DATE → struct tm
struct tm result = {0};
CO2GDateUtils::OleTimeToCTime(oleDate, &result);
```

### Response Types (`IO2GResponse::getType()`)

```cpp
enum O2GResponseType {
    MarketDataSnapshot,   // historical price response
    GetMessagesResponse,
    TablesUpdates,
    CreateOrderResponse,  // after sendRequest() for order creation
    // ...
};
```

### Table Types (for createRefreshTableRequest)

```cpp
Accounts, Orders, Trades, ClosedTrades, Messages, Offers
// Used as: factory->createRefreshTableRequestByAccount(Orders, accountId)
```

### Permission Checker Return Values

```cpp
enum O2GPermissionStatus {
    PermissionEnabled,
    PermissionDisabled,
    PermissionHidden
};
```

---

## 18. O2G2 Constants Reference

> **Note**: O2G2 namespace is deprecated (not updated since 2015) but constants still work.

### Commands

```cpp
O2G2::Commands::CreateOrder   // "CreateOrder"
O2G2::Commands::DeleteOrder   // "DeleteOrder"
O2G2::Commands::UpdateOrder   // "UpdateOrder"
O2G2::Commands::CreateOCO     // OCO orders
O2G2::Commands::CreateOTO     // OTO orders
```

### Order Types

```cpp
O2G2::Orders::TrueMarketOpen   // "OM" — market open at best price
O2G2::Orders::TrueMarketClose  // "CM" — market close
O2G2::Orders::StopEntry        // "SE" — entry at price above/below market
O2G2::Orders::LimitEntry       // "LE" — entry at price below/above market
O2G2::Orders::Stop             // "S"  — stop loss on trade
O2G2::Orders::Limit            // "L"  — limit (take profit) on trade
```

### Buy/Sell Constants

```cpp
O2G2::Buy    // "B"
O2G2::Sell   // "S"
```

### Time In Force

```cpp
O2G2::TimeInForce::GoodTillCancel  // "GTC"
O2G2::TimeInForce::FillOrKill      // "FOK"
O2G2::TimeInForce::IOC             // "IOC" (Immediate or Cancel)
O2G2::TimeInForce::Day             // "DAY"
```

### Order Status Values

```
"W"  = Waiting
"E"  = Executing
"R"  = Rejected
"C"  = Cancelled
```

### Account Kind Values

```
"32"  = Hedging account
"36"  = Netting account
```

---

## 19. Complete Working Examples

### Minimal Login → Get Balance → Logout

```cpp
#include <ForexConnect.h>
#include <sample_tools.h>
#include <iostream>
#include <string>

// Minimal session listener
class SimpleSessionListener : public IO2GSessionStatus {
    IO2GSession* session_;
    volatile unsigned int refCount_ = 1;
    bool connected_ = false;
    bool error_ = false;
    HANDLE event_;
public:
    SimpleSessionListener(IO2GSession* s) : session_(s) {
        event_ = CreateEvent(0, FALSE, FALSE, 0);
    }
    ~SimpleSessionListener() { CloseHandle(event_); }
    long addRef() override { return ++refCount_; }
    long release() override { long r = --refCount_; if (!r) delete this; return r; }

    void onSessionStatusChanged(O2GSessionStatus st) override {
        if (st == IO2GSessionStatus::Connected)    { connected_ = true; SetEvent(event_); }
        if (st == IO2GSessionStatus::Disconnected) { SetEvent(event_); }
        if (st == IO2GSessionStatus::TradingSessionRequested) {
            O2G2Ptr<IO2GSessionDescriptorCollection> d = session_->getTradingSessionDescriptors();
            if (d && d->size() > 0) {
                O2G2Ptr<IO2GSessionDescriptor> desc = d->get(0);
                session_->setTradingSession(desc->getID(), "");
            }
        }
    }
    void onLoginFailed(const char* e) override {
        error_ = true;
        std::cerr << "Login error: " << e << std::endl;
        SetEvent(event_);
    }
    bool wait() { return WaitForSingleObject(event_, 30000) == 0; }
    bool isConnected() const { return connected_; }
    void reset() { connected_ = false; error_ = false; ResetEvent(event_); }
};

int main() {
    IO2GSession* session = CO2GTransport::createSession();

    auto* listener = new SimpleSessionListener(session);
    session->subscribeSessionStatus(listener);

    session->login("USERNAME", "PASSWORD",
                   "https://www.fxcorporate.com/Hosts.jsp", "Demo");

    if (!listener->wait() || !listener->isConnected()) {
        std::cerr << "Failed to connect" << std::endl;
        session->unsubscribeSessionStatus(listener);
        listener->release();
        session->release();
        return 1;
    }

    // Get account balance
    O2G2Ptr<IO2GLoginRules> loginRules = session->getLoginRules();
    O2G2Ptr<IO2GResponse> resp = loginRules->getTableRefreshResponse(Accounts);
    O2G2Ptr<IO2GResponseReaderFactory> rf = session->getResponseReaderFactory();
    O2G2Ptr<IO2GAccountsTableResponseReader> reader = rf->createAccountsTableReader(resp);
    for (int i = 0; i < reader->size(); ++i) {
        O2G2Ptr<IO2GAccountRow> acct = reader->getRow(i);
        std::cout << "Account: " << acct->getAccountID()
                  << "  Balance: " << acct->getBalance() << std::endl;
    }

    // Logout
    listener->reset();
    session->logout();
    listener->wait();

    session->unsubscribeSessionStatus(listener);
    listener->release();
    session->release();
    return 0;
}
```

### Using the jgt-broker-native Pattern (Recommended)

```cpp
// CLI tool — inherits all ForexConnect complexity from libjgtbroker
#include "broker/session_helper.h"
#include "broker/json_output.h"

int main(int argc, char* argv[]) {
    bool demo = true;
    std::string instrument = "EUR/USD";
    std::string direction  = "B";

    // Parse args here...

    // RAII: creates FxcmProvider, loads config, logs in
    auto provider = jgt::SessionHelper::createAndLogin(demo);
    if (!provider) {
        jgt::writeJsonError("Login failed");
        return 1;
    }
    jgt::SessionGuard guard(provider.get());  // auto-logout on exit

    // Execute via broker-agnostic interface
    auto result = provider->openMarketOrder(instrument, direction, 1);
    jgt::writeJsonResult(result);
    return result.success ? 0 : 1;
}
```

### Adding a New CLI Tool

1. Create `src/cli/fxmystuff.cpp` following the pattern above
2. Add to `CMakeLists.txt`:
   ```cmake
   set(CLI_TOOLS fxopen fxclose fxaddorder fxrmorder fxtr fxhistdata fxmystuff)
   ```
3. Add method to `IBrokerProvider.h` (if new operation needed)
4. Implement in `FxcmProvider` (`fxcm_provider.cpp`)
5. Build: `cd build && make fxmystuff`

### Adding a New Broker Provider

1. Create `include/broker/oanda_provider.h` → inherit `IBrokerProvider`
2. Create `src/providers/oanda/oanda_provider.cpp` → implement all pure virtuals
3. Update `SessionHelper::createAndLogin()` to select provider by config
4. CLIs remain unchanged — they call through `IBrokerProvider*`

---

## Cross-References

- **jgt-broker-native source**: `jgt-broker-native/src/`, `jgt-broker-native/include/`
- **SDK headers**: `libs/opt/ForexConnectAPI/include/ForexConnect.h`
- **sample_tools**: `libs/opt/gehtsoft/forex-connect/samples/Linux/cpp/sample_tools/`
- **Official samples**: `https://github.com/gehtsoft/forex-connect/tree/master/samples`
- **FXCM API docs**: `https://fxcm-api.readthedocs.io/en/latest/forexconnectapi.html`
- **jgt-transact** (consumer of these CLIs): `jgt-transact/`
- **KINSHIP**: `jgt-broker-native/KINSHIP.md`

---

*Source: fxcodebase.com wiki + jgt-broker-native working codebase. Document ID: `llms-forexconnect-api-cpp`. Version 1.0.0.*
