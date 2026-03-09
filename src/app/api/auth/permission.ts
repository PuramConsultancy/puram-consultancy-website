import { UserRole } from "@prisma/client";

/**
 * Permission Structure: [RESOURCE]:[ACTION]:[SCOPE]
 *
 * RESOURCE  → USER | FORM | SECTION | QUESTION | SUBMISSION | FILE | BOOKING
 * ACTION    → READ | CREATE | UPDATE | DELETE | * (all)
 * SCOPE     → OWN | ASSIGNED | * (system-wide)
 *
 * Examples:
 *   "SUBMISSION:READ:OWN"   → User can read only their own submissions
 *   "BOOKING:*:*"           → Admin can do anything with all bookings
 */

/* ------------------------------------------------------------------ */
/* ADMIN PERMISSIONS                                                     */
/* ------------------------------------------------------------------ */
export const ADMIN_PERMISSIONS = [
  "USER:*:*", // Full user management
  "FORM:*:*", // Full form management
  "SECTION:*:*", // Full section management
  "QUESTION:*:*", // Full question management
  "SUBMISSION:*:*", // Full submission management
  "FILE:*:*", // Full file management
  "BOOKING:*:*", // Full booking management
];

/* ------------------------------------------------------------------ */
/* USER PERMISSIONS                                                      */
/* ------------------------------------------------------------------ */
export const USER_PERMISSIONS = [
  "USER:READ:OWN", // Read own profile
  "USER:UPDATE:OWN", // Update own profile

  "FORM:READ:*", // View all available forms

  "SUBMISSION:CREATE:OWN", // Submit form responses
  "SUBMISSION:READ:OWN", // View own submissions
  "SUBMISSION:UPDATE:OWN", // Update own submissions

  "FILE:CREATE:OWN", // Upload files in own submissions
  "FILE:READ:OWN", // Read own uploaded files

  "BOOKING:CREATE:OWN", // Create own bookings
  "BOOKING:READ:OWN", // View own bookings
  "BOOKING:UPDATE:OWN", // Update own bookings (e.g. cancel)
];

/* ------------------------------------------------------------------ */
/* ROLE → PERMISSIONS MAP                                                */
/* ------------------------------------------------------------------ */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.ADMIN]: ADMIN_PERMISSIONS,
  [UserRole.USER]: USER_PERMISSIONS,
};

export type Permission = string;
