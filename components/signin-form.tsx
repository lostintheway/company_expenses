import { createAuthUrl } from "@/app/api/signinActions";
import { redirect } from "next/navigation";

async function handleGoogleSignIn() {
  "use server";
  const res = await createAuthUrl();
  if (res.error) {
    // You might want to handle this error differently, perhaps by setting a cookie or session variable
    console.error("Error signing in:", res.error);
    return;
  } else if (res.success && res.authUrl) {
    redirect(res.authUrl.toString());
  }
}

export default function SignInForm() {
  return (
    <form action={handleGoogleSignIn}>
      <button type="submit">Sign in with Google</button>
    </form>
  );
}
