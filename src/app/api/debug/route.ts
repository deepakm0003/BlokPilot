export async function GET() {
  const gemini = process.env.GEMINI_API_KEY;
  const sbMgmt = process.env.STORYBLOK_MANAGEMENT_TOKEN;
  const sbPreview = process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN;
  return Response.json({
    gemini: {
      present: !!gemini,
      length: gemini?.length || 0,
      start: gemini ? gemini.substring(0, 6) : "none",
    },
    storyblok: {
      managementToken: {
        present: !!sbMgmt,
        length: sbMgmt?.length || 0,
        end: sbMgmt ? sbMgmt.slice(-6) : "none",
      },
      previewToken: {
        present: !!sbPreview,
        length: sbPreview?.length || 0,
        start: sbPreview ? sbPreview.substring(0, 6) : "none",
      },
    },
  });
}
