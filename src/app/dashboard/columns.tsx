"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArchiveIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Booking = {
    booking_id: number;
    hotel_name: string;
    room_booked: number;
    customer_booked: number;
    check_in: any;
    check_out: any;
};

interface BookToRent {
    bookToRent: (booking: any) => void;
}

export const columns = ({ bookToRent }: BookToRent): ColumnDef<Booking>[] => [
    {
        accessorKey: "booking_id",
        header: "Booking Id",
    },
    {
        accessorKey: "hotel_name",
        header: "Hotel Name",
    },
    {
        accessorKey: "room_booked",
        header: "Room Number",
    },
    {
        accessorKey: "customer_booked",
        header: "Customer Id",
    },
    {
        accessorKey: "check_in",
        header: "Check In",
    },
    {
        accessorKey: "check_out",
        header: "Check Out",
    },
    {
        header: "Book->Rent",
        id: "actions",
        cell: ({ row }) => {
            const booking = row.original;

            return (
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button className="mx-5 h-12 w-12 bg-background dark:text-white text-black hover:text-white dark:hover:text-black">
                            <ArchiveIcon scale={10} className="" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you you sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Converting a booking to a renting is a permanent
                                action
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => bookToRent(booking)}
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            );
        },
    },
];
