#!/bin/bash
# Master sync script for /src/llms/ guidance files
# Source: /src/llms/ → Targets: /src/__llms/, /etc/claude-code/

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ══════════════════════════════════════════════════════════════
# SYNC 1: All files to /src/__llms/ (existing behavior)
# ══════════════════════════════════════════════════════════════
mkdir -p ../__llms
tar cf - *py *md *txt | (cd ../__llms/ && tar xvf - && git add . && git commit . -m "sync:llms"; git push)

# ══════════════════════════════════════════════════════════════
# SYNC 2: RISE guidance files to /etc/claude-code/
# ══════════════════════════════════════════════════════════════
ETC_DIR="/etc/claude-code"
GUIDANCE_FILE="$ETC_DIR/guidance.txt"

if [[ ! -f "$GUIDANCE_FILE" ]]; then
    echo "⚠️  No guidance.txt found at $GUIDANCE_FILE"
    exit 0
fi

echo "📂 Syncing RISE guidance to $ETC_DIR"

while IFS= read -r file || [[ -n "$file" ]]; do
    # Skip empty lines and comments
    [[ -z "$file" || "$file" =~ ^# ]] && continue

    if [[ -f "$file" ]]; then
        cp -v "$file" "$ETC_DIR/"
    else
        echo "⚠️  File not found: $file"
    fi
done < "$GUIDANCE_FILE"

if [ "$USER" == "jgi" ];then 
# Commit and push /etc/claude-code/
(
    cd "$ETC_DIR" && \
    git add . && \
    git commit __llms -m "sync:rise-guidance" && \
    git push
) && echo "✅ /etc/claude-code/ synced and pushed" || echo "ℹ️  No changes to commit in /etc/claude-code/"
fi

