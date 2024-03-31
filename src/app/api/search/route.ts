import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: any) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const travelers = parseInt(searchParams.get("traveler") || "");

    const rooms: any = await prisma.room.findMany({
        where: {
            AND: [
                {
                    capacity: {
                        //@ts-ignore
                        gte: travelers, // Ensures room capacity is greater than or equal to the number of travelers
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
