import { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-semibold">BlokPilot</div>
          <nav className="flex items-center gap-6 text-sm text-neutral-600">
            <a href="#predictive" className="hover:text-neutral-900">Predictive</a>
            <a href="#projects" className="hover:text-neutral-900">Projects</a>
            
            <a href="#ai" className="hover:text-neutral-900">AI</a>
            <a href="#design-system" className="hover:text-neutral-900">Design System</a>
            <a href="#localization" className="hover:text-neutral-900">Localization</a>
            <a href="#brand-identity" className="hover:text-neutral-900">Brand Identity</a>
            <a href="#content-autopilot" className="hover:text-neutral-900">Content Autopilot</a>
            <a href="#toolkit" className="hover:text-neutral-900">Toolkit</a>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-neutral-100 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-neutral-500 text-center">© 2025 BlokPilot • Made with ❤️ by Deepak</div>
      </footer>
    </div>
  );
}


