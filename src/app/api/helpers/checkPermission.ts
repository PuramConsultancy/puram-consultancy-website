import { NextResponse } from "next/server";
import { IJWTPayload } from "./generateToken";
import { ROLE_PERMISSIONS } from "../auth/permission";

interface PermissionCheckOptions {
  user: IJWTPayload;
  requiredPermissions: string[];
}

export default async function checkPermissions({
  user,
  requiredPermissions,
}: PermissionCheckOptions): Promise<NextResponse | null> {
  if (requiredPermissions.length === 0) return null;

  const userPermissions = ROLE_PERMISSIONS[user.role];

  if (!userPermissions) {
    return NextResponse.json(
      { code: "invalid-role", message: "Invalid user role" },
      { status: 403 },
    );
  }

  for (const requiredPermission of requiredPermissions) {
    const [requiredResource, requiredAction, requiredScope] =
      requiredPermission.split(":") as [string, string, string];

    const hasPermission = userPermissions.some((userPermission) => {
      const [resource, action, scope] = userPermission.split(":");

      if (resource !== "*" && resource !== requiredResource) return false;
      if (action !== "*" && action !== requiredAction) return false;
      if (scope !== "*" && scope !== requiredScope) return false;

      return true;
    });

    if (!hasPermission) {
      return NextResponse.json(
        {
          code: "missing-permissions",
          message: "You don't have permission to perform this action",
        },
        { status: 403 },
      );
    }
  }

  return null; // All permissions granted
}
