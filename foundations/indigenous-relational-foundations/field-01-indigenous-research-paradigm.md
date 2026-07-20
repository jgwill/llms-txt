# Field 01 — Indigenous Research Paradigm / Research as Ceremony

**Sources:** `wilson-2008`, `kovach-2021`, `smith-2021`, `absolon-2011`, `chilisa-2020`, `kirkness-barnhardt-1991`

---

## What the literature establishes

**Shawn Wilson (2008), *Research Is Ceremony: Indigenous Research Methods*** (Fernwood, ISBN 9781552662816) — Wilson, Opaskwayak Cree, describes a research paradigm shared among Indigenous scholars in Canada and Australia. Its structure is the one this portfolio uses:

- **Ontology** — reality is relationships; entities exist in webs of relation rather than as isolated objects
- **Epistemology** — knowledge is relational and shared, not individually held
- **Axiology** — the guiding value is **relational accountability**
- **Methodology** — method must itself honour and maintain those relationships

Wilson's formulation: *Indigenous researchers develop relationships with ideas in order to achieve enlightenment in the ceremony that is Indigenous research. Indigenous research is the ceremony of maintaining accountability to these relationships.*

The portfolio's four-quadrant retraining tables (Western Default → Indigenous Reorientation across epistemology, ontology, axiology, methodology) are a **faithful and recognisable rendering of Wilson's structure.** This is the best-grounded part of the portfolio.

**Margaret Kovach (2021), 2nd ed.** (UTP, ISBN 9781487525644) — Kovach (Nêhiyaw and Saulteaux, Pasqua First Nation) grounds Indigenous methodology in **tribal-specific epistemology**. Methodology emerges from a particular nation's knowledge system, language, and place. This is the single most important constraint on this portfolio: Kovach's position is not that there is *an* Indigenous methodology, but that methodologies are nation-rooted.

**Linda Tuhiwai Smith (2021), 3rd ed.** (Zed/Bloomsbury, ISBN 9781786998125) — the foundational critique of research as an instrument of colonisation, and the source of the standard by which "decolonizing" claims get judged. Smith's decolonizing research is accountable to Indigenous communities' *own* agendas and control — not a methodological style a researcher adopts unilaterally.

**Kathleen Absolon (2011/2022), *Kaandossiwin*** (Fernwood) — Anishinaabe framing of Indigenous re-search as wholistic, relational, interdependent with Indigenous philosophies and ways of life.

**Bagele Chilisa (2020), 2nd ed.** (SAGE, ISBN 9781483333472) — establishes that "Indigenous research methodologies" is a **plural, global field**, not one paradigm. Useful counterweight to any single-frame presentation.

---

## Attribution correction: the "Rs"

The portfolio refers to **"Wilson's 3R"** and to "the Four Rs / Six Rs of Indigenous research (Responsibility, Respect, Relationality, Reciprocity, Relevance, Representation)."

The Four Rs — **Respect, Relevance, Reciprocity, Responsibility** — originate with **Kirkness & Barnhardt (1991)**, *Journal of American Indian Education* 30(3), 1–15 (ERIC EJ438242), written in response to First Nations students' attrition in post-secondary institutions. Wilson works within and extends this lineage; he did not originate it.

`docs/relational-science.md` currently cites the Rs without attribution. `llms-inquiry-medicine-wheel-...md` attributes them to Wilson. **Both should cite Kirkness & Barnhardt.** This is a small, cheap, entirely fixable accuracy improvement — and in a document about relational accountability, getting attribution right is not cosmetic.

---

## The constraint this field places on the portfolio

Wilson's relational accountability is accountability **to actual, named, living relations** — specific people, a specific community, a specific territory, specific ancestors. It is a standing obligation held by a researcher who is known to and answerable to those relations.

It is therefore not:
- a property of a document
- a score computed over a data structure
- something an AI agent can satisfy on a researcher's behalf

The repository already knows this. `upgrade/260316/05-synthesis-context7-medicine-wheel.md` records: *"AI-conducted research cannot satisfy Wilson's relational accountability. The transformation snapshot returned `overallValid: false`."*

That sentence is correct, well-reasoned, and should be surfaced in `docs/`, not left in an upgrade log. It is the most credible thing the repository says about itself.

---

## Engineering implications

- Cite Kirkness & Barnhardt (1991) for the Four Rs wherever they appear.
- Where the portfolio says "Indigenous paradigm," check whether it means Wilson's specific paradigm (citable) or a general Indigenous worldview (not a thing — see Kovach, Chilisa).
- `computeWilsonAlignment` needs either a rename or a prominent docstring stating what it does and does not measure. See `gap-analysis.md` GAP-03.
- Wilson, Kovach, Smith, Absolon and Chilisa should be cited **by name and nation** in the docs that rely on them. Currently the docs cite internal `llms-*` files as their "Key Sources" — the portfolio cites itself where it should cite the literature.
