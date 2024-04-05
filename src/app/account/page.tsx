"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { PersonIcon } from "@radix-ui/react-icons";
import { columns } from "@/app/account/columns";
import { DataTable } from "@/app/account/data-table";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const fetchBookings = async (url: string) => {
    try {
        const response = await fetch(`/api/account?${url}`);
        if (!response.ok) {
            throw new Error("Failed to fetch booking");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return []; // Return empty array if there's an error
    }
};

export default function account() {
    const { toast } = useToast();
    const router = useRouter();
    const { data: session } = useSession();
    //@ts-ignore
    const id = session?.user?.id;

    if (!session?.user) {
        router.replace("/");
    }
    const { data, isLoading } = useSWR(`/api/account?id=${id}`, fetchBookings);

    const onDelete = async (booking: any) => {
        const response = await fetch("/api/account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bookingId: booking.booking_id,
            }),
        });

        if (!response.ok) {
            toast({
                title: "Error",
                description: "Deletion failed",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Success",
                description: "You successfully deleted the booking",
            });
        }
    };

    return (
        <div className="h-screen ">
            <Navbar />
            <div className="flex flex-row overflow-hidden mt-10">
                <div className="flex flex-col basis-1/3 mx-5 items-center mt-32">
                    <div className="bg-secondary p-36 rounded-full">
                        <PersonIcon className="scale-[800%]" />
                    </div>
                    <h2 className="w-full h-full text-center text-3xl text-neutral-800 dark:text-neutral-200 p-5">
                        Welcome{" "}
                        {data && data[1] ? (
                            <span>{data[1].person.first_name}</span>
                        ) : (
                            <></>
                        )}
                    </h2>
                </div>
                <div className="flex flex-col basis-2/3 mx-5 pt-10">
                    <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 p-5">
                        My Bookings
                    </h2>
                    <div className="w-full max-w-[1440px]">
                        {data && data[0] ? (
                            <DataTable
                                columns={columns({ onDelete })}
                                data={data[0]}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
