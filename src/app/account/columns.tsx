"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "./DataTableRowActions";
import { booking } from "@prisma/client"


export type Booking = booking & {
    cost: number;
}


interface deleteBookingProps {
    onDelete: (booking: Booking) => void;
}

export const columns = ({
    onDelete,
}: deleteBookingProps): ColumnDef<Booking>[] => [
    {
        accessorKey: "hotel_name",
        header: "Hotel Name",
    },
    {
        accessorKey: "room_booked",
        header: "Room Number",
    },
    {
        accessorKey: "check_in",
        header: "Start Date",
        cell: ({ row }) => {
            const date: Date = row.getValue("check_in");
            const options = {
                timeZone: "America/New_York",
                hour12: true,
                timeZoneName: "short",
            } as Intl.DateTimeFormatOptions;
            const string = date.toLocaleString("en-CA", options);

            return <div className="font-medium">{string}</div>;
        },
    },
    {
        accessorKey: "check_out",
        header: "End Date",
        cell: ({ row }) => {
            const date: Date = row.getValue("check_out");
            const options = {
                timeZone: "America/New_York",
                hour12: true,
                timeZoneName: "short",
            } as Intl.DateTimeFormatOptions;
            const string = date.toLocaleString("en-CA", options);

            return <div className="font-medium">{string}</div>;
        },
    },
    {
        accessorKey: "cost",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("cost"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "CAD",
            }).format(amount);

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex justify-end pr-3">
                <DataTableRowActions row={row} onDelete={onDelete} />
            </div>
        ),
        size: 50,
    },
];
