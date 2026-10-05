export type AppointmentScope = "ward" | "neighborhood";

export type WeeklyTimeSlot = {
  // 1 = Thu 2 ... 7 = Chu nhat
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

export type TimeRange = {
  startTime: string;
  endTime: string;
};

export type AppointmentException = {
  date: string;
  endDate: string | null;
  type: "closed" | "custom_hours";
  note: string;
  timeSlots: TimeRange[];
};

export type PublicAppointmentService = {
  _id: string;
  name: string;
  description: string;
  locationAddress: string;
  scope: AppointmentScope;
  wardName: string | null;
  neighborhood: { _id: string; name: string } | null;
  slotDurationMinutes: number;
  timeSlots: WeeklyTimeSlot[];
  upcomingExceptions: AppointmentException[];
};

export type AppointmentHoliday = {
  date: string;
  name: string;
  type: "le" | "tam_ngung";
  note: string;
};

export type PublicAppointmentServicesData = {
  items: PublicAppointmentService[];
  upcomingHolidays: AppointmentHoliday[];
};
