"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { PersonIcon } from "@radix-ui/react-icons";
import { Booking, columns } from "./columns";
import { DataTable } from "./data-table";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ColorButton from "@/components/ColorButton";
import CreateRenting from "@/app/dashboard/CreateRenting";
import CreatePayement from "./CreatePayment";

const fetchBookings = async (url: string) => {
    try {
        const response = await fetch(`/api/dashboard?${url}`);
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

const getStringDate = (date: any): string => {
    const stringDate =
        date.getFullYear() +
        "-" +
        ((date.getMonth() || 0 + 1) < 10
            ? "0" + (date.getMonth() || "" + 1)
            : date.getMonth() || "" + 1) +
        "-" +
        (date.getDate() || 0 < 10
            ? "0" + (date.getDate() || "")
            : date.getDate());
    return stringDate;
};

export default function dashboard() {
    const { data: session } = useSession();
    //@ts-ignore
    const id = session?.user?.id;

    const { data, isLoading } = useSWR(
        `/api/dashboard?id=${id}`,
        fetchBookings
    );
    const { toast } = useToast();
    const router = useRouter();

    const bookToRent = async (booking: any) => {
        const response = await fetch("/api/createRentingFromBooking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                startDate: booking.check_in,
                endDate: booking.check_out,
                custId: booking.customer_booked,
                empId: id,
                roomNumber: booking.room_booked,
                hotelName: booking.room.hotel_name,
                bookId: booking.booking_id,
            }),
        });

        if (!response.ok) {
            toast({
                title: "Error",
                description: "Conversion to renting failed",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Success",
                description: "Succesfully created renting",
            });
        }
    };

    const rentingSubmit = async (data: any) => {
        const response = await fetch("/api/createRenting", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                startDate: getStringDate(data.date.from),
                endDate: getStringDate(data.date.to),
                custId: data.custId,
                empId: id,
                hotelName: data.hotel_name,
                roomNumber: data.room_booked,
            }),
        });

        if (!response.ok) {
            toast({
                title: "Error",
                description: "Renting Create Failed",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Success",
                description: "Succesfully created renting",
            });
        }
    };

    const payementSubmit = async (data: any) => {
        const response = await fetch("/api/createPayment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rentId: data.rentId,
                amount: data.amount,
                paymentType: data.paymentType,
            }),
        });

        if (!response.ok) {
            toast({
                title: "Error",
                description: "Payment Create Failed",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Success",
                description: "Succesfully created payment",
            });
        }
    };

    return (
        <div className="h-screen">
            <Navbar />
            <div className="flex flex-col items-center">
                <div className="flex flex-col m-10 max-w-[1827px]">
                    <div className="flex justify-between text-3xl font-bold">
                        <h1>Employee Dashboard:</h1>
                        <h1>SIN: {id}</h1>
                    </div>
                    <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 py-5 mt-10">
                        Bookings
                    </h2>
                    <div className="flex gap-10 justify-center">
                        <div className="w-full max-w-[1440px]">
                            {data && data[0] ? (
                                <DataTable
                                    columns={columns({ bookToRent })}
                                    data={data[0]}
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="flex flex-col w-96 items-end gap-5">
                            <CreateRenting rentingCreate={rentingSubmit} />
                            <CreatePayement payementCreate={payementSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
