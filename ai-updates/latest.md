# AI Weekly Update - 2026-10-19

Generated: 2026-10-19T13:14:57+09:00

Period: 2026-10-12 ~ 2026-10-19

## 3줄 요약

- Claude Code Changelog: 2.1.303 October 18, 2026 Bug fixes and reliability improvements
- OpenAI Codex GitHub Releases: New Features - Open /config to search preferences across categories, change supported settings immediately, and see which changes require a restart. (52990, 53429) - Send a follow...
- Anthropic API Release Notes: October 15, 2026  The Compliance API now returns the text each organization member saved as Instructions for Claude in claude.ai and as Global instructions in Cowork, in beta for...

## 주요 변경 후보

| Date | Source | Change |
| --- | --- | --- |
| 2026-10-18 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.303 October 18, 2026 Bug fixes and reliability improvements |
| 2026-10-16 | [OpenAI Codex GitHub Releases](https://github.com/openai/codex/releases/tag/rust-v0.163.0) | New Features - Open /config to search preferences across categories, change supported settings immediately, and see which changes require a restart. (52990, 53429) - Send a follow-up while Codex is responding to steer i... |
| 2026-10-16 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.302 October 16, 2026 Added Added CLAUDE_CODE_AUTO_MODE_MODEL to choose the model the client-side auto mode classifier uses; it does not change the model for server-side auto mode Added an Idle compaction row to /con... |
| 2026-10-15 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.301 October 15, 2026 Added Added CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS so unattended retry mode ( CLAUDE_CODE_RETRY_WATCHDOG ) ends a request at a usage limit that resets too far away instead of waiting... |
| 2026-10-15 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | October 15, 2026  The Compliance API now returns the text each organization member saved as Instructions for Claude in claude.ai and as Global instructions in Cowork, in beta for Claude Enterprise organizations. Call G... |
| 2026-10-14 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.300 October 14, 2026 Added Added virtualText to a mod’s prompt decorations: text drawn in the prompt box that never enters the draft or the submitted prompt Added cache_creation_5m_tokens and cache_creation_1h_token... |
| 2026-10-14 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.299 October 14, 2026 Added Added CLAUDE_CODE_DISABLE_FILE_MENTIONS environment variable: Claude gets the paths of @ file mentions to read with its file tools, not the files’ contents Added idle compaction in the ter... |
| 2026-10-14 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | October 14, 2026  We've launched OpenTelemetry export in beta, so you can trace Messages API requests and Claude Managed Agents sessions in your observability backend. The Claude SDK emits spans in Python, TypeScript,... |
| 2026-10-13 | [Google Gemini API Changelog](https://ai.google.dev/gemini-api/docs/changelog) | October 13, 2026 Gemini 4 Argon ( gemini-4-argon ) generally available (GA) : Released Gemini 4 Argon ( gemini-4-argon ), our most capable model built for complex coding, agentic, math, and science tasks. For API change... |
| 2026-10-13 | [Gemini App Release Notes](https://gemini.google/release-notes/) | 2026.10.13 Introducing Gemini 4 Argon: our frontier model for complex tasks What: Starting today, Gemini 4 Argon is rolling out globally for Google AI Pro & Ultra subscribers in the Gemini app. 4 Argon is our newest fro... |


## 업데이트가 감지된 출처

Anthropic API Release Notes, Claude Code Changelog, Gemini App Release Notes, Google Gemini API Changelog, OpenAI Codex GitHub Releases

## Collection Errors

- OpenAI Model Release Notes: HTTP Error 403: Forbidden


## 참고

- 이 리포트는 `ai-updates/sources.json`에 등록된 공식 changelog와 release note 페이지에서 생성됩니다.
- 기본 요약기는 날짜가 붙은 항목을 자동 추출합니다. 공급사가 페이지 구조를 바꾸면 source URL이나 파싱 전략을 조정하세요.
- 더 자연스러운 한국어 요약을 원하면 repository secret에 `OPENAI_API_KEY`를 추가하세요.
