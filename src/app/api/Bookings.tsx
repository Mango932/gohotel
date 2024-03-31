import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function findBookings(customer_booked_id: number) {
    const bookings: any = await prisma.booking.findMany({
        where: {
            customer_booked: customer_booked_id,
        },
    });

    return bookings;
}
