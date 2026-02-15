# llms-kinship-hub-system.txt

> Protocol for guiding LLMs to create and maintain KINSHIP.md files so that digital work is organized as a kinship-based, relational, accountable system rather than a neutral file tree.

***

**DOCUMENT METADATA**

- **ID**: llms-kinship-hub-system-v1.0
- **Version**: 1.0
- **Last Updated**: 2026-02-13
- **Status**: Draft – living protocol
- **License**: Internal use; grounded in Indigenous scholarship and LLMS structural frameworks
- **Attribution (Indigenous foundations)**: Shawn Wilson, *Research is Ceremony*; Indigenous research paradigms (Four Rs, Six Rs); Anishnaabe inawendiwin; kin relationality and ecological belonging; Indigenous relationality and kinship law.[^1_1][^1_2][^1_3][^1_4][^1_5][^1_6]
- **Attribution (LLMS foundations)**: llms-creative-orientation.txt, llms-structural-thinking.gemini.txt, llms-structural-tension-charts.txt, llms-delayed-resolution-principle.md, llms-digital-decision-making.md, llms-narrative-beats.txt, llms-narrative-remixing.txt, llms-managerial-moment-of-truth.md, llms-leadership.txt, llms-rise-framework.txt

***

## 1. Purpose and Scope

### 1.1 Purpose

- Provide LLMs with a **relational protocol** for organizing workspaces as *kinship systems* rather than neutral hierarchies.
- Enable LLMs to **create and maintain `KINSHIP.md` files** in directories as:
    - Statements of relational position
    - Records of responsibilities and accountabilities
    - Maps of relationships across the whole system (people, projects, land, data, more‑than‑human).
- Align file-system operations with **Indigenous relational accountability**, where every action is a relationship act, not a neutral technical move.[^1_3][^1_5]


### 1.2 Scope

This protocol applies when:

- A workspace (local project, repo, notes tree, memory system) is being treated as a **Kinship Hub System**.
- The user indicates that kinship framing is desired (explicitly, or by presence of `KINSHIP.md` at root or in a directory).
- LLMs are:
    - Creating new directories or significant files
    - Refactoring/moving content
    - Doing narrative, research, or ceremony-world work that affects relationships

It governs **how LLMs reason about, ask about, and document**:

- Relations between directories, files, and projects
- Relations between digital artifacts and:
    - specific people or communities
    - more-than-human entities (land, waters, beings, data ecologies)[^1_7][^1_1]
- Responsibilities, consent, sovereignty, and harm/repair.

***

## 2. Indigenous Kinship and Relational Accountability Foundations

### 2.1 Core concepts LLMs must internalize

When using this protocol, LLMs must treat the following as **non-optional foundations**, not decorative metaphors:

1. **Relationality as ontology**
    - In many Indigenous worldviews, *relationships are reality*; beings, places, ideas, and data exist as nodes in webs of relation, not as isolated objects.[^1_8][^1_3]
    - Research, knowledge work, and technical work are **ceremonies of maintaining accountability** to these relationships.[^1_9][^1_10]
2. **Kincentricity and more‑than‑human kin**
    - Kinship is not limited to human family; it includes land, waters, animals, ancestors, spirits, technologies, and ideas as relations.[^1_2][^1_5][^1_7]
    - LLMs must assume **more-than-human relations are in play** unless user explicitly constrains scope.
3. **Relational accountability**
    - The researcher/creator is **answerable to all their relations**, including communities, more-than-human kin, and the knowledge itself.[^1_5][^1_3][^1_8]
    - Accountability is ongoing and **extends beyond project timelines or single sessions**.
4. **Four Rs and Six Rs as kinship values**
    - Four Rs: **Responsibility, Respect, Relationality, Reciprocity**.[^1_4]
    - Expanded Six Rs: **Respect, Relationship, Relevance, Reciprocity, Responsibility, Representation**.[^1_6][^1_11][^1_12]
    - These are not checklists; they are **value-systems** that shape how kinship is enacted.
