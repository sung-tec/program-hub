# AI Weekly Update - 2026-10-26

Generated: 2026-10-26T13:19:03+09:00

Period: 2026-10-19 ~ 2026-10-26

## 3줄 요약

- OpenAI Codex GitHub Releases: New Features - Save reusable prompts and slash commands in ten numbered /presets slots, with a keyboard menu for quick access. (54380, 54381) - Set model, reasoning effort, speed,...
- Claude Code Changelog: 2.1.310 October 23, 2026 Added Added the Monitor tool and plugin monitors on Bedrock, Vertex, and Foundry, and when telemetry or nonessential traffic is disabled; long foreground...
- Anthropic API Release Notes: October 22, 2026  We've launched Claude Models on Google Cloud (Anthropic managed) , the Claude API operated by Anthropic and reached through your Google Cloud project. Google Cl...

## 주요 변경 후보

| Date | Source | Change |
| --- | --- | --- |
| 2026-10-23 | [OpenAI Codex GitHub Releases](https://github.com/openai/codex/releases/tag/rust-v0.164.0) | New Features - Save reusable prompts and slash commands in ten numbered /presets slots, with a keyboard menu for quick access. (54380, 54381) - Set model, reasoning effort, speed, and permission profiles directly with i... |
| 2026-10-23 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.310 October 23, 2026 Added Added the Monitor tool and plugin monitors on Bedrock, Vertex, and Foundry, and when telemetry or nonessential traffic is disabled; long foreground sleeps are now blocked there too [Cloud... |
| 2026-10-22 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.309 October 22, 2026 Added [VSCode] Added a log warning that says what to do when dictation or the extension’s own requests fail certificate verification, such as behind a TLS-inspecting proxy Changed Updated the bu... |
| 2026-10-22 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.308 October 22, 2026 Bug fixes and reliability improvements |
| 2026-10-22 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | October 22, 2026  We've launched Claude Models on Google Cloud (Anthropic managed) , the Claude API operated by Anthropic and reached through your Google Cloud project. Google Cloud IAM controls access. Google Cloud Ma... |
| 2026-10-21 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.307 October 21, 2026 Added |
| 2026-10-21 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | Added /claude-api api-version to move Claude API code to API version 2026-10-21 Added the claude_code.safety_event OpenTelemetry event for each tool call a permission rule, auto mode, a safety check, a hook or the sandb... |
| 2026-10-21 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.306 October 21, 2026 Fixed claude -p inside cloud sessions reporting “Not logged in” when started without the session’s environment variables Fixed an API error being replaced by “prompt is too long”, and an unneede... |
| 2026-10-21 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | Migrating to Managed Agents Migrating to API version 2026-10-21  Console Release notes Claude Platform release notes Subscribe  Copy page Updates to the Claude Platform, including the Claude API, client SDKs, and the... |
| 2026-10-21 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | October 21, 2026  |
| 2026-10-21 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | We've released API version 2026-10-21 . Migrating to API version 2026-10-21 shows how to upgrade. |
| 2026-10-21 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | We've released new versions of the client SDKs and the ant CLI that send API version 2026-10-21 by default: Python SDK 2.0.0, TypeScript SDK 1.0.0, C# SDK 13.0.0, Go SDK 2.0.0, Java SDK 3.0.0, PHP SDK 1.0.0, Ruby SDK 2.... |
| 2026-10-21 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | The Claude Tag API is available in beta for Claude Enterprise organizations with the experimental-claude-tag-2026-10-21 beta header. Its /v1/organizations/claude_tag/ endpoints read and change Claude Tag settings on Sla... |
| 2026-10-20 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.305 October 20, 2026 Added Added sandbox.allowNestedUserNamespaces so sandboxed commands on Linux can create user namespaces (Chromium, rootless podman); this lets them get around the sandbox’s file protections Adde... |
| 2026-10-20 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | October 20, 2026  |
| 2026-10-20 | [Anthropic API Release Notes](https://docs.anthropic.com/en/release-notes/api) | October 20, 2026  Inference hooks are out of beta for Claude Enterprise organizations. We've launched user profiles , so you can tell Anthropic which of your end customers each API request is for. If you operate a plat... |
| 2026-10-19 | [Claude Code Changelog](https://code.claude.com/docs/en/changelog) | 2.1.304 October 19, 2026 Added Added a transcript line when a plugin that runs first skips one of your mod’s hooks, naming the event and the plugin Added decider: "person" to a mod’s tool.check answer: only the permissi... |


## 업데이트가 감지된 출처

Anthropic API Release Notes, Claude Code Changelog, OpenAI Codex GitHub Releases

## Collection Errors

- OpenAI Model Release Notes: HTTP Error 403: Forbidden


## 참고

- 이 리포트는 `ai-updates/sources.json`에 등록된 공식 changelog와 release note 페이지에서 생성됩니다.
- 기본 요약기는 날짜가 붙은 항목을 자동 추출합니다. 공급사가 페이지 구조를 바꾸면 source URL이나 파싱 전략을 조정하세요.
- 더 자연스러운 한국어 요약을 원하면 repository secret에 `OPENAI_API_KEY`를 추가하세요.
