# AI Weekly Update - 2026-04-28

Generated: 2026-04-28T02:26:49+09:00

Period: 2026-04-21 ~ 2026-04-28

## 3줄 요약

- OpenAI Codex GitHub Releases: New Features - App-server integrations now support Unix socket transport, pagination-friendly resume/fork, sticky environments, and remote thread config/store plumbing. (18255, 18...
- Anthropic API Release Notes: April 24, 2026 We've released the Rate Limits API , allowing administrators to programmatically query the rate limits configured for their organization and workspaces.
- Claude Code Changelog: April 23, 2026 /config settings (theme, editor mode, verbose, etc.) now persist to ~/.claude/settings.json and participate in project/local/policy override precedence Added prUrlT...

## 주요 변경 후보

| Date | Source | Change |
| --- | --- | --- |
| 2026-04-25 | [OpenAI Codex GitHub Releases](https://github.com/openai/codex/releases/tag/rust-v0.125.0) | New Features - App-server integrations now support Unix socket transport, pagination-friendly resume/fork, sticky environments, and remote thread config/store plumbing. (18255, 18892, 18897, 18908, 19008, 19014) - App-s... |
| 2026-04-24 | [OpenAI Codex GitHub Releases](https://github.com/openai/codex/releases/tag/rust-v0.124.0) | New Features - The TUI now has quick reasoning controls: Alt+, lowers reasoning, Alt+. raises it, and accepted model upgrades now reset reasoning to the new model’s default instead of carrying over stale settings. (1886... |
| 2026-04-24 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | April 24, 2026 We've released the Rate Limits API , allowing administrators to programmatically query the rate limits configured for their organization and workspaces. |
| 2026-04-23 | [OpenAI Codex GitHub Releases](https://github.com/openai/codex/releases/tag/rust-v0.123.0) | New Features - Added a built-in amazon-bedrock model provider with configurable AWS profile support (18744). - Added /mcp verbose for full MCP server diagnostics, resources, and resource templates while keeping plain /m... |
| 2026-04-23 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | April 23, 2026 /config settings (theme, editor mode, verbose, etc.) now persist to ~/.claude/settings.json and participate in project/local/policy override precedence Added prUrlTemplate setting to point the footer PR b... |
| 2026-04-23 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | April 23, 2026 Added vim visual mode ( v ) and visual-line mode ( V ) with selection, operators, and visual feedback Merged /cost and /stats into /usage — both remain as typing shortcuts that open the relevant tab Creat... |
| 2026-04-22 | [Google Gemini API Changelog](https://ai.google.dev/gemini-api/docs/changelog) | April 22, 2026 Released gemini-embedding-2 as generally available (GA). To learn more, see the Embeddings page. |
| 2026-04-22 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | April 22, 2026 Forked subagents can now be enabled on external builds by setting CLAUDE_CODE_FORK_SUBAGENT=1 Agent frontmatter mcpServers are now loaded for main-thread agent sessions via --agent Improved /model : selec... |
| 2026-04-21 | [Microsoft 365 Copilot Release Notes](https://learn.microsoft.com/en-us/copilot/microsoft-365/release-notes) | Updates released between April 7, 2026, April 21, 2026 Microsoft 365 Copilot admin center Copilot setting for video generation A new setting in the Microsoft 365 admin center allows admins to control access to AI video... |
| 2026-04-21 | [Microsoft 365 Copilot Release Notes](https://learn.microsoft.com/en-us/copilot/microsoft-365/release-notes) | Updates released between April 7, 2026, April 21, 2026 Microsoft 365 Copilot chat Rich Bing web answer cards in Copilot Chat [Windows, Web] Microsoft 365 Copilot now displays rich, interactive Bing web answer cards—such... |
| 2026-04-21 | [Google Gemini API Changelog](https://ai.google.dev/gemini-api/docs/changelog) | April 21, 2026 Released new versions of the Deep Research agent with collaborative planning, visualization support, MCP server integration, and File Search: deep-research-preview-04-2026 : Designed for speed and efficie... |


## 업데이트가 감지된 출처

Anthropic API Release Notes, Claude Code Changelog, Google Gemini API Changelog, Microsoft 365 Copilot Release Notes, OpenAI Codex GitHub Releases


## 참고

- 이 리포트는 `ai-updates/sources.json`에 등록된 공식 changelog와 release note 페이지에서 생성됩니다.
- 기본 요약기는 날짜가 붙은 항목을 자동 추출합니다. 공급사가 페이지 구조를 바꾸면 source URL이나 파싱 전략을 조정하세요.
- 더 자연스러운 한국어 요약을 원하면 repository secret에 `OPENAI_API_KEY`를 추가하세요.
