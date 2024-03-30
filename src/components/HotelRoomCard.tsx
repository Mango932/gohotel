"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

export default function HotelRoomCard({ info }: any) {
    return (
        <CardContainer className="inter-var">
            <CardBody className="relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-background dark:border-white/[0.2] border-black/[0.3] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <div className="flex justify-between items-center">
                    <CardItem translateZ="20" className="text-3xl font-bold ">
                        {info.title}
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
                        src="/hotelroom.jpg"
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
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
                        as={Link}
                        href="https://twitter.com/mannupaaji"
                        target="__blank"
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
    );
}
