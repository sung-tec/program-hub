# AI Weekly Update - 2026-10-12

Generated: 2026-10-12T14:32:16+09:00

Period: 2026-10-05 ~ 2026-10-12

## 3줄 요약

- OpenAI Codex GitHub Releases: Bug Fixes - Fixed a TUI crash when asynchronous questions contain multiple lines, preserving line breaks and complete hyperlink destinations. (51866) - Fixed startup failures caus...
- Claude Code Changelog: 2.1.296 October 9, 2026 Added Added a code key to the Claude apps gateway’s managed.policies[] : the same settings as cli , also applied in Claude Desktop’s Code tab; beside deskt...
- Anthropic API Release Notes: October 9, 2026 

## 주요 변경 후보

| Date | Source | Change |
| --- | --- | --- |
| 2026-10-10 | [OpenAI Codex GitHub Releases](https://github.com/openai/codex/releases/tag/rust-v0.162.1) | Bug Fixes - Fixed a TUI crash when asynchronous questions contain multiple lines, preserving line breaks and complete hyperlink destinations. (51866) - Fixed startup failures caused by differences between a running back... |
| 2026-10-09 | [OpenAI Codex GitHub Releases](https://github.com/openai/codex/releases/tag/rust-v0.162.0) | New Features - Add tools for creating and listing managed Git worktrees from trusted local projects when the worktrees feature is enabled. (50148) - Pin tasks in the agent Command Center with p and keep them in a shared... |
| 2026-10-09 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.296 October 9, 2026 Added Added a code key to the Claude apps gateway’s managed.policies[] : the same settings as cli , also applied in Claude Desktop’s Code tab; beside desktop , it turns on Claude Desktop’s gatewa... |
| 2026-10-09 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | October 9, 2026  |
| 2026-10-08 | [OpenAI Codex GitHub Releases](https://github.com/openai/codex/releases/tag/rust-v0.161.0) | New Features - GPT-6.1 Sol is now the default model in the bundled and Amazon Bedrock catalogs. (49318, 49339) - Amazon Bedrock supports multi-agent V2 and Ultra reasoning on compatible models; Bedrock Mantle also accep... |
| 2026-10-08 | [Google Gemini API Changelog](https://ai.google.dev/gemini-api/docs/changelog) | October 8, 2026 Gemini 3.7 Flash deprecation : gemini-3.7-flash is deprecated and has been replaced by gemini-3.8-flash . All requests to gemini-3.7-flash are automatically routed to gemini-3.8-flash . Update your model... |
| 2026-10-08 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.295 October 8, 2026 Added Added onFailure: "block" for command and HTTP hooks: a hook that can’t start, times out, or exits with an unexpected code blocks the action instead of letting it through Added Program Statu... |
| 2026-10-08 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.294 October 8, 2026 Fixed prompt and agent hooks written as instructions (such as “Block commands that…”) allowing what they should block Improved how prompt hooks on Stop and SubagentStop written as instructions (s... |
| 2026-10-08 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | October 8, 2026  The Compliance API chat endpoints now also return chats from the unified Claude experience, in beta for Claude Enterprise organizations, with your existing Compliance Access Key. See Retrieve and delet... |
| 2026-10-07 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.293 October 7, 2026 Added Added Claude Haiku 5.5 ( claude-haiku-5-5 ), now the default Haiku model on the Anthropic API — 1M context, 0.10 / 0.10/ 0.10/ 0.50 per Mtok ( 0.50 / 0.50/ 0.50/ 2.50 for prompts over 100K)... |
| 2026-10-07 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | October 7, 2026  We've lowered the price of prompt cache reads on Claude Sonnet 5.5 from $0.20 USD to $0.10 USD per million tokens: 0.05x the base input price instead of 0.1x. Cache writes and all other prices are unch... |
| 2026-10-06 | [OpenAI Codex GitHub Releases](https://github.com/openai/codex/releases/tag/rust-v0.160.1) | Bug Fixes - Preserve SYSTEMROOT, TEMP, and TMP when launching remote stdio MCP servers with explicitly configured remote environment variables, allowing Unix hosts to retain the Windows executor's startup environment. C... |
| 2026-10-06 | [Microsoft 365 Copilot Release Notes](https://learn.microsoft.com/en-us/copilot/microsoft-365/release-notes) | Updates released between September 22, 2026, and October 06, 2026. Microsoft 365 Copilot Seamless Search and Chat Integration [Windows, Web] Microsoft 365 Chat brings the power of conversational AI directly into Microso... |
| 2026-10-06 | [Microsoft 365 Copilot Release Notes](https://learn.microsoft.com/en-us/copilot/microsoft-365/release-notes) | Updates released between September 22, 2026, and October 06, 2026. Microsoft 365 Copilot Regenerate response for alternative answers [Web] The Regenerate action lets you quickly get an alternative response to your lates... |
| 2026-10-06 | [Microsoft 365 Copilot Release Notes](https://learn.microsoft.com/en-us/copilot/microsoft-365/release-notes) | Updates released between September 22, 2026, and October 06, 2026. PowerPoint Reference files saved in SharePoint libraries and OneDrive folders when creating a presentation with Copilot in PowerPoint [Mac] You can now... |
| 2026-10-06 | [Google Gemini API Changelog](https://ai.google.dev/gemini-api/docs/changelog) | October 6, 2026 Gemini Nano Banana 2.1 generally available (GA) : Released Gemini Nano Banana 2.1 ( gemini-nano-banana-2.1 ), the latest high-efficiency image generation and conversational editing model. An update to Na... |
| 2026-10-06 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.292 October 6, 2026 Added Added --marketplace <source> to claude plugin install : adds the marketplace if needed, under the same policy checks as claude plugin marketplace add , then installs the plugin from it Adde... |
| 2026-10-06 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.291 October 6, 2026 Fixed a regression in 2.1.290 where cloud sessions could drop answers to permission prompts Fixed a regression in 2.1.288 where the last messages of a session could be lost when quitting |
| 2026-10-06 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | October 6, 2026  We've added capabilities.server_tools to the Models API . GET /v1/models and GET /v1/models/{model_id} now report whether each model accepts the web search and code execution tools. To check whether a... |
| 2026-10-05 | [OpenAI API Changelog](https://platform.openai.com/docs/changelog) | Standard pricing is $5 per 1M input tokens, $0.50 per 1M cached input tokens, and $25 per 1M output tokens. Billing begins on October 5, 2026. See pricing for details. Sep 3 Feature gpt-6-astra v1/responses v1/chat/comp... |
| 2026-10-05 | [Google Gemini API Changelog](https://ai.google.dev/gemini-api/docs/changelog) | antigravity-preview-05-2026 shuts down on October 5, 2026, tracked on the deprecations page. |
| 2026-10-05 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.290 October 5, 2026 Added Added serverToolUses to the result of a mod’s turn.step hook: the tool calls the API ran itself (the advisor), each with its id, name, input, start and end Added agentId to the tool.check e... |
| 2026-10-05 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | October 5, 2026  We've added capabilities.thinking.types.disabled to the Models API . GET /v1/models and GET /v1/models/{model_id} now report whether each model accepts thinking: {type: "disabled"} , which turns thinki... |


## 업데이트가 감지된 출처

Anthropic API Release Notes, Claude Code Changelog, Google Gemini API Changelog, Microsoft 365 Copilot Release Notes, OpenAI API Changelog, OpenAI Codex GitHub Releases

## Collection Errors

- OpenAI Model Release Notes: HTTP Error 403: Forbidden


## 참고

- 이 리포트는 `ai-updates/sources.json`에 등록된 공식 changelog와 release note 페이지에서 생성됩니다.
- 기본 요약기는 날짜가 붙은 항목을 자동 추출합니다. 공급사가 페이지 구조를 바꾸면 source URL이나 파싱 전략을 조정하세요.
- 더 자연스러운 한국어 요약을 원하면 repository secret에 `OPENAI_API_KEY`를 추가하세요.
