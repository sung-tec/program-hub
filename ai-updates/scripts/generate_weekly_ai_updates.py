#!/usr/bin/env python3
"""Generate a weekly AI product update digest.

The script intentionally uses only Python's standard library so it can run in
GitHub Actions without dependency installation.
"""

from __future__ import annotations

import datetime as dt
import html
import json
import os
import pathlib
import re
import sys
import textwrap
import urllib.error
import urllib.request
from zoneinfo import ZoneInfo


ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCES_PATH = ROOT / "sources.json"
ARCHIVE_DIR = ROOT / "archive"
LATEST_PATH = ROOT / "latest.md"
TIMEZONE = ZoneInfo(os.getenv("AI_UPDATE_TIMEZONE", "Asia/Seoul"))
LOOKBACK_DAYS = int(os.getenv("LOOKBACK_DAYS", "7"))
USER_AGENT = "program-hub-ai-weekly-updates/1.0 (+https://github.com/sung-tec/program-hub)"

MONTHS = {
    "jan": 1,
    "january": 1,
    "feb": 2,
    "february": 2,
    "mar": 3,
    "march": 3,
    "apr": 4,
    "april": 4,
    "may": 5,
    "jun": 6,
    "june": 6,
    "jul": 7,
    "july": 7,
    "aug": 8,
    "august": 8,
    "sep": 9,
    "sept": 9,
    "september": 9,
    "oct": 10,
    "october": 10,
    "nov": 11,
    "november": 11,
    "dec": 12,
    "december": 12,
}

DATE_PATTERNS = [
    re.compile(r"\b(?P<year>20\d{2})[-/.](?P<month>\d{1,2})[-/.](?P<day>\d{1,2})\b"),
    re.compile(
        r"\b(?P<month_name>Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|"
        r"Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)"
        r"\s+(?P<day>\d{1,2})(?:st|nd|rd|th)?[,]?\s+(?P<year>20\d{2})\b",
        re.IGNORECASE,
    ),
    re.compile(
        r"\b(?P<day>\d{1,2})(?:st|nd|rd|th)?\s+"
        r"(?P<month_name>Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|"
        r"Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)"
        r"\s+(?P<year>20\d{2})\b",
        re.IGNORECASE,
    ),
]

BOILERPLATE = {
    "skip to main content",
    "cookie preferences",
    "was this helpful?",
    "table of contents",
    "submit",
    "feedback",
    "sign in",
    "sign up",
}

SKIP_LINE_PATTERNS = [
    re.compile(r"^last updated\s+20\d{2}[-/.]\d{1,2}[-/.]\d{1,2}", re.IGNORECASE),
    re.compile(r"easy to understand", re.IGNORECASE),
    re.compile(r"solved my problem", re.IGNORECASE),
    re.compile(r"missing the information", re.IGNORECASE),
    re.compile(r"need to tell us more", re.IGNORECASE),
]


def fetch(url: str) -> tuple[str, str]:
    request = urllib.request.Request(
        url,
        headers={
            "Accept": "application/json,text/html,text/plain;q=0.9,*/*;q=0.8",
            "User-Agent": USER_AGENT,
        },
    )
    with urllib.request.urlopen(request, timeout=45) as response:
        content_type = response.headers.get("Content-Type", "")
        charset = response.headers.get_content_charset() or "utf-8"
        body = response.read().decode(charset, errors="replace")
        return body, content_type


def parse_iso_datetime(value: str) -> dt.datetime | None:
    if not value:
        return None
    try:
        if value.endswith("Z"):
            value = value[:-1] + "+00:00"
        parsed = dt.datetime.fromisoformat(value)
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=dt.timezone.utc)
        return parsed.astimezone(TIMEZONE)
    except ValueError:
        return None


def parse_date_from_match(match: re.Match[str]) -> dt.date | None:
    groups = match.groupdict()
    try:
        year = int(groups["year"])
        day = int(groups["day"])
        if groups.get("month_name"):
            month = MONTHS[groups["month_name"].lower()[:3]]
        else:
            month = int(groups["month"])
        return dt.date(year, month, day)
    except (KeyError, TypeError, ValueError):
        return None


def find_dates(text: str) -> list[dt.date]:
    dates: list[dt.date] = []
    for pattern in DATE_PATTERNS:
        for match in pattern.finditer(text):
            parsed = parse_date_from_match(match)
            if parsed and parsed not in dates:
                dates.append(parsed)
    return dates


