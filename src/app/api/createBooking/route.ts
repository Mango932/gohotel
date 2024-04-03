import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, roomNumber, hotelName, startDate, endDate } = body;

        const bookingData = {
            date: new Date(Date.now()),
            check_in: new Date(startDate),
            check_out: new Date(endDate),
            customer_booked: parseInt(userId),
            room_booked: parseInt(roomNumber),
            hotel_name: hotelName,
            status_id: 3,
        };

        const newBooking = await prisma.booking.create({
            data: bookingData,
        });

        return NextResponse.json(
            {
                bookingdata: newBooking,
                message: "Booking created successfully",
            },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error,
            },
            { status: 500 }
        );
    }
}
