import { clerkMiddleware } from "@clerk/nextjs/server";

// Simple middleware that just protects routes requiring authentication
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Protected routes that require authentication
  const isProtectedPath =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/student") ||
    req.nextUrl.pathname.startsWith("/spc") ||
    req.nextUrl.pathname.startsWith("/admin") ||
    req.nextUrl.pathname.startsWith("/onboarding");

  // Only run auth protection on specified routes
  if (isProtectedPath) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
