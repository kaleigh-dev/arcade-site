export default function About() {
  return (
    <div className="prose prose-lg max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <p className="text-gray-700 mb-4 text-lg">
          This is a learning project designed to help understand modern web development tools and frameworks.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tech Stack</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2">
            <span className="text-primary font-bold">→</span> <strong>Deno</strong> - Modern JavaScript/TypeScript runtime
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary font-bold">→</span> <strong>Vite</strong> - Ultra-fast build tool
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary font-bold">→</span> <strong>React Router</strong> - Client-side routing
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary font-bold">→</span> <strong>TypeScript</strong> - Type-safe JavaScript
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary font-bold">→</span> <strong>Tailwind CSS</strong> - Utility-first styling
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary font-bold">→</span> <strong>ShadCDN</strong> - Beautiful React components
          </li>
        </ul>
      </div>
    </div>
  );
}
