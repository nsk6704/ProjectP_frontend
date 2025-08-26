"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROLES } from "@/lib/roles";
import { Users, Building2, Settings } from "lucide-react";
import { setUserRole } from "./actions"; // Import the server action

export function RoleSelection() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const handleRoleSelection = async (role) => {
    setIsLoading(true);
    
    try {
      // Call the server action instead of client-side update
      await setUserRole(role);
      // The server action will handle the redirect
    } catch (error) {
      console.error("❌ Error updating role:", error);
      setIsLoading(false);
    }
  };

  const roles = [
    {
      id: ROLES.STUDENT,
      title: "STUDENT",
      description: "Apply to companies, track applications, manage profile",
      icon: Users,
      color: "bg-blue-300",
    },
    {
      id: ROLES.SPC,
      title: "SPC",
      description: "Coordinate placements, manage students, company liaison",
      icon: Building2,
      color: "bg-green-300",
    },
    {
      id: ROLES.ADMIN,
      title: "ADMIN",
      description: "Full system access, statistics, user management",
      icon: Settings,
      color: "bg-purple-300",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] rounded-none">
        <CardHeader>
          <CardTitle className="font-black uppercase text-center text-2xl">
            SELECT YOUR ROLE
          </CardTitle>
          <CardDescription className="text-center font-bold">
            Choose your role in the placement system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-xs text-gray-500 p-2 border border-gray-300 rounded">
            <strong>Debug Info:</strong>
            <br />
            User ID: {user?.id}
            <br />
            Public Metadata: {JSON.stringify(user?.publicMetadata || {})}
            <br />
            Unsafe Metadata: {JSON.stringify(user?.unsafeMetadata || {})}
          </div>

          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Button
                key={role.id}
                onClick={() => handleRoleSelection(role.id)}
                disabled={isLoading}
                className={`w-full p-6 h-auto flex items-start gap-4 border-4 border-black dark:border-gray-400 shadow-[4px_4px_0px_0px_black] dark:shadow-[4px_4px_0px_0px_#6b7280] hover:shadow-[2px_2px_0px_0px_black] dark:hover:shadow-[2px_2px_0px_0px_#6b7280] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 rounded-none ${role.color} text-black disabled:opacity-50`}
              >
                <div className="bg-black text-white p-3 border-2 border-black">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <div className="font-black text-lg uppercase">
                    {role.title}
                  </div>
                  <div className="text-sm font-bold opacity-80">
                    {role.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {isLoading && (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-4 border-black dark:border-white"></div>
          <p className="text-sm font-bold mt-2">Setting up your account...</p>
          <p className="text-xs text-muted-foreground mt-1">
            This may take a moment
          </p>
        </div>
      )}
    </div>
  );
}