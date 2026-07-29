# Selina Mogicato Portfolio

A clean, responsive portfolio site built with PHP, handcrafted CSS, and vanilla JavaScript.

It presents selected projects, background information, contact details, and a small hidden arcade layer that adds some personality without getting in the way of the main experience.

## Overview

This project is a custom portfolio website for Selina Mogicato, an application developer based in Switzerland. The site is designed around a minimal, polished presentation: strong typography, restrained motion, clear spacing, and a light/dark theme system.

## Highlights

- Responsive landing page with a polished hero and featured project sections
- Reusable PHP partials for shared layout and project rendering
- Lightweight design system powered by CSS tokens
- Light and dark theme support with persisted user preference
- Contact form with client-side validation and PHP mail handling
- Scroll-reveal animations and progressive enhancement throughout
- Dedicated arcade section with multiple browser games and hidden easter eggs

## Stack

- PHP
- HTML5
- CSS3
- Vanilla JavaScript
- Bootstrap Icons via CDN

## Project Structure

```text
.
├── index.php                 # Main portfolio page
├── karate.php                # Karate project page
├── imprint.php               # Legal / imprint page
├── sendMail.php              # Contact form handler
├── assets/
│   ├── css/                  # Design tokens, layout, components, page styles
│   ├── js/                   # Theme, animation, navigation, form, easter eggs
│   ├── images/               # Portfolio and branding assets
│   ├── php/                  # Partials, components, project data
│   └── arcade/               # Separate arcade experience and game files
└── README.md
```

## Local Development

Run the site with PHP’s built-in server from the project root:

```bash
php -S localhost:8000
```

Then open:

```text
http://localhost:8000
```

## Notes

- The contact form posts to `sendMail.php` and uses PHP sessions to return validation and status messages.
- Mail delivery depends on your local/server PHP mail configuration.
- The arcade can be opened directly from `assets/arcade/arcade.html`, and there is also a keyboard shortcut/easter egg built into the main site.

## Design Direction

The front end follows a minimal, product-style visual language:

- soft neutral surfaces
- restrained blue accents
- spacious layout and readable type
- subtle motion instead of heavy effects
- clean component structure over framework complexity

## Deployment

This project is suited to any PHP-capable host that can serve:

- `*.php` files
- static assets from `assets/`
- session support for form feedback
- mail handling if the contact form should send emails

## Author

**Selina Mogicato**

- Portfolio: `https://selina.mogicato.ch`
- GitHub: `https://github.com/Selimo100`
- LinkedIn: `https://www.linkedin.com/in/selina-mogicato-a48166316`

