import { PrismaClient, booking, room } from '@prisma/client'
const prisma = new PrismaClient()

export async function findRoom(room_number: number, hotel_name: string): Promise<room> {
    const room: room | null = await prisma.room.findUnique({
        where: {
            room_number_hotel_name: {
                room_number: room_number,
                hotel_name: hotel_name
            }
        },
    })

    if (room === null) {
        throw new Error("Room was not found");
    } 

    return room;
}