// tests/api/ai/route.test.ts
/**
 * Unit tests for the AI route implementation.
 *
 * The tests verify that:
 *   1. The route returns 500 when the GEMINI_API_KEY env var is missing.
 *   2. The route validates the incoming payload.
 *   3. When a valid key is present, the request is forwarded to the Gemini API
 *      (mocked) and the response is returned correctly.
 */

import { POST } from "../../../src/app/api/ai/route";
import { NextResponse } from "next/server";

// Mock the global fetch used inside the route
global.fetch = jest.fn();

describe("POST /api/ai", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv }; // reset env for each test
  });

  afterAll(() => {
    process.env = originalEnv; // restore original env after suite
  });

  test("returns 500 when GEMINI_API_KEY is not set", async () => {
    delete process.env.GEMINI_API_KEY;
    const request = new Request("http://localhost/api/ai", {
      method: "POST",
      body: JSON.stringify({ prompt: "Hello" })
    });

    const response = await POST(request) as NextResponse;
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe("Server configuration error");
    expect(fetch).not.toHaveBeenCalled();
  });

  test("returns 400 for invalid payload", async () => {
    process.env.GEMINI_API_KEY = "dummy-key";
    const request = new Request("http://localhost/api/ai", {
      method: "POST",
      body: JSON.stringify({ prompt: "" }) // empty prompt
    });

    const response = await POST(request) as NextResponse;
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Prompt must be a non‑empty string");
    expect(fetch).not.toHaveBeenCalled();
  });

  test("forwards request to Gemini and returns result when key is present", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    const mockGeminiResponse = {
      candidates: [{ content: { parts: [{ text: "Reply from Gemini" }] } }]
    };
    // @ts-ignore – jest mock typing
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockGeminiResponse
    });

    const request = new Request("http://localhost/api/ai", {
      method: "POST",
      body: JSON.stringify({ prompt: "Hello Gemini" })
    });

    const response = await POST(request) as NextResponse;
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.result).toEqual(mockGeminiResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    const fetchCallArgs = (fetch as jest.Mock).mock.calls[0];
    expect(fetchCallArgs[0]).toBe("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent");
    const fetchOptions = fetchCallArgs[1];
    expect(fetchOptions?.method).toBe("POST");
    expect(fetchOptions?.headers).toMatchObject({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
    });
    const body = JSON.parse(fetchOptions?.body as string);
    expect(body.contents[0].parts[0].text).toBe("Hello Gemini");
  });
});
