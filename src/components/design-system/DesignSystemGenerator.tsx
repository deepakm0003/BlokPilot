"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    success: string;
    warning: string;
    error: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  components: {
    name: string;
    code: string;
    description: string;
    category: string;
  }[];
}

export function DesignSystemGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState<DesignTokens | null>(null);
  const [copied, setCopied] = useState(false);

  const generateDesignSystem = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: `Generate a complete design system for: ${prompt}. Include colors, typography, spacing, border radius values, and ready-to-use React components with Tailwind CSS. Return as JSON with this structure: {
            "colors": {"primary": "#hex", "secondary": "#hex", "accent": "#hex", "neutral": "#hex", "success": "#hex", "warning": "#hex", "error": "#hex"},
            "typography": {"fontFamily": "string", "fontSize": {"xs": "0.75rem", "sm": "0.875rem", "base": "1rem", "lg": "1.125rem", "xl": "1.25rem", "2xl": "1.5rem", "3xl": "1.875rem"}, "fontWeight": {"light": 300, "normal": 400, "medium": 500, "semibold": 600, "bold": 700}},
            "spacing": {"xs": "0.25rem", "sm": "0.5rem", "md": "1rem", "lg": "1.5rem", "xl": "2rem", "2xl": "3rem"},
            "borderRadius": {"sm": "0.125rem", "md": "0.375rem", "lg": "0.5rem", "xl": "0.75rem"},
            "components": [{"name": "Button", "code": "export function Button({ children, variant = 'primary', ...props }) { return <button className={\`px-4 py-2 rounded-md font-medium \${variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'} transition-colors\`} {...props}>{children}</button> }", "description": "Primary and secondary button variants", "category": "Buttons"}]
          }`
        }),
      });
      const data = await response.json();
      
      // Parse the AI response and extract design tokens
      const aiResponse = data.text;
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedTokens = JSON.parse(jsonMatch[0]);
        setTokens(parsedTokens);
      } else {
        // Fallback to mock data if AI response is not in expected format
        setTokens(generateMockTokens());
      }
    } catch (error) {
      console.error("Error generating design system:", error);
      setTokens(generateMockTokens());
    } finally {
      setLoading(false);
    }
  };

  const generateMockTokens = (): DesignTokens => ({
    colors: {
      primary: "#3B82F6",
      secondary: "#8B5CF6", 
      accent: "#F59E0B",
      neutral: "#6B7280",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444"
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem", 
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem"
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      }
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem", 
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem"
    },
    borderRadius: {
      sm: "0.125rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem"
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
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={\`mb-4 \${className}\`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={\`text-lg font-semibold text-gray-900 \${className}\`}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={\`text-gray-600 \${className}\`}>
      {children}
    </div>
  );
}`,
        description: "Card component with header, title, and content sub-components",
        category: "Layout"
      },
      {
        name: "Input",
        code: `export function Input({ label, error, className = "", ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={\`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 \${error ? 'border-red-500 focus:ring-red-500' : ''} \${className}\`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}`,
        description: "Input field with label, error states, and focus styles",
        category: "Forms"
      }
    ]
  });

  const generateCSS = () => {
    if (!tokens) return "";
    
    return `:root {
  /* Colors */
  --color-primary: ${tokens.colors.primary};
  --color-secondary: ${tokens.colors.secondary};
  --color-accent: ${tokens.colors.accent};
  --color-neutral: ${tokens.colors.neutral};
  --color-success: ${tokens.colors.success};
  --color-warning: ${tokens.colors.warning};
  --color-error: ${tokens.colors.error};
  
  /* Typography */
  --font-family: ${tokens.typography.fontFamily};
  --font-size-xs: ${tokens.typography.fontSize.xs};
  --font-size-sm: ${tokens.typography.fontSize.sm};
  --font-size-base: ${tokens.typography.fontSize.base};
  --font-size-lg: ${tokens.typography.fontSize.lg};
  --font-size-xl: ${tokens.typography.fontSize.xl};
  --font-size-2xl: ${tokens.typography.fontSize["2xl"]};
  --font-size-3xl: ${tokens.typography.fontSize["3xl"]};
  
  /* Spacing */
  --spacing-xs: ${tokens.spacing.xs};
  --spacing-sm: ${tokens.spacing.sm};
  --spacing-md: ${tokens.spacing.md};
  --spacing-lg: ${tokens.spacing.lg};
  --spacing-xl: ${tokens.spacing.xl};
  --spacing-2xl: ${tokens.spacing["2xl"]};
  
  /* Border Radius */
  --radius-sm: ${tokens.borderRadius.sm};
  --radius-md: ${tokens.borderRadius.md};
  --radius-lg: ${tokens.borderRadius.lg};
  --radius-xl: ${tokens.borderRadius.xl};
}`;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generateCSS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-semibold mb-4">🎨 AI Design System Generator</h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Generate complete design systems with colors, typography, spacing, and components using AI. 
          Perfect for creating consistent, beautiful interfaces.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-xl font-semibold mb-4">Describe Your Design</h3>
            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Modern SaaS dashboard with blue and purple colors, clean typography, and professional spacing'"
                className="w-full h-32 p-4 border border-neutral-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={generateDesignSystem}
                disabled={loading || !prompt.trim()}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Generating Design System..." : "Generate Design System"}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          {tokens && (
            <div className="rounded-2xl border border-neutral-200 p-6">
              <h3 className="text-xl font-semibold mb-4">Live Preview</h3>
              <div className="space-y-4">
                {/* Color Preview */}
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Colors</h4>
                  <div className="flex gap-2">
                    {Object.entries(tokens.colors).map(([name, color]) => (
                      <div key={name} className="text-center">
                        <div 
                          className="w-8 h-8 rounded-lg border border-neutral-200"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs text-neutral-600 mt-1 block">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography Preview */}
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Typography</h4>
                  <div className="space-y-2">
                    <div 
                      className="text-2xl font-bold"
                      style={{ 
                        fontFamily: tokens.typography.fontFamily,
                        color: tokens.colors.primary 
                      }}
                    >
                      Heading Text
                    </div>
                    <div 
                      className="text-base"
                      style={{ 
                        fontFamily: tokens.typography.fontFamily,
                        color: tokens.colors.neutral 
                      }}
                    >
                      Body text with consistent spacing and typography
                    </div>
                  </div>
                </div>

                {/* Component Preview */}
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Components</h4>
                  <div className="space-y-3">
                    <button 
                      className="px-4 py-2 rounded-lg font-medium"
                      style={{
                        backgroundColor: tokens.colors.primary,
                        color: 'white',
                        borderRadius: tokens.borderRadius.md
                      }}
                    >
                      Primary Button
                    </button>
                    <div 
                      className="p-4 rounded-lg border"
                      style={{
                        borderColor: tokens.colors.neutral,
                        borderRadius: tokens.borderRadius.md,
                        padding: tokens.spacing.md
                      }}
                    >
                      Card component
                    </div>
                  </div>
                </div>

                {/* Component Library Preview */}
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">AI-Generated Components</h4>
                  <div className="space-y-4">
                    {tokens.components.map((component, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg border border-neutral-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{component.name}</span>
                            <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full">
                              {component.category}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-600 mb-3">{component.description}</p>
                        <div className="bg-neutral-50 p-3 rounded-md">
                          <pre className="text-xs text-neutral-800 overflow-x-auto">
                            <code>{component.code.substring(0, 200)}...</code>
                          </pre>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </motion.div>

        {/* Output Section */}
        {tokens && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Generated CSS Variables</h3>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors"
                >
                  {copied ? "Copied!" : "Copy CSS"}
                </button>
              </div>
              <pre className="bg-neutral-50 p-4 rounded-lg text-sm overflow-x-auto">
                <code>{generateCSS()}</code>
              </pre>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-6">
              <h3 className="text-xl font-semibold mb-4">Design Tokens</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">JSON Export</h4>
                  <pre className="bg-neutral-50 p-4 rounded-lg text-xs overflow-x-auto">
                    <code>{JSON.stringify(tokens, null, 2)}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-6">
              <h3 className="text-xl font-semibold mb-4">🧩 AI Component Library</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">React + Tailwind Components</h4>
                  <div className="space-y-3">
                    {tokens.components.map((component, index) => (
                      <div key={index} className="border border-neutral-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{component.name}</span>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                              {component.category}
                            </span>
                          </div>
                          <button
                            onClick={() => navigator.clipboard.writeText(component.code)}
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
                <div className="pt-4 border-t border-neutral-100">
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Download All Components</h4>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                      Download React Components
                    </button>
                    <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                      Download TypeScript
                    </button>
                    <button className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
                      Download Storybook
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
}
