import { PrismaClient, booking } from '@prisma/client'
const prisma = new PrismaClient()

export async function findBookings(customer_booked_id: number): Promise<booking[]> {
    const bookings: booking[] = await prisma.booking.findMany({
        where: {
            customer_booked: customer_booked_id,
        },
    })

    return bookings;
}