def html_to_lines(raw_html: str) -> list[str]:
    raw_html = re.sub(r"(?is)<(script|style|noscript|svg).*?</\1>", " ", raw_html)
    raw_html = re.sub(r"(?i)<br\s*/?>", "\n", raw_html)
    raw_html = re.sub(r"(?i)</(p|li|h[1-6]|div|tr|section|article)>", "\n", raw_html)
    text = re.sub(r"(?s)<[^>]+>", " ", raw_html)
    text = html.unescape(text)
    lines = []
    for line in text.splitlines():
        cleaned = re.sub(r"\s+", " ", line).strip()
        lowered = cleaned.lower()
        if len(cleaned) < 3 or lowered in BOILERPLATE:
            continue
        if any(pattern.search(cleaned) for pattern in SKIP_LINE_PATTERNS):
            continue
        if lowered.startswith("skip to ") or lowered.startswith("you can't perform"):
            continue
        lines.append(cleaned)
    return lines


def clean_markdown(text: str) -> str:
    text = re.sub(r"```.*?```", " ", text, flags=re.DOTALL)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", " ", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"#+\s*", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def compact(text: str, limit: int = 900) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) <= limit:
        return text
    return text[: limit - 1].rstrip() + "..."


def is_date_only(text: str) -> bool:
    without_dates = text
    for pattern in DATE_PATTERNS:
        without_dates = pattern.sub("", without_dates)
    without_dates = re.sub(r"[\s,.:;/-]+", "", without_dates)
    return len(without_dates) == 0


def extract_html_entries(source: dict, since: dt.date, today: dt.date) -> list[dict]:
    body, _ = fetch(source["url"])
    lines = html_to_lines(body)
    entries: list[dict] = []
    seen: set[str] = set()

    for index, line in enumerate(lines):
        dates = find_dates(line)
        recent_dates = [value for value in dates if since <= value <= today]
        if not recent_dates:
            continue

        chunk = [line]
        for next_line in lines[index + 1 : index + 18]:
            if find_dates(next_line):
                break
            if len(" ".join(chunk)) > 1800:
                break
            chunk.append(next_line)

        summary = compact(" ".join(chunk), 1000)
        if is_date_only(summary):
            continue
        fingerprint = f"{source['name']}:{summary[:180]}"
        if fingerprint in seen:
            continue
        seen.add(fingerprint)
        entries.append(
            {
                "source": source["name"],
                "url": source["url"],
                "date": recent_dates[0].isoformat(),
                "title": line,
                "summary": summary,
            }
        )

    return entries


def extract_github_releases(source: dict, since_dt: dt.datetime) -> list[dict]:
    body, _ = fetch(source["url"])
    releases = json.loads(body)
    entries: list[dict] = []
    include_prereleases = os.getenv("INCLUDE_PRERELEASES", "").lower() in {"1", "true", "yes"}

    for release in releases:
        if release.get("prerelease") and not include_prereleases:
            continue
        published = parse_iso_datetime(release.get("published_at", ""))
        if not published or published < since_dt:
            continue
        title = release.get("name") or release.get("tag_name") or "Release"
        body_text = clean_markdown(release.get("body") or "")
        entries.append(
            {
                "source": source["name"],
                "url": release.get("html_url") or source["url"],
                "date": published.date().isoformat(),
                "title": title,
                "summary": compact(body_text or title, 1000),
            }
        )

    return entries


def collect_entries(sources: list[dict], since_dt: dt.datetime, today: dt.date) -> tuple[list[dict], list[str]]:
    entries: list[dict] = []
    errors: list[str] = []
    since_date = since_dt.date()

    for source in sources:
        try:
            if source.get("kind") == "github_releases":
                source_entries = extract_github_releases(source, since_dt)
            else:
                source_entries = extract_html_entries(source, since_date, today)
            entries.extend(source_entries)
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError, ValueError) as exc:
            errors.append(f"- {source['name']}: {exc}")

    entries.sort(key=lambda item: (item["date"], item["source"]), reverse=True)
    return entries, errors


def render_entry_table(entries: list[dict]) -> str:
    if not entries:
        return "최근 7일 안에 날짜가 명확히 표시된 변경 항목을 찾지 못했습니다.\n"

    rows = ["| Date | Source | Change |", "| --- | --- | --- |"]
    for entry in entries[:30]:
        change = compact(entry["summary"], 220).replace("|", "\\|")
        rows.append(f"| {entry['date']} | [{entry['source']}]({entry['url']}) | {change} |")
    return "\n".join(rows) + "\n"


