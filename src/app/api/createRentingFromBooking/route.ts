import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            startDate,
            endDate,
            custId,
            empId,
            roomNumber,
            hotelName,
            bookId,
        } = body;

        const rentingData = {
            date: new Date(Date.now()),
            check_in: new Date(startDate),
            check_out: new Date(endDate),
            customer_id: parseInt(custId),
            employee_sin: parseInt(empId),
            room_booked: parseInt(roomNumber),
            hotel_name: hotelName,
            status_id: 1,
        };

        const newRenting = await prisma.renting.create({
            data: rentingData,
        });

        const deletedBooking = await prisma.booking.delete({
            where: { booking_id: bookId },
        });

        return NextResponse.json(
            {
                rentingdata: newRenting,
                message: "Renting created successfully",
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
