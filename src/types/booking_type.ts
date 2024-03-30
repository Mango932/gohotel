import { z } from 'zod';

export const CreateBookingZod = z.object({
    booking_id: z.number(),
    hotel_name: z.string(),
    room_booked: z.number()
});

export const BookingZod = z.object({
    booking_id: z.number(),
    hotel_name: z.string(),
    room_booked: z.number(),
    check_in: z.date(),
    check_out: z.date(),
    date: z.date(),
    customer_booked: z.number(),
    status_id : z.number(),
})

export type CreateBookingDto = z.infer<typeof CreateBookingZod>; 

export type BookingDto = z.infer<typeof BookingZod>;