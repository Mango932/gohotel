import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
    try {
        const rooms = await prisma.room.findMany();
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching rooms" });
    } finally {
        await prisma.$disconnect(); // Close Prisma Client connection (optional)
    }
}
