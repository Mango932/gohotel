"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";
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

export default function HotelRoomCard({ info }: any) {
    const { data: session } = useSession();
    const { toast } = useToast();
    const submitBooking = () => {
        console.log(session?.user);
        if (session?.user == undefined) {
            toast({
                title: "Error",
                description: "You need to be logged in to create a booking",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Success",
                description: "You successfully created a booking",
            });
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <CardContainer className="inter-var">
                    <CardBody className="relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-background dark:border-white/[0.2] border-black/[0.3] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                        <div className="flex justify-between items-center">
                            <CardItem
                                translateZ="20"
                                className="text-3xl font-bold "
                            >
                                {info.hotel_name}
                            </CardItem>
                            <CardItem
                                translateZ={20}
                                className="px-4 py-2 rounded-xl text-sm font-normal "
                            >
                                {info.address}
                            </CardItem>
                        </div>

                        <CardItem translateZ="40" className="w-full mt-6">
                            <Image
                                src={info.image || "/hotelroom.jpg"}
                                height="1000"
                                width="1000"
                                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt="Hotel room image"
                            />
                        </CardItem>
                        <CardItem
                            as="p"
                            translateZ="30"
                            className=" text-sm max-w-sm mt-5 mx-2 "
                        >
                            {info.description}
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
                                as="button"
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
                        <div className="text-3xl font-bold ">
                            {info.hotel_name}
                        </div>
                        <div className="px-4 py-2 rounded-xl text-sm font-normal ">
                            {info.address}
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogDescription className="">
                    <div>{info.description}</div>
                    <div className="flex mt-10 gap-10 justify-between">
                        <div className="text-lg flex flex-col gap-2">
                            <div>Capacity: {info.capacity}</div>
                            <div>Dates: temp</div>

                            <StarRating value={info.stars} />
                            <div>CAD ${info.price}</div>
                        </div>
                        <Image
                            src="/hotelroom.jpg"
                            height="1000"
                            width="1000"
                            className="h-50 w-64 object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                        />
                    </div>
                </AlertDialogDescription>
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
