"use client";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
}

export function ProjectCard({ title, description, tech, features, image, demoUrl, githubUrl }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video bg-neutral-100 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-neutral-600 mb-4">{description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Key Features:</h4>
          <ul className="text-sm text-neutral-600 space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Tech Stack:</h4>
          <div className="flex flex-wrap gap-2">
            {tech.map((tech, index) => (
              <span key={index} className="px-2 py-1 bg-neutral-100 text-xs rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-3">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-neutral-900 text-white text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Live Demo
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-neutral-200 text-neutral-700 text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}
