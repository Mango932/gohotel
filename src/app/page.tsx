"use client";

import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Datepicker from "@/components/Datepicker";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useLoadScript } from "@react-google-maps/api";

export default function Home() {
    const { isLoaded } = useLoadScript({
        // @ts-ignore
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });
    const [traveler, setTraveler] = useState(1);

    return (
        <div className="h-screen">
            <Navbar />
            <div className="flex w-full justify-center items-end gap-5 mt-10">
                <div>
                    <Label htmlFor="location">Location</Label>
                    <PlacesAutocomplete />
                </div>
                <div>
                    <Label htmlFor="date">Date</Label>
                    <div className="mt-2">
                        <Datepicker></Datepicker>
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
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
                        Search
                    </span>
                </button>
            </div>
        </div>
    );
}

// @ts-ignore
const PlacesAutocomplete = () => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete();

    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    return (
        <div ref={ref}>
            <Input
                className="mt-2"
                name="location"
                type="location"
                placeholder="Ex: Japan"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    console.log(data);
                }}
                disabled={!ready}
            ></Input>
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" &&
                data.map(({ place_id, description }) => (
                    <ul key={place_id}>{description}</ul>
                ))}
        </div>
    );
};
