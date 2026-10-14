# llms-rispecs-kinship

> A specification introduces itself through its relations. Its `.kin.md` names them across folders, layers of the architecture and repositories: the package that realizes it, the app that stands on it, the contract it stands on, the episode it came from, the person who holds a decision. For each relation it says what the relation asks of the agent who works on the spec. An agent has two duties to the file: **keep it true**, and **follow it before acting**.

**Version**: 1.0.0
**Last Updated**: 2026-10-14
**Issue**: jgwill/llms-txt#46
**Companion of**: `llms-rise-framework.txt` (2.1.0), `llms-rispecs-layout.md` (1.2.0), `llms-kinship-hub-system.md` (repository `KINSHIP.md`)
**Grounding**: Shawn Wilson, *Research Is Ceremony: Indigenous Research Methods* (2008), pp. 78–80 and 113–114. Speakers and pages are given at [Grounding and attribution](#grounding).

---

## What a `.kin.md` is

It is **not "the why" of the spec** alone, and **not a relation in the database sense**: a row pointing at another row, where the pointer is the whole of the relation. It is **not a dependency manifest** either. `package.json` says what is installed. The kin file says what the relation *is* and what it *asks*.

It is the spec's introduction of itself, the way Lewis Cardinal describes introductions to Wilson: people "put themselves into an orientation… Who I am is where I'm from, and my relationships" (p. 80). Wilson, discussing Stan Wilson's 2001 editorial, puts it more strongly: "we *are* the relationships that we hold and are part of" (p. 80). A specification read without its kin is read out of its context. It does not say that a change here is a change in jgwill/Miadi's packages, or that the word it uses is ruled in a sibling folder, or that a decision it touches is held by a person.

Relations are where most of the work an agent does *beyond the spec* comes from. A spec relates to other layers of the architecture, often in other repositories. Working on it can mean starting upstream, telling downstream, or leaving a decision to its holder.

---

## The two duties

**1. Keep it true.** The kin file changes when a relation changes:
- the spec changes in a way a relation sees: a contract, a shape, a name;
- a kin moves, is renamed, deprecated, published at a new version, or gains a consumer;
- you add a dependency or a consumer;
- every Return walks the relations (`llms-rise-framework.txt` § The Return).

**2. Follow it before you act.** Before you edit the spec, implement from it, upgrade what it stands on, or move it, read its kin. For each relation the change touches, do what that relation asks ([below](#what-relations-ask)). Then record what you did under Harmony.

---

## Where it lives: one idea at three scales

| Scale | File | Speaks for |
|---|---|---|
| Repository | `KINSHIP.md` at the repository root | The repository as a being among others (`llms-kinship-hub-system.md`) |
| Topic folder | `rispecs/<topic>/<topic>.kin.md` | The whole surface the folder specifies, master and parts |
| Part | `rispecs/<topic>/NN-<part>.kin.md` | One part, when it has relations of its own (same number and stem as its spec) |
| One relationship | `rispecs/<topic>/relation-to-<kin>.kin.md` | A single relation that needs room of its own (jgwill/src `coaia-pde/rispecs/relation-to-mcp-structural-thinking.kin.md`) |

- A relation that holds for the whole repository is written once, in `KINSHIP.md`. A topic's kin points up to it rather than repeating it.
- A topic folder may carry its kin as `KINSHIP.md` instead of `<topic>.kin.md`. jgwill/Miadi `rispecs/community/` does. One folder never has both.
- A `*.rispec.md` holds spec and kin in one file, and its kin section follows this same core.

---

## The core every kin file holds

Section names may differ (the jgwill/Miadi kin files name them their own way). What follows must be present. Anything else stays in the author's voice: an anchor sentence, a Medicine Wheel position, a position statement, a story. Merge new information into it, and never regenerate it.

### 1. Who this is, and where it comes from
The spec or specs it speaks for, and what it began from: the words of the person who asked, the episode, the prototype, the ancestor spec. One paragraph, or a table of ancestors and what each gave.

### 2. Relations

| Relation | Kin | Where it lives | What the relation is |
|---|---|---|---|

Relation kinds:

| Kind | Meaning |
|---|---|
| **ancestor** | It came from this: an episode, a prototype, an earlier spec, a practice |
| **upstream** | It stands on this: a package, a contract, a schema, a spec held elsewhere |
| **downstream** | This stands on it: a package that realizes it, an app or a plugin that consumes it, a spec that cites it |
| **sibling** | A peer at the same layer, holding a neighbouring part of the same reality |
| **descendant** | What it may grow into, not yet built |
| **guardian** | A person, a repository or a spec that holds a decision or a fact this spec touches |
| **place** | Where it runs or rests: a host, a service, a port, a data repository |

**Where it lives** must resolve from any host: `owner/repo` and a path, `rise://<owner>/<repo>/<path>`, a package name `@scope/name`, an episode `miadi-chronicle://<n>`. A host path (`/src/…`, `/a/src/…`) is written only beside one of these, because another machine cannot follow it.

### 3. What the relations ask

| When … | Who responds | The act |
|---|---|---|

This is the table the Miadi kin files call *Propagation Needs*, with **the act** made explicit: what the agent does, where, and in what order.

### 4. What is held, and by whom

| Held | By |
|---|---|

Decisions and facts whose guardian is not the agent: a word whose future a person holds, a contract another repository rules, a consent not yet given. An agent brings a held question to its holder. It does not settle it.

### 5. Harmony

Dated entries: when the relations were last walked, at which commit, what was out of step, and what restored it.

```markdown
## Harmony
- 2026-10-14 · `155e1af` · walked all relations. `@miadi/movement-conductor` installed at ^0.3.1 while 0.3.6 is published: held for the next gmtermux bump.
```

### Template

```markdown
# <Surface> — kin

> Speaks for `./SPEC.md` and its parts · repository kin: [`KINSHIP.md`](../../KINSHIP.md)

## Who this is, where it comes from

## Relations
| Relation | Kin | Where it lives | What the relation is |
|---|---|---|---|

## What the relations ask
| When … | Who responds | The act |
|---|---|---|

## What is held, and by whom
| Held | By |
|---|---|

## Harmony
- <date> · `<commit>` · <what was walked, what was out of step, what restored it>
```

---

## What relations ask {#what-relations-ask}

| Relation | What it usually asks | Where this is already practised |
|---|---|---|
| **upstream**: we stand on it | The change begins where the fact is held. Open an issue in that repository first, change and publish there, then bump here. Never patch a copy of it here | The `medicine-wheel-upstream-delivery` skill: issue in jgwill/medicine-wheel, publish a suite patch, bump jgwill/Miadi, deploy |
| **downstream**: it stands on us | After our change, those who stand on us respond. Name the changed section in an issue in their repository, or bump and deliver | The `miadi-factory-delivery` sweep after a publish. gmtermux takes a new `@miadi/*` version in a `[#N]` commit (`gmtermux-ilex-delivery`) |
| **sibling** | Consume, never restate. Cite its section. A contradiction is raised with its guardian, not resolved here | jgwill/Miadi `voice-episode-binding.kin.md`: episode addressing "owns identity; this owns belonging… Consumed, never restated" |
| **guardian** | A held decision goes to its holder | jgwill/Miadi `movement-conductor-family.kin.md` § What is held, and by whom |
| **ancestor** | Keep what it gave: the beloved qualities a rewrite must not lose | `voice-episode-binding.kin.md` § Ancestors, column *What it gave* |
| **place** | A change reaches the place where it runs: deploy, restart, prove the behaviour there | `gmtermux-ilex-delivery`: pushed means running on ilex |
| **descendant** | Nothing yet. Keep the door the spec leaves open from being closed by accident | — |

### Reciprocity: a relation is written on both sides

> "We must ensure that both sides in the relationship are sharing the power going into these new connections. Without this reciprocity, one side of the relationship may gain power and substance at the expense of the other." (Wilson, p. 79)

When a row here names kin in another folder or repository, that kin's own `.kin.md` or `KINSHIP.md` carries the reciprocal row: *downstream* there for *upstream* here. Write it if the file is yours to write. If it is not, open an issue in that repository naming the relation. A relation written on one side only is a relation the other side cannot follow.

### A new relation respects the ones around it

> "The new relationship has to respect all of the other relationships around it." (Wilson, p. 79)

Before you add a dependency, a consumer or a citation, read the kin of what you are relating to. A new relation must not contradict what that kin already holds: a guardian's open decision, a consent boundary, a word ruled elsewhere.

---

## Restoring harmony {#restoring-harmony}

Wilson tells of Cora, whose grandfather's words had been mistranslated into English: "the language was taken out of its context of relationality. In the translation given, relationships were broken." She could have re-translated the text in the university library, but "That may have helped to correct the misinformation, but it would not have restored the relationship." She returned to her home community, and she and her mother "were able to discuss the mistranslation and re-analyze the text together" (p. 78).

For a specification's relations, the practice it teaches is this. When a relation is out of step, correcting the text where you stand is not enough. Go to where the relation lives:

- **A copy has drifted from its source.** Fix it at the source and let the copy be carried again. Example: the `stateloom-*` skills in jgwill/miadi-orchestration-kit are copies of jgwill/smcraft's, carried by smcraft's `sync-kit-plugin.mjs`. A fix made to the copy corrects the text and leaves the relation broken.
- **A move broke a citation in another repository.** Update the citation where it is written, and leave a Moved row where the file was. Example: on 2026-10-14 gmtermux's movement-conductor specs moved into a folder (miadisabelle/gmtermux#95). The package headers in jgwill/Miadi that name them as their specification of record were updated in jgwill/Miadi#782.
- **A version is behind.** Record it under Harmony, and carry it through the relation's act (bump and deliver). A silent pin is not an act.
- **A contract is stated differently in two places.** Do not choose one here. Raise it with the guardian of the fact, and record the tension until it is resolved (`llms-kinship-hub-system-full.md` § Tensions).

---

## Guardianship, not ownership {#guardianship}

> "Because if knowledge is formed in a relationship, it can't be owned." … "The idea belongs to the cosmos, to all of the relations that it has formed, not to the individual who happens to be the first to write about it." (Wilson, p. 114)

Wilson offers *guardianship* as "probably a better word for the intergenerational relationship that forms between Indigenous people and sacred knowledge and places" (p. 114). The passage is about Indigenous knowledge and the harm of using it "out of its context, out of the special relationships that went into forming it". We take from it a practice for our own files, not an equivalence:

- **A shared fact has one guardian, and others cite it.** This is the rule jgwill/llms-txt `AGENTS.md` already keeps: "A fact has one author." The kin file names the guardian of each fact the spec stands on.
- **A spec copied into another repository travels without its relations.** If a copy must exist, its README or kin names the guardian and where the living text is. Example: jgwill/Miadi `packages/transcription/rispecs/composition-recorder-suite.spec.md` is a copy whose guardian is miadisabelle/gmtermux `rispecs/composition-recorder/`.

---

## Worked example

miadisabelle/gmtermux [`rispecs/movement-conductor/movement-conductor.kin.md`](https://github.com/miadisabelle/gmtermux/blob/main/rispecs/movement-conductor/movement-conductor.kin.md):

- **ancestor**: Miadi Chronicle Episode 083 (landbase movement capture to Wekinator)
- **downstream**: `@miadi/osc`, `@miadi/movement-conductor`, `@miadi/termux-motion` in jgwill/Miadi. Their headers name these specs as their specification of record. A change to a spec asks for an issue in jgwill/Miadi naming the changed section.
- **upstream**: the same three packages, as published. The Landbase Movement Studio here runs on them. A studio change that needs the packages begins in jgwill/Miadi: publish there, then bump here in a `[#N]` commit.
- **sibling**: jgwill/Miadi `rispecs/movement-conductor-family/`, the package-side family. It is consumed, never restated.
- **guardian**: the open decisions held in that family's kin

Its reciprocal row lives in jgwill/Miadi `rispecs/movement-conductor-family/movement-conductor-family.kin.md` § Kin across repositories.

---

## Anti-patterns

- **"The why" only.** A paragraph of motivation with no relation an agent can follow.
- **Pointers without asks.** A list of links that never says what a change asks of each kin.
- **One-sided relations.** A row naming kin in another repository with no reciprocal row there, and no issue asking for one.
- **Host paths only.** `/src/…` rows that resolve on one machine.
- **Settling held questions.** An agent deciding what a guardian holds.
- **Regenerated kin.** A rewritten file that loses the author's anchor, voice or held tensions (`llms-kinship-hub-system.md` § 4).
- **Decorative relationality.** Kinship words with no relation, act or guardian behind them (`llms-kinship-hub-system-full.md` § 8).

---

## Grounding and attribution {#grounding}

Shawn Wilson, *Research Is Ceremony: Indigenous Research Methods* (Fernwood, 2008). The passages used here, by speaker:

| Page | Speaker | Passage |
|---|---|---|
| 78 | Wilson, telling Cora's research | "In the translation given, relationships were broken." · "That may have helped to correct the misinformation, but it would not have restored the relationship." |
| 79 | Wilson | "the more relationships between yourself and the other thing, the more fully you can comprehend its form and the greater your understanding becomes." · "So the methodology is simply the building of more relations." · "The new relationship has to respect all of the other relationships around it." · the reciprocity passage quoted above · "Our axiology demands that we be accountable to these relations that we form." |
| 80 | Wilson, on Stan Wilson (2001) | "Rather than viewing ourselves as being *in* relationship with other people or things, we *are* the relationships that we hold and are part of." |
| 80 | Lewis Cardinal, in conversation | "They put themselves into an orientation. I think that is a real foundational thing, to say who I am. Who I am is where I'm from, and my relationships." |
| 113 | Jane, in conversation | On conversation as method: "That is a valid tool. Because it is contextual. It helps build relationships." |
| 114 | Wilson, in conversation | "if knowledge is formed in a relationship, it can't be owned" · guardianship as "probably a better word" · knowledge used "out of its context" |

This file borrows a practice for specification work from one book's conversations. It does not speak for Indigenous knowledge in general, and it does not make a software dependency the equal of a human or sacred relationship (`llms-kinship-hub-system-full.md` § 2.2 on plurality and specificity). The values named here are tied to acts an agent performs: write the reciprocal row, begin upstream, leave the held decision to its holder.
