#!/usr/bin/env python3
"""Generate blog index and post pages from markdown files in content/blog."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
import html
import re

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "content" / "blog"
BLOG_DIR = ROOT / "blog"


@dataclass
class Post:
    title: str
    date: str
    slug: str
    summary: str
    body_html: str


def pretty_date(raw_date: str) -> str:
    dt = datetime.strptime(raw_date, "%Y-%m-%d")
    return f"{dt.strftime('%B')} {dt.day}, {dt.year}"


def parse_front_matter(text: str) -> tuple[dict[str, str], str]:
    if not text.startswith("---\n"):
        raise ValueError("Expected YAML front matter starting with ---")

    parts = text.split("\n---\n", 1)
    if len(parts) != 2:
        raise ValueError("Expected closing --- for front matter")

    raw_meta = parts[0].removeprefix("---\n")
    body = parts[1].strip() + "\n"

    meta: dict[str, str] = {}
    for line in raw_meta.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if ":" not in line:
            raise ValueError(f"Invalid metadata line: {line}")
        key, value = line.split(":", 1)
        meta[key.strip()] = value.strip()

    return meta, body


def format_inline(line: str) -> str:
    escaped = html.escape(line)

    # [text](url)
    def repl_link(match: re.Match[str]) -> str:
        text = html.escape(match.group(1))
        url = html.escape(match.group(2), quote=True)
        return f'<a href="{url}">{text}</a>'

    escaped = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", repl_link, escaped)

    # **bold** and *italic*
    escaped = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", escaped)
    escaped = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", escaped)
    return escaped


def markdown_to_html(text: str) -> str:
    lines = text.splitlines()
    out: list[str] = []
    paragraph: list[str] = []
    in_ul = False
    in_ol = False

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            out.append(f"<p>{format_inline(' '.join(paragraph))}</p>")
            paragraph = []

    def close_lists() -> None:
        nonlocal in_ul, in_ol
        if in_ul:
            out.append("</ul>")
            in_ul = False
        if in_ol:
            out.append("</ol>")
            in_ol = False

    for raw in lines:
        line = raw.strip()

        if not line:
            flush_paragraph()
            close_lists()
            continue

        if line.startswith("### "):
            flush_paragraph()
            close_lists()
            out.append(f"<h3>{format_inline(line[4:])}</h3>")
            continue

        if line.startswith("## "):
            flush_paragraph()
            close_lists()
            out.append(f"<h2>{format_inline(line[3:])}</h2>")
            continue

        if line.startswith("- "):
            flush_paragraph()
            if in_ol:
                out.append("</ol>")
                in_ol = False
            if not in_ul:
                out.append("<ul>")
                in_ul = True
            out.append(f"<li>{format_inline(line[2:])}</li>")
            continue

        ordered = re.match(r"^\d+\.\s+(.*)$", line)
        if ordered:
            flush_paragraph()
            if in_ul:
                out.append("</ul>")
                in_ul = False
            if not in_ol:
                out.append("<ol>")
                in_ol = True
            out.append(f"<li>{format_inline(ordered.group(1))}</li>")
            continue

        paragraph.append(line)

    flush_paragraph()
    close_lists()
    return "\n        ".join(out)


def nav_html() -> str:
    return """<nav class=\"site-nav\" aria-label=\"Primary\">
        <p class=\"brand\"><strong>Adarsh Krishnan</strong></p>
        <div class=\"nav-links\">
          <a class=\"nav-link\" data-nav href=\"/\">Home</a>
          <a class=\"nav-link\" data-nav href=\"/about/\">About</a>
          <a class=\"nav-link\" data-nav href=\"/projects/\">Projects</a>
          <a class=\"nav-link\" data-nav href=\"/blog/\">Blog</a>
          <a class=\"nav-link\" data-nav href=\"/experiences/\">Resume</a>
        </div>
      </nav>"""


def render_post(post: Post) -> str:
    return f"""<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
    <title>{html.escape(post.title)} | Adarsh Krishnan</title>
    <meta name=\"description\" content=\"{html.escape(post.summary)}\">
    <link rel=\"canonical\" href=\"https://adarshkrishnan.com/blog/{html.escape(post.slug)}/\">
    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/gh/oatrun/oat@main/dist/oat.css\">
    <link rel=\"stylesheet\" href=\"/assets/site.css\">
    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/assets/favicon.svg\">
  </head>
  <body>
    <main>
      {nav_html()}

      <article class=\"section article\">
        <p class=\"kicker\">Blog</p>
        <h1>{html.escape(post.title)}</h1>
        <p class=\"meta\">{pretty_date(post.date)}</p>

        {post.body_html}
      </article>

      <footer class=\"footer\">
        <p>&copy; <span data-year></span> Adarsh Krishnan</p>
      </footer>
    </main>
    <script src=\"/assets/site.js\"></script>
  </body>
