# Field 04 — Indigenous Data Sovereignty: OCAP® and CARE

**Sources:** `fnigc-ocap`, `carroll-etal-2020`, `kukutai-taylor-2016`

---

## OCAP® — what it actually is

**The First Nations Principles of OCAP®**, asserted and governed by the **First Nations Information Governance Centre (FNIGC)**.

Three facts, all load-bearing for this repository:

### 1. It is First Nations–specific, by design and by statement

OCAP® is a set of **First Nations** principles — not Indigenous principles, not a pan-Indigenous standard. FNIGC is explicit that OCAP® is not intended as a pan-Indigenous framework; it encompasses First Nations practices and values regarding ancestral ways and the sharing of knowledge systems.

A portfolio that has already listed "pan-Indigenous flattening" as an anti-pattern cannot then use the one framework whose holders explicitly say "this is not pan-Indigenous" as its general-purpose Indigenous data-ethics label.

### 2. It is a registered trademark

FNIGC filed trademark applications with the Canadian Intellectual Property Office. The OCAP® and PCAP® **logos** received registered trademark status in **August 2014**; the **acronyms themselves** were approved in **August 2015**.

FNIGC's stated reason for seeking the trademark is directly relevant: **to protect the principles from misuse and improper interpretation that could distort their original intent.**

This is not a technicality. It is a First Nations governance body having anticipated precisely this situation and taken formal legal action to prevent it.

### 3. It describes a governance relationship, not a data property

OCAP® — Ownership, Control, Access, Possession — governs how **First Nations data** is collected, protected, used and shared, with a First Nation holding the authority. It is a relationship between a First Nation and whoever holds data about them.

It is therefore not a property that a data structure can carry, nor a state that software can self-assess.

---

## How this repository currently uses it

- `OCAPFlags` — a TypeScript type in `@medicine-wheel/ontology-core`
- `auditOcapCompliance()` — a function
- `relationalCompleteness` alongside it
- `ocap_compliance_checker` — an MCP tool taking `{ storage_location, ownership_statement, access_controls, community_approval, data_sharing_agreements }`
- "OCAP flags" as the South Direction agent's planning concern in a LangGraph
- "OCAP compliance rates" as a proposed dashboard metric
- `llms-medicine-wheel-packages.txt:175` — *"**OCAP® Sovereignty**: Indigenous data sovereignty (Ownership, Control, Access, Possession) is enforced at the code level."*

That last line is the sharpest problem in the repository, because it makes a specific and checkable claim that is not true. **OCAP® cannot be enforced at the code level.** It is enforced by a First Nation exercising authority over its own data. A function that checks whether an `ownership_statement` field is non-empty is a form validator. Describing it as enforcing First Nations data sovereignty inverts the direction of authority — it relocates the enforcement from the nation to the software.

`KINSHIP.md` already shows awareness of the underlying tension, noting that the Medicine Wheel Development Suite is committed directly to `jgwill/workspace` rather than its own repo "simply because the OCAP isn't clear on that (Who owns that 'Medicine Wheel Development Suite'…)". That instinct is correct. It has not yet reached the published API surface.

---

## CARE — the framework that actually fits

**Carroll, S.R., Garba, I., Figueroa-Rodríguez, O.L., Holbrook, J., Lovett, R., Materechera, S., Parsons, M., Raseroka, K., Rodriguez-Lonebear, D., Rowe, R., Sara, R., Walker, J.D., Anderson, J. & Hudson, M. (2020).** "The CARE Principles for Indigenous Data Governance." *Data Science Journal* 19(1): 43, 1–12. DOI 10.5334/dsj-2020-043.

- **C**ollective Benefit — data ecosystems designed so Indigenous Peoples derive benefit
- **A**uthority to Control — Indigenous Peoples' rights and interests in their data must be recognised and their authority to control it empowered
- **R**esponsibility — those working with Indigenous data are responsible for how it supports self-determination and collective benefit
- **E**thics — Indigenous Peoples' rights and wellbeing should be the primary concern across the data lifecycle

Developed by the **International Indigenous Data Sovereignty Interest Group** within the Research Data Alliance, in consultation with Indigenous Peoples, scholars, non-profits and governments. Designed to be **people- and purpose-oriented**, complementing the data-centric FAIR principles (Findable, Accessible, Interoperable, Reusable) rather than replacing them.

**Why CARE fits where OCAP® does not:**

| | OCAP® | CARE |
|---|---|---|
| Scope | First Nations (Canada), specifically | International, Indigenous Peoples broadly |
| Legal status | Registered trademark, FNIGC-governed | Open-access publication, no trademark |
| Governance | Authority held by First Nations via FNIGC | Framework for asserting Indigenous authority generally |
| Fit for a general-purpose ontology package | **No** | **Yes** |

**Foundational context:** Kukutai, T. & Taylor, J. (eds.) (2016), *Indigenous Data Sovereignty: Toward an Agenda*, ANU Press CAEPR Monograph 38 (ISBN 9781760460303) — the founding volume, premised on UNDRIP: Indigenous peoples hold inherent and inalienable rights over the collection, ownership and application of data about them, their lifeways and their territories.

---

## Engineering implications

**Recommended migration, in priority order:**

1. **Remove the claim that OCAP® is "enforced at the code level"** (`llms-medicine-wheel-packages.txt:175`). It is not accurate and it is the most quotable line against this project.
2. **Rename the API surface to CARE.** `OCAPFlags` → `CareFlags` or `IndigenousDataGovernanceFlags`; `auditOcapCompliance()` → `assessCareAlignment()`; `ocap_compliance_checker` → `care_alignment_checker`. Document CARE with the Carroll et al. DOI.
3. **Change "compliance" to "alignment" or "assessment" everywhere.** Software cannot determine compliance with a governance framework held by a people. It can prompt for, record, and surface the questions. That is genuinely useful and honestly describable.
4. **If OCAP® is to be retained anywhere**, contact FNIGC first. FNIGC offers OCAP® training and is the authority on appropriate reference. Retaining OCAP® *as a documented reference* ("this work is informed by the First Nations Principles of OCAP®; see fnigc.ca") is very different from shipping `auditOcapCompliance()`, and is likely fine — but confirm rather than assume.
5. **Adopt FAIR + CARE together**, as the CARE authors intend. This is a genuine strength available to the project: a codebase that operationalizes CARE alongside FAIR would be a real, citable, defensible contribution — and it needs no permission the project does not already have.

> **Verification caveat:** A direct automated fetch of fnigc.ca returned HTTP 403, and the FNIGC brochure PDF could not be text-extracted. The facts above were confirmed from FNIGC page content surfaced in search plus corroborating institutional guides, and are consistent across sources. **A human should read fnigc.ca/ocap-training directly and contact FNIGC before this repository publishes any claim involving OCAP®.**
