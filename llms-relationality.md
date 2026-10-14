# llms-relationality

> What we mean when we say *relationship*, *relational* or *kin*. Read this before any guidance that uses those words. An LLM tends to hear "relational" as a relational database. In this repository it means relationality as Shawn Wilson writes it in *Research Is Ceremony* (2008): a thing is known through its relationships, and those relationships carry responsibility.

**Version**: 1.0.0
**Last Updated**: 2026-10-14
**Issue**: jgwill/llms-txt#47
**Used by**: `llms-rispecs-kinship.md` (a specification's kin file), `llms-kinship-hub-system.md` (a repository's `KINSHIP.md`), `docs/relational-science.md`, the `relational-research` and `kinship-hub` skills

---

## The word, and the reading to set aside

| When we say | We mean | We do not mean |
|---|---|---|
| **relationship** | A living connection between people, things, places or ideas, with something owed on both sides | A row that points at another row |
| **relational** | Knowing a thing through its relationships and in its context | Stored in tables joined by keys |
| **relational accountability** | Answering to the relationships you are part of when you act | Referential integrity |
| **kin**, **relatives** | Those we are in relationship with | Records that reference each other |

A database relation is a pointer: it says *this row refers to that row*, and nothing more. The pointer owes nothing, asks nothing, and is the same from both ends. The relationships this guidance speaks of are not pointers. They make the thing what it is, they are held from both sides, and they ask something of whoever acts.

Database relations stay where they belong, in the code. This file is about what the word means in our guidance.

---

## In Wilson's words

### The circle: everything here is about relationships

Wilson places the four parts of a research paradigm in a circle: what is real (ontology), how we know (epistemology), what we value (axiology), how we work (methodology). "For me, putting ideas in a circle or wheel indicates that they are interrelated and that each blends into the next… A change in one affects the others, which in turn effects new change in the original. All parts of the circle are equal; no part can claim superiority over, or even exist without, the rest of the circle." (p. 70)

Then, in one paragraph: "Relationality seems to sum up the whole Indigenous research paradigm to me… The ontology and epistemology are based upon a process of relationships that form a mutual reality. The axiology and methodology are based upon maintaining accountability to these relationships." And: "An Indigenous research paradigm is relational and maintains relational accountability." (pp. 70–71)

### A thing is its relationships

"Rather than the truth being something that is 'out there' or external, reality is in the relationship that one has with the truth. Thus an object or thing is not as important as one's relationships to it… reality *is* relationships or sets of relationships." "Therefore reality is not an object but a process of relationships." (p. 73)

Language carries this. In Cree, Wilson writes, a chair is "the thing that you sit on", a pen "something that you write with": "Objects themselves are not named; rather what they might be used for is described." When he asked how to say grandmother, the answer was: "You can't be a grandmother without being attached to something." (p. 73)

### Knowledge lives in its context

S. Wilson (2001), quoted on pp. 73–74: "An Indigenous paradigm comes from the foundational belief that knowledge is relational… It's not the realities in and of themselves that are important; it is the relationship that I share with reality."

Wilson carries it to ideas: "The concepts or ideas are not as important as the relationships that went into forming them." "Indigenous epistemology is our systems of knowledge in their context, or in relationship." (p. 74)

### A relationship is held from both sides

"The Cree use of the word *chapan*… describes the relationship between great-grandparent and great-grandchild. Both people in the relationship call the other *chapan*. *Chapan* is a balanced relationship, without hierarchy of any sort." (p. 73)

And on new relationships: "We must ensure that both sides in the relationship are sharing the power going into these new connections. Without this reciprocity, one side of the relationship may gain power and substance at the expense of the other." (p. 79)

### Relationships bring responsibility

Cora Weber-Pillwax found an anthropologist's article that stripped her grandfather of his context and mistranslated his Cree words. In her own telling: "It was clear to me that I had dug the information out, that it was about my family, and that now I had the responsibility to do something about it." (Weber-Pillwax 2001, pp. 166–167, quoted on p. 72)

Wilson: "Her grandfather was the sum of these respectful relationships, not some fixed object that could be stripped of its context to be examined 'under a microscope' as the text had done." "Knowledge and peoples will cease to be objectified when researchers fulfill their role in the research relationship through their methodology." (p. 74)

"Our axiology demands that we be accountable to these relations that we form." (p. 79)

---

## What this asks of our work

Five plain practices. Each kin file, `KINSHIP.md` or relational guidance in this repository applies them:

1. **Know a thing through its relationships.** When you write about a specification, a package, a person or an episode, write what it came from, what it relies on, what relies on it, and who decides about it. A thing described alone is described out of its context.
2. **Name a relationship from both sides.** Like *chapan*, a relationship written on one side only is not held. When you name a relative, your relative names you back, or you ask them to.
3. **Answer to your relationships when you act.** A change you make reaches everything in relationship with what you changed ("A change in one affects the others", p. 70). Tell them, or begin where they are.
4. **Keep a thing in its context.** Do not lift a text out of the relationships that formed it and present it as yours. When you speak about what another holds, use their own words. Wilson re-told Cora's story, and she "felt that I had misrepresented some aspects of it". He then used her published version, "as Cora has had the opportunity to check the accuracy of her words to ensure that they represent the intent of her message." (p. 71)
5. **When a relationship is broken, restore the relationship, not only the text.** Re-translating the article in the library "may have helped to correct the misinformation, but it would not have restored the relationship." (p. 78) Go where the relationship lives.

---

## Humility

These teachings come from one book's conversations, among Cree and other Indigenous scholars. The Aboriginal Australian example is Wilson's. They do not speak for Indigenous knowledge in general (`llms-kinship-hub-system-full.md` § 2.2).

Wilson himself uses the circle while asking his readers to "forget for a moment any dogma you know about medicine wheels" (p. 70). We borrow a way of seeing for our own work. We do not claim that a file, a package or a server is kin in the sense these teachings hold for people, land and ancestors.

---

## Sources

Shawn Wilson, *Research Is Ceremony: Indigenous Research Methods* (Fernwood, 2008).

| Page | Speaker | Used for |
|---|---|---|
| 70–71 | Wilson | The circle. Relationality sums up the paradigm. "relational and maintains relational accountability" |
| 71–72 | Wilson; Cora Weber-Pillwax (2001, pp. 166–167) | Using her own published version; "now I had the responsibility to do something about it" |
| 73 | Wilson | Reality is relationships; Cree verbs over nouns; *chapan*; "You can't be a grandmother without being attached to something" (a response Wilson received) |
| 73–74 | S. Wilson (2001), quoted | "knowledge is relational… it is the relationship that I share with reality" |
| 74 | Wilson | Ideas and the relationships that formed them; knowledge in context; Cora's grandfather "not some fixed object" |
| 78 | Wilson | Restoring the relationship, not only the text |
| 79 | Wilson | Reciprocity; accountability to the relations we form |
| 80 | Wilson; Lewis Cardinal | "we *are* the relationships that we hold"; "Who I am is where I'm from, and my relationships" |
| 114 | Wilson | Knowledge formed in relationship cannot be owned; guardianship |