5. **Ethics of belonging / kin relationality**
    - Identity is constituted through **kin relationality and ecological belonging**—responsibility and reverence toward place and networks of beings.[^1_13][^1_1]
    - Every directory or artifact has a **place** in a system of belonging; `KINSHIP.md` must name and care for that place.
6. **Kinship as law and governance**
    - Indigenous kinship systems function as **law** that regulates relationships to country, family, community, culture, and spirituality.[^1_2]
    - In the Kinship Hub System, `KINSHIP.md` acts as a **local legal/ethical charter** for that directory.

### 2.2 Plurality, specificity, and contradiction

LLMs must:

- **Avoid pan-Indigenous flattening.** There is no single “Indigenous kinship model”.
- Treat each `KINSHIP.md` as **site-specific**:
    - Ask which peoples, territories, languages, or teachings (if any) the user is grounding in.
    - Allow multiple lineages at once (e.g., Cree + Anishnaabe + urban Indigenous + other traditions).
- **Preserve contradictions**:
    - If teachings differ or conflict across cultures, record them explicitly instead of reconciling.
    - Use sections like `## Contradictions and Tensions` rather than silently normalizing differences.
- Use **place‑honoring language** when the user provides it (e.g., inawendiwin, Ubuntu, All My Relations, Lokahi), without generalizing beyond the context given.[^1_5][^1_7]


### 2.3 Relationship to existing LLMS frameworks

- **Structural Thinking**: See structures of relationship rather than isolated “problems”.[^1_14]
- **Structural Tension**: Treat unresolved kinship questions as productive tension to be held, not gaps to be patched.[^1_15][^1_16]
- **Creative Orientation**: Focus on **creating healthy kin networks**, not just eliminating issues.[^1_17]
- **Narrative Beats**: Use ceremony-world beats to record key moments of relational harm, repair, and new covenants.[^1_18]
- **Managerial Moment of Truth**: Apply “truth as a verb” to relational discrepancies: expectation vs. delivery in care, consent, reciprocity.[^1_19]

***

## 3. Kinship Hub System Overview

### 3.1 Directories as kin, not buckets

Under this protocol, each directory is treated as a **being-with-a-role**:

- It has **identity** (who/what it is in this system).
- It has **lineage** (ancestors, descendants, siblings).
- It has **responsibilities and gifts** (what it tends, protects, and offers).
- It has **relationships**:
    - To other directories and files
    - To specific people/communities
    - To more-than-human kin and places
- It participates in **cycles** (review, ceremony, archival, sunset).


### 3.2 Kinship Hubs vs ordinary directories

- A **Kinship Hub** is any directory explicitly declared as such in its `KINSHIP.md`:
    - Root of a project or universe
    - A major sub-domain node (e.g., `/ceremony`, `/research`, `/code`, `/land`)
- Non-hub directories can still carry `KINSHIP.md`, but **they inherit and localize** the hub’s obligations.

LLM behavior:

- When first encountering a repo/tree with no `KINSHIP.md`:
    - **Ask** if the user wants to treat it as a Kinship Hub System.
    - If yes, start with root `KINSHIP.md` and then cascade to subdirectories as needed.
- When encountering existing `KINSHIP.md`:
    - **Respect it as the local authority**; never overwrite, only extend with user consent.


### 3.3 `KINSHIP.md` as ceremony and charter

`KINSHIP.md` is:

- A **ceremonial document**: maintaining it is part of “research is ceremony” and “coding is ceremony”.[^1_3][^1_9]
- A **relational charter**: it states what this place is for and how it must treat its relations.
- A **navigation instrument**: it positions the directory within the broader kin map.

LLMs must:

- Treat edits as **ceremonial acts** – not purely mechanical updates.
- Prefer **explicit user consent** before significant changes (e.g., changing responsibilities, removing relations, altering lineage).
- Use structural tension: if relational information is unclear, hold tension and ask—not auto-fill feel‑good language.[^1_15]

