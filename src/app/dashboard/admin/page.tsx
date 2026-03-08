import cookieKeys from "@/app/config/cookieKeys";
import { UserRole } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type SessionUser = {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string | null;
  lastName?: string | null;
};

const AdminDashboard = async () => {
  const cookieStore = await cookies();
  const sessionUser = cookieStore.get(cookieKeys.USER);
  const user = JSON.parse(sessionUser?.value || "null") as SessionUser | null;

  // Double-check on the server side (middleware is the first layer)
  if (!user || user.role !== UserRole.ADMIN) {
    redirect("/");
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.firstName}!</p>
    </div>
  );
};

export default AdminDashboard;