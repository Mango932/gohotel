import React from "react";
import HotelRoomCard from "./HotelRoomCard";

export default function SearchResults({ data }: any) {
    return (
        <div className="w-full flex justify-center">
            <div className="flex gap-10 justify-center flex-wrap mt-20 max-w-[1800px] px-20">
                {data.map((info: any, index: any) => (
                    <HotelRoomCard key={index} info={info} />
                ))}
            </div>
        </div>
    );
}
