import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserRole, hasRole, hasPermission } from "./roles";

export async function requireAuth() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();
  return { userId, user };
}

export async function requireRole(requiredRole) {
  const { user } = await requireAuth();

  if (!hasRole(user, requiredRole)) {
    // Redirect to their actual role page or onboarding
    const userRole = getUserRole(user);
    if (userRole && userRole !== requiredRole) {
      redirect(`/${userRole}`);
    } else {
      redirect("/onboarding");
    }
  }

  return user;
}

export async function requirePermission(permission) {
  const { user } = await requireAuth();
  const userRole = getUserRole(user);

  if (!hasPermission(userRole, permission)) {
    // Redirect to their role page
    if (userRole) {
      redirect(`/${userRole}`);
    } else {
      redirect("/onboarding");
    }
  }

  return user;
}