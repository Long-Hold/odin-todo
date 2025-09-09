# Webpack Template

A basic webpack configuration template for web development projects with separate development and production builds.

## Features

- **Hot Reload Development Server** - Live reloading during development
- **Production Optimization** - CSS extraction and minification for production builds
- **HTML Template Processing** - Automatic HTML generation with asset injection
- **Asset Management** - Image and static file handling
- **CSS Processing** - CSS loading with dev/prod optimization

## Project Structure

```
├── src/
│   ├── index.js          # Entry point
│   ├── template.html     # HTML template
│   └── styles/
│       └── styles.css    # Stylesheet with basic reset
├── webpack.common.js     # Shared webpack configuration
├── webpack.dev.js        # Development configuration
├── webpack.prod.js       # Production configuration
└── package.json
```

## Scripts

- **`npm start`** - Starts development server with hot reload at `http://localhost:8080`
- **`npm run build`** - Creates optimized production build in `dist/` folder

## Installed Packages

### Core
- `webpack` - Module bundler
- `webpack-cli` - Command line interface
- `webpack-dev-server` - Development server with live reloading

### Loaders & Plugins
- `css-loader` - Resolves CSS imports
- `style-loader` - Injects CSS into DOM (development)
- `mini-css-extract-plugin` - Extracts CSS to separate files (production)
- `html-webpack-plugin` - Generates HTML files with bundled assets

## Configuration Highlights

**Development Mode:**
- CSS injected via `style-loader` for hot reloading
- Source maps for debugging
- File watching enabled

**Production Mode:**
- CSS extracted to separate files with content hashing
- Clean dist folder on each build
- Optimized bundle sizes

## Getting Started

1. Clone or download this template
2. Run `npm install` to install dependencies
3. Start developing with `npm start`
4. Build for production with `npm run build`

This template provides a solid foundation for webpack-based projects with modern development workflows.
