import SignInForm from "@/components/signin-form";
import React from "react";
import { toast } from "sonner";

export default function SignIn() {
  // const onGoogleSignInClicked = async () => {
  //   const res = await createAuthUrl();
  //   if (res.error) {
  //     toast("Error signing in", { description: res.error });
  //   } else if (res.success) {
  //     if (res.authUrl) {
  //       window.location.href = res.authUrl.toString();
  //     }
  //   }
  // };
  return (
    <div>
      <SignInForm />
    </div>
  );
}
