"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
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
import StarRating from "./StarRating";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function HotelRoomCard({ info, start, end, index }: any) {
    const { data: session } = useSession();
    const { toast } = useToast();
    const router = useRouter();

    const submitBooking = async () => {
        if (session?.user == undefined) {
            toast({
                title: "Error",
                description: "You need to be logged in to create a booking",
                variant: "destructive",
            });
        } else {
            const response = await fetch("/api/createBooking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    //@ts-ignore
                    userId: session.user.id,
                    roomNumber: info.room_number,
                    hotelName: info.hotel_name,
                    startDate: start,
                    endDate: end,
                }),
            });

            if (!response.ok) {
                console.error("Booking unsuccessful");
                toast({
                    title: "Error",
                    description: "Booking unsuccessful",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: "You successfully created a booking",
                });
                router.push("/account");
            }
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <CardContainer className="inter-var">
                    <CardBody className="relative group/card bg-gray-100 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-background dark:border-white/[0.2] border-secondary/[1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                        <div className="flex justify-between items-center">
                            <CardItem
                                translateZ="20"
                                className="text-2xl font-bold flex items-end"
                            >
                                {info.hotel_name}
                            </CardItem>
                            <CardItem
                                translateZ={20}
                                className="px-4 py-2 rounded-xl text-xs font-normal "
                            >
                                {info.hotel.address}
                            </CardItem>
                        </div>
                        <CardItem
                            as="p"
                            translateZ="30"
                            className=" text-sm max-w-sm mt-3 "
                        >
                            {info.view_type}
                        </CardItem>
                        <CardItem translateZ="40" className="w-full mt-3">
                            <Image
                                priority
                                src={
                                    info.image ||
                                    `/hotelroom${(index % 10) + 1}.jpg`
                                }
                                height="1000"
                                width="1000"
                                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt="Hotel Image"
                            />
                        </CardItem>

                        <div className="flex justify-between items-center mt-8">
                            <CardItem
                                translateZ={20}
                                className="px-4 rounded-xl text-lg font-bold dark:text-white"
                            >
                                CA ${info.price}
                            </CardItem>
                            <CardItem
                                translateZ={20}
                                className="px-4 py-2 rounded-xl bg-gradient-to-br from-[#e11d48] to-[#e11daa] text-sm font-bold text-white"
                            >
                                Book Now
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold ">
                            {info.hotel_name}
                        </div>
                        <div className="pr-4 py-2 rounded-xl text-xs font-normal ">
                            {info.hotel.address}
                        </div>
                    </div>
                    <div className="flex pt-10 gap-10 justify-between items-center">
                        <div className="text-lg flex flex-col gap-2">
                            <div>Room: {info.room_number}</div>
                            <div>View: {info.view_type}</div>
                            <div>Capacity: {info.capacity}</div>
                            <div>Start: {start}</div>
                            <div>End: {end}</div>
                            <div>Country: {info.hotel.location}</div>
                            <StarRating value={info.hotel.stars} />
                            <div>CAD ${info.price}</div>
                        </div>
                        <Image
                            src={`/hotelroom${(index % 10) + 1}.jpg`}
                            height="200"
                            width="200"
                            className="h-[200px] w-[200px] object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="Hotel Image"
                        />
                    </div>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-5">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="px-4 py-2 rounded-xl bg-gradient-to-br from-[#e11d48] to-[#e11daa] text-sm font-bold text-white"
                        onClick={() => submitBooking()}
                    >
                        Book Now
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
