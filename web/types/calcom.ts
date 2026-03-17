export interface CalcomAttendee {
  name: string;
  email: string;
}

export interface CalcomPayload {
  uid: string;
  title: string;
  startTime: string;
  endTime: string;
  attendees: CalcomAttendee[];
}

export interface CalcomWebhookBody {
  triggerEvent: string;
  payload: CalcomPayload;
}
