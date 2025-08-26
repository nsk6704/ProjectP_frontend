import { UserButton } from "@clerk/nextjs";
import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { JobCard } from "./job-card";
import { GraduationCap, ArrowLeft, Search, Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock job data
const jobs = [
  {
    id: 1,
    company: "Google",
    position: "Software Engineer",
    location: "Bangalore",
    salary: "₹18-25 LPA",
    type: "Full-time",
    description:
      "Join Google's engineering team to build products used by billions.",
    requirements: ["React", "Node.js", "Python", "System Design"],
    applied: false,
    deadline: "2024-02-15",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/google.svg",
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Product Manager",
    location: "Hyderabad",
    salary: "₹22-30 LPA",
    type: "Full-time",
    description: "Lead product strategy for Microsoft's cloud solutions.",
    requirements: [
      "Product Strategy",
      "Analytics",
      "Leadership",
      "Tech Background",
    ],
    applied: true,
    deadline: "2024-02-20",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoft.svg",
  },
  {
    id: 3,
    company: "Amazon",
    position: "DevOps Engineer",
    location: "Pune",
    salary: "₹16-22 LPA",
    type: "Full-time",
    description:
      "Build and maintain scalable infrastructure for Amazon's services.",
    requirements: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    applied: false,
    deadline: "2024-02-25",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazon.svg",
  },
  {
    id: 4,
    company: "Netflix",
    position: "Data Scientist",
    location: "Mumbai",
    salary: "₹20-28 LPA",
    type: "Full-time",
    description:
      "Analyze user data to improve Netflix's recommendation algorithms.",
    requirements: ["Python", "Machine Learning", "SQL", "Statistics"],
    applied: false,
    deadline: "2024-03-01",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg",
  },
];

export default async function StudentJobs() {
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
              <h1 className="text-2xl font-black tracking-wider">
                JOB OPPORTUNITIES
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
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-pink-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] inline-block px-6 py-3 rotate-[1deg] mb-4">
            <h2 className="text-3xl font-black text-black">
              FIND YOUR DREAM JOB!
            </h2>
          </div>
          <p className="text-lg font-bold text-muted-foreground">
            Browse through amazing opportunities from top companies
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] rounded-none mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, companies, or skills..."
                  className="border-4 border-black rounded-none font-bold pl-10"
                />
              </div>
              <Button className="bg-blue-400 text-black border-4 border-black font-black px-6">
                <Filter className="mr-2 h-4 w-4" />
                FILTER
              </Button>
              <Button className="bg-green-400 text-black border-4 border-black font-black px-6">
                <Search className="mr-2 h-4 w-4" />
                SEARCH
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-yellow-300 border-4 border-black p-4 text-center">
            <div className="text-2xl font-black text-black">{jobs.length}</div>
            <div className="font-black text-black uppercase text-sm">
              Total Jobs
            </div>
          </div>
          <div className="bg-green-300 border-4 border-black p-4 text-center">
            <div className="text-2xl font-black text-black">
              {jobs.filter((j) => j.applied).length}
            </div>
            <div className="font-black text-black uppercase text-sm">
              Applied
            </div>
          </div>
          <div className="bg-blue-300 border-4 border-black p-4 text-center">
            <div className="text-2xl font-black text-black">
              {jobs.filter((j) => !j.applied).length}
            </div>
            <div className="font-black text-black uppercase text-sm">
              Available
            </div>
          </div>
          <div className="bg-purple-300 border-4 border-black p-4 text-center">
            <div className="text-2xl font-black text-black">85%</div>
            <div className="font-black text-black uppercase text-sm">
              Match Rate
            </div>
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>
    </div>
  );
}
