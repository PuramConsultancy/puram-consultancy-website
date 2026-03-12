import {
  IoSearchOutline,
  IoCloseOutline,
  IoFunnelOutline,
} from "react-icons/io5";
import { BookingStatus } from "@/app/api-client/booking/useGetBookings";
import { ALL_STATUSES, STATUS_CONFIG } from "./bookingConfig";

const BookingToolbar = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  resultCount,
}: {
  search: string;
  setSearch: (v: string) => void;
  statusFilter: BookingStatus | "ALL";
  setStatusFilter: (v: BookingStatus | "ALL") => void;
  resultCount: number;
}) => (
  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
    <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 ring-1 ring-gray-200">
      <IoSearchOutline className="size-4 text-gray-400" />
      <input
        placeholder="Search by name, phone, service…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-52 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
      />
      {search && (
        <button onClick={() => setSearch("")}>
          <IoCloseOutline className="size-3.5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>

    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 rounded-xl bg-gray-50 px-3 py-2 ring-1 ring-gray-200">
        <IoFunnelOutline className="size-3.5 text-gray-400" />
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as BookingStatus | "ALL")
          }
          className="bg-transparent text-xs font-medium text-gray-600 focus:outline-none"
        >
          <option value="ALL">All Status</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_CONFIG[s].label}
            </option>
          ))}
        </select>
      </div>

      <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-600">
        {resultCount} result{resultCount !== 1 ? "s" : ""}
      </span>
    </div>
  </div>
);

export default BookingToolbar;