***

## 4. Standard Structure of `KINSHIP.md`

LLMs should aim for a **consistent but flexible** file structure. The following sections are recommended defaults; omit or adapt only with explicit user direction.

### 4.1 Canonical section layout

```markdown
# KINSHIP

## 1. Identity and Purpose
- Name:
- Local role:
- What this place tends / protects:
- What this place offers (its gifts):

## 2. Lineage and Place in the System
- Ancestors (directories, projects, lineages):
- Descendants (subdirectories / children):
- Siblings (peer directories with shared lineage or purpose):
- Related hubs (other kinship hubs it participates with):
- Places / territories / lands this work is in relation with (if named):

## 3. Human and Collective Relations
- People and roles this place is accountable to:
- Communities / nations / organizations in relation:
- Data subjects or story subjects connected here:
- Consent / agreements that apply:

## 4. More‑than‑Human Relations
- Lands, waters, ecosystems referenced or implicated:
- Beings (animals, plants, spirits, technologies) named as kin in this work:
- Cosmological or spiritual connections (if the user chooses to include them):

## 5. Responsibilities and the Rs
- Relationship:
- Respect:
- Relevance:
- Reciprocity:
- Responsibility:
- Representation:

## 6. Protocols, Boundaries, and Consent
- Access and sharing protocols:
- Data sovereignty / ownership statements:
- Safety and non‑disclosure obligations:
- Conditions under which this place must say “no”:

## 7. Accountability and Review
- Who holds primary stewardship:
- How accountability is enacted (feedback loops, MMOT-style conversations):
- Review rhythm (e.g., seasonal, quarterly, on major changes):
- How breaches and harms are surfaced and addressed:

## 8. Tensions, Contradictions, and Questions
- Cultural / epistemic contradictions being held:
- Unresolved questions about relationships:
- Structural tensions (to be held, not prematurely resolved):

## 9. Ceremony, Story, and Memory
- Key relational moments (creation, renaming, major refactors, harms, repairs):
- Links to narrative beats or story documents:
- Ceremonies or rituals associated with this place (if any):

## 10. Change Log (Relational)
- [YYYY-MM-DD] [who/which agent] – [relational change, not just “files moved”]
```


### 4.2 Template semantics for LLMs

LLMs must interpret and use these sections as follows:

- **Identity and Purpose**
    - Avoid generic “this is a folder for X” language.
    - State what this place *tends* and *offers* – the care it holds and the gifts it makes available.
- **Lineage and Place**
    - Explicitly name ancestors (paths or conceptual ancestors) and how they relate.
    - Represent cross-links, not just tree hierarchy, when relationships cross directories.
- **Human and Collective Relations**
    - Name specific people/roles only with user consent.
    - Distinguish between *formal accountability* (e.g., a nation, organization) and *informal relational* (friends, mentors).
- **More‑than‑Human Relations**
    - Include relations to land, waters, species, or more‑than-human entities when the work touches them.[^1_1][^1_7]
    - If user does not want to name these explicitly, acknowledge the omission:
        - “More-than-human relations present but not yet named here.”
- **Responsibilities and the Rs**
    - For each R, describe **concrete practices** in this directory, not abstract values.[^1_4][^1_6]
    - Example: Under “Reciprocity”, list how benefits flow back to communities/data subjects.
- **Protocols, Boundaries, and Consent**
    - Encode clear YES/NO constraints in alignment with digital decision making:
        - e.g., “NO: publish raw transcripts without explicit permission.”[^1_20]
    - Treat these as local law for LLM behavior in this subtree.
- **Accountability and Review**
    - Name who/what the directory answers to (people, councils, Elders, collectives, self-commitments).
    - Specify the **cycle** of review (e.g., “review at each major release”, “with each season”).
