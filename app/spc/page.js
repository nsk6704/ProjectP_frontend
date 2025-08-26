import { UserButton } from "@clerk/nextjs";
import { requireRole } from "@/lib/auth-helpers";
import { ROLES } from "@/lib/roles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Building2,
  Users,
  Send,
  CheckCircle,
  MessageSquare,
  BarChart3,
  Calendar,
} from "lucide-react";

export default async function SPCDashboard() {
  // const user = await requireRole(ROLES.SPC);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-black dark:border-gray-400 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-black dark:bg-gray-700 text-white p-2 border-2 border-black dark:border-gray-400">
                <Building2 className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-black tracking-wider">SPC PORTAL</h1>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-green-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] inline-block px-6 py-3 rotate-[1deg] mb-4">
            <h2 className="text-3xl font-black text-black">SPC DASHBOARD</h2>
          </div>
          <p className="text-lg font-bold text-muted-foreground">
            Coordinate placements and manage your students effectively
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">124</div>
            <div className="font-black text-black uppercase">Students</div>
          </div>
          <div className="bg-yellow-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">15</div>
            <div className="font-black text-black uppercase">Companies</div>
          </div>
          <div className="bg-green-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">89</div>
            <div className="font-black text-black uppercase">Placed</div>
          </div>
          <div className="bg-pink-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">72%</div>
            <div className="font-black text-black uppercase">Rate</div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] bg-orange-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_#6b7280] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-black text-white p-2 border-2 border-black">
                  <Users className="h-5 w-5" />
                </div>
                <CardTitle className="font-black text-black uppercase">
                  Students
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-black font-bold mb-4 text-sm">
                Manage department students
              </p>
              <Button className="w-full bg-black text-white border-2 border-black font-black uppercase text-sm">
                MANAGE
              </Button>
            </CardContent>
          </Card>

          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] bg-purple-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_#6b7280] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-black text-white p-2 border-2 border-black">
                  <Building2 className="h-5 w-5" />
                </div>
                <CardTitle className="font-black text-black uppercase">
                  Companies
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-black font-bold mb-4 text-sm">
                Track visiting companies
              </p>
              <Button className="w-full bg-black text-white border-2 border-black font-black uppercase text-sm">
                VIEW
              </Button>
            </CardContent>
          </Card>

          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] bg-red-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_#6b7280] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-black text-white p-2 border-2 border-black">
                  <Send className="h-5 w-5" />
                </div>
                <CardTitle className="font-black text-black uppercase">
                  Announce
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-black font-bold mb-4 text-sm">
                Send messages to students
              </p>
              <Button className="w-full bg-black text-white border-2 border-black font-black uppercase text-sm">
                SEND
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] rounded-none">
            <CardHeader>
              <CardTitle className="font-black uppercase text-xl">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-2 border-black bg-green-100">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-black">Student Placed</h4>
                      <p className="text-sm font-bold">John Doe - Google</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-2 border-black bg-blue-100">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-black">New Company Visit</h4>
                      <p className="text-sm font-bold">Amazon - Next Week</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-2 border-black bg-yellow-100">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-yellow-600" />
                    <div>
                      <h4 className="font-black">Announcement Sent</h4>
                      <p className="text-sm font-bold">
                        Interview Tips - 45 students
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] rounded-none">
            <CardHeader>
              <CardTitle className="font-black uppercase text-xl">
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-2 border-black bg-orange-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-black">Verify Eligibility</h4>
                      <p className="text-sm font-bold">
                        12 students - Microsoft
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-orange-500 text-white border-2 border-black font-black text-xs"
                    >
                      DO IT
                    </Button>
                  </div>
                </div>
                <div className="p-4 border-2 border-black bg-pink-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-black">Schedule Interview</h4>
                      <p className="text-sm font-bold">8 students - Apple</p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-pink-500 text-white border-2 border-black font-black text-xs"
                    >
                      SCHEDULE
                    </Button>
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
