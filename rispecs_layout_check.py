#!/usr/bin/env python3
"""rispecs_layout_check.py — does a repository's rispecs/ follow llms-rispecs-layout.md?

    python3 rispecs_layout_check.py <repo> [<repo> ...]   # report ERROR and WARN
    python3 rispecs_layout_check.py --all <repo>          # also INFO
    python3 rispecs_layout_check.py --links <repo>        # broken relative links only

Run it before a reorganisation to see what to move, and after, to see what the move broke.
Read-only: it never changes a file.

Exit codes follow the ecosystem contract (__SYNC_llms.sh, reconcile.py):
  0  clean          1  findings          2  could not look (path absent or unreadable)
"""
import os
import re
import sys

ENTRY_NAMES = ("README.md", "README.rise.md", "SPEC.md", "RISPEC.md")
ROOT_ALLOWED = {"README.md", "README.rise.md", "AGENTS.md", "CLAUDE.md", "KINSHIP.md",
                "SPEC.md", "RISPEC.md", "STATUS.md"}
SUPPORT_DIRS = {"schemas", "fixtures", "proposals", "research", "drawings", "artefacts",
                "artifacts", "assets", "sources"}
SKIP_DIRS = {"node_modules", ".git", "dist", "build", "vendor", "archive", "archives"}  # archives are frozen
LINK = re.compile(r"\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+\"[^\"]*\")?\s*\)")
NUMBER = re.compile(r"^(\d{2})-")

findings = []


def report(level, code, path, message):
    findings.append((level, code, path, message))


def is_skipped(name):
    return name in SKIP_DIRS or name.startswith(".") or name.startswith("_")


def find_rispecs_roots(repo):
    for current, dirs, _files in os.walk(repo):
        dirs[:] = sorted(d for d in dirs if not is_skipped(d))
        if os.path.basename(current) == "rispecs":
            if any(f.endswith(".md") for _c, _d, fs in os.walk(current) for f in fs):
                yield current  # a rispecs/ with no Markdown is code (an API route), not specs
            dirs[:] = []  # a rispecs/ is checked whole; never look for one inside another


def markdown_files(folder):
    return sorted(f for f in os.listdir(folder)
                  if f.endswith(".md") and os.path.isfile(os.path.join(folder, f)))


def subfolders(folder):
    return sorted(d for d in os.listdir(folder)
                  if os.path.isdir(os.path.join(folder, d)) and not d.startswith("."))


def check_links(folder, rel):
    for name in markdown_files(folder):
        path = os.path.join(folder, name)
        try:
            text = open(path, encoding="utf-8").read()
        except (OSError, UnicodeDecodeError):
            continue
        text = re.sub(r"```.*?```", "", text, flags=re.S)  # links inside code fences are examples
        for target in LINK.findall(text):
            if re.match(r"^[a-z][a-z0-9+.-]*:", target, re.I) or target.startswith("#"):
                continue
            target = target.split("#")[0].split("?")[0]
            if not target or target.startswith("/"):
                continue
            if not os.path.exists(os.path.normpath(os.path.join(folder, target))):
                report("WARN", "broken-link", os.path.join(rel, name), f"→ {target}")


def check_folder(folder, rel, links_only):
    check_links(folder, rel)
    if links_only:
        return
    files = markdown_files(folder)
    if len(files) > 1 and not any(f in files for f in ENTRY_NAMES) \
            and not any(f.startswith("00-") for f in files):
        report("WARN", "no-entry", rel + "/",
               "several files and no README.md, SPEC.md or 00- master: which one is read first?")
    seen = {}
    for f in files:
        m = NUMBER.match(f)
        if m:
            seen.setdefault(m.group(1), []).append(f)
    for number, names in sorted(seen.items()):
        if len(names) > 1:
            report("INFO", "duplicate-number", rel + "/", f"{number}- is used by {', '.join(names)}")
    for f in files:
        if f.endswith(".kin.md"):
            stem = f[: -len(".kin.md")]
            folder_kin = stem == os.path.basename(os.path.normpath(folder))  # <topic>.kin.md speaks for the folder
            if (f"{stem}.spec.md" not in files and f"{stem}.rispec.md" not in files
                    and not folder_kin and not stem.startswith("relation-to-")):
                report("INFO", "kin-without-spec", os.path.join(rel, f),
                       f"pairs with no {stem}.spec.md, folder or relation-to- name (llms-rispecs-kinship.md)")


def check_root(root, rel, links_only):
    files = markdown_files(root)
    topics = [d for d in subfolders(root) if d not in SUPPORT_DIRS]
    if not links_only:
        if len(files) + len(topics) > 1 and not any(f in files for f in ("README.md", "README.rise.md")):
            report("ERROR", "no-roadmap", rel + "/", "no README.md: the root roadmap is missing")
        if topics:
            for f in files:
                if f not in ROOT_ALLOWED and not f.startswith("_archived_"):
                    report("ERROR", "loose-at-root", os.path.join(rel, f),
                           "spec beside topic folders: move it into the folder of the surface it specifies")
            readme = next((os.path.join(root, f) for f in ("README.md", "README.rise.md") if f in files), None)
            text = open(readme, encoding="utf-8", errors="replace").read() if readme else ""
            for t in topics:
                if t not in text:
                    report("WARN", "unindexed-topic", os.path.join(rel, t) + "/",
                           "not named in the root README roadmap")
    check_folder(root, rel, links_only)
    for current, dirs, _files in os.walk(root):
        dirs[:] = sorted(d for d in dirs if not d.startswith("."))
        if current != root:
            check_folder(current, current, links_only)


def main(argv):
    show_info = "--all" in argv
    links_only = "--links" in argv
    repos = [a for a in argv if not a.startswith("--")]
    if not repos:
        print(__doc__.strip())
        return 2
    roots = 0
    for repo in repos:
        if not os.path.isdir(repo):
            print(f"ERROR could-not-look {repo} — not a directory", file=sys.stderr)
            return 2
        for root in find_rispecs_roots(repo):
            roots += 1
            rel = os.path.relpath(root, repo)
            here = os.getcwd()
            os.chdir(repo)
            try:
                check_root(rel, rel, links_only)
            finally:
                os.chdir(here)
    shown = [f for f in findings if show_info or f[0] != "INFO"]
    for level, code, path, message in shown:
        print(f"{level:5} {code:17} {path} — {message}")
    counts = {lvl: sum(1 for f in findings if f[0] == lvl) for lvl in ("ERROR", "WARN", "INFO")}
    print(f"\n{roots} rispecs/ folder(s) · {counts['ERROR']} error · {counts['WARN']} warn · "
          f"{counts['INFO']} info" + ("" if show_info else " (--all shows info)"))
    return 1 if counts["ERROR"] or counts["WARN"] else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
