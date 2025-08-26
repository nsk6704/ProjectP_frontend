import { UserButton } from "@clerk/nextjs";
import { requireRole } from "@/lib/auth-helpers";
import { ROLES } from "@/lib/roles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Settings,
  Users,
  BarChart3,
  Shield,
  Database,
  TrendingUp,
  Building2,
  Award,
} from "lucide-react";

export default async function AdminDashboard() {
  // const { userId } = await auth();

  // if (!userId) {
  //   redirect("/sign-in");
  // }

  // const user = await currentUser();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-black dark:border-gray-400 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-black dark:bg-gray-700 text-white p-2 border-2 border-black dark:border-gray-400">
                <Shield className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-black tracking-wider">
                ADMIN PORTAL
              </h1>
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
          <div className="bg-purple-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] inline-block px-6 py-3 rotate-[-1deg] mb-4">
            <h2 className="text-3xl font-black text-black">ADMIN CONTROL</h2>
          </div>
          <p className="text-lg font-bold text-muted-foreground">
            Complete system oversight and analytics
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-red-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">1,247</div>
            <div className="font-black text-black uppercase">
              Total Students
            </div>
          </div>
          <div className="bg-blue-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">24</div>
            <div className="font-black text-black uppercase">SPCs</div>
          </div>
          <div className="bg-green-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">856</div>
            <div className="font-black text-black uppercase">Placed</div>
          </div>
          <div className="bg-yellow-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">68.7%</div>
            <div className="font-black text-black uppercase">Success Rate</div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] bg-orange-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_#6b7280] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-black text-white p-2 border-2 border-black">
                  <Users className="h-5 w-5" />
                </div>
                <CardTitle className="font-black text-black uppercase text-sm">
                  All Students
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-black text-white border-2 border-black font-black uppercase text-xs">
                MANAGE
              </Button>
            </CardContent>
          </Card>

          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] bg-cyan-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_#6b7280] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-black text-white p-2 border-2 border-black">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <CardTitle className="font-black text-black uppercase text-sm">
                  Analytics
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-black text-white border-2 border-black font-black uppercase text-xs">
                VIEW
              </Button>
            </CardContent>
          </Card>

          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] bg-lime-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_#6b7280] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-black text-white p-2 border-2 border-black">
                  <Building2 className="h-5 w-5" />
                </div>
                <CardTitle className="font-black text-black uppercase text-sm">
                  SPCs
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-black text-white border-2 border-black font-black uppercase text-xs">
                MANAGE
              </Button>
            </CardContent>
          </Card>

          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] bg-rose-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_#6b7280] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-black text-white p-2 border-2 border-black">
                  <Settings className="h-5 w-5" />
                </div>
                <CardTitle className="font-black text-black uppercase text-sm">
                  Settings
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-black text-white border-2 border-black font-black uppercase text-xs">
                CONFIG
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* System Health */}
          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] rounded-none">
            <CardHeader>
              <CardTitle className="font-black uppercase text-xl">
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-2 border-black bg-green-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-green-600" />
                      <span className="font-black">Database</span>
                    </div>
                    <div className="bg-green-300 px-3 py-1 border-2 border-black font-black text-xs">
                      HEALTHY
                    </div>
                  </div>
                </div>
                <div className="p-4 border-2 border-black bg-green-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span className="font-black">API</span>
                    </div>
                    <div className="bg-green-300 px-3 py-1 border-2 border-black font-black text-xs">
                      ONLINE
                    </div>
                  </div>
                </div>
                <div className="p-4 border-2 border-black bg-yellow-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-yellow-600" />
                      <span className="font-black">Security</span>
                    </div>
                    <div className="bg-yellow-300 px-3 py-1 border-2 border-black font-black text-xs">
                      ALERT
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Actions */}
          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] rounded-none">
            <CardHeader>
              <CardTitle className="font-black uppercase text-xl">
                Recent Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-2 border-black bg-blue-100">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-black">New SPC Added</h4>
                      <p className="text-sm font-bold">Computer Science Dept</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-2 border-black bg-purple-100">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-purple-600" />
                    <div>
                      <h4 className="font-black">Achievement Unlocked</h4>
                      <p className="text-sm font-bold">70% Placement Rate</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-2 border-black bg-green-100">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-black">Company Partnership</h4>
                      <p className="text-sm font-bold">Tesla signed MOU</p>
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