</html>
"""


def render_blog_index(posts: list[Post]) -> str:
    cards = []
    for post in posts:
        rendered_date = pretty_date(post.date)
        cards.append(
            f"""<article class=\"card\">
            <h2><a href=\"/blog/{html.escape(post.slug)}/\">{html.escape(post.title)}</a></h2>
            <p class=\"meta\">{rendered_date}</p>
            <p>{html.escape(post.summary)}</p>
          </article>"""
        )

    cards_html = "\n          ".join(cards)
    return f"""<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
    <title>Blog | Adarsh Krishnan</title>
    <meta name=\"description\" content=\"Blog posts by Adarsh Krishnan.\">
    <link rel=\"canonical\" href=\"https://adarshkrishnan.com/blog/\">
    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/gh/oatrun/oat@main/dist/oat.css\">
    <link rel=\"stylesheet\" href=\"/assets/site.css\">
    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/assets/favicon.svg\">
  </head>
  <body>
    <main>
      {nav_html()}

      <section class=\"section\">
        <p class=\"kicker\">Blog</p>
        <h1>Notes and short explainers</h1>
        <div class=\"grid\">
          {cards_html}
        </div>
      </section>

      <footer class=\"footer\">
        <p>&copy; <span data-year></span> Adarsh Krishnan</p>
      </footer>
    </main>
    <script src=\"/assets/site.js\"></script>
  </body>
</html>
"""


def render_sitemap(posts: list[Post]) -> str:
    urls = [
        "https://adarshkrishnan.com/",
        "https://adarshkrishnan.com/about/",
        "https://adarshkrishnan.com/projects/",
        "https://adarshkrishnan.com/blog/",
        "https://adarshkrishnan.com/experiences/",
    ]
    urls.extend(f"https://adarshkrishnan.com/blog/{post.slug}/" for post in posts)

    body = "\n".join(f"  <url><loc>{html.escape(url)}</loc></url>" for url in urls)
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{body}\n"
        "</urlset>\n"
    )


def read_posts() -> list[Post]:
    if not CONTENT_DIR.exists():
        return []

    posts: list[Post] = []
    for path in sorted(CONTENT_DIR.glob("*.md")):
        raw = path.read_text(encoding="utf-8")
        meta, body = parse_front_matter(raw)

        title = meta.get("title", "").strip()
        date = meta.get("date", "").strip()
        slug = meta.get("slug", path.stem).strip()
        summary = meta.get("summary", "").strip()

        if not title or not date or not slug:
            raise ValueError(
                f"Missing required metadata in {path.name}. Required: title, date, slug"
            )

        if not summary:
            summary = body.strip().splitlines()[0][:140]

        post = Post(
            title=title,
            date=date,
            slug=slug,
            summary=summary,
            body_html=markdown_to_html(body),
        )
        posts.append(post)

    posts.sort(key=lambda p: p.date, reverse=True)
    return posts


def main() -> None:
    posts = read_posts()
    BLOG_DIR.mkdir(parents=True, exist_ok=True)

    for post in posts:
        out_dir = BLOG_DIR / post.slug
        out_dir.mkdir(parents=True, exist_ok=True)
        (out_dir / "index.html").write_text(render_post(post), encoding="utf-8")

    (BLOG_DIR / "index.html").write_text(render_blog_index(posts), encoding="utf-8")
    (ROOT / "sitemap.xml").write_text(render_sitemap(posts), encoding="utf-8")
    print(f"Generated {len(posts)} blog post page(s) from markdown")


if __name__ == "__main__":
    main()
