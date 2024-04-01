import { prisma } from "@/lib/prisma";
import Error from "next/error";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, firstName, lastName, address, password, type } = body;

        const existingUserByEmail = await prisma.customer.findFirst({
            where: { email: email },
        });

        if (existingUserByEmail) {
            return NextResponse.json(
                { user: null, message: "User with this email already exists" },
                { status: 409 }
            );
        }

        const validId: any = await generateUniqueID();

        const newUser = await prisma.customer.create({
            data: {
                //@ts-ignore
                email: email,
                password: password,
                registration_date: new Date(), // You might want to set the registration date here
                person: {
                    create: {
                        id: validId,
                        first_name: firstName,
                        last_name: lastName,
                        address: address,
                        // You can add more fields as necessary
                    },
                },
            },
        });

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json(
            { user: rest, message: "User created successfully!" },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

async function generateUniqueID() {
    let id;
    let isIDUnique = false;

    // Repeat until a unique ID is found
    while (!isIDUnique) {
        // Generate a random 10-digit number
        id = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;

        // Check if the ID exists in the person table
        const existingPerson = await prisma.person.findFirst({
            where: { id: id },
        });

        // If the ID doesn't exist, set isIDUnique to true to break out of the loop
        if (!existingPerson) {
            isIDUnique = true;
        }
    }

    return id;
}
