import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { GraduationCap, Building2, Users, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-black dark:border-white bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-black dark:bg-white text-white dark:text-black p-2 border-2 border-black dark:border-white">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-black  tracking-wider">Charitam</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="bg-black text-white border-4 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] font-black uppercase">
                    SIGN IN
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="border-4 border-black dark:border-white bg-white p-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="bg-yellow-400 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_white] inline-block px-8 py-4 rotate-[-1deg] mb-4">
              <h2 className="text-6xl font-black text-black">PLACEMENT</h2>
            </div>
            <div className="bg-pink-400 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_white] inline-block px-8 py-4 rotate-[1deg] mb-8">
              <h2 className="text-6xl font-black text-black">PORTAL</h2>
            </div>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-bold">
              Streamline your placement process. Connect students with
              opportunities. Track applications and manage your career journey.
            </p>

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="bg-black text-white border-4 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] font-black uppercase text-lg px-8 py-4 mr-4"
                >
                  GET STARTED
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-black text-white border-4 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] font-black uppercase text-lg px-8 py-4"
                >
                  GO TO DASHBOARD
                </Button>
              </Link>
            </SignedIn>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_white] bg-blue-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_white] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <div className="bg-black text-white p-3 border-2 border-black mr-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-black text-black uppercase">
                    Students
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-black font-bold">
                  Manage profiles, apply to companies, track applications
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_white] bg-green-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_white] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <div className="bg-black text-white p-3 border-2 border-black mr-4">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-black text-black uppercase">
                    SPCs
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-black font-bold">
                  Coordinate placements, manage students, company liaison
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_white] bg-orange-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_white] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <div className="bg-black text-white p-3 border-2 border-black mr-4">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-black text-black uppercase">
                    Admin
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-black font-bold">
                  Full system access, statistics, user management
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_white] bg-purple-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_white] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <div className="bg-black text-white p-3 border-2 border-black mr-4">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-black text-black uppercase">
                    Tracking
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-black font-bold">
                  Real-time application status and placement analytics
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
