"use server";
import { google } from "@/lib/oauth";
import { generateState, generateCodeVerifier } from "arctic";
import { cookies } from "next/headers";

export const createAuthUrl = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("google_oauth_state", state, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 5, // is 5 days
      sameSite: "lax",
    });

    cookies().set(
      "codeVerifier",
      codeVerifier,

      {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        // sameSite: "strict",
      }
    );
    cookies().set("state", state, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "strict",
    });

    const authUrl = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ["profile", "email"],
    });
    return { success: true, authUrl };
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "Unknown error" };
    }
  }
};
