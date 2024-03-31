"use client";
import Navbar from "@/components/Navbar";
import {
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonIcon } from "@radix-ui/react-icons";
import { Booking, columns } from "@/app/account/columns";
import { DataTable } from "@/app/account/data-table";
import { findBookings } from "@/app/api/Bookings";

// Just some hard-coded data
interface Account {
    accountName: string;
    accountPFPpath: string;
}

export default function account() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        // Define your async function within the useEffect hook
        async function fetchBookings() {
            try {
                const bookingDB = await findBookings(1);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        }

        // Call the function when the component mounts or when the page reloads
        fetchBookings();
    }, []);

    const onDelete = (booking: Booking) => {
        const newBooking = bookings.filter(
            (item) => item.booking_id !== booking.booking_id
        );
        setBookings(newBooking);
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
                        GoHotel Account
                    </h2>
                </div>
                <div className="flex flex-col basis-2/3 mx-5 pt-10">
                    <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 p-5">
                        My Bookings
                    </h2>
                    <div className="w-full max-w-[1440px]">
                        <DataTable
                            columns={columns({ onDelete })}
                            data={bookings}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
