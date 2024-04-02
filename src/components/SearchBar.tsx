"use client";

import { Label } from "@/components/ui/label";
import Datepicker from "@/components/Datepicker";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import SeachBox from "@/components/SeachBox";
import { useState } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [traveler, setTraveler] = useState(1);
    const [location, setLocation] = useState<string>("");
    const [date, setDate] = useState<DateRange | undefined>({
        from: addDays(new Date(), 3),
        to: addDays(new Date(), 6),
    });
    const router = useRouter();

    const onLocationChange = (location: string) => {
        setLocation(location);
    };

    const onDateChange = (dates: any) => {
        setDate(dates);
    };

    const onSearch = () => {
        const startDate =
            date?.from?.getFullYear() +
            "-" +
            ((date?.from?.getMonth() || 0 + 1) < 10
                ? "0" + (date?.from?.getMonth() || "" + 1)
                : date?.from?.getMonth() || "" + 1) +
            "-" +
            (date?.from?.getDate() || 0 < 10
                ? "0" + (date?.from?.getDate() || "")
                : date?.from?.getDate()) +
            "T00.00.00.000Z";

        const endDate =
            date?.to?.getFullYear() +
            "-" +
            ((date?.to?.getMonth() || 0 + 1) < 10
                ? "0" + (date?.to?.getMonth() || "" + 1)
                : date?.to?.getMonth() || "" + 1) +
            "-" +
            (date?.to?.getDate() || 0 < 10
                ? "0" + (date?.to?.getDate() || "")
                : date?.to?.getDate()) +
            "T00.00.00.000Z";

        const searchQuery = `location=${encodeURIComponent(
            location
        )}&traveler=${encodeURIComponent(
            traveler
        )}&startDate=${encodeURIComponent(
            startDate
        )}&endDate=${encodeURIComponent(endDate)}`;

        const encodedSearchQuery = encodeURI(searchQuery);
        router.push(`?${encodedSearchQuery}`);
    };

    return (
        <>
            <div className="flex w-full justify-center items-end gap-5 mt-10 flex-wrap">
                <div>
                    <Label htmlFor="location">Location</Label>
                    <SeachBox onLocationChange={onLocationChange} />
                </div>
                <div>
                    <Label htmlFor="date">Date</Label>
                    <div className="mt-2">
                        <Datepicker
                            date={date}
                            onDateChange={onDateChange}
                        ></Datepicker>
                    </div>
                </div>
                <div>
                    <Label htmlFor="travelers">Travelers</Label>
                    <div>
                        <Popover>
                            <PopoverTrigger>
                                <div className="flex h-10 w-60 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2 hover:bg-secondary">
                                    {traveler}
                                    {traveler == 1
                                        ? " traveler"
                                        : " traverlers"}
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-60 flex justify-center gap-5 items-center">
                                <Button
                                    className="bg-secondary text-black hover:text-white dark:text-white dark:hover:text-black"
                                    onClick={() =>
                                        traveler > 1
                                            ? setTraveler(traveler - 1)
                                            : null
                                    }
                                >
                                    -
                                </Button>
                                <div>{traveler}</div>
                                <Button
                                    className="bg-secondary text-black hover:text-white dark:text-white dark:hover:text-black"
                                    onClick={() =>
                                        traveler < 10
                                            ? setTraveler(traveler + 1)
                                            : null
                                    }
                                >
                                    +
                                </Button>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#e11d48] to-[#e11daa] group-hover:from-[#e11d48] group-hover:to-[#e11daa] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span
                        className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full"
                        onClick={() => onSearch()}
                    >
                        Search
                    </span>
                </button>
            </div>
        </>
    );
}
