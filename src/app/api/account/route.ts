import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: any) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const accountId = searchParams.get("/api/account?id") || "";

    if (accountId == "") {
        return NextResponse.json([]);
    }

    const bookings: any = await prisma.booking.findMany({
        where: { customer_booked: parseInt(accountId) },
        include: {
            room: true,
        },
    });

    const accountInfo: any = await prisma.customer.findFirst({
        where: { id: parseInt(accountId) },
        include: { person: true },
    });

    if (bookings == undefined || accountInfo == undefined) {
        return NextResponse.json([]);
    }

    return NextResponse.json([bookings, accountInfo]);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { bookingId } = body;

        const newBooking = await prisma.booking.delete({
            where: { booking_id: bookingId },
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
