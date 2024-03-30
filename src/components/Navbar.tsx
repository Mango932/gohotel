"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavbarButton from "./NavbarButton";
import Image from "next/image";
import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    return (
        <div className="flex justify-between h-20 items-center px-16 border-b-2 border-secondary">
            <Link href="/" className="w-52">
                <Image
                    src="/logo.png"
                    width={250}
                    height={100}
                    alt="GoHotel Logo"
                    priority
                />
            </Link>

            <div className="flex gap-3 ">
                <NavbarButton name="Locations" page={"/"} />
                <NavbarButton name="Book a room" page={"/"} />
                <NavbarButton name="Support" page={"/"} />
            </div>

            <div className="flex justify-end gap-5 w-52">
                <ThemeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>
                                <PersonIcon />
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Link href="/signup">Sign up</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/login">Log in</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/account">My Account</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
