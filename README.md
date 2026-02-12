# Local Business Website - Learning Project

A modern web development learning project built with **Deno**, **Vite**, **React Router**, **TypeScript**, **Tailwind CSS**, and **ShadCDN**.

## 🎯 Purpose

This project is designed to deepen understanding of:
- **Deno** as an alternative to Node.js
- **Vite** as a modern, fast build tool
- **React Router** for client-side routing without a framework wrapper
- **Tailwind CSS** for utility-first styling
- **ShadCDN** for beautiful, customizable React components

## 🚀 Quick Start

### Prerequisites
- [Deno](https://deno.com) installed

### Installation & Development

```bash
# Navigate to project directory
cd local-business-site

# Start dev server (opens at localhost:3000)
deno task dev
```

### Building for Production

```bash
# Build optimized production bundle
deno task build

# Preview production build locally
deno task preview
```

## 📁 Project Structure

```
src/
├── components/     # Reusable React components (for ShadCDN)
├── pages/          # Page components (Home, About, Contact)
├── styles/         # Global CSS and Tailwind
├── main.tsx        # React entry point
└── App.tsx         # Main App with routing

vite.config.ts      # Vite configuration
tailwind.config.js  # Tailwind CSS configuration
deno.json           # Deno configuration and tasks
```

## 🛠 Tech Stack Explained

### Deno
- Modern JavaScript/TypeScript runtime (alternative to Node.js)
- Secure by default, but we allow network/read/env with `--allow-all` for dev
- Imports from `npm:` for npm packages

### Vite
- Lightning-fast build tool that replaces Webpack
- Instant HMR (Hot Module Replacement) for rapid development
- Configured in `vite.config.ts`

### React Router
- Client-side routing library
- Learn how routing works without Next.js abstractions
- Gives you control over your app architecture

### Tailwind CSS
- Utility-first CSS framework
- Build complex designs with predefined utility classes
- See `tailwind.config.js` for customization

### ShadCDN
- Pre-built React components built on Radix UI + Tailwind
- Copy components into your project (not an npm install)
- Fully customizable, no vendor lock-in

## 📝 Next Steps

1. **Add ShadCDN Components**: Visit [shadcn/ui](https://ui.shadcn.com) and copy components into `src/components`
2. **Style More Pages**: Practice Tailwind utilities on each page
3. **Add Features**: Forms, animations, interactive elements
4. **Connect Backend**: Add API routes when ready

## 🔗 Resources

- [Deno Documentation](https://docs.deno.com)
- [Vite Guide](https://vitejs.dev)
- [React Router Docs](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [ShadCDN Components](https://ui.shadcn.com)

## 📄 License

MIT
