import dayjs from "dayjs";
import { axiosInstance } from "@/service";
import type { SearchBooking } from "@/views/admin/children/BookingManage.vue";

export async function bookingList(
  searchBooking: SearchBooking,
  pageNo: number,
  pageSize: number
) {
  let bookingTimeRangeStart;
  let bookingTimeRangeEnd;

  if (searchBooking.rangeStartDate && searchBooking.rangeStartTime) {
    const rangeStartDateStr = dayjs(searchBooking.rangeStartDate).format(
      "YYYY-MM-DD"
    );
    const rangeStartTimeStr = dayjs(searchBooking.rangeStartTime).format(
      "HH:mm"
    );
    bookingTimeRangeStart = dayjs(
      rangeStartDateStr + " " + rangeStartTimeStr
    ).valueOf();
  }

  if (searchBooking.rangeEndDate && searchBooking.rangeEndTime) {
    const rangeEndDateStr = dayjs(searchBooking.rangeEndDate).format(
      "YYYY-MM-DD"
    );
    const rangeEndTimeStr = dayjs(searchBooking.rangeEndTime).format("HH:mm");
    bookingTimeRangeEnd = dayjs(
      rangeEndDateStr + " " + rangeEndTimeStr
    ).valueOf();
  }

  console.log(bookingTimeRangeStart);
  console.log(bookingTimeRangeEnd);

  return await axiosInstance.get("/booking/list", {
    params: {
      username: searchBooking.username,
      roomName: searchBooking.meetingRoomName,
      location: searchBooking.meetingRoomPosition,
      bookingTimeRangeStart,
      bookingTimeRangeEnd,
      pageNo: pageNo,
      pageSize: pageSize,
    },
  });
}

export function apply(id: number) {
  return axiosInstance.get("/booking/apply/" + id);
}

export function reject(id: number) {
  return axiosInstance.get("/booking/reject/" + id);
}

export function unbind(id: number) {
  return axiosInstance.get("/booking/unbind/" + id);
}
