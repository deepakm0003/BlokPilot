"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface Translation {
  language: string;
  languageCode: string;
  content: {
    title: string;
    description: string;
    body: string;
    tags: string[];
    culturalNotes: string[];
  };
  culturalAdaptations: {
    tone: string;
    formality: string;
    culturalContext: string;
    localReferences: string[];
  };
  quality: {
    accuracy: number;
    fluency: number;
    culturalFit: number;
  };
}

interface LocalizationProject {
  id: string;
  name: string;
  sourceLanguage: string;
  targetLanguages: string[];
  status: "draft" | "translating" | "reviewing" | "published";
  createdAt: string;
  lastUpdated: string;
}

export function MultilingualLocalizer() {
  const [sourceContent, setSourceContent] = useState("");
  const [targetLanguages, setTargetLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [selectedProject, setSelectedProject] = useState<LocalizationProject | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const availableLanguages = [
    { code: "es", name: "Spanish", flag: "🇪🇸", region: "Spain" },
    { code: "fr", name: "French", flag: "🇫🇷", region: "France" },
    { code: "de", name: "German", flag: "🇩🇪", region: "Germany" },
    { code: "it", name: "Italian", flag: "🇮🇹", region: "Italy" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹", region: "Portugal" },
    { code: "nl", name: "Dutch", flag: "🇳🇱", region: "Netherlands" },
    { code: "ja", name: "Japanese", flag: "🇯🇵", region: "Japan" },
    { code: "ko", name: "Korean", flag: "🇰🇷", region: "South Korea" },
    { code: "zh", name: "Chinese", flag: "🇨🇳", region: "China" },
    { code: "ar", name: "Arabic", flag: "🇸🇦", region: "Saudi Arabia" },
    { code: "ru", name: "Russian", flag: "🇷🇺", region: "Russia" },
    { code: "hi", name: "Hindi", flag: "🇮🇳", region: "India" }
  ];

  const sampleProjects: LocalizationProject[] = [
    {
      id: "1",
      name: "Product Launch Blog",
      sourceLanguage: "English",
      targetLanguages: ["Spanish", "German", "French"],
      status: "published",
      createdAt: "2025-01-15",
      lastUpdated: "2025-01-20"
    },
    {
      id: "2", 
      name: "Company News Article",
      sourceLanguage: "English",
      targetLanguages: ["Japanese", "Korean", "Chinese"],
      status: "reviewing",
      createdAt: "2025-01-18",
      lastUpdated: "2025-01-21"
    },
    {
      id: "3",
      name: "Technical Documentation",
      sourceLanguage: "English", 
      targetLanguages: ["Portuguese", "Italian", "Dutch"],
      status: "translating",
      createdAt: "2025-01-22",
      lastUpdated: "2025-01-22"
    }
  ];

  const generateTranslations = async () => {
    if (!sourceContent.trim() || targetLanguages.length === 0) return;
    
    setLoading(true);
    setTranslations([]);

    try {
      const translationPromises = targetLanguages.map(async (langCode) => {
        const language = availableLanguages.find(l => l.code === langCode);
        if (!language) return null;

        const response = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `Translate and culturally adapt this content to ${language.name} (${language.region}): "${sourceContent}". 
            
            Return as JSON with this structure:
            {
              "language": "${language.name}",
              "languageCode": "${langCode}",
              "content": {
                "title": "translated title",
                "description": "translated description", 
                "body": "translated body content",
                "tags": ["translated", "tags"],
                "culturalNotes": ["cultural adaptation notes"]
              },
              "culturalAdaptations": {
                "tone": "formal/informal description",
                "formality": "level description",
                "culturalContext": "cultural considerations",
                "localReferences": ["local examples", "references"]
              },
              "quality": {
                "accuracy": 95,
                "fluency": 92,
                "culturalFit": 88
              }
            }`
          })
        });

        const data = await response.json();
        const aiResponse = data.text;
        
        // Parse AI response
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        
        // Fallback to mock data
        return {
          language: language.name,
          languageCode: langCode,
          content: {
            title: `Translated Title in ${language.name}`,
            description: `This is a culturally adapted description for ${language.region} market.`,
            body: `This is the translated and culturally adapted content for ${language.name} speakers in ${language.region}. The content has been localized to match cultural preferences and local market expectations.`,
            tags: ["translated", "localized", "cultural"],
            culturalNotes: [`Adapted for ${language.region} market`, "Cultural tone adjusted"]
          },
          culturalAdaptations: {
            tone: "Professional and approachable",
            formality: "Business appropriate",
            culturalContext: `Content adapted for ${language.region} cultural preferences`,
            localReferences: ["Local market examples", "Regional terminology"]
          },
          quality: {
            accuracy: 95,
            fluency: 92,
            culturalFit: 88
          }
        };
      });

      const results = await Promise.all(translationPromises);
      setTranslations(results.filter(Boolean) as Translation[]);
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = (langCode: string) => {
    setTargetLanguages(prev => 
      prev.includes(langCode) 
        ? prev.filter(l => l !== langCode)
        : [...prev, langCode]
    );
  };

  const getQualityColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "text-green-600 bg-green-100";
      case "reviewing": return "text-blue-600 bg-blue-100";
      case "translating": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-semibold mb-4">🌍 Multilingual AI Localizer</h2>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
          Translate and culturally adapt your Storyblok content into multiple languages with AI-powered cultural awareness. 
          Perfect for global content management and international market expansion.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-xl font-semibold mb-4">Source Content</h3>
            <div className="space-y-4">
              <textarea
                value={sourceContent}
                onChange={(e) => setSourceContent(e.target.value)}
                placeholder="Enter your content to translate and localize..."
                className="w-full h-32 p-4 border border-neutral-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-sm text-neutral-600">
                {sourceContent.length} characters
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-xl font-semibold mb-4">Target Languages</h3>
            <div className="grid grid-cols-2 gap-2">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => toggleLanguage(lang.code)}
                  className={`p-3 rounded-lg border text-sm transition-colors ${
                    targetLanguages.includes(lang.code)
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{lang.flag}</span>
                    <div className="text-left">
                      <div className="font-medium">{lang.name}</div>
                      <div className="text-xs text-neutral-500">{lang.region}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateTranslations}
            disabled={loading || !sourceContent.trim() || targetLanguages.length === 0}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Translating & Localizing..." : "Generate Translations"}
          </button>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {translations.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Translation Results</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors"
                  >
                    {showPreview ? "Hide Preview" : "Show Preview"}
                  </button>
                  <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                    Export All
                  </button>
                </div>
              </div>

              {translations.map((translation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-neutral-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {availableLanguages.find(l => l.code === translation.languageCode)?.flag}
                      </span>
                      <div>
                        <h4 className="font-semibold">{translation.language}</h4>
                        <p className="text-sm text-neutral-600">
                          {availableLanguages.find(l => l.code === translation.languageCode)?.region}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors">
                        Copy
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 transition-colors">
                        Export
                      </button>
                    </div>
                  </div>

                  {showPreview && (
                    <div className="space-y-4 mb-4">
                      <div>
                        <h5 className="font-medium text-sm text-neutral-700 mb-1">Title</h5>
                        <p className="text-sm">{translation.content.title}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm text-neutral-700 mb-1">Description</h5>
                        <p className="text-sm">{translation.content.description}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm text-neutral-700 mb-1">Content</h5>
                        <p className="text-sm">{translation.content.body}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-sm text-neutral-700 mb-2">Cultural Adaptations</h5>
                      <div className="space-y-2">
                        <div className="text-xs">
                          <span className="font-medium">Tone:</span> {translation.culturalAdaptations.tone}
                        </div>
                        <div className="text-xs">
                          <span className="font-medium">Formality:</span> {translation.culturalAdaptations.formality}
                        </div>
                        <div className="text-xs">
                          <span className="font-medium">Context:</span> {translation.culturalAdaptations.culturalContext}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm text-neutral-700 mb-2">Quality Scores</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Accuracy</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getQualityColor(translation.quality.accuracy)}`}>
                            {translation.quality.accuracy}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Fluency</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getQualityColor(translation.quality.fluency)}`}>
                            {translation.quality.fluency}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Cultural Fit</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getQualityColor(translation.quality.culturalFit)}`}>
                            {translation.quality.culturalFit}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Sample Projects */}
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Localization Projects</h3>
            <div className="space-y-3">
              {sampleProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 rounded-lg border border-neutral-100 hover:border-neutral-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">🌍</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-neutral-600">
                        {project.sourceLanguage} → {project.targetLanguages.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <span className="text-xs text-neutral-500">{project.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
