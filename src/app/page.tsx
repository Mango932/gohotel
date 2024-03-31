"use server";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import { prisma } from "@/lib/prisma";
import React from "react";
let rooms = [];

export default async function Home() {
    rooms = await prisma.room.findMany();

    const handleSearch = async (location: string, date: any, traveler: any) => {
        "use server";
        rooms = await prisma.room.findMany({
            where: {
                AND: [
                    {
                        capacity: {
                            gte: traveler, // Ensures room capacity is greater than or equal to the number of travelers
                        },
                    },
                ],
            },
        });
        console.log(rooms);
    };

    console.log(rooms);

    return (
        <div className="h-screen">
            <Navbar />
            <SearchBar handleSearch={handleSearch} />
            <SearchResults data={rooms} />
        </div>
    );
}
