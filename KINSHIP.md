# KINSHIP - llms-txt

## LLM Read this
### How to deduce gitub repos from path ?

* in example `/workspace/repos/miadisabelle/mia-context7` the repo is `miadisabelle/mia-context7`
* Our jgwill/workspace (A Devops system), the pattern is as soon as we monitor with our Miadi-Webhooking system, the repo gets cloned in `/workspace/repos/<owner>/<repo>` and if a branch/PR is being developped, they are ofter checkout in that path.
* if cloned path is specified, the repo might also be in the workspace/repos but is worked on in that path for now, we plan to fully migrate to jgwill/workspace in the near future as an anthology to "Copilot Workspace" being deveopped in repo `miadisabelle/mia-code-server` that will influence conceptually and will provide sets of extensions to probably create `jgwill/jgwill-code-server` that the `jgwill-workspace` will use, this is said here so you know where we are going with this and that should point out that we might change how the `jgwill/src` are worked on, for now, it is a good place to be in the germination phase and as the vision gets assimilated and completed, migration toward a repo and being maintainted by jgwill/workspace is planned (examples of these path: `/src/mcp-medicine-wheel*`, `/src/ceremony-session-observer/`, `/src/mcp-pde`, and others that might be described in time... - example with /src/mcp-medicine-wheel*` is the new `jgwill/workspace#17` -package-> `medicine-wheel-data-store` + `medicine-wheel-session-reader` (`jgwill/workspace#16`) and you can observe there a pattern of not having a repo `jgwill/medicine-wheel` but the code being commited directly to the repo `jgwill/workspace` simply because the OCAP isn't clear on that (Who owns that "Medicine Wheel Development Suite" potentially applicable to two domains: ceremonial-technology-development (Decolonizing Sofware Development) and relational-science (Decolonizing Scientific Research).

## Structural Tension Charting `llms-structural-tension-charts.txt`

### repo: `jgwill/smcraft`
* Drafted guidance `llms-stc-state-machine.md` was created out of something Robert Fritz said that got imprinted in my mind: "The creative orientation is an Event-Driven Process" and Robert is not good with software architecture at all !!
* * Therefore, smcraft already has its first runtimes published at :`https://www.npmjs.com/package/smcraft` and `https://pypi.org/project/smcraft/` and will be greatly influenced with its relationship with `avadisabelle/coaia-narrative`
### repo: `avadisabelle/coaia-narrative` cloned in: `/src/coaia-narrative`

* create Structural Tension Charting with MCP and CLI tools.
* related guidance `llms-managerial-moment-of-truth.md` which should be available within coaia-narrative MCP tools

#### `/src/coaia-visualizer/`

* Web UI and network MCP to work with `/src/coaia-narrative` format


## Digital Performance Review and Digital Decision Making Frawework

### OLD repo `git@github.com:miadisabelle/TandT.git` cloned in `/workspace/repos/miadisabelle/TandT` and related guidances (`llms-managerial-moment-of-truth.md` AND `llms-digital-decision-making.md`)
* ALso was worked in `/src/tandt/` which is where we extracted and created  `llms-digital-decision-making.md`
* Question on TandT is : What in the place of the Evaluation model within the medicine-wheel ? how do we write on disk the various element of DESIGN|EXECUTION that are being evaluated ? How does the evaluator process is triggered ? It is mandatory that human-in-the-loop used when elements of performance are being generated, evaluated because they touch human aspirations and AI Companions are at the level of Innovation, which is a secondary choice to create in relation to a primary choice that these criterias evaluate ?


### new repo `git@github.com:jgwill/veritas.git` cloned in `/workspace/repos/jgwill/veritas/` and related guidances (`llms-managerial-moment-of-truth.md` AND `llms-digital-decision-making.md`)

* Will offer a platform for models for the Performance Review type and the decision making type implied in the guidances (and related referenced internally).
* It become potentially an API / MCP that we can call to generate 

### `/workspace/repos/jgwill/medicine-wheel/src/`
* Bellow are subsections that the jgwill/veritas might feed on or the tool that consume the jgwill/veritas's API would be built with (npmjs packages).
* jgwill/veritas and related guidances (`llms-managerial-moment-of-truth.md` AND `llms-digital-decision-making.md`) would have abstraction done to them for new components in either `/workspace/repos/jgwill/medicine-wheel/src/` or `/workspace/repos/avadisabelle/ava-langchainjs` AND|OR `/workspace/repos/avadisabelle/ava-langgraphjs`
- [ ] TODO Go thru the path and upgrade this section in relation to what was created also in ./docs and recent packages for working with `/src/mcp-medicine-wheel*` futurely with data.

#### ceremony-protocol/ 
#### graph-viz/         
#### narrative-engine/  
#### ontology-core/     
* I am suspecting that when we will want to generate models probably in relation to `coaia-narrative` with jgwill/veritas or whatever tools consuming that service, we will need some ontology to structure the model.
* * I have no idea of what will that look like

#### relational-query/  
#### ui-components/ 

## Extra-KinRepo 

* repo/path that might influence how we distribute, access what is being created in here

### `/workspace/repos/miadisabelle/mia-context7`