def heuristic_summary(entries: list[dict], errors: list[str]) -> str:
    high_signal_entries = [
        entry
        for entry in entries
        if not re.fullmatch(r"Release\s+\d+(?:\.\d+)*(?:-[A-Za-z0-9.]+)?", entry["summary"].strip())
    ]
    if high_signal_entries:
        lines = []
        used_sources: set[str] = set()
        selected: list[dict] = []
        for entry in high_signal_entries:
            if entry["source"] in used_sources and len(used_sources) < 3:
                continue
            selected.append(entry)
            used_sources.add(entry["source"])
            if len(selected) == 3:
                break
        for entry in selected[:3]:
            summary = compact(entry["summary"], 180)
            lines.append(f"- {entry['source']}: {summary}")
        return "\n".join(lines)

    if errors:
        return (
            "- 일부 공식 변경 로그를 가져오지 못했습니다. 아래 오류 목록을 확인하세요.\n"
            "- 성공한 소스에서는 최근 7일 안에 날짜가 명확한 변경 항목을 찾지 못했습니다.\n"
            "- 다음 실행 때 다시 확인하고, 필요한 경우 `sources.json`의 URL을 조정하세요."
        )

    return (
        "- 공식 변경 로그에서 최근 7일 안에 날짜가 명확한 신규 항목을 찾지 못했습니다.\n"
        "- 큰 변경이 없어도 모델명, 요금, 사용 제한, CLI 버전은 별도로 확인하는 것이 좋습니다.\n"
        "- 다음 주 실행에서 새 변경 사항이 발견되면 이 파일과 archive가 자동 갱신됩니다."
    )


def summarize_with_openai(entries: list[dict], since: str, today: str) -> str | None:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key or not entries:
        return None

    model = os.getenv("OPENAI_SUMMARY_MODEL") or "gpt-5.1-mini"
    payload = {
        "model": model,
        "input": [
            {
                "role": "system",
                "content": (
                    "You write concise Korean weekly digests for AI service updates. "
                    "Use only the provided entries. Do not invent facts. Keep it actionable."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"기간: {since} ~ {today}\n"
                    "아래 변경사항을 바탕으로 Markdown 형식의 '3줄 요약'만 작성해줘. "
                    "각 줄은 한 문장, 총 3개의 bullet로 작성하고 개발자/실무자 영향 위주로 써줘.\n\n"
                    + json.dumps(entries[:25], ensure_ascii=False)
                ),
            },
        ],
    }
    request = urllib.request.Request(
        "https://api.openai.com/v1/responses",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": USER_AGENT,
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            data = json.loads(response.read().decode("utf-8"))
    except Exception as exc:  # noqa: BLE001 - fallback keeps the scheduled job useful.
        return f"<!-- OpenAI summary failed: {exc} -->\n{heuristic_summary(entries, [])}"

    if data.get("output_text"):
        return data["output_text"].strip()

    parts: list[str] = []
    for output in data.get("output", []):
        for content in output.get("content", []):
            text = content.get("text")
            if text:
                parts.append(text)
    return "\n".join(parts).strip() or None


def render_report(entries: list[dict], errors: list[str], now: dt.datetime, since_dt: dt.datetime) -> str:
    today = now.date().isoformat()
    since = since_dt.date().isoformat()
    summary = summarize_with_openai(entries, since, today) or heuristic_summary(entries, errors)
    source_names = sorted({entry["source"] for entry in entries})

    body = f"""# AI Weekly Update - {today}

Generated: {now.isoformat(timespec="seconds")}

Period: {since} ~ {today}

## 3줄 요약

{summary}

## 주요 변경 후보

{render_entry_table(entries)}

## 업데이트가 감지된 출처

{", ".join(source_names) if source_names else "No dated updates found in the configured sources."}
"""

    if errors:
        body += "\n## Collection Errors\n\n" + "\n".join(errors) + "\n"

    body += textwrap.dedent(
        """

        ## 참고

        - 이 리포트는 `ai-updates/sources.json`에 등록된 공식 changelog와 release note 페이지에서 생성됩니다.
        - 기본 요약기는 날짜가 붙은 항목을 자동 추출합니다. 공급사가 페이지 구조를 바꾸면 source URL이나 파싱 전략을 조정하세요.
        - 더 자연스러운 한국어 요약을 원하면 repository secret에 `OPENAI_API_KEY`를 추가하세요.
        """
    )
    return body


def main() -> int:
    now = dt.datetime.now(TIMEZONE)
    since_dt = now - dt.timedelta(days=LOOKBACK_DAYS)
    today = now.date()

    sources = json.loads(SOURCES_PATH.read_text(encoding="utf-8"))
    entries, errors = collect_entries(sources, since_dt, today)
    report = render_report(entries, errors, now, since_dt)

    ARCHIVE_DIR.mkdir(parents=True, exist_ok=True)
    archive_path = ARCHIVE_DIR / f"{today.isoformat()}.md"
    archive_path.write_text(report, encoding="utf-8")
    LATEST_PATH.write_text(report, encoding="utf-8")
    print(f"Wrote {LATEST_PATH} and {archive_path}")
    print(f"Collected {len(entries)} entries from {len(sources)} sources")
    if errors:
        print("Collection errors:", file=sys.stderr)
        print("\n".join(errors), file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
