# llms-rispecs-layout

> The shape of a `rispecs/` folder: one tree, the names a file can take in it, the order its files are read in, and how to move a spec that sits in the wrong place. Use this when you draft a spec, when you open a `rispecs/` for the first time, and when you reorganize one.

**Version**: 1.3.0
**Last Updated**: 2026-10-14
**Companion of**: `llms-rise-framework.txt` 2.0.0. The method names what each phase leaves; this file says where it lands and what it is called  
**1.1.0**: the tree is labelled with the 2.0 phases (1 R · 2 I · 3 S · 4 E · ↺ Return). A `.kin.md` belongs to Intent, and `STATUS.md` belongs to the Return  
**1.2.0**: the kin file holds the spec's relationships and what each asks (`llms-rispecs-kinship.md`)  
**1.3.0**: every topic folder has a kin file, and the checker warns `no-kin`. *Relationship* means relationality (`llms-relationality.md`)
**Issue**: jgwill/llms-txt#45
**Checker**: [`rispecs_layout_check.py`](./rispecs_layout_check.py)

---

## The tree

```
<repo-or-package>/
└── 📂 rispecs/                              one per repository or package, at its root
    ├── 📜 README.md                         roadmap: one row per topic folder, with status
    ├── ⚙️ AGENTS.md                         optional: this repository's overrides of this file
    │
    ├── 📂 <topic>/                          one folder per surface, kebab-case
    │   ├── 📜 README.md                     the topic's roadmap: outcome, files in reading order, status
    │   ├── 🔍 01-reverse-engineer.md        1 R  what the prototype does, observed
    │   ├── 🎯 02-intent.md                  2 I  desired outcome, current reality, structural tension
    │   ├── 🧭 SPEC.md                       3 S  master: the whole surface, and how its parts compose
    │   ├── 📐 03-<part>.spec.md             3 S  a part: what to build
    │   ├── 🧬 <topic>.kin.md                2 I  the kin file, always: its relatives, and what each relationship asks of us
    │   ├── 🧬 03-<part>.kin.md              2 I  a part's own relatives, when it has some: same number, same stem
    │   ├── 📐 04-<part>.rispec.md         2+3    a part with its kin in one file
    │   ├── 📦 05-export.md                  4 E  how an implementer, a harness or an episode takes it up
    │   ├── 🗃️ 06-source-ledger.md               the sources every phase drew on, with confidence
    │   ├── 🩺 STATUS.md                     ↺    the Return: what is built, what is not yet
    │   ├── 🖼️ <name>.smdf.json · .erdf.json · .sqdf.json · .html   3 S  drawn specs, beside the spec that cites them
    │   ├── 📂 schemas/ · fixtures/              machine-readable contracts the specs cite
    │   ├── 📂 research/                         R and I evidence too large for 01 and 02
    │   ├── 📂 proposals/                        `*.proposal.md`: specs not yet adopted
    │   └── 📂 <sub-topic>/                  a part that grew its own family: the same shape, one level down
    │
    └── 📂 <topic>/
        └── 📐 <topic>.spec.md               a surface specified in one file: the folder carries its name
```

The labels name the phase that writes each file, as in `llms-rise-framework.txt` § The Method at a Glance. ↺ is the Return, the RISE pass that keeps the specs true as the code moves on.

Every file in the tree is optional except three. They are the root `README.md`, a topic's `README.md` once the folder holds more than one file, and the topic's kin file. Draw only what the work holds.
A spec family with no reverse-engineering in this repository starts at `SPEC.md` and `01-<part>.spec.md`.
A single spec is one file in its folder.

The same shape repeats at every level. A sub-topic folder is laid out exactly like a topic folder.
A package's `rispecs/` that describes one surface is itself laid out like a topic folder.

---

## Three questions place any file

**1. Which `rispecs/`?** The one at the root of the repository or package the spec describes.
A spec for `@miadi/capture` lands in `packages/capture/rispecs/`. A spec for the platform lands in the repository's `rispecs/`.
A spec about another repository's surface lands in that repository, and here you cite it as `rise://<owner>/<repo>/<path>`.

**2. Which folder?** Ask *"whose part is this?"* and put the file in the folder of that surface.
- A `rispecs/` that describes **several surfaces** (a platform, an application with independent features, a monorepo root) has one folder per surface.
  Its root holds `README.md` and `AGENTS.md` only.
- A `rispecs/` that describes **one surface** (a package, a one-purpose service) is that surface's folder. Its files sit at its root.
- When a folder starts holding the parts of two surfaces, the second surface gets its own folder.
- When in doubt, make the folder. A folder with one file costs nothing, and flat files beside folders cost every reader a guess.

**3. Which name?** Use a reserved name when the file plays that role. Otherwise use `NN-<part>.<kind>.md`.

---

## Reserved names

