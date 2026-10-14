# llms-rispecs-kinship

> Every specification folder has a kin file. It says who and what the specification is in relationship with (people, episodes, other specs, packages, other repositories) and what each relationship asks of us. **Write it** when you write the spec. **Keep it true.** **Read it before you act.**

**Version**: 2.0.0
**Last Updated**: 2026-10-14
**Issues**: jgwill/llms-txt#46, jgwill/llms-txt#47
**Read first**: [`llms-relationality.md`](./llms-relationality.md): what we mean by *relationship*. It is not a relational database.
**Companion of**: `llms-rise-framework.txt` (2.2.0), `llms-rispecs-layout.md` (1.3.0), `llms-kinship-hub-system.md` (a repository's `KINSHIP.md`)
**Checker**: `rispecs_layout_check.py` warns `no-kin` where a folder has none

v2.0.0: the kin file is written, not optional. Five plain relationship words replace the dependency-graph vocabulary of 1.0. The meaning of *relationship* lives in `llms-relationality.md`.

---

## Why a specification has a kin file

A specification is known through its relationships ([`llms-relationality.md`](./llms-relationality.md)). Read alone, it is read out of its context. A spec read alone does not tell you:
- that a package in another repository is built from it;
- that the app you are about to change relies on a contract kept elsewhere;
- that a word it uses was ruled in the folder next door;
- that a person holds a decision it touches.

The kin file holds this, so that the next agent knows before acting. As Lewis Cardinal told Wilson about introductions: "Who I am is where I'm from, and my relationships." (*Research Is Ceremony*, p. 80)

---

## Write it

- **Every topic folder has one:** `rispecs/<topic>/<topic>.kin.md`. Write it when you write the folder's first spec.
- **A `rispecs/` that holds one surface** (a package) has one at its root, named after the surface: `rispecs/<name>.kin.md`.
- **A folder with no kin file:** write it before you change a spec there. Reading the relationships is part of the change.
- **A part with relationships of its own** has `NN-<part>.kin.md` beside its spec. **One relationship that needs room of its own** has `relation-to-<relative>.kin.md`.
- **A folder may keep its kin as `KINSHIP.md`** instead (jgwill/Miadi `rispecs/community/` does). Never both.
- **A relationship that holds for the whole repository** is written once, in the repository's `KINSHIP.md`.

**Write what you can see.** Sources are the spec, the code and its headers, `package.json`, AGENTS files, issues and episodes. What you cannot confirm, mark *to confirm* and ask. Do not invent relationships (`llms-kinship-hub-system.md` § 4).

---

## What a kin file says

Four short sections. Keep these names, so every kin file reads the same way. Anything else the author wants to say (the words that started it, a Medicine Wheel position, a story) stays in their own voice. Add to it; never regenerate it.

```markdown
# <Surface> — kin

> Speaks for `./SPEC.md` and its parts. Repository kin: [`KINSHIP.md`](../../KINSHIP.md)

## Who I am, where I come from
<the spec(s) it speaks for, and what it came from: a person's words, an episode, a prototype, an earlier spec>

## My relatives
| Relative | How we are related | Where it lives | What it asks of us |
|---|---|---|---|

## What others hold
| Held | By |
|---|---|

## Harmony
- <date> · `<commit>` · <what we checked, what was out of balance, what we did>
```

### How we are related: five words

| Words | Meaning | Example |
|---|---|---|
| **came from** | The spec came from this: a person's words, an episode, a prototype, an earlier spec | Episode 083 |
| **we rely on** | The spec or its code relies on this, kept elsewhere (upstream) | A published package, a contract in another repository, the host it runs on |
| **relies on us** | This relies on the spec (downstream) | A package built from the spec, an app that uses it, a spec that cites it |
| **walks beside** | A neighbour that holds another part of the same work | A spec in the next folder, the same family in another repository |
| **holds a decision** | A person or a repository that decides something the spec touches | The keeper of a word, a contract, a consent |

**Where it lives** must work from any machine: `owner/repo` and a path, `rise://<owner>/<repo>/<path>`, a package name `@scope/name`, an episode `miadi-chronicle://<n>`. A local path (`/src/…`) only beside one of these.

**What it asks of us** says what an agent does, and when.

### What others hold
Decisions, words and consents whose keeper is not the agent. An agent brings a held question to its keeper. It does not settle it.

### Harmony
When the relationships were last checked, at which commit, what was out of balance, and what was done. Wilson writes of Cora's relationship with her grandfather being "thrown into disharmony" by a false text, and of the work to restore it (pp. 74, 78).

---

## Read it before you act

Before you change a spec, build from it, update what it relies on, or move it, read its kin file. For each relative your change touches, do what the relationship asks:

| Relationship | What to do | Where this is already practised |
|---|---|---|
| **we rely on** it | If your change needs it to change, **begin there**: open an issue in that repository, change and publish there, then update here. Do not patch a copy here | The `medicine-wheel-upstream-delivery` skill: issue in jgwill/medicine-wheel, publish, then bump jgwill/Miadi |
| it **relies on us** | After your change, **tell them**: open an issue in their repository naming what changed, or update and deliver | The `miadi-factory-delivery` sweep after a publish. gmtermux bumps an `@miadi/*` version in a `[#N]` commit |
| it **walks beside** us | **Use its words; do not rewrite them here.** If you disagree, raise it with whoever holds it | jgwill/Miadi `voice-episode-binding.kin.md`: "Consumed, never restated" |
| it **holds a decision** | **Ask. Do not decide** | jgwill/Miadi `movement-conductor-family.kin.md` § What is held, and by whom |
| we **came from** it | **Keep what it gave** | `voice-episode-binding.kin.md` § Ancestors, *What it gave* |

Then add a line under Harmony saying what you did.

---

## Keep it true

**Update it when a relationship changes:**
- the spec changes in a way a relative sees: a contract, a shape, a name;
- a relative moves, is renamed, gets a new version, or a new relative appears;
- you add something the spec relies on, or something new relies on it;
- every Return checks every relationship (`llms-rise-framework.txt` § The Return).

**Name it from both sides.** When you name a relative in another folder or repository, the relative's own kin file (or `KINSHIP.md`) names you back. That is *chapan*, "a balanced relationship, without hierarchy of any sort", where both people call the other by the same word (p. 73). Write it there if you can. If you cannot, open an issue there asking for it.

**A new relationship respects the others.** "The new relationship has to respect all of the other relationships around it" (p. 79). Before you add one, read your new relative's kin file. Do not contradict a decision it holds, a consent it keeps, or a word ruled there.

---

## When a relationship is out of balance

Fix it where the relationship lives, not only in the text in front of you. Re-translating Cora's grandfather's words in the library "may have helped to correct the misinformation, but it would not have restored the relationship" (p. 78). She went home and read the text again with her mother.

- **A copy has drifted from its source.** Fix it at the source, and let the copy be carried again. The `stateloom-*` skills in jgwill/miadi-orchestration-kit are copies of jgwill/smcraft's, so their fixes belong in smcraft.
- **A move broke a citation in another repository.** Update the citation there, and leave a Moved row where the file was. On 2026-10-14 gmtermux's movement-conductor specs moved (miadisabelle/gmtermux#95), and the jgwill/Miadi package headers that cite them were updated (jgwill/Miadi#782).
- **A version is behind.** Note it under Harmony, and carry it through what the relationship asks (update and deliver).
- **The same contract says two different things in two places.** Do not choose here. Take it to whoever holds it, and note it under Harmony until it is settled.

---

## Keepers, not owners

"If knowledge is formed in a relationship, it can't be owned." Wilson prefers *guardianship* (p. 114). For our files this means two things:

- **A shared fact has one keeper, and others cite it.** jgwill/llms-txt `AGENTS.md` keeps the same rule: "A fact has one author."
- **A copied spec names its keeper.** jgwill/Miadi `packages/transcription/rispecs/composition-recorder-suite.spec.md` is a copy. Its README names miadisabelle/gmtermux `rispecs/composition-recorder/` as the keeper.

---

## Example

miadisabelle/gmtermux [`rispecs/movement-conductor/movement-conductor.kin.md`](https://github.com/miadisabelle/gmtermux/blob/main/rispecs/movement-conductor/movement-conductor.kin.md):

| Relative | How we are related | What it asks of us |
|---|---|---|
| Episode 083 | came from | Stay truthful to its practice and its measurements |
| `@miadi/osc`, `@miadi/movement-conductor`, `@miadi/termux-motion` (jgwill/Miadi) | relies on us. Their headers name these specs as their record | A change to a spec here: open an issue in jgwill/Miadi naming the section |
| The same packages, as published | we rely on. The studio here runs on them | Studio needs begin in jgwill/Miadi; then bump here and deliver |
| jgwill/Miadi `rispecs/movement-conductor-family/` | walks beside | Use its words; do not restate them |
| That family's open decisions | holds a decision | Ask the keeper named there |

It is named back from jgwill/Miadi `movement-conductor-family.kin.md` § Kin across repositories.

---

## What to avoid

- **No kin file.** A folder of specs with no kin file: write one.
- **Only "the why".** A paragraph of motivation, with no relative an agent can act on.
- **Links without asks.** Relatives listed, but nothing said about what a change asks of them.
- **One side only.** A relative named here who does not name us back, and no issue asking them to.
- **Local paths only.** `/src/…` that resolves on one machine.
- **Deciding what others hold.**
- **Regenerating.** Rewriting the file and losing the author's words.
- **Kinship words with nothing behind them.** Every relationship named has an act or a keeper (`llms-kinship-hub-system-full.md` § 8).

---

## Sources

Shawn Wilson, *Research Is Ceremony: Indigenous Research Methods* (Fernwood, 2008): pages 73, 74, 78, 79, 80 and 114 as quoted above. Speakers and the full reading are in [`llms-relationality.md`](./llms-relationality.md) § Sources. This file borrows a way of seeing for our own work. It does not make a package the equal of a person or a place.
