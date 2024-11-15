import { google } from "@/lib/oauth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { lucia } from "@/lib/auth";
import { db } from "@/db";
import { userTable, oauthAccount } from "@/db/schema";
import { COOKIE_EXPIRATION } from "@/constants/constants";

type GoogleUser = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
};

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return new Response("No code or state found", { status: 400 });
  }

  const codeVerifier = cookies().get("codeVerifier")?.value;
  const savedState = cookies().get("state")?.value;

  if (!codeVerifier || !savedState) {
    return new Response("No code verifier or state found", { status: 400 });
  }

  if (savedState !== state) {
    return new Response("Invalid state", { status: 400 });
  }

  try {
    const { accessToken, refreshToken, accessTokenExpiresAt } =
      await google.validateAuthorizationCode(code, codeVerifier);

    const googleResponse = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      }
    );

    if (!googleResponse.ok) {
      throw new Error("Failed to fetch Google user data");
    }

    const googleData = (await googleResponse.json()) as GoogleUser;

    const result = await db.transaction(async (tx) => {
      const expDate = Date.now() + COOKIE_EXPIRATION;
      //count

      const user = await tx.query.userTable.findFirst({
        where: eq(userTable.googleId, googleData.id),
      });

      let currentUser;

      if (!user) {
        const [createdUser] = await tx
          .insert(userTable)
          .values({
            updatedAt: Date.now(),
            createdAt: Date.now(),
            id: googleData.id,
            googleId: googleData.id,
            email: googleData.email,
            isEmailVerified: googleData.verified_email,
          })
          .returning();

        if (!createdUser) {
          throw new Error("Failed to create user");
        }

        currentUser = createdUser;

        await tx.insert(oauthAccount).values({
          provider: "google",
          userId: createdUser.id,
          expiresAt: expDate,
          providerUserId: googleData.id,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        currentUser = user;
        await tx
          .update(oauthAccount)
          .set({
            //add 10 days from today in Date format
            expiresAt: expDate,
            providerUserId: googleData.id,
            accessToken: accessToken,
            refreshToken: refreshToken,
          })
          .where(eq(oauthAccount.userId, user.id));
      }

      return currentUser;
    });

    const userIdFinal = result.id.toString();

    const session = await lucia.createSession(userIdFinal, {});

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      expires: COOKIE_EXPIRATION,
    });

    return NextResponse.redirect(url.origin + "/admin");
  } catch (error) {
    console.error("OAuth error:", error);
    return new Response("Authentication failed", { status: 500 });
  }
};
