import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { rentId, amount, paymentType } = body;

        console.log(body);

        const renting = await prisma.renting.findFirst({
            where: { renting_id: parseInt(rentId) },
        });

        if (renting == null) {
            throw new Error("Invalid rent ID");
        }

        const paymentData = {
            renting_id: parseInt(rentId),
            amount: parseInt(amount),
            payment_type: paymentType,
            date: new Date(Date.now()),
        };

        const newPayment = await prisma.payment.create({
            data: paymentData,
        });

        return NextResponse.json(
            {
                paymentdata: newPayment,
                message: "Payment created successfully",
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
