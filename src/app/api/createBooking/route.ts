import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        return NextResponse.json({ message: "we did it" }, { status: 500 });
    }

    return NextResponse.json({ message: "we did not do it" }, { status: 500 });
}