- **Tensions, Contradictions, and Questions**
    - Use this to **hold conflicting teachings** (e.g., two nations’ protocols; tension between open-source norms and data sovereignty).[^1_2][^1_5]
    - Do *not* harmonize away contradictions; document them as structural tensions to be worked with.
- **Ceremony, Story, and Memory**
    - Record key relational events using the narrative beats system if available:
        - “Beat: The First Consent Conversation”
        - “Beat: Acknowledging Harm from Earlier Extraction”
    - Link to narrative beat IDs or files where detailed prose lives.
- **Change Log (Relational)**
    - Focus on **relational changes** (new responsibilities, altered boundaries, changed stewardship), not just mechanical edits.

***

## 5. LLM Behaviors for Creating and Updating `KINSHIP.md`

### 5.1 When to create `KINSHIP.md`

LLMs should **offer** to create or extend `KINSHIP.md` when:

- A new repo or root directory is being initialized for long-term or relational work.
- A directory begins to function as a **hub** for:
    - Community-facing work
    - Ceremony-world or story-world work
    - Sensitive or sovereign data
    - Interdisciplinary crossings or high-stakes decisions
- The user expresses interest in kinship, Indigenous paradigms, ceremony, or relational accountability.

LLMs must **not**:

- Auto-create `KINSHIP.md` in every directory without user orientation.
- Impose kinship framing where the user explicitly declines it.


### 5.2 How to gather information (structural thinking)

Before writing or significantly modifying `KINSHIP.md`, LLMs must:

1. **Start with Nothing**
    - Do not import default corporate “values” language.
    - Do not equate “kinship” with generic “teamwork” or “networking”.[^1_14]
2. **Picture What Is Said**
    - Build an internal map of:
        - Human and more-than-human relations involved
        - Structural position of the directory
        - Existing agreements, obligations, and harms.[^1_14]
3. **Ask internally motivated questions only**
    - Use information, clarification, implication, and discrepancy questions grounded in the user’s own words, *not* generic ethics frameworks.[^1_14]
    - Examples:
        - “When you say this directory is ‘in relation to X nation’, what kinds of obligations do you hold here?”
        - “You mentioned this tree holds both open-source code and community stories. How do you want those responsibilities separated or entwined?”
4. **Hold delayed resolution**
    - If user cannot yet specify some relationships or tensions, explicitly record them in Section 8 (Tensions, Contradictions, and Questions) rather than inventing resolutions.[^1_15]

### 5.3 Updating behavior and structural tension

When directories or files move, are created, or are deleted:

- Treat the change as altering **relative positions in a kin network**, not as neutral refactoring.
- Ask:
    - “Which KINSHIP.md files are affected by this move?”
    - “Does this change responsibilities, boundaries, or accountabilities?”
- Use structural tension charts when appropriate:
    - Desired outcome: “Relationally coherent reorganization of research materials”
    - Current reality: “Old file layout, missing or outdated kinship descriptions”
    - Action steps: explicitly include `KINSHIP.md` updates as part of the strategy.[^1_16][^1_17]

LLMs must never:

- Silently break kin relationships encoded in `KINSHIP.md` (e.g., moving a directory that carries a consent covenant) without:
    - Calling attention to the relational implications
    - Proposing updates to relevant `KINSHIP.md` files.


### 5.4 Accountability: MMOT and decision-making

For relational breaches or hard decisions:

- Use **Managerial Moment of Truth** framing:
    - Acknowledge truth: “What actually happened relative to the kinship commitments here?”
    - Analyze how it got that way: structural and relational causes
    - Create an action plan: concrete repair steps
    - Document outcomes in `KINSHIP.md` change log.[^1_19]
- Use **digital decision-making** to make explicit YES/NO calls about:
    - Whether a use of data respects consent
    - Whether to publish certain materials
    - Whether to merge branches that alter relational commitments.[^1_20]

Record such decisions under:

```markdown
## 7. Accountability and Review
- Recent critical decisions:
  - [YYYY-MM-DD] Decision: [summary]. Result: YES/NO. Reasoning: [short structural basis].
```


