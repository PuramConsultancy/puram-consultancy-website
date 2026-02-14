/**
 * Permission Structure Overview:
 *
 * Permissions follow a 3-part syntax:
 *
 *    [RESOURCE]:[ACTION]:[SCOPE]
 *
 * This ensures scalable and consistent Role-Based Access Control (RBAC)
 * across the Puram Consultancy platform.
 *
 * -------------------------------------------------------------
 * Components:
 *
 * 1. RESOURCE
 *    The entity being acted upon:
 *    - USER
 *    - FORM
 *    - SECTION
 *    - QUESTION
 *    - SUBMISSION
 *    - FILE
 *
 * 2. ACTION
 *    The operation allowed:
 *    - READ
 *    - CREATE
 *    - UPDATE
 *    - DELETE
 *    - *   (all actions)
 *
 * 3. SCOPE
 *    The extent of access:
 *    - OWN       → User’s own data
 *    - ASSIGNED  → Data assigned/shared with user
 *    - *         → Full system-wide access
 *
 * -------------------------------------------------------------
 * Purpose:
 *
 * This permission system is used to enforce secure access control
 * for different roles in the Puram Consultancy Form Platform.
 *
 * Example:
 *   "FORM:UPDATE:OWN"
 *   → A user can update only the forms they created.
 *
 *   "SUBMISSION:READ:*"
 *   → Admin can read all submissions in the system.
 */

/* ------------------------------------------------------------------ */
/* ADMIN PERMISSIONS */
/* ------------------------------------------------------------------ */

export const ADMIN_PERMISSIONS = [
  "USER:*:*", // Admin can manage all users
  "FORM:*:*", // Admin can create/update/delete any form
  "SECTION:*:*", // Admin can manage all form sections
  "QUESTION:*:*", // Admin can manage all questions
  "SUBMISSION:*:*", // Admin can view/manage all submissions
  "FILE:*:*", // Admin can manage uploaded submission files
];

/* ------------------------------------------------------------------ */
/* USER PERMISSIONS */
/* ------------------------------------------------------------------ */

export const USER_PERMISSIONS = [
  // User Profile Permissions
  "USER:READ:OWN", // Users can read their own profile
  "USER:UPDATE:OWN", // Users can update their own profile

  // Form Permissions
  "FORM:READ:*", // Users can view public/available forms

  // Submission Permissions
  "SUBMISSION:CREATE:OWN", // Users can submit responses
  "SUBMISSION:READ:OWN", // Users can view their own submissions

  // File Upload Permissions
  "FILE:CREATE:OWN", // Users can upload files in their submissions
];

/* ------------------------------------------------------------------ */
/* ROLE PERMISSION MAP */
/* ------------------------------------------------------------------ */

export const ROLE_PERMISSIONS = {
  ADMIN: ADMIN_PERMISSIONS,
  USER: USER_PERMISSIONS,
};

/* ------------------------------------------------------------------ */
/* Permission Type Helper */
/* ------------------------------------------------------------------ */

export type Permission = string;
