import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: any) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const travelers = searchParams.get("traveler") || "";
    const location = searchParams.get("location") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";
    const hotelChain = searchParams.get("hotelChain") || "";
    const hotelCategory = searchParams.get("hotelCategory") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const roomAmount = searchParams.get("roomAmount") || "";

    if (
        travelers === "" &&
        location === "" &&
        startDate === "" &&
        endDate === "" &&
        hotelChain === "" &&
        hotelCategory === "" &&
        maxPrice === "" &&
        roomAmount === ""
    ) {
        const rooms: any = await prisma.room.findMany();
        if (rooms == undefined) {
            return NextResponse.json([]);
        }
        return NextResponse.json(rooms);
    } else {
        const rooms: any = await prisma.room.findMany({
            where: {
                AND: [
                    {
                        capacity: {
                            //@ts-ignore
                            gte: parseInt(travelers), // Ensures room capacity is greater than or equal to the number of travelers
                        },
                    },
                ],
            },
        });
        if (rooms == undefined) {
            return NextResponse.json([]);
        }
        return NextResponse.json(rooms);
    }
}
