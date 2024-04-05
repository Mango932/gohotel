import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: any) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const traveler = searchParams.get("traveler") || "";
    const location = searchParams.get("/api/search?location") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";
    const hotelChain = searchParams.get("hotelChain") || "";
    const rating = searchParams.get("rating") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const roomAmount = searchParams.get("roomAmount") || "";
    if (
        traveler === "" &&
        location === "" &&
        startDate === "" &&
        endDate === "" &&
        hotelChain === "" &&
        rating === "" &&
        maxPrice === "" &&
        roomAmount === ""
    ) {
        const rooms: any = await prisma.room.findMany({
            include: {
                hotel: true, // Include all fields from the related hotel
            },
        });
        if (rooms == undefined) {
            return NextResponse.json({
                rooms: [],
                startDate: startDate,
                endDate: endDate,
            });
        }
        return NextResponse.json({
            rooms: rooms,
            startDate: startDate,
            endDate: endDate,
        });
    } else {
        const rooms: any = await prisma.room.findMany({
            where: {
                capacity: { gte: parseInt(traveler) },
                price: { lte: parseFloat(maxPrice) },

                hotel: {
                    location: { startsWith: location },
                    stars: { gte: parseInt(rating) },
                    number_of_rooms: { lte: parseInt(roomAmount) },
                    hotel_chain: {
                        name: { startsWith: hotelChain },
                    },
                },
            },

            include: {
                hotel: true, // Include all fields from the related hotel
            },
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

        const filteredRooms = rooms.filter(
            //@ts-ignore
            (room) =>
                !bookings.some(
                    //@ts-ignore
                    (booking) =>
                        booking.hotel_name === room.hotel_name &&
                        booking.room_booked === room.room_number
                ) &&
                !rentings.some(
                    //@ts-ignore
                    (renting) =>
                        renting.hotel_name === room.hotel_name &&
                        renting.room_booked === room.room_number
                )
        );

        if (rooms == undefined) {
            return NextResponse.json({
                rooms: [],
                startDate: startDate,
                endDate: endDate,
            });
        }

        return NextResponse.json({
            rooms: filteredRooms,
            startDate: startDate,
            endDate: endDate,
            temprooms: rooms,
            bookings: bookings,
            rentings: rentings,
        });
    }
}
