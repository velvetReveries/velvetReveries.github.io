# velvetReveries.github.io
Test repository for GlyphRP website

## Static Website Template

This repository contains a basic static website template with a reusable navigation bar component.

### Files Structure

- **index.html** - Homepage with hero section, about section, and features
- **navbar.html** - Reusable navigation bar component
- **nav-load.js** - JavaScript to dynamically load the navbar across all pages
- **styles.css** - CSS styles for the entire website

### Features

- ✨ Modern, responsive design
- 🎨 Beautiful gradient hero section
- 📱 Mobile-friendly navigation
- 🔄 Reusable navbar component
- 🚀 Easy to customize and extend

### How to Use

1. **To view the website locally:**
   ```bash
   python3 -m http.server 8000
   ```
   Then open http://localhost:8000 in your browser

2. **To add the navbar to a new page:**
   - Add `<div id="navbar-container"></div>` where you want the navbar
   - Include `<script src="nav-load.js"></script>` before closing `</body>` tag
   - Link to `styles.css` in the `<head>` section

3. **To customize:**
   - Edit `navbar.html` to change navigation links
   - Edit `styles.css` to change colors, fonts, and layout
   - Edit `index.html` to modify content

### GitHub Pages

This site is automatically deployed via GitHub Pages at: https://velvetreveries.github.io/
