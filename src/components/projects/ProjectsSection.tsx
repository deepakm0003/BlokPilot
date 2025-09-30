"use client";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution built with Storyblok CMS, featuring AI-powered product recommendations and seamless checkout experience.",
    tech: ["Next.js", "Storyblok", "Stripe", "Tailwind CSS", "Algolia"],
    features: [
      "AI-powered product recommendations",
      "Real-time inventory management",
      "Multi-language support",
      "Mobile-first responsive design",
      "SEO optimized content"
    ],
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&q=80&auto=format&fit=crop",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Corporate Website",
    description: "A professional corporate website with dynamic content management, team profiles, and case studies powered by Storyblok.",
    tech: ["Next.js", "Storyblok", "TypeScript", "Framer Motion", "Vercel"],
    features: [
      "Dynamic content management",
      "Team member profiles",
      "Case study showcase",
      "Contact form integration",
      "Analytics dashboard"
    ],
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80&auto=format&fit=crop",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Blog & News Platform",
    description: "A content-rich blog platform with AI content generation, advanced search, and accessibility features for inclusive content creation.",
    tech: ["Next.js", "Storyblok", "OpenAI", "Algolia", "Accessibility Tools"],
    features: [
      "AI content generation",
      "Advanced search with Algolia",
      "Accessibility checker",
      "Multi-author support",
      "Content scheduling"
    ],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80&auto=format&fit=crop",
    demoUrl: "#",
    githubUrl: "#"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-16">
      {/* Featured banner removed per request; showing a clean project grid with images. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-semibold mb-4">Featured Projects (Demo Showcase)</h2>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
          These example projects are for demo showcase purposes to illustrate Storyblok-powered experiences. 
          Images are representative and not affiliated; they demonstrate layout, visuals, and capabilities.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-12"
      >
        <div className="rounded-2xl border border-neutral-200 p-8 bg-gradient-to-r from-neutral-50 to-white">
          <h3 className="text-xl font-semibold mb-4">Ready to Build Your Project?</h3>
          <p className="text-neutral-600 mb-6">
            Use our AI assistant to generate content ideas, implement accessibility features, 
            and create amazing user experiences with Storyblok.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#ai"
              className="inline-flex items-center justify-center h-12 px-6 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
            >
              Try AI Assistant
            </a>
            
          </div>
        </div>
      </motion.div>
    </section>
  );
}
