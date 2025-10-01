import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const spaceId = "287490777580041";
    const devToken = "ckWxdls3BOdatw8LE6mxGwtt-96250502841037-Nd_ADfyJfeEfL557Nis4";
    
    const managementToken = process.env.STORYBLOK_MANAGEMENT_TOKEN || devToken;
    
    if (!managementToken) {
      return new Response(
        JSON.stringify({ error: "No management token available" }),
        { status: 400 }
      );
    }

    // Test 1: Check if space exists
    const spaceUrl = `https://mapi.storyblok.com/v1/spaces/${spaceId}`;
    const spaceRes = await fetch(spaceUrl, {
      headers: {
        Authorization: managementToken,
        "Content-Type": "application/json",
      }
    });
    
    const spaceData = await spaceRes.json();
    
    // Test 2: List stories
    const storiesUrl = `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories?per_page=10&with_drafts=true`;
    const storiesRes = await fetch(storiesUrl, {
      headers: {
        Authorization: managementToken,
        "Content-Type": "application/json",
      }
    });
    
    const storiesData = await storiesRes.json();

    return new Response(
      JSON.stringify({
        space: {
          exists: spaceRes.ok,
          status: spaceRes.status,
          data: spaceData
        },
        stories: {
          exists: storiesRes.ok,
          status: storiesRes.status,
          count: Array.isArray(storiesData.stories) ? storiesData.stories.length : 0,
          data: storiesData
        },
        token: {
          length: managementToken.length,
          prefix: managementToken.substring(0, 10) + "..."
        }
      }, null, 2),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: `Test error: ${e}` }),
      { status: 500 }
    );
  }
}
