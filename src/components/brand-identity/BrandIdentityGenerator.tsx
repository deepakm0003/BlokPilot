"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface BrandKit {
  brandName: string;
  brandDescription: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    surface: string;
  };
  typography: {
    fontFamily: string;
    headingFont: string;
    bodyFont: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
      "4xl": string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
    };
  };
  logo: {
    concept: string;
    description: string;
    style: string;
    elements: string[];
    usage: string;
    visualConcepts: {
      name: string;
      description: string;
      svg: string;
      colors: string[];
    }[];
  };
  components: {
    name: string;
    code: string;
    description: string;
    category: string;
  }[];
  brandGuidelines: {
    tone: string;
    personality: string[];
    values: string[];
    targetAudience: string;
    messaging: string;
  };
}

export function BrandIdentityGenerator() {
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [brandKit, setBrandKit] = useState<BrandKit | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"colors" | "typography" | "logo" | "components" | "guidelines">("colors");

  const generateBrandKit = async () => {
    if (!brandName.trim() || !brandDescription.trim()) return;
    
    setLoading(true);
    setBrandKit(null);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are an AI Brand Identity Generator. Create a complete, professional brand identity kit for:

Brand Name: ${brandName}
Description: ${brandDescription}

Generate a comprehensive brand identity that reflects the brand's personality and values. Return ONLY valid JSON with this exact structure:

{
  "brandName": "${brandName}",
  "brandDescription": "${brandDescription}",
  "colors": {
    "primary": "#3F83F8",
    "secondary": "#6366F1", 
    "accent": "#FFC857",
    "neutral": "#F3F4F6",
    "success": "#22C55E",
    "warning": "#F59E0B",
    "error": "#EF4444",
    "background": "#FFFFFF",
    "surface": "#FFFFFF"
  },
  "typography": {
    "fontFamily": "Inter, system-ui, sans-serif",
    "headingFont": "Inter, system-ui, sans-serif",
    "bodyFont": "Inter, system-ui, sans-serif",
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem"
    },
    "fontWeight": {
      "light": 300,
      "normal": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700,
      "extrabold": 800
    }
  },
  "logo": {
    "concept": "Modern AI-powered logo with geometric elements",
    "description": "A contemporary logo design featuring AI-inspired geometric shapes and modern typography that reflects innovation and content intelligence",
    "style": "Minimalist, geometric, AI-focused, professional",
    "elements": ["Geometric shapes", "AI-inspired elements", "Clean typography", "Modern color palette"],
    "usage": "Versatile design suitable for digital and print applications, perfect for AI/tech companies",
    "visualConcepts": [
      {
        "name": "AI Blocks",
        "description": "Geometric blocks representing content blocks with AI enhancement",
        "svg": "<svg width=\"120\" height=\"60\" viewBox=\"0 0 120 60\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"10\" y=\"15\" width=\"25\" height=\"25\" rx=\"4\" fill=\"#3F83F8\"/><rect x=\"40\" y=\"20\" width=\"25\" height=\"20\" rx=\"4\" fill=\"#6366F1\"/><rect x=\"70\" y=\"10\" width=\"25\" height=\"30\" rx=\"4\" fill=\"#FFC857\"/><circle cx=\"100\" cy=\"25\" r=\"8\" fill=\"#22C55E\"/><text x=\"10\" y=\"50\" font-family=\"Inter, sans-serif\" font-size=\"12\" font-weight=\"600\" fill=\"#1F2937\">${brandName}</text></svg>",
        "colors": ["#3F83F8", "#6366F1", "#FFC857", "#22C55E"]
      },
      {
        "name": "Pilot Wings",
        "description": "Stylized pilot wings with modern geometric design",
        "svg": "<svg width=\"120\" height=\"60\" viewBox=\"0 0 120 60\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20 30 L40 15 L60 30 L40 45 Z\" fill=\"#3F83F8\"/><path d=\"M60 30 L80 15 L100 30 L80 45 Z\" fill=\"#6366F1\"/><circle cx=\"50\" cy=\"30\" r=\"6\" fill=\"#FFC857\"/><text x=\"10\" y=\"55\" font-family=\"Inter, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"#1F2937\">${brandName}</text></svg>",
        "colors": ["#3F83F8", "#6366F1", "#FFC857"]
      },
      {
        "name": "Content Flow",
        "description": "Abstract representation of content flowing through AI processing",
        "svg": "<svg width=\"120\" height=\"60\" viewBox=\"0 0 120 60\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10 30 Q30 20 50 30 Q70 40 90 30\" stroke=\"#3F83F8\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"20\" cy=\"30\" r=\"4\" fill=\"#6366F1\"/><circle cx=\"50\" cy=\"30\" r=\"4\" fill=\"#FFC857\"/><circle cx=\"80\" cy=\"30\" r=\"4\" fill=\"#22C55E\"/><text x=\"10\" y=\"50\" font-family=\"Inter, sans-serif\" font-size=\"12\" font-weight=\"500\" fill=\"#6B7280\">${brandName}</text></svg>",
        "colors": ["#3F83F8", "#6366F1", "#FFC857", "#22C55E"]
      }
    ]
  },
  "components": [
    {
      "name": "Button",
      "description": "Primary and secondary button variants with hover states",
      "code": "export function Button({ children, variant = 'primary', size = 'md', ...props }) { const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'; const variants = { primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500', secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500', success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500', danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500' }; const sizes = { sm: 'px-3 py-1.5 text-sm rounded-md', md: 'px-4 py-2 text-base rounded-md', lg: 'px-6 py-3 text-lg rounded-lg' }; return <button className={\`\${baseClasses} \${variants[variant]} \${sizes[size]}\`} {...props}>{children}</button>; }",
      "category": "Buttons"
    },
    {
      "name": "Card",
      "description": "Flexible card component with image and content support",
      "code": "export function Card({ children, className = '', ...props }) { return <div className={\`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden \${className}\`} {...props}>{children}</div>; }",
      "category": "Layout"
    },
    {
      "name": "Input",
      "description": "Form input with focus states and validation styling",
      "code": "export function Input({ type = 'text', className = '', error, ...props }) { return <input type={type} className={\`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 \${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''} \${className}\`} {...props} />; }",
      "category": "Forms"
    }
  ]
}

Important: Return ONLY the JSON object, no additional text or formatting.`
        })
      });

      const data = await response.json();
      const aiResponse = data.text;
      
      // Parse AI response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const parsedBrandKit = JSON.parse(jsonMatch[0]);
          setBrandKit(parsedBrandKit);
        } catch (parseError) {
          console.error("Failed to parse AI response:", parseError);
          // Use the structured response from the prompt as fallback
          setBrandKit(generateMockBrandKit());
        }
      } else {
        // Use the structured response from the prompt as fallback
        setBrandKit(generateMockBrandKit());
      }
    } catch (error) {
      console.error("Brand kit generation error:", error);
      // Use the structured response from the prompt as fallback
      setBrandKit(generateMockBrandKit());
    } finally {
      setLoading(false);
    }
  };

  const generateMockBrandKit = (): BrandKit => ({
    brandName: brandName || "BlokPilot",
    brandDescription: brandDescription || "AI-powered content intelligence platform for Storyblok that helps teams create, optimize, and deploy winning content at scale. Modern, professional, and innovative.",
    colors: {
      primary: "#3F83F8",
      secondary: "#6366F1", 
      accent: "#FFC857",
      neutral: "#F3F4F6",
      success: "#22C55E",
      warning: "#F59E0B",
      error: "#EF4444",
      background: "#FFFFFF",
      surface: "#FFFFFF"
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      headingFont: "Inter, system-ui, sans-serif",
      bodyFont: "Inter, system-ui, sans-serif",
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800
      }
    },
    logo: {
      concept: "Modern AI-powered logo with geometric elements",
      description: "A contemporary logo design featuring AI-inspired geometric shapes and modern typography that reflects innovation and content intelligence",
      style: "Minimalist, geometric, AI-focused, professional",
      elements: ["Geometric shapes", "AI-inspired elements", "Clean typography", "Modern color palette"],
      usage: "Versatile design suitable for digital and print applications, perfect for AI/tech companies",
      visualConcepts: [
        {
          name: "AI Blocks",
          description: "Geometric blocks representing content blocks with AI enhancement",
          svg: `<svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="15" width="25" height="25" rx="4" fill="#3F83F8"/>
            <rect x="40" y="20" width="25" height="20" rx="4" fill="#6366F1"/>
            <rect x="70" y="10" width="25" height="30" rx="4" fill="#FFC857"/>
            <circle cx="100" cy="25" r="8" fill="#22C55E"/>
            <text x="10" y="50" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#1F2937">BlokPilot</text>
          </svg>`,
          colors: ["#3F83F8", "#6366F1", "#FFC857", "#22C55E"]
        },
        {
          name: "Pilot Wings",
          description: "Stylized pilot wings with modern geometric design",
          svg: `<svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 30 L40 15 L60 30 L40 45 Z" fill="#3F83F8"/>
            <path d="M60 30 L80 15 L100 30 L80 45 Z" fill="#6366F1"/>
            <circle cx="50" cy="30" r="6" fill="#FFC857"/>
            <text x="10" y="55" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="#1F2937">BlokPilot</text>
          </svg>`,
          colors: ["#3F83F8", "#6366F1", "#FFC857"]
        },
        {
          name: "Content Flow",
          description: "Abstract representation of content flowing through AI processing",
          svg: `<svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 30 Q30 20 50 30 Q70 40 90 30" stroke="#3F83F8" stroke-width="3" fill="none"/>
            <circle cx="20" cy="30" r="4" fill="#6366F1"/>
            <circle cx="50" cy="30" r="4" fill="#FFC857"/>
            <circle cx="80" cy="30" r="4" fill="#22C55E"/>
            <text x="10" y="50" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#6B7280">BlokPilot</text>
          </svg>`,
          colors: ["#3F83F8", "#6366F1", "#FFC857", "#22C55E"]
        }
      ]
    },
    components: [
      {
        name: "Button",
        code: `export function Button({ children, variant = 'primary', size = 'md', ...props }) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-base rounded-md",
    lg: "px-6 py-3 text-lg rounded-lg"
  };
  return (
    <button 
      className={\`\${baseClasses} \${variants[variant]} \${sizes[size]}\`}
      {...props}
    >
      {children}
    </button>
  );
}`,
        description: "Primary, secondary, success, and danger button variants with multiple sizes",
        category: "Buttons"
      },
      {
        name: "Card",
        code: `export function Card({ children, className = "", ...props }) {
  return (
    <div 
      className={\`bg-white rounded-lg border border-gray-200 shadow-sm p-6 \${className}\`}
      {...props}
    >
      {children}
    </div>
  );
}`,
        description: "Card component with consistent styling and spacing",
        category: "Layout"
      }
    ],
    brandGuidelines: {
      tone: "Professional, innovative, and approachable",
      personality: ["Modern", "Reliable", "Innovative", "User-focused"],
      values: ["Innovation", "Quality", "Customer Success", "Transparency"],
      targetAudience: "Tech-savvy professionals and businesses seeking modern solutions",
      messaging: "Empowering businesses with cutting-edge technology solutions"
    }
  });

  const generateCSS = () => {
    if (!brandKit) return "";
    
    return `:root {
  /* Brand Colors */
  --color-primary: ${brandKit.colors.primary};
  --color-secondary: ${brandKit.colors.secondary};
  --color-accent: ${brandKit.colors.accent};
  --color-neutral: ${brandKit.colors.neutral};
  --color-success: ${brandKit.colors.success};
  --color-warning: ${brandKit.colors.warning};
  --color-error: ${brandKit.colors.error};
  --color-background: ${brandKit.colors.background};
  --color-surface: ${brandKit.colors.surface};
  
  /* Typography */
  --font-family: ${brandKit.typography.fontFamily};
  --font-heading: ${brandKit.typography.headingFont};
  --font-body: ${brandKit.typography.bodyFont};
  
  /* Font Sizes */
  --font-size-xs: ${brandKit.typography.fontSize.xs};
  --font-size-sm: ${brandKit.typography.fontSize.sm};
  --font-size-base: ${brandKit.typography.fontSize.base};
  --font-size-lg: ${brandKit.typography.fontSize.lg};
  --font-size-xl: ${brandKit.typography.fontSize.xl};
  --font-size-2xl: ${brandKit.typography.fontSize["2xl"]};
  --font-size-3xl: ${brandKit.typography.fontSize["3xl"]};
  --font-size-4xl: ${brandKit.typography.fontSize["4xl"]};
  
  /* Font Weights */
  --font-weight-light: ${brandKit.typography.fontWeight.light};
  --font-weight-normal: ${brandKit.typography.fontWeight.normal};
  --font-weight-medium: ${brandKit.typography.fontWeight.medium};
  --font-weight-semibold: ${brandKit.typography.fontWeight.semibold};
  --font-weight-bold: ${brandKit.typography.fontWeight.bold};
  --font-weight-extrabold: ${brandKit.typography.fontWeight.extrabold};
}`;
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportBrandKit = () => {
    if (!brandKit) return;
    
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>${brandKit.brandName} - Brand Identity Kit</title>
    <style>
        body { font-family: Inter, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: ${brandKit.colors.primary}; font-size: 32px; margin-bottom: 8px; }
        h2 { color: ${brandKit.colors.secondary}; font-size: 24px; margin: 32px 0 16px 0; }
        h3 { color: #374151; font-size: 18px; margin: 24px 0 12px 0; }
        p { color: #6b7280; line-height: 1.6; margin-bottom: 16px; }
        .color-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 20px 0; }
        .color-item { display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; }
        .color-swatch { width: 40px; height: 40px; border-radius: 6px; border: 1px solid #d1d5db; }
        .color-info { flex: 1; }
        .color-name { font-weight: 600; color: #374151; margin-bottom: 4px; }
        .color-code { font-family: monospace; color: #6b7280; font-size: 14px; }
        .logo-section { margin: 32px 0; }
        .logo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin: 20px 0; }
        .logo-item { text-align: center; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; }
        .logo-svg { margin: 16px 0; }
        .component-section { margin: 32px 0; }
        .component-item { margin: 20px 0; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb; }
        .component-name { font-weight: 600; color: #374151; margin-bottom: 8px; }
        .component-code { font-family: monospace; font-size: 12px; color: #6b7280; background: white; padding: 12px; border-radius: 4px; overflow-x: auto; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; }
    </style>
</head>
<body>
    <div class="container">
        <h1>${brandKit.brandName}</h1>
        <p>${brandKit.brandDescription}</p>
        
        <h2>Brand Colors</h2>
        <div class="color-grid">
            ${Object.entries(brandKit.colors).map(([name, color]) => `
                <div class="color-item">
                    <div class="color-swatch" style="background-color: ${color}"></div>
                    <div class="color-info">
                        <div class="color-name">${name.charAt(0).toUpperCase() + name.slice(1)}</div>
                        <div class="color-code">${color}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <h2>Typography</h2>
        <p><strong>Font Family:</strong> ${brandKit.typography.fontFamily}</p>
        <p><strong>Heading Font:</strong> ${brandKit.typography.headingFont}</p>
        <p><strong>Body Font:</strong> ${brandKit.typography.bodyFont}</p>
        
        <h2>Logo Concepts</h2>
        <div class="logo-grid">
            ${brandKit.logo.visualConcepts.map(concept => `
                <div class="logo-item">
                    <h3>${concept.name}</h3>
                    <p>${concept.description}</p>
                    <div class="logo-svg">${concept.svg}</div>
                    <p><strong>Colors:</strong> ${concept.colors.join(', ')}</p>
                </div>
            `).join('')}
        </div>
        
        <h2>Component Library</h2>
        <div class="component-section">
            ${brandKit.components.map(component => `
                <div class="component-item">
                    <div class="component-name">${component.name}</div>
                    <p>${component.description}</p>
                    <div class="component-code">${component.code}</div>
                </div>
            `).join('')}
        </div>
        
        <div class="footer">
            <p>Generated by BlokPilot AI Brand Identity Generator</p>
        </div>
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandKit.brandName}-brand-kit.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: "colors", label: "Colors", icon: "🎨" },
    { id: "typography", label: "Typography", icon: "📝" },
    { id: "logo", label: "Logo", icon: "🏷️" },
    { id: "components", label: "Components", icon: "🧩" },
    { id: "guidelines", label: "Guidelines", icon: "📋" }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-semibold mb-4">🏷️ AI Brand Identity Mode</h2>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
          Generate complete brand identity kits with colors, typography, logo concepts, and component libraries. 
          Perfect for startups, agencies, and brands looking to establish a cohesive visual identity.
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
            <h3 className="text-xl font-semibold mb-4">Brand Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g., TechFlow, CreativeStudio, EcoBrand"
                  className="w-full p-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Brand Description
                </label>
                <textarea
                  value={brandDescription}
                  onChange={(e) => setBrandDescription(e.target.value)}
                  placeholder="Describe your brand, industry, values, and target audience..."
                  className="w-full h-24 p-3 border border-neutral-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <button
            onClick={generateBrandKit}
            disabled={loading || !brandName.trim() || !brandDescription.trim()}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Generating Brand Kit..." : "Generate Brand Identity"}
          </button>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {brandKit && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Brand Identity Kit</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(generateCSS())}
                    className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors"
                  >
                    {copied ? "Copied!" : "Copy CSS"}
                  </button>
                  <button 
                    onClick={exportBrandKit}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                  >
                    Export Kit
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 bg-neutral-100 p-1 rounded-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="rounded-2xl border border-neutral-200 p-6">
                {activeTab === "colors" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold">Brand Colors</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(brandKit.colors).map(([name, color]) => (
                        <div key={name} className="text-center">
                          <div 
                            className="w-16 h-16 mx-auto rounded-lg border border-neutral-200 mb-2"
                            style={{ backgroundColor: color }}
                          />
                          <div className="text-sm font-medium capitalize">{name}</div>
                          <div className="text-xs text-neutral-600">{color}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "typography" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold">Typography System</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-sm text-neutral-700 mb-2">Font Families</h5>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Heading:</span> {brandKit.typography.headingFont}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Body:</span> {brandKit.typography.bodyFont}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm text-neutral-700 mb-2">Font Sizes</h5>
                        <div className="space-y-2">
                          {Object.entries(brandKit.typography.fontSize).map(([size, value]) => (
                            <div key={size} className="flex items-center justify-between">
                              <span className="text-sm font-medium">{size}</span>
                              <span className="text-sm text-neutral-600">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "logo" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold">Logo Concepts</h4>
                    
                    {/* Visual Logo Concepts */}
                    <div className="space-y-6">
                      <h5 className="font-medium text-sm text-neutral-700">Visual Concepts</h5>
                      {brandKit.logo.visualConcepts && brandKit.logo.visualConcepts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {brandKit.logo.visualConcepts.map((concept, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-neutral-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                          >
                            <div className="mb-4">
                              <div className="w-full h-24 bg-white border border-neutral-100 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                                <div 
                                  className="w-full h-full flex items-center justify-center"
                                  dangerouslySetInnerHTML={{ __html: concept.svg }}
                                />
                              </div>
                              <h6 className="font-medium text-sm mb-1">{concept.name}</h6>
                              <p className="text-xs text-neutral-600 mb-3">{concept.description}</p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-neutral-700">Colors:</span>
                                <div className="flex gap-1">
                                  {concept.colors.map((color, colorIndex) => (
                                    <div
                                      key={colorIndex}
                                      className="w-4 h-4 rounded-full border border-neutral-200"
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <button
                                  onClick={() => copyToClipboard(concept.svg)}
                                  className="flex-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200 transition-colors"
                                >
                                  Copy SVG
                                </button>
                                <button className="flex-1 px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-medium hover:bg-green-200 transition-colors">
                                  Download
                                </button>
                              </div>
                            </div>
                          </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-neutral-500">
                          <p>Visual concepts will appear here after generating your brand identity.</p>
                        </div>
                      )}
                    </div>

                    {/* Logo Guidelines */}
                    <div className="space-y-4">
                      <h5 className="font-medium text-sm text-neutral-700">Logo Guidelines</h5>
                      <div className="space-y-3">
                        <div>
                          <h6 className="font-medium text-sm text-neutral-700 mb-1">Concept</h6>
                          <p className="text-sm">{brandKit.logo.concept}</p>
                        </div>
                        <div>
                          <h6 className="font-medium text-sm text-neutral-700 mb-1">Description</h6>
                          <p className="text-sm">{brandKit.logo.description}</p>
                        </div>
                        <div>
                          <h6 className="font-medium text-sm text-neutral-700 mb-1">Style</h6>
                          <p className="text-sm">{brandKit.logo.style}</p>
                        </div>
                        <div>
                          <h6 className="font-medium text-sm text-neutral-700 mb-1">Elements</h6>
                          <div className="flex flex-wrap gap-2">
                            {(brandKit.logo.elements || []).map((element, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                {element}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h6 className="font-medium text-sm text-neutral-700 mb-1">Usage</h6>
                          <p className="text-sm">{brandKit.logo.usage}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "components" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold">Component Library</h4>
                    <div className="space-y-4">
                      {(brandKit.components || []).map((component, index) => (
                        <div key={index} className="border border-neutral-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{component.name}</span>
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                {component.category}
                              </span>
                            </div>
                            <button
                              onClick={() => copyToClipboard(component.code)}
                              className="text-xs px-3 py-1 bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200 transition-colors"
                            >
                              Copy Code
                            </button>
                          </div>
                          <p className="text-xs text-neutral-600 mb-3">{component.description}</p>
                          <pre className="bg-neutral-50 p-3 rounded-md text-xs overflow-x-auto">
                            <code>{component.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "guidelines" && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold">Brand Guidelines</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-sm text-neutral-700 mb-2">Tone</h5>
                        <p className="text-sm">{brandKit.brandGuidelines.tone}</p>
                      </div>
                        <div>
                          <h5 className="font-medium text-sm text-neutral-700 mb-2">Personality</h5>
                          <div className="flex flex-wrap gap-2">
                            {(brandKit.brandGuidelines.personality || []).map((trait, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                {trait}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm text-neutral-700 mb-2">Values</h5>
                          <div className="flex flex-wrap gap-2">
                            {(brandKit.brandGuidelines.values || []).map((value, index) => (
                              <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                {value}
                              </span>
                            ))}
                          </div>
                        </div>
                      <div>
                        <h5 className="font-medium text-sm text-neutral-700 mb-2">Target Audience</h5>
                        <p className="text-sm">{brandKit.brandGuidelines.targetAudience}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm text-neutral-700 mb-2">Messaging</h5>
                        <p className="text-sm">{brandKit.brandGuidelines.messaging}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
