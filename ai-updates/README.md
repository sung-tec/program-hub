# AI Weekly Updates

This folder is maintained by a weekly GitHub Actions workflow.

Every Monday at 09:00 KST, the workflow collects official AI product changelogs and writes:

- `latest.md`: the latest weekly summary
- `archive/YYYY-MM-DD.md`: the archived summary for that week

The generator works without paid dependencies. If `OPENAI_API_KEY` is configured as a repository secret, it also asks OpenAI to turn the collected changelog excerpts into a clearer Korean digest.

## Sources

Edit `sources.json` to add or remove tracked AI services.

Default sources include OpenAI, Codex, Anthropic, Claude Code, Gemini, and Microsoft 365 Copilot release notes.

By default, GitHub prereleases are skipped because alpha builds tend to add noise to a weekly digest. Set `INCLUDE_PRERELEASES=1` in the workflow if you want to track them too.

## Optional repository settings

- Secret: `OPENAI_API_KEY`
- Variable: `OPENAI_SUMMARY_MODEL`

If `OPENAI_SUMMARY_MODEL` is empty, the script uses `gpt-5.1-mini`.
