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
import { MouseEvent, useState } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "./ui/input";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
            : date.getDate()) +
        "T00.00.00.000Z";
    return stringDate;
};

export default function SearchBar() {
    const router = useRouter();

    const [search, setSearch] = useState({
        traveler: 1,
        location: "",
        date: {
            from: addDays(new Date(), 3),
            to: addDays(new Date(), 6),
        },
        hotelChain: "",
        roomAmount: 2000,
        rating: 0,
        maxPrice: 1000,
    });

    const onLocationChange = (location: string) => {
        setSearch((prev) => ({ ...prev, location: location }));
    };

    const onDateChange = (dates: any) => {
        setSearch((prev) => ({ ...prev, date: dates }));
    };

    const onSearch = () => {
        const searchParams = new URLSearchParams();

        searchParams.append("location", search.location);
        searchParams.append("traveler", search.traveler.toString());
        searchParams.append("startDate", getStringDate(search.date?.from));
        searchParams.append("endDate", getStringDate(search.date?.to));
        searchParams.append("hotelChain", search.hotelChain);
        searchParams.append("roomAmount", search.roomAmount.toString());
        searchParams.append("rating", search.rating.toString());
        searchParams.append("maxPrice", search.maxPrice.toString());

        router.push(`?${searchParams}`);
    };

    return (
        <div className="flex justify-center">
            <div className="max-w-[1000px] flex flex-col items-end">
                <div className="flex w-full justify-center items-end gap-5 mt-10 flex-wrap">
                    <div>
                        <Label htmlFor="location">Location</Label>
                        <SeachBox onLocationChange={onLocationChange} />
                    </div>
                    <div>
                        <Label htmlFor="date">Date</Label>
                        <div className="mt-2">
                            <Datepicker
                                date={search.date}
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
                                        {search.traveler}
                                        {search.traveler == 1
                                            ? " traveler"
                                            : " traverlers"}
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-60 flex justify-center gap-5 items-center">
                                    <Button
                                        className="bg-secondary text-black hover:text-white dark:text-white dark:hover:text-black"
                                        onClick={() =>
                                            search.traveler > 1
                                                ? setSearch((prev) => ({
                                                      ...prev,
                                                      traveler:
                                                          search.traveler - 1,
                                                  }))
                                                : null
                                        }
                                    >
                                        -
                                    </Button>
                                    <div>{search.traveler}</div>
                                    <Button
                                        className="bg-secondary text-black hover:text-white dark:text-white dark:hover:text-black"
                                        onClick={() =>
                                            search.traveler < 10
                                                ? setSearch((prev) => ({
                                                      ...prev,
                                                      traveler:
                                                          search.traveler + 1,
                                                  }))
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
                <Accordion type="single" collapsible className="flex">
                    <AccordionItem value="item-1" className="">
                        <AccordionTrigger className="w-20">
                            More
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex m-2 items-center gap-5 justify-between">
                                <Label htmlFor="chain">Hotel Chain:</Label>
                                <Input
                                    name="chain"
                                    className="w-56"
                                    defaultValue={search.hotelChain}
                                    onChange={(e: any) =>
                                        setSearch((prev) => ({
                                            ...prev,
                                            hotelChain: e.target.value,
                                        }))
                                    }
                                ></Input>
                            </div>

                            <div className="flex gap-5 m-2 justify-between items-center">
                                <Label htmlFor="roomAmount">Room Amount:</Label>
                                <Input
                                    name="roomAmount"
                                    className="w-56"
                                    defaultValue={search.roomAmount}
                                    onChange={(e: any) =>
                                        setSearch((prev) => ({
                                            ...prev,
                                            roomAmount: e.target.value,
                                        }))
                                    }
                                    type="number"
                                ></Input>
                            </div>
                            <div className="flex gap-5 m-2 justify-between items-center">
                                <Label htmlFor="rating">Hotel Rating:</Label>

                                <ToggleGroup
                                    type="single"
                                    className="w-56 flex justify-around"
                                    onValueChange={(e: any) =>
                                        setSearch((prev) => ({
                                            ...prev,
                                            rating: e,
                                        }))
                                    }
                                    defaultValue={search.rating.toString()}
                                >
                                    <ToggleGroupItem value="1" className="w-10">
                                        1
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="2" className="w-10">
                                        2
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="3" className="w-10">
                                        3
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="4" className="w-10">
                                        4
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="5" className="w-10">
                                        5
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>
                            <div className="flex gap-5 m-2 justify-between items-center mt-5">
                                <Label htmlFor="maxPrice">Max Price:</Label>
                                <div className="w-56 flex flex-col items-end">
                                    <Slider
                                        max={1000}
                                        step={1}
                                        min={0}
                                        defaultValue={[search.maxPrice]}
                                        onValueChange={(e: any) =>
                                            setSearch((prev) => ({
                                                ...prev,
                                                maxPrice: e,
                                            }))
                                        }
                                    />

                                    <Label className="mt-4">
                                        {search.maxPrice}$
                                    </Label>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