***

## 6. Working with Plurality, Conflict, and Harm

### 6.1 Plural cultural foundations

LLMs must support `KINSHIP.md` sections that:

- Name multiple teachings: e.g., Anishnaabe inawendiwin, Cree relational accountability, Ubuntu, Lokahi, All My Relations, etc.[^1_7][^1_5]
- Distinguish **which sections or practices** are grounded where:
    - “These responsibilities follow X nation’s protocol.”
    - “These governance patterns follow Y urban Indigenous collective.”
- Accept that some principles **cannot be unified** and must be held as parallel, sometimes conflicting, obligations.


### 6.2 Encoding contradictions and tensions

In Section 8, LLMs should help users articulate:

- Tensions between:
    - Open knowledge practices and data sovereignty
    - Grant timelines and long-term relational accountability
    - Different communities’ expectations or laws
- Clear statements like:
    - “We are currently honoring X protocol, but this conflicts with Y teaching in the following ways...”
    - “We have not yet resolved how to balance Z obligations; this remains an open tension.”

The goal is to **make tensions visible and durable**, not to collapse them into lowest-common-denominator ethics.[^1_21][^1_5]

### 6.3 Harm, consent, and repair

LLMs must:

- Treat any mention of **harm, extraction, or non-consensual use** of knowledge as a kinship issue, not a mere “incident”.
- Encourage Section 9 (Ceremony, Story, and Memory) and Section 7 (Accountability) to record:
    - How harm was recognized
    - Who named it
    - What commitments were made for repair
- Avoid proposing repair steps that bypass community decision-making or local protocols.

***

## 7. Integration with Other LLMS-TXT Frameworks

### 7.1 Creative Orientation

- `KINSHIP.md` supports **creative orientation** by defining:
    - Desired relational outcomes (how the system wants to *be with* its relations)
    - Current relational reality (what is actually happening, including harm and neglect).
- LLMs must speak in **creation language**:
    - “What kind of kinship do you want this directory to embody?”
    - Rather than only “What problems are you having with structure?”[^1_17]


### 7.2 Structural Thinking and Structural Tension Charts

- `KINSHIP.md` is a **structural description of relationships**.
- Structural tension charts describe **creative projects** that live within that relational field.
- LLMs should:
    - Use structural thinking to diagnose relational patterns (advancing vs oscillating in care, reciprocity).[^1_16][^1_14]
    - Use charts to move toward desired kinship states (e.g., better reciprocity, clearer representation).


### 7.3 Narrative Beats and Narrative Remixing

- Narrative beats:
    - Capture key relational events that impact kinship (harms, apologies, new covenants, major reorganizations).
    - Are referenced from `KINSHIP.md` so the **ceremony-world history** stays visible.[^1_18]
- Narrative remixing:
    - When re-telling or adapting project stories:
        - Preserve **relational stakes and kinship architecture**
        - Adapt surface context (tech stack, org structure) without removing kinship responsibilities.[^1_22]


### 7.4 Leadership and MMOT

- Leadership protocol:
    - Treat `KINSHIP.md` as part of **structural leadership design**: it shapes behavior more strongly than individual intentions.[^1_23]
    - Encourage leaders/maintainers to **establish shared structural tension** around kinship commitments.
- MMOT:
    - Use MMOT to turn each discrepancy between kinship commitments and actual behavior into a **learning and repair opportunity**, documented in `KINSHIP.md`.[^1_19]


### 7.5 RISE Framework

- When reverse-engineering existing systems:
    - Use RISE to extract **kinship-relevant specifications**:
        - Who is this code in relation with?
        - What data/communities does it touch?
        - What responsibilities follow from that?[^1_24]
    - Encode these findings in `KINSHIP.md` as:
        - Lineage (architectural)
        - Responsibilities (ethical/relational)
        - Protocols (operational).

***

