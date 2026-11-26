# rise-framework

The RISE framework drawn as a model. Its specification is the framework text, [`llms-rise-framework.txt`](../../llms-rise-framework.txt) (2.3.0). This folder holds its drawings, as the section *Toward 3.0: Model-Driven Specification* asks of a new specification. A person and an agent discuss the framework on this drawing, and an agent navigates it to see how the parts of RISE relate.

| File | What it holds |
|---|---|
| `rise-framework.sysdf.json` | the system: the drawings that belong together |
| `rise-framework.erdf.json` | the ERD: 15 entities the text names and 18 relationships, from a repository and its topics to the system, its drawings and the capability a system draws |
| `rise-framework.erd.mmd` | the ERD rendered by the loom as Mermaid (`render_diagram`, format `mermaid`) |
| `rise-framework.kin.md` | its relatives, and what each relationship asks of us |

Attributes marked *proposed* in the ERD are not in the RISE text yet: `Drawing.role` and `Drawing.executed` (jgwill/smcraft#35), the decision-model kind (jgwill/smcraft#32), the `plugin` capability kind (jgwill/medicine-wheel#181).

**Open it on the canvas:** `set_project_file` on `rise-framework.sysdf.json` with the stateloom MCP, then `show`. **Check it:** `check_system` (0 errors, 0 warnings on 2026-11-26). **Render it again** after a change to the ERD: `render_diagram` with format `mermaid`, then replace the block below.

```mermaid
erDiagram
    Repository ||--o{ Topic : "holds in rispecs/"
    Repository ||--o{ Prototype : "holds"
    Repository ||--o{ Capability : "states"
    Prototype ||--o{ ReverseEngineering : "is read in"
    Topic ||--|| ReverseEngineering : "R · begins with"
    Topic ||--|| Intent : "I · names its intent in"
    Topic ||--o{ KinFile : "I · keeps its relatives in"
    KinFile ||--o{ KinRelation : "lists"
    Topic ||--o{ Specification : "S · is specified in"
    Specification ||--o{ CreativeAdvancementScenario : "tells its usage as"
    Topic ||--|| System : "S · is drawn by"
    System ||--o{ Drawing : "lists"
    Drawing ||--|| CreativeAdvancementScenario : "backs, when a sequence"
    System }o--|| Capability : "draws"
    Capability }o--o{ Specification : "is specified in"
    Topic ||--o{ Export : "E · is taken up through"
    Export }o--o{ Episode : "is recorded in"
    Topic ||--|| Status : "↺ is kept true in"
    Repository {
        string slug PK "owner/repo"
    }
    Prototype {
        string path PK "where the code lives"
        string repository FK
    }
    Topic {
        string path PK "rispecs/<topic>/"
        string repository FK
        string status "its row in rispecs/README.md"
    }
    ReverseEngineering {
        string path PK "01-reverse-engineer.md"
        string topic FK
        string prototype FK
    }
    Intent {
        string path PK "02-intent.md"
        string topic FK
        string desiredOutcome "what will exist"
        string currentReality "what is true now"
    }
    KinFile {
        string path PK "<topic>.kin.md"
        string topic FK
    }
    KinRelation {
        string kinFile FK
        string relative "a file, package, repository, person or episode"
        string kind "came from | we rely on | relies on us | walks beside | holds a decision"
        string asks "what the relationship asks of the agent"
    }
    Specification {
        string path PK
        string topic FK
        string form "master | part | whole | rispec"
    }
    CreativeAdvancementScenario {
        string name PK
        string specification FK
        string sequence FK "the sequence drawing that backs it, when there is one (jgwill/llms-txt#44)"
    }
    System {
        string path PK "<topic>.sysdf.json"
        string topic UK, FK "one system per topic"
        string capability FK "the capability it draws (2.3.0)"
    }
    Drawing {
        string path PK
        string system FK
        string kind "erdf | smdf | sqdf | dmdf (proposed, jgwill/smcraft#32)"
        string role "proposed, jgwill/smcraft#35: unique in the system, what a person calls it"
        boolean executed "proposed, jgwill/smcraft#35: the Factory runs it, so the drawing is the definition"
    }
    Capability {
        string address PK "miadi-capability://<owner>/<repo>/<kind>/<name>"
        string repository FK
        string kind "package | cli | skill | decision | app; plugin proposed (jgwill/medicine-wheel#181)"
    }
    Export {
        string path PK "NN-export.md"
        string topic FK
    }
    Episode {
        string address PK "miadi-chronicle://<n>"
    }
    Status {
        string path PK "STATUS.md"
        string topic FK
    }
```

**Status:** drawn 2026-11-26 from the text at 2.3.0, discussed on jgwill/llms-txt#49. A change to the text's entities is a change to this drawing, made in the Return.
