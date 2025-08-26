"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function setUserRole(role) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Not authenticated");
  }

  try {
    // Server-side update of public metadata using correct method
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role }
    });
    
    console.log(`✅ Server: Updated user ${userId} role to ${role}`);
    
    // Server-side redirect
    redirect(`/${role}`);
  } catch (error) {
    console.error("Server action error:", error);
    throw error;
  }
}