| Name | Role | Where |
|---|---|---|
| `README.md` | **Roadmap.** Navigation, not specification: the desired outcome in a sentence, the files in reading order, the status, the issue, and where R/I lives when it is not here | `rispecs/` root, always. Every folder holding more than one file |
| `AGENTS.md` | This repository's overrides of this file and of `llms-rise-framework.txt` | `rispecs/` root |
| `SPEC.md` | **Master spec.** The desired outcome of the whole surface, and how the parts compose | A folder whose surface is specified in parts |
| `<topic>.spec.md` | The whole spec of a surface specified in one file | A one-spec folder: the stem matches the folder name |
| `NN-<part>.spec.md` | A part: what to build | Numbered in reading order |
| `<topic>.kin.md` | **The kin file.** Who and what the spec is in relationship with (came from, we rely on, relies on us, walks beside, holds a decision), where each relative lives, and what each relationship asks of us. Written with the first spec, kept true, read before acting (`llms-rispecs-kinship.md`) | Every topic folder. `KINSHIP.md` may play this role in a folder; never both |
| `NN-<part>.kin.md` | A part's own relatives. Same `NN` and stem as its spec | Beside its spec, when the part has relationships of its own |
| `relation-to-<relative>.kin.md` | One relationship that needs room of its own | In the topic folder |
| `NN-<part>.rispec.md` | Spec and kin in one file, instead of the pair | |
| `01-reverse-engineer.md` · `02-intent.md` | Phases 1 and 2, when the folder holds the whole pass | First |
| `NN-export.md` · `NN-source-ledger.md` | E, and the record of sources | After the specs |
| `STATUS.md` | Implementation state, kept by the Return | Once implementation starts |
| `_archived_<name>.md` | **Frozen.** Do not edit it. Do not implement from it. An active spec wins over it | Where the file was |
| `schemas/` · `fixtures/` · `research/` · `proposals/` | Support folders, named by role, never by date. Not topics | Inside a topic |

Kebab-case for folders and parts. UPPERCASE is for reserved names only.
Dates and issue numbers belong in README rows and commit messages, not in folder names. An episode-named topic (`episode-099-review-loop/`) is a surface, and keeps its name.

---

## Numbering: the reading order follows R → I → S → E

The two-digit prefix holds reading order, the way numbered phase folders hold a lifecycle.

- **Reading order follows the RISE method.** Reverse-engineering comes first, intent second, the specification parts next, then export and the source ledger.
  A folder holding only the S of the method begins at `01-` with its first part.
- **`00-` is the master slot in a numbered family.** `00-<topic>-master.spec.md` plays the role of `SPEC.md`. One folder never has both.
  New folders use `SPEC.md`.
- **Numbers are given at birth and never reused.** A later part takes the next free number, even when it reads better earlier. Other files, code comments and episodes cite these names.
  Two files sharing a prefix is a reading-order fork. The README says which one to read first.
- **Unnumbered files are fine where order does not matter.** Examples are a set of independent rispecs under one README, or the parts of a package. The README gives the order.

The two shapes in use in the ecosystem are one rule seen from two sides:

```
rispecs/medicine-wheel/                     a whole RISE pass, R → I → S → E
├── README.md                               (jgwill/miadi-orchestration-kit)
├── 01-reverse-engineer.md
├── 02-intent.md
├── 03-specify.md
├── 04-export.md
└── 05-source-ledger.md

rispecs/a2a/                                a spec family, S only (R and I live in the episodes)
├── README.md                               (jgwill/Miadi)
├── 00-a2a-master.spec.md                   the master slot
├── 01-message-broker.spec.md
├── …
├── 06-hawk-inspired-next-gen.spec.md
└── STATUS.md
```

---

## Reading a `rispecs/` you have not seen

1. `rispecs/README.md`: which folder holds the surface you are working on.
2. The folder's `README.md`, then `SPEC.md`, or the `00-` master when there is no `SPEC.md`.
3. The kin file (`<topic>.kin.md`), before you change anything: it says what your change asks of the spec's relatives in other folders and repositories.
4. The numbered files in order. A part's own `.kin.md` is read with its spec.
5. `STATUS.md`, before you claim anything is built.
6. Skip `_archived_*` unless you are tracing history.

A folder with no README is read from `SPEC.md`, then from its lowest number, then from the file named after the folder.

---

## Reorganizing a `rispecs/` that does not follow the tree

**Moving changes the folder, never the file name.** A spec's file name is how code comments, AGENTS files, other repositories and episode manifests cite it, often with a `§` section after it.
A move that keeps the name leaves every bare-name citation true. Only path citations need editing.
Numbers and `SPEC.md` are given when a family is next written, not during a move.

