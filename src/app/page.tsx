"use server";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import { prisma } from "@/lib/prisma";
import React from "react";

export default async function Home() {
    const rooms = await prisma.room.findMany();

    return (
        <div className="h-screen">
            <Navbar />
            <SearchBar />
            <SearchResults data={rooms} />
        </div>
    );
}
