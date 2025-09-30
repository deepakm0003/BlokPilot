"use client";
import { useEffect, useState } from "react";

export function A11yChecker() {
  const [report, setReport] = useState<string[]>([]);

  useEffect(() => {
    const issues: string[] = [];
    // Simple checks: missing alt attributes, low contrast demo (placeholder)
    document.querySelectorAll("img:not([alt])").forEach(() => issues.push("Image missing alt text"));
    // Expand with more rules as needed
    setReport(issues);
  }, []);

  return (
    <div className="rounded-2xl border border-neutral-200 p-6">
      <h3 className="font-semibold">Accessibility Checker</h3>
      {report.length === 0 ? (
        <p className="text-sm text-neutral-600 mt-2">No obvious issues found.</p>
      ) : (
        <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
          {report.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      )}
    </div>
  );
}


