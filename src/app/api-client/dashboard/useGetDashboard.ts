import { useApi } from "@/app/providers/ApiProvider";
import { useQuery } from "@tanstack/react-query";

export interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalSubmissions: number;
  totalBlogs: number;
  publishedBlogs: number;
  totalUsers: number;
}

export interface DayActivity {
  label: string;
  bookings: number;
  submissions: number;
}

export interface RecentBooking {
  id: string;
  status: string;
  notes: string | null;
  createdAt: string;
  appointmentDate: string | null;
}

export interface RecentSubmission {
  id: string;
  createdAt: string;
  form: { title: string };
}

export interface DashboardData {
  stats: DashboardStats;
  recentBookings: RecentBooking[];
  recentSubmissions: RecentSubmission[];
  last7Days: DayActivity[];
}

export const useGetDashboard = () => {
  const { jsonApiClient } = useApi();
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async (): Promise<{ success: boolean; data: DashboardData }> => {
      const res = await jsonApiClient.get("/api/dashboard");
      return res.data;
    },
    refetchInterval: 30000, // refresh every 30s
  });
};
