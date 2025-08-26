export const ROLES = {
  STUDENT: "student",
  SPC: "spc",
  ADMIN: "admin",
};

export const PERMISSIONS = {
  // Student permissions
  VIEW_PROFILE: "view:profile",
  EDIT_PROFILE: "edit:profile",
  UPLOAD_RESUME: "upload:resume",
  VIEW_OFFERS: "view:offers",
  APPLY_TO_COMPANY: "apply:company",
  VIEW_APPLICATIONS: "view:applications",
  VIEW_SCHEDULE: "view:schedule",

  // SPC permissions
  VIEW_STUDENTS: "view:students",
  VIEW_COMPANIES: "view:companies",
  SEND_ANNOUNCEMENTS: "send:announcements",
  VERIFY_ELIGIBILITY: "verify:eligibility",
  FORWARD_COMPANY_INFO: "forward:company_info",

  // Admin permissions
  VIEW_ALL_STUDENTS: "view:all_students",
  VIEW_STATISTICS: "view:statistics",
  MANAGE_SPCS: "manage:spcs",
  EDIT_ANY_PROFILE: "edit:any_profile",
};

export const ROLE_PERMISSIONS = {
  [ROLES.STUDENT]: [
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.UPLOAD_RESUME,
    PERMISSIONS.VIEW_OFFERS,
    PERMISSIONS.APPLY_TO_COMPANY,
    PERMISSIONS.VIEW_APPLICATIONS,
    PERMISSIONS.VIEW_SCHEDULE,
  ],
  [ROLES.SPC]: [
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.VIEW_COMPANIES,
    PERMISSIONS.SEND_ANNOUNCEMENTS,
    PERMISSIONS.VERIFY_ELIGIBILITY,
    PERMISSIONS.FORWARD_COMPANY_INFO,
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.VIEW_ALL_STUDENTS,
    PERMISSIONS.VIEW_STATISTICS,
    PERMISSIONS.MANAGE_SPCS,
    PERMISSIONS.EDIT_ANY_PROFILE,
    PERMISSIONS.VIEW_COMPANIES,
    PERMISSIONS.SEND_ANNOUNCEMENTS,
  ],
};

export function hasPermission(userRole, permission) {
  if (!userRole) return false;
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
}

export function hasRole(user, requiredRole) {
  // Check both publicMetadata (server-set) and unsafeMetadata (client-set)
  const role = user?.publicMetadata?.role || user?.unsafeMetadata?.role;
  return role === requiredRole;
}

export function getUserRole(user) {
  // Check both publicMetadata (server-set) and unsafeMetadata (client-set)
  return user?.publicMetadata?.role || user?.unsafeMetadata?.role || null;
}
