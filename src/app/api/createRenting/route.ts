import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { startDate, endDate, custId, empId, roomNumber, hotelName } =
            body;

        const customer = await prisma.customer.findFirst({
            where: { id: parseInt(custId) },
        });

        const room = await prisma.room.findFirst({
            where: {
                room_number: parseInt(roomNumber),
                hotel: {
                    hotel_name: hotelName,
                },
            },
        });

        if (customer == null || room == null) {
            throw new Error("Invalid customer Id or room");
        }

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

        const rentings: any = await prisma.renting.findMany({
            where: {
                OR: [
                    {
                        check_in: {
                            lte: new Date(endDate),
                            gte: new Date(startDate),
                        },
                        check_out: {
                            lte: new Date(endDate),
                            gte: new Date(startDate),
                        },
                    },
                ],
            },
            select: { hotel_name: true, room_booked: true },
        });

        const bookings: any = await prisma.booking.findMany({
            where: {
                OR: [
                    {
                        check_in: {
                            lte: new Date(endDate),
                            gte: new Date(startDate),
                        },
                        check_out: {
                            lte: new Date(endDate),
                            gte: new Date(startDate),
                        },
                    },
                ],
            },
            select: { hotel_name: true, room_booked: true },
        });

        const isAlreadyBookedOrRented =
            bookings.some(
                //@ts-ignore
                (booking) =>
                    booking.hotel_name === rentingData.hotel_name &&
                    booking.room_booked === rentingData.room_booked
            ) ||
            rentings.some(
                //@ts-ignore
                (renting) =>
                    renting.hotel_name === rentingData.hotel_name &&
                    renting.room_booked === rentingData.room_booked
            );

        if (isAlreadyBookedOrRented) {
            throw new Error("Room already rented or booked for this time");
        }

        const newRenting = await prisma.renting.create({
            data: rentingData,
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
