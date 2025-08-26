import { UserButton } from "@clerk/nextjs";
import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  return (
    <div className="min-h-screen bg-yellow-100">
      {/* Neobrutalism Header */}
      <header className="neo-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div>
              <h1 className="text-3xl font-black text-white transform -rotate-1">
                PLACEMENT PORTAL
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="neo-text-primary bg-white px-4 py-2 border-3 border-black font-bold transform rotate-1">
                Welcome, {user?.firstName}!
              </span>
              <div className="bg-white border-4 border-black p-1">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Dashboard Card */}
        <div className="neo-card p-8 mb-8">
          <h2 className="text-4xl font-black mb-2 transform -rotate-1">
            DASHBOARD
          </h2>
          <p className="neo-text-secondary text-lg mb-6">
            Role-based content will appear here based on your user type.
          </p>

          <button className="neo-button mr-4 mb-4">VIEW PROFILE</button>
          <button className="neo-button-secondary mb-4">QUICK ACTIONS</button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="neo-sidebar-card p-6 transform hover:rotate-1 transition-transform">
            <div className="flex items-center mb-4">
              <div className="bg-black text-white p-3 border-2 border-black mr-4">
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black">PROFILE</h3>
            </div>
            <p className="neo-text-secondary text-base mb-4">
              Manage your profile and settings
            </p>
            <button className="neo-button text-sm py-2 px-4">MANAGE →</button>
          </div>

          {/* Applications Card */}
          <div className="bg-pink-300 border-4 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transform hover:-rotate-1 p-6">
            <div className="flex items-center mb-4">
              <div className="bg-black text-white p-3 border-2 border-black mr-4">
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 17-4-4 1.41-1.41L11 16.17l6.59-6.59L19 11l-8 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black">APPLICATIONS</h3>
            </div>
            <p className="neo-text-secondary text-base mb-4">
              View and manage your applications
            </p>
            <button className="bg-purple-500 text-white font-bold py-2 px-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]">
              VIEW ALL →
            </button>
          </div>

          {/* Schedule Card */}
          <div className="bg-blue-300 border-4 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transform hover:rotate-1 p-6">
            <div className="flex items-center mb-4">
              <div className="bg-black text-white p-3 border-2 border-black mr-4">
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black">SCHEDULE</h3>
            </div>
            <p className="neo-text-secondary text-base mb-4">
              Check your placement schedule
            </p>
            <button className="bg-orange-500 text-white font-bold py-2 px-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]">
              VIEW →
            </button>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-8 neo-card p-6">
          <h3 className="text-3xl font-black mb-6 transform rotate-1">
            QUICK STATS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-red-400 border-4 border-black p-4 text-center">
              <div className="text-3xl font-black">12</div>
              <div className="font-bold">Applications</div>
            </div>
            <div className="bg-green-400 border-4 border-black p-4 text-center">
              <div className="text-3xl font-black">5</div>
              <div className="font-bold">Interviews</div>
            </div>
            <div className="bg-yellow-400 border-4 border-black p-4 text-center">
              <div className="text-3xl font-black">2</div>
              <div className="font-bold">Offers</div>
            </div>
            <div className="bg-purple-400 border-4 border-black p-4 text-center">
              <div className="text-3xl font-black">85%</div>
              <div className="font-bold">Profile</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
