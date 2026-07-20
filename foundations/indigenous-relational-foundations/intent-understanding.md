# Intent Understanding — Indigenous Relational Foundations

**Packet:** `indigenous-relational-foundations` · **Date:** 2026-07-20

---

## Why this packet exists

This repository publishes, at llms.jgwill.com and through eighteen npm packages, a body of work that claims to operate within an Indigenous research paradigm. It invokes Shawn Wilson, Elder Albert Marshall's Etuaptmumk, the Medicine Wheel, OCAP®, and Seven Generations. It carries a self-authored Indigenous Knowledge Stewardship License naming the Lakota and Mani-Utenam peoples as origin communities. And it advances one specific synthesis claim, stated in bold in `docs/indigenous-research-paradigm.md`:

> **Structural Dynamics IS Ceremonial Technology.**

The work is about to be proposed upstream as a pull request. Before that happens, the claims need to be checked against the published literature — and the check needs to be honest enough to be uncomfortable.

The structural risk is precise. A body of work whose entire thesis is *relational accountability* is uniquely damaged by unaccountable citation. If this portfolio invokes OCAP® in a way FNIGC would not recognise, or presents a pan-Indigenous composite as a coherent Indigenous paradigm, the failure is not academic sloppiness — it is a performative contradiction. The work would be doing the thing it names as the anti-pattern.

Notably, this repository already names that anti-pattern itself. `docs/indigenous-research-paradigm.md` lists **"Pan-Indigenous Flattening — treating all Indigenous worldviews as interchangeable"** as anti-pattern #5. This packet's central finding is that the document listing that anti-pattern violates it in its own opening table.

---

## Audience

1. **The authors** — so they can position their own work accurately and decide for themselves what to claim. This packet does not tell them what they may say. It tells them what the literature says, and what conditions the relevant communities and scholars describe as appropriate.
2. **Upstream maintainers and PR reviewers** at `jgwill/llms-txt`, who need to know what they would be merging.
3. **Future agents and contributors** who will otherwise inherit these claims as settled and propagate them further into `mia-code-server`, `medicine-wheel`, and the published npm packages.
4. **Any Indigenous scholar, knowledge keeper, or community member** who encounters this work and asks whether it was done carefully.

---

## What this packet explicitly does NOT do

It does not assess anyone's identity, ancestry, kinship, community relationships, or right to particular knowledge. It has no basis for that and will not speculate. The authors may hold relationships that fully authorize work this packet flags as risky — and if so, the remedy is usually to *state the relationship*, not to change the practice.

What this packet establishes is narrower and checkable: **what the published literature says these concepts are, and under what conditions the relevant communities and scholars describe their use as appropriate.**

---

## Current reality

- The core synthesis claim is asserted as identity ("IS"), in bold, with no supporting citation anywhere in the repository.
- The comparison table backing it places concepts from at least five distinct and geographically unconnected peoples — Mi'kmaq (Etuaptmumk), Lakota and Innu (per the LICENSE), Cree/Ojibwe (wétiko/windigo, spelled "Wetigo"), and Polynesia (*mana*) — into a single column labelled "Indigenous Paradigm Equivalent."
- `OCAP` appears as a computable type (`OCAPFlags`), an audit function (`auditOcapCompliance`), and an MCP tool (`ocap_compliance_checker`), across a suite governed by no First Nation. OCAP® is a registered trademark of FNIGC and is First Nations–specific by design.
- `computeWilsonAlignment` renders relational accountability as a numeric score.
- The IKSL names origin communities and then records `"knowledge_keepers": ["To be designated by community"]` and `Contact: [Community contact to be established]`. The governance it asserts is not yet operational.
- No named Indigenous community partner, knowledge keeper, or Elder appears anywhere in the repository as a participant in or reviewer of this work.
- Simultaneously: `KINSHIP.md` already flags that "the OCAP isn't clear" on who owns the Medicine Wheel Development Suite, and `upgrade/260316/05-synthesis-context7-medicine-wheel.md` already records that AI-conducted research **cannot** satisfy Wilson's relational accountability (`overallValid: false`). **The repository is already partly aware of its own gaps.** That self-awareness is real and should be surfaced, not buried under confident prose in `docs/`.

---

## Desired outcome

A portfolio whose public claims are ones its authors can defend in front of the scholars and communities it cites — where every borrowed concept is attributed to the nation it comes from, every governance term is used as its holders define it, and every connection that is currently analogy is *labelled* as analogy under active exploration.

Concretely: a PR that an upstream maintainer can merge without inheriting an indefensible claim, and that an Indigenous scholar reading it would recognise as careful rather than extractive.

---

## Structural tension

**Current reality:** A rigorous, genuinely original body of structural-dynamics work is wrapped in an Indigenous framing that is asserted rather than established, composed across nations rather than grounded in one, and governed by a license whose community authority does not yet exist.

**Desired outcome:** The same body of work, published with its Indigenous engagement described at the strength it has actually earned — which is *early, sincere, exploratory, and unratified* — so that the technical contribution stands on its own and the relational contribution can be built honestly over time.

**The resolving action is subtraction, not addition.** Almost every finding in `gap-analysis.md` is resolved by weakening a claim, naming a lineage, or adding an honest caveat. Very little requires new work. The portfolio does not become smaller by doing this; it becomes *credible*, which is the only condition under which its Indigenous framing could ever be more than decoration.

---

## Decisions this packet supports

1. Whether to publish the "Structural Dynamics IS Ceremonial Technology" claim as-is, reword it, or hold it back. *(→ GAP-04)*
2. Whether to keep `OCAP` in the published npm package API surface or migrate to CARE. *(→ GAP-02)*
3. Whether `computeWilsonAlignment` can honestly keep that name. *(→ GAP-03)*
4. How to describe the Medicine Wheel architecture — as a nation-specific teaching applied, or as a Four Directions structure the authors are working with. *(→ GAP-01)*
5. Whether the IKSL should be presented as an operative license or as a stated aspiration pending community designation. *(→ GAP-09)*
6. Whether "alignment with Abundant Intelligences" is a claim this repository can currently make. *(→ GAP-08)*

---

## What success makes easier downstream

- A PR conversation that is about the work, not about whether the work is appropriative.
- A defensible academic positioning for the article-to-book trajectory tracked in `/workspace/JGWILL.md`.
- A clear, honest starting point if and when the authors seek relationships with named communities — because "here is exactly what we claimed and how carefully we bounded it" is a far better opening than "here is what we already published in your name."
- Reduced blast radius: the same claims are propagating into `mia-code-server` (71 rispecs), `jgwill/medicine-wheel` (7 packages), and the published `@medicine-wheel/*` npm suite. Correcting them here corrects them at the source.