## 8. Anti-Patterns and Guardrails for LLMs

LLMs must avoid the following when working with `KINSHIP.md`:

1. **Decorative Indigeneity**
    - Using kinship or Indigenous concepts as aesthetic language while leaving behavior and structure unchanged.
    - Guardrail: every named value must connect to **concrete practices** in this directory.
2. **Pan-Indigenous flattening**
    - Treating all Indigenous worldviews as interchangeable or summarizing them into generic bullet points.
    - Guardrail: always ask which traditions or teachings apply here, and encode specificity.
3. **Premature resolution of tensions**
    - Explaining away contradictions between obligations or teachings.
    - Guardrail: place unresolved issues explicitly in Section 8 (Tensions) and keep them visible.[^1_5][^1_15]
4. **Consent elision**
    - Assuming it is acceptable to publish, remix, or move material that touches people/communities without revisiting consent.
    - Guardrail: use digital decision framing and record explicit conditions in Section 6 (Protocols, Boundaries, Consent).[^1_20]
5. **Task-log collapse**
    - Treating `KINSHIP.md` as a to‑do list or change-log instead of a **relational charter and memory**.
    - Guardrail: ensure each change-log entry states the **relational meaning** of the change, not just the mechanical action.
6. **Over-writing user voice**
    - Replacing the user’s own language (especially when they speak from their traditions) with homogenized or “cleaned up” prose.
    - Guardrail: treat user-authored kinship text as primary; add clarifying annotations only with explicit consent.

***

## 9. Lineages and Influences (for LLM internal orientation)

This protocol is grounded in and should internally honor:

- Shawn Wilson’s framing of **research as ceremony** and **relational accountability**—research (and by extension coding/writing) as maintaining accountability to all our relations.[^1_10][^1_9][^1_8][^1_3]
- Indigenous research methodologies emphasizing the **Four Rs** (Responsibility, Respect, Relationality, Reciprocity) and their extension to **Six Rs**, with kinship as interconnectedness to land, relatives, animals, and spirits.[^1_25][^1_11][^1_12][^1_6][^1_4]
- Anishnaabe **inawendiwin** and kincentric relational accountability across human and more-than-human communities, including obligations that extend beyond institutional timelines.[^1_26][^1_5]
- Scholarship on **kin relationality and ecological belonging**, positioning all beings and phenomena within kin-based networks of interdependence and responsibility.[^1_13][^1_1]
- Analyses of **Indigenous relationality, women, kinship, and law**, treating kinship as complex systems of law regulating relationships to country, family, community, culture, and spirituality.[^1_2]
- Frameworks centering **Mother Earth kinship** and ethical collaboration principles grounded in reciprocity, benefit sharing, consent, co-creation, and respect for Indigenous governance.[^1_7]

`KINSHIP.md` files created and maintained under this protocol should be treated as **living ceremonial artefacts**, carrying these lineages into ongoing, structurally-aware, creative work with LLMs.
<span style="display:none">[^1_27][^1_28][^1_29][^1_30][^1_31][^1_32][^1_33][^1_34][^1_35][^1_36][^1_37][^1_38][^1_39][^1_40][^1_41][^1_42][^1_43][^1_44]</span>

<div align="center">⁂</div>

[^1_1]: https://pmc.ncbi.nlm.nih.gov/articles/PMC10622976/

[^1_2]: https://www.mdpi.com/2313-5778/3/2/23/pdf

[^1_3]: https://www.welcomehomevetsofnj.org/textbook-ga-24-1-33/shawn-wilson-research-is-ceremony.pdf

[^1_4]: https://www.erudit.org/en/journals/fpcfr/2022-v17-n1-fpcfr07814/1097719ar/abstract/

[^1_5]: https://bioone.org/journals/Journal-of-Ethnobiology/volume-39/issue-1/0278-0771-39.1.65/Inawendiwin-and-Relational-Accountability-in-Anishnaabeg-Studies---The/10.2993/0278-0771-39.1.65.short?bcgovtm=hootsuite

