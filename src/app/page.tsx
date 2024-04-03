"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import useSWR from "swr";

const fetchRooms = async (url: string) => {
    try {
        const response = await fetch(`/api/search?${url}`);
        if (!response.ok) {
            throw new Error("Failed to fetch rooms");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return []; // Return empty array if there's an error
    }
};

export default function SearchPage() {
    const search = useSearchParams();

    const searchQuery = `location=${encodeURIComponent(
        search.get("location") || ""
    )}&traveler=${encodeURIComponent(
        search.get("traveler") || ""
    )}&startDate=${encodeURIComponent(
        search.get("startDate") || ""
    )}&endDate=${encodeURIComponent(
        search.get("endDate") || ""
    )}&hotelChain=${encodeURIComponent(
        search.get("hotelChain") || ""
    )}&rating=${encodeURIComponent(
        search.get("rating") || ""
    )}&maxPrice=${encodeURIComponent(
        search.get("maxPrice") || ""
    )}&roomAmount=${encodeURIComponent(search.get("roomAmount") || "")}`;

    const { data, isLoading } = useSWR(
        `/api/search?${searchQuery}`,
        fetchRooms
    );

    return (
        <div className="h-screen">
            <Navbar />
            <SearchBar />
            {data ? <SearchResults data={data} /> : <></>}
        </div>
    );
}