```bash
# 0. See what does not conform (read-only)
python3 /path/to/llms-txt/rispecs_layout_check.py . > /tmp/rispecs-before.txt

# 1. Group the loose files by the surface each one specifies.
#    The first lines usually name it ("Enables…"), and a *-suite.spec.md or 00- master lists its parts.

# 2. Move with history. One folder per surface. Names unchanged.
mkdir -p rispecs/movement-conductor
git mv rispecs/movement-conductor-suite.spec.md rispecs/osc-wire.spec.md \
       rispecs/movement-conductor.spec.md rispecs/termux-motion.spec.md \
       rispecs/landbase-movement-studio.spec.md rispecs/movement-conductor/

# 3. Commit the moves alone, so each is a pure rename (git log --follow keeps the history)
git commit -m "rispecs: one folder per surface (#<issue>)"

# 4. Find every citation of each old path. Here, and in the other repositories that cite this one.
git grep -n 'rispecs/osc-wire.spec.md'
#    Edit live citations: code comments, AGENTS.md, bin/ and web/ headers, and build scripts that READ rispecs/.
#    Leave session records (.pde/, _sessiondata/, transcripts) and _archived_* files as written. They record the past.

# 5. Relative links inside a moved file that leave its folder go one level deeper:
#    ../docs/workbench.md  →  ../../docs/workbench.md

# 6. Write a README.md for each new folder, and turn rispecs/README.md into the roadmap.
#    Add a "Moved" table to rispecs/README.md (old path → new path, date, issue),
#    so a stale citation from a repository you could not edit still finds the file.

# 7. Check again. Compare: no broken link that was not already broken before the move.
python3 /path/to/llms-txt/rispecs_layout_check.py . > /tmp/rispecs-after.txt
diff /tmp/rispecs-before.txt /tmp/rispecs-after.txt
```

Watch for programs that read `rispecs/` by listing it. A build script doing `readdirSync('rispecs')` sees an empty root after a reorganization. Name the files it needs in their new folders.

---

## The checker

`rispecs_layout_check.py` (this repository) walks every `rispecs/` under the paths it is given and reports. It changes nothing.

```bash
python3 rispecs_layout_check.py <repo> [<repo> …]     # ERROR and WARN
python3 rispecs_layout_check.py --all <repo>          # also INFO
python3 rispecs_layout_check.py --links <repo>        # broken relative links only
```

| Code | Level | Meaning |
|---|---|---|
| `loose-at-root` | ERROR | A spec sits beside topic folders at a `rispecs/` root |
| `no-roadmap` | ERROR | A `rispecs/` root with more than one entry has no `README.md` |
| `unindexed-topic` | WARN | A topic folder is not named in the root roadmap |
| `no-entry` | WARN | A folder holds several files and none says it is read first (`README.md`, `SPEC.md`, `00-`) |
| `broken-link` | WARN | A relative Markdown link points at nothing |
| `duplicate-number` | INFO | Two files share a `NN-` prefix |
| `no-kin` | WARN | A folder of specs has no kin file. Write it the next time you work there |
| `kin-without-spec` | INFO | A `.kin.md` matches no spec, folder or `relation-to-` name |

Folders named `archive`/`archives`, and paths beginning with `.` or `_` (`.pde/`, `_sessiondata/`), are not checked.
Exit codes: `0` clean, `1` findings, `2` could not look.

---

## Names you will meet in older folders

These are kept, not renamed (see *Moving changes the folder, never the file name*). Each plays a role from the table above.

| Seen | Role | Where |
|---|---|---|
| `00-<topic>-master.spec.md` | Master (`SPEC.md`) | Miadi and midiedge families |
| `<topic>-suite.spec.md` | Master of a suite | gmtermux `composition-recorder/`, `movement-conductor/` |
| `app.spec.md`, `mcp-server.spec.md` | Master of a one-surface `rispecs/` | jgwill/src projects |
| `README.rise.md` + `RISPEC.md` | README and SPEC of a package's `rispecs/` | Miadi `packages/*/rispecs/` |
| `*.mission.md`, `*.receipts.md`, `*.plan.md` | Export and its evidence | After the specs they serve |
| `IMPLEMENTATION-ANALYSIS.md`, `REVIEW-*.md`, `deep-dive-review/` | Research and review | New ones go in `research/` |

---

## Where this meets the episode

A topic folder is the unit an episode cites. When the RISE export is recorded (`llms-rise-framework.txt` § Recording the Export), the `rispecs:` entry in `episode.yaml` names the folder's entry file. An example is `rise://jgwill/Miadi/rispecs/voice-episode-binding/voice-episode-binding.spec.md`, pinned to the commit the episode stood on.
A citation pinned to a commit survives a later move. One that names `HEAD` resolves through the Moved table.

---

## On a borrowed tree

A web search for "RISE file organization" returns a tree for another RISE: *Research → Implement → Sustain → Evaluate*, with folders `01_Research/` … `04_Evaluate/`. It is not this method.
Two of its ideas carry over, and the tree above holds both:
- a `README.md` roadmap at every level;
- number prefixes that keep lifecycle order.

Its folders do not carry over. A RISE topic is a surface, and the phases live in the file numbers inside it.
