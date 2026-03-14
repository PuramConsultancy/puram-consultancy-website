import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import handleError from "../helpers/handleError";
import privateRoute from "../helpers/privateRoute";
import { UserRole } from "@prisma/client";

export async function GET(request: NextRequest) {
  return privateRoute(request, { roles: [UserRole.ADMIN] }, async () => {
    try {
      const now = new Date();
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const [
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        cancelledBookings,
        totalSubmissions,
        totalBlogs,
        publishedBlogs,
        totalUsers,
        recentBookings,
        recentSubmissions,
        bookingsLast30Days,
        submissionsLast30Days,
      ] = await Promise.all([
        prisma.booking.count(),
        prisma.booking.count({ where: { status: "PENDING" } }),
        prisma.booking.count({ where: { status: "CONFIRMED" } }),
        prisma.booking.count({ where: { status: "COMPLETED" } }),
        prisma.booking.count({ where: { status: "CANCELLED" } }),
        prisma.submission.count(),
        prisma.blog.count(),
        prisma.blog.count({ where: { published: true } }),
        prisma.user.count(),
        prisma.booking.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
        prisma.submission.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
          include: {
            form: { select: { title: true } },
          },
        }),
        prisma.booking.findMany({
          where: { createdAt: { gte: thirtyDaysAgo } },
          orderBy: { createdAt: "asc" },
          select: { createdAt: true, status: true },
        }),
        prisma.submission.findMany({
          where: { createdAt: { gte: thirtyDaysAgo } },
          orderBy: { createdAt: "asc" },
          select: { createdAt: true },
        }),
      ]);

      // Build last 7 days activity
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (6 - i));
        const label = date.toLocaleDateString("en-IN", { weekday: "short" });
        const dateStr = date.toISOString().split("T")[0];
        return {
          label,
          bookings: bookingsLast30Days.filter(
            (b) => b.createdAt.toISOString().split("T")[0] === dateStr,
          ).length,
          submissions: submissionsLast30Days.filter(
            (s) => s.createdAt.toISOString().split("T")[0] === dateStr,
          ).length,
        };
      });

      return NextResponse.json({
        success: true,
        data: {
          stats: {
            totalBookings,
            pendingBookings,
            confirmedBookings,
            completedBookings,
            cancelledBookings,
            totalSubmissions,
            totalBlogs,
            publishedBlogs,
            totalUsers,
          },
          recentBookings,
          recentSubmissions,
          last7Days,
        },
      });
    } catch (error) {
      return handleError(error, "Failed to fetch dashboard data");
    }
  });
}
