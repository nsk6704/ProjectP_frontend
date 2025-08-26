import { UserButton } from "@clerk/nextjs";
import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProfileForm } from "./profile-form";
import { GraduationCap, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function StudentProfile() {
  // const { userId } = await auth();

  // if (!userId) {
  //   redirect("/sign-in");
  // }

  const user = currentUser();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-black dark:border-gray-400 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/student"
                className="bg-black text-white p-2 border-2 border-black hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="bg-black dark:bg-gray-700 text-white p-2 border-2 border-black dark:border-gray-400">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-black tracking-wider">MY PROFILE</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="border-4 border-black dark:border-gray-400 bg-white dark:bg-gray-800 p-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="bg-green-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] inline-block px-6 py-3 rotate-[-1deg] mb-4">
            <h2 className="text-3xl font-black text-black">PROFILE SETUP</h2>
          </div>
          <p className="text-lg font-bold text-muted-foreground">
            Complete your profile to get better job matches!
          </p>
        </div>

        <ProfileForm user={user} />
      </main>
    </div>
  );
}
