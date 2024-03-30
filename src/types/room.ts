import { z } from 'zod';

export const CreateBookingZod = z.object({
    booking_id: z.number(),
});

export type CreateBookingDto = z.infer<typeof CreateBookingZod>; 