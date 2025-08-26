import { UserButton } from "@clerk/nextjs";
import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import {
  GraduationCap,
  FileText,
  Send,
  Calendar,
  Building2,
  User,
  BarChart3,
  Upload,
  Bell,
  Star,
} from "lucide-react";

export default async function StudentDashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-black dark:border-gray-400 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-black dark:bg-gray-700 text-white p-2 border-2 border-black dark:border-gray-400">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-black tracking-wider">
                STUDENT PORTAL
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="h-6 w-6" />
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-black">
                  3
                </div>
              </div>
              <ThemeToggle />
              <div className="border-4 border-black dark:border-gray-400 bg-white dark:bg-gray-800 p-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-blue-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] inline-block px-6 py-3 rotate-[-1deg] mb-4">
            <h2 className="text-3xl font-black text-black">
              HEY {user?.firstName?.toUpperCase()}!
            </h2>
          </div>
          <p className="text-lg font-bold text-muted-foreground">
            Ready to land your dream job? Let's get started! 🚀
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-green-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">7</div>
            <div className="font-black text-black uppercase">Applications</div>
          </div>
          <div className="bg-yellow-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">3</div>
            <div className="font-black text-black uppercase">Interviews</div>
          </div>
          <div className="bg-purple-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">85%</div>
            <div className="font-black text-black uppercase">Profile</div>
          </div>
          <div className="bg-pink-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">45</div>
            <div className="font-black text-black uppercase">Job Matches</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/student/profile">
            <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] bg-green-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_#6b7280] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-black text-white p-2 border-2 border-black">
                    <User className="h-5 w-5" />
                  </div>
                  <CardTitle className="font-black text-black uppercase">
                    Profile
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-black font-bold text-sm">
                  Complete your profile
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/student/resume">
            <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] bg-yellow-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_#6b7280] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-black text-white p-2 border-2 border-black">
                    <Upload className="h-5 w-5" />
                  </div>
                  <CardTitle className="font-black text-black uppercase">
                    Resume
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-black font-bold text-sm">
                  Upload & manage resume
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/student/jobs">
            <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] bg-pink-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_#6b7280] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-black text-white p-2 border-2 border-black">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <CardTitle className="font-black text-black uppercase">
                    Jobs
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-black font-bold text-sm">
                  Browse opportunities
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/student/applications">
            <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] bg-orange-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_#6b7280] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-black text-white p-2 border-2 border-black">
                    <Send className="h-5 w-5" />
                  </div>
                  <CardTitle className="font-black text-black uppercase">
                    Applications
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-black font-bold text-sm">
                  Track your applications
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] rounded-none">
            <CardHeader>
              <CardTitle className="font-black uppercase text-xl">
                Recent Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-2 border-black bg-blue-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-black">Google</h4>
                      <p className="text-sm font-bold">Software Engineer</p>
                    </div>
                    <div className="bg-yellow-300 px-3 py-1 border-2 border-black font-black text-xs">
                      INTERVIEW
                    </div>
                  </div>
                </div>
                <div className="p-4 border-2 border-black bg-green-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-black">Microsoft</h4>
                      <p className="text-sm font-bold">Product Manager</p>
                    </div>
                    <div className="bg-green-300 px-3 py-1 border-2 border-black font-black text-xs">
                      SHORTLISTED
                    </div>
                  </div>
                </div>
                <div className="p-4 border-2 border-black bg-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-black">Apple</h4>
                      <p className="text-sm font-bold">iOS Developer</p>
                    </div>
                    <div className="bg-orange-300 px-3 py-1 border-2 border-black font-black text-xs">
                      APPLIED
                    </div>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4 bg-black text-white border-2 border-black font-black uppercase">
                VIEW ALL
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] rounded-none">
            <CardHeader>
              <CardTitle className="font-black uppercase text-xl">
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-2 border-black bg-red-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-black text-white p-2 border-2 border-black">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-black">Google Interview</h4>
                      <p className="text-sm font-bold">Tomorrow - 2:00 PM</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-2 border-black bg-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-black text-white p-2 border-2 border-black">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-black">Amazon Visit</h4>
                      <p className="text-sm font-bold">Friday - 10:00 AM</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-2 border-black bg-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-black text-white p-2 border-2 border-black">
                      <Star className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-black">Resume Workshop</h4>
                      <p className="text-sm font-bold">Saturday - 11:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
