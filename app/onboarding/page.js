import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { RoleSelection } from "./role-selection";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function Onboarding() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  // Don't check for existing role here - let them select even if they have one
  // This allows users to change roles if needed

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="bg-yellow-400 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] inline-block px-8 py-4 rotate-[-2deg] mb-4">
              <h1 className="text-4xl font-black text-black">WELCOME!</h1>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Hello {user?.firstName}!
            </h2>
            <p className="text-muted-foreground font-bold">
              Let&apos;s set up your profile to get started.
            </p>
          </div>

          <RoleSelection />
        </div>
      </div>
    </div>
  );
}
