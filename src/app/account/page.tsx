"use client";
import Navbar from "@/components/Navbar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonIcon } from "@radix-ui/react-icons";
import { Booking, columns } from "@/app/account/columns";
import { DataTable } from "@/app/account/data-table";

// Just some hard-coded data
function getData(): Booking[] {
    return [
        {
            id: "7egfb4b3r98f3fb34u",
            hotelName: "Good Hotel",
            location: "Hawaii",
            roomNumber: 210,
            cost: 410,
            startDate: new Date(2024, 4, 7),
            endDate: new Date(2024, 4, 12),
        },
        {
            id: "vdsfjnk24480hvrbuo2",
            hotelName: "Good Hotel",
            location: "Hawaii",
            roomNumber: 211,
            cost: 320,
            startDate: new Date(2024, 4, 6),
            endDate: new Date(2024, 4, 9),
        },
        {
            id: "fwejbirf4802ub4f",
            hotelName: "Great Hotel",
            location: "Hawaii",
            roomNumber: 614,
            cost: 950,
            startDate: new Date(2024, 4, 12),
            endDate: new Date(2024, 4, 18),
        },
    ];
}

interface Account {
    accountName: string;
    accountPFPpath: string;
}

export default function account() {
    const [bookings, setBooking] = useState<Booking[]>(getData())
    const [accountInfo, setAccountInfo] = useState<Account>({
        accountName: "",
        accountPFPpath: "",
    });

    const onDelete = (booking: Booking) => {
        const newBooking = bookings.filter(item => item.id !== booking.id);
        setBooking(newBooking);
    };


    return (
        <div className="h-screen ">
            <Navbar />
            <div className="relative"></div>
            <div className="flex flex-row overflow-hidden mt-10">
                <div className="basis-1/3 mx-5">
                    <div className="flex flex-col items-center mt-20 min-w-24">
                        <div className="bg-secondary p-36 rounded-full">
                            <PersonIcon className="scale-[1000%]" />
                        </div>
                        <div className="p-4 items-center">
                            <h2 className="w-full h-full text-center text-xl text-neutral-800 dark:text-neutral-200">
                                GoHotel Account
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="basis-2/3 mx-5">
                    <div className="flex flex-col pt-10">
                        <div className="p-4">
                            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                                My Bookings
                            </h2>
                        </div>
                        <div className="">
                            <DataTable
                                columns={columns({ onDelete })}
                                data={bookings}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