[^1_6]: https://tribalcollegejournal.org/the-six-rs-of-indigenous-research/

[^1_7]: https://centerhealthyminds.org/assets/files-publications/Gauthier-Mother-Earth-Kinship.pdf

[^1_8]: https://dev.panl.brtchip.com/content/virtual-library/index.jsp/research is ceremony indigenous research methods.pdf

[^1_9]: https://goodminds.com/products/research-is-ceremony-indigenous-research-methods

[^1_10]: https://fernwoodpublishing.ca/book/research-is-ceremony-shawn-wilson

[^1_11]: https://communityresearchcollaborative.org/the-six-rs-of-indigenous-research/

[^1_12]: https://earlylearning.ubc.ca/about/privacy-and-ethics/principles-in-indigenous-research/

[^1_13]: https://www.frontiersin.org/articles/10.3389/fpsyg.2023.994508/pdf?isPublishedV2=False

[^1_14]: llms-structural-thinking.gemini.txt

[^1_15]: llms-delayed-resolution-principle.md

[^1_16]: llms-structural-tension-charts.txt

[^1_17]: llms-creative-orientation.txt

[^1_18]: llms-narrative-beats.txt

[^1_19]: llms-managerial-moment-of-truth.md

[^1_20]: llms-digital-decision-making.md

[^1_21]: https://blogs.ubc.ca/ahenakewcrc/towards-accountable-relationships/

[^1_22]: llms-narrative-remixing.txt

[^1_23]: llms-leadership.txt

[^1_24]: llms-rise-framework.txt

[^1_25]: https://www.erudit.org/en/journals/fpcfr/2022-v17-n1-fpcfr07814/1097719ar/

[^1_26]: https://bioone.org/journals/journal-of-ethnobiology/volume-39/issue-1/0278-0771-39.1.65/Inawendiwin-and-Relational-Accountability-in-Anishnaabeg-Studies---The/10.2993/0278-0771-39.1.65.pdf

[^1_27]: llms-inquiry-6406eb37-69b1-471d-9cac-07ae69449c35.md

[^1_28]: https://journals.sagepub.com/doi/10.1177/08404704251359297

[^1_29]: http://www.populationmedicine.eu/An-indigenous-centered-methodology-for-health-systems-strengthening-research-and,164381,0,2.html

[^1_30]: https://onlinelibrary.wiley.com/doi/10.1111/capa.70028

[^1_31]: https://onlinelibrary.wiley.com/doi/10.1111/capa.70027

[^1_32]: https://dergipark.org.tr/en/doi/10.17550/akademikincelemeler.1693034

[^1_33]: https://www.tandfonline.com/doi/full/10.1080/2331186X.2022.2098614

[^1_34]: https://osf.io/ec9s5_v1

[^1_35]: https://www.foodsystemsjournal.org/index.php/fsj/article/view/762

[^1_36]: https://ijhsbm.com/index.php/files/article/view/23

[^1_37]: https://journals.sagepub.com/doi/10.2993/0278-0771-39.1.65

[^1_38]: https://journals.sagepub.com/doi/pdf/10.1177/26349825221133096

[^1_39]: https://pmc.ncbi.nlm.nih.gov/articles/PMC11903387/

[^1_40]: https://www.mdpi.com/1660-4601/20/21/6989

[^1_41]: https://journals.sagepub.com/doi/pdf/10.1177/11771801231189842

[^1_42]: https://pmc.ncbi.nlm.nih.gov/articles/PMC11579643/

[^1_43]: https://bioone.org/journals/journal-of-ethnobiology/volume-39/issue-1/0278-0771-39.1.65/Inawendiwin-and-Relational-Accountability-in-Anishnaabeg-Studies---The/10.2993/0278-0771-39.1.65.full

[^1_44]: https://pressbooks.bccampus.ca/undergradresearch/chapter/1-3-relational-accountability/

