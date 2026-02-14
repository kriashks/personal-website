# Adarsh Krishnan - Personal Website

Static multi-page personal website styled with [oat](https://oat.ink/), deployed via GitHub Actions to GitHub Pages and mapped to:

- https://adarshkrishnan.com/

## Local preview

Run any static file server from the repo root, for example:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Deployment

Deployment is handled by:

- `.github/workflows/gh-pages.yml`

On push to `main`, the workflow builds/publishes static output and enforces `CNAME=adarshkrishnan.com`.
