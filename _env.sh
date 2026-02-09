  
# Namespace: CopilotCLIMastery 
session_id__CopilotCLIMastery_2512021303=40ba7431-5e5a-4495-b414-45007628cf0b
alias cdCopilotCLIMastery="cd /src/_sessiondata/40ba7431-5e5a-4495-b414-45007628cf0b && ls -ltra && . session_bash_func_aliases.sh&>/dev/null" 
alias cdPlansCopilotCLIMastery='cd /src/_sessiondata/40ba7431-5e5a-4495-b414-45007628cf0b/plans 2>/dev/null || echo "No plans directory found."; ls -ltra; echo "Enter plan filename to open:"; read planfile; if [ -f "$planfile" ]; then nano "$planfile"; else echo "File does not exist."; fi' 
session_id__CopilotCLIMastery_2512021303__MCP_CONFIG="/src/.mcp.coaiapy.env.aetherial.json /src/.mcp.iaip.json /src/.mcp.lighthouse.json /src/.mcp.github.jgwill.json"
session_id__CopilotCLIMastery_2512021303__ADD_DIR="/src/miette/claude-plan-insights/ /src/scripts/ /src/palimpsest/mia-agents/"
  
  
# Namespace: RISESpecsUpgradeWithAetherialNarrativeLatticeWeaver 
session_id__RISESpecsUpgradeWithAetherialNarrativeLatticeWeaver_2512150559=9233fe02-cd2a-46e5-87af-28eb8617bab4
alias cdRISESpecsUpgradeWithAetherialNarrativeLatticeWeaver="cd /src/_sessiondata/9233fe02-cd2a-46e5-87af-28eb8617bab4 && ls -ltra && . session_bash_func_aliases.sh&>/dev/null" 
alias cdPlansRISESpecsUpgradeWithAetherialNarrativeLatticeWeaver='cd /src/_sessiondata/9233fe02-cd2a-46e5-87af-28eb8617bab4/plans 2>/dev/null || echo "No plans directory found."; ls -ltra; echo "Enter plan filename to open:"; read planfile; if [ -f "$planfile" ]; then nano "$planfile"; else echo "File does not exist."; fi' 
session_id__RISESpecsUpgradeWithAetherialNarrativeLatticeWeaver_2512150559__MCP_CONFIG="/src/.mcp.iaip.json /src/llms/.mcp.rise-framework.coaia-narrative.json"
session_id__RISESpecsUpgradeWithAetherialNarrativeLatticeWeaver_2512150559__ADD_DIR="/workspace/repos/miadisabelle/4079da9d-0353-4926-b465-993b8c94712d-Narrative-Lattice-Weaver-251213-cuddly-dancing-sloth/ /workspace/repos/miadisabelle/AetherialProject /src/llms /src/_sessiondata/$session_id__RISESpecsUpgradeWithAetherialNarrativeLatticeWeaver_2512150559"
alias resume_RISESpecsUpgradeWithAetherialNarrativeLatticeWeaver="claude --mcp-config $session_id__RISESpecsUpgradeWithAetherialNarrativeLatticeWeaver_2512150559__MCP_CONFIG --add-dir $session_id__RISESpecsUpgradeWithAetherialNarrativeLatticeWeaver_2512150559__ADD_DIR --resume $session_id__RISESpecsUpgradeWithAetherialNarrativeLatticeWeaver_2512150559" 
alias fork_RISESpecsUpgradeWithAetherialNarrativeLatticeWeaver="claude --mcp-config $session_id__RISESpecsUpgradeWithAetherialNarrativeLatticeWeaver_2512150559__MCP_CONFIG --add-dir $session_id__RISESpecsUpgradeWithAetherialNarrativeLatticeWeaver_2512150559__ADD_DIR --resume $session_id__RISESpecsUpgradeWithAetherialNarrativeLatticeWeaver_2512150559 --fork-session" 
  
alias vilauncher_RISESpecsUpgradeWithAetherialNarrativeLatticeWeaver="vi LAUNCH__session_id__RISESpecsUpgradeWithAetherialNarrativeLatticeWeaver_2512150559.sh" 
