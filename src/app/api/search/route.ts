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
            return NextResponse.json([]);
        }
        return NextResponse.json(rooms);
    } else {
        const rooms: any = await prisma.room.findMany({
            where: {
                AND: [
                    // Filter by capacity if travelers parameter is provided
                    traveler !== ""
                        ? { capacity: { gte: parseInt(traveler) } }
                        : {},
                    // Filter by location if location parameter is provided
                    location !== ""
                        ? { hotel: { address: { startsWith: location } } }
                        : {},
                    // Filter by availability if startDate and endDate parameters are provided

                    // Filter by hotel chain if hotelChain parameter is provided
                    hotelChain !== ""
                        ? {
                              hotel: {
                                  hotel_chain: {
                                      name: { startsWith: hotelChain },
                                  },
                              },
                          }
                        : {},
                    // Filter by hotel category if hotelCategory parameter is provided
                    rating !== ""
                        ? { hotel: { stars: { gte: parseInt(rating) } } }
                        : {},
                    // Filter by max price if maxPrice parameter is provided
                    maxPrice !== ""
                        ? { price: { lte: parseFloat(maxPrice) } }
                        : {},
                    // Filter by room amount if roomAmount parameter is provided
                    roomAmount !== ""
                        ? { room_number: { lte: parseInt(roomAmount) } }
                        : {},
                ],
            },

            include: {
                hotel: true, // Include all fields from the related hotel
            },
        });
        if (rooms == undefined) {
            return NextResponse.json([]);
        }
        return NextResponse.json(rooms);
    }
}
