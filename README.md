# Adarsh Krishnan - Personal Website

A modern, responsive personal website built with Hugo and the PaperMod theme. Visit the live site at [adarshkrishnan.com](https://adarshkrishnan.com/).

## 🚀 Features

- **Clean & Modern Design**: Built with the PaperMod theme for a minimalist, professional look
- **Responsive**: Works seamlessly across desktop, tablet, and mobile devices
- **Fast Loading**: Static site generation with Hugo ensures lightning-fast page loads
- **SEO Optimized**: Built-in SEO features for better search engine visibility
- **Dark Mode**: Automatic theme switching based on user preference
- **Blog Section**: Share thoughts and insights through blog posts
- **Project Portfolio**: Showcase data science and machine learning projects
- **Experience Timeline**: Display professional journey and achievements

## 🛠️ Tech Stack

- **Static Site Generator**: [Hugo](https://gohugo.io/) v0.146.0+
- **Theme**: [PaperMod](https://github.com/adityatelange/hugo-PaperMod)
- **Deployment**: GitHub Pages with GitHub Actions
- **Version Control**: Git & GitHub

## 📦 Prerequisites

- Hugo v0.146.0 or higher (extended version)
- Git
- A text editor (VS Code recommended)

## 🔧 Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/kriashks/personal-website.git
cd personal-website
```

### 2. Initialize Submodules

The PaperMod theme is included as a git submodule:

```bash
git submodule update --init --recursive
```

### 3. Run Hugo Server

Start the local development server:

```bash
hugo server -D
```

Visit `http://localhost:1313` to see your site locally.

### 4. Build the Site

To generate the static files:

```bash
hugo --minify
```

The built site will be in the `public/` directory.

## 📁 Project Structure

```
personal-website/
├── .github/
│   └── workflows/
│       └── gh-pages.yml    # GitHub Actions workflow
├── archetypes/             # Content templates
├── content/                # Website content
│   ├── about/             # About page
│   ├── blog/              # Blog posts
│   ├── experiences/       # Experience entries
│   └── projects/          # Project showcases
├── layouts/               # Custom layouts (if any)
├── static/                # Static files (images, css, js)
├── themes/
│   └── PaperMod/         # Hugo theme
├── config.yml            # Hugo configuration
└── README.md            # This file
```

## ⚙️ Configuration

The main configuration is in `config.yml`:

- **baseURL**: Your website URL
- **theme**: Set to "PaperMod"
- **params**: Theme-specific parameters
  - Social icons
  - Homepage content
  - Post settings
- **menu**: Navigation menu items

## 📝 Adding Content

### Create a New Blog Post

```bash
hugo new blog/my-new-post.md
```

### Create a New Project

```bash
hugo new projects/my-project.md
```

### Create a New Experience Entry

```bash
hugo new experiences/my-experience.md
```

## 🚀 Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch. The GitHub Actions workflow handles:

1. Building the Hugo site
2. Deploying to GitHub Pages
3. Making it available at your custom domain

### Manual Deployment

If you need to deploy manually:

```bash
# Build the site
hugo --minify

# The public/ folder contains your built site
```

## 🎨 Customization

### Changing Theme Settings

Edit the `params` section in `config.yml`:

```yaml
params:
  defaultTheme: auto  # auto, light, or dark
  ShowShareButtons: true
  ShowReadingTime: true
  ShowPostNavLinks: true
```

### Adding Social Links

Add or modify social icons in `config.yml`:

```yaml
params:
  socialIcons:
    - name: linkedin
      url: "https://linkedin.com/in/yourprofile"
    - name: github
      url: "https://github.com/yourusername"
```

### Custom CSS

Add custom styles by creating:
- `assets/css/extended/custom.css` for additional styles

## 🐛 Troubleshooting

### Hugo Version Issues

If you encounter version compatibility errors:
- Ensure you have Hugo v0.146.0 or higher
- Use the extended version of Hugo
- Update Hugo: `brew upgrade hugo` (macOS) or download from [Hugo releases](https://github.com/gohugoio/hugo/releases)

### Submodule Issues

If the theme is missing:
```bash
git submodule update --init --recursive
```

### Build Errors

- Check `config.yml` for syntax errors
- Ensure all required fields are present
- Run `hugo --verbose` for detailed error messages

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

While this is a personal website, suggestions and bug reports are welcome! Please open an issue or submit a pull request.

## 📧 Contact

- **Email**: kriashks@gmail.com
- **LinkedIn**: [linkedin.com/in/kriash](https://www.linkedin.com/in/kriash/)
- **GitHub**: [github.com/kriashks](https://github.com/kriashks)

---

Built with ❤️ by Adarsh Krishnan
