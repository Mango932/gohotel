"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavbarButton from "./NavbarButton";
import Image from "next/image";
import Link from "next/link";
import { PersonIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const { data: session } = useSession();
    const login = !(session?.user == undefined);
    //@ts-ignore
    const type = session?.user?.type;

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
                {/* <NavbarButton name="Locations" page={"/"} /> */}

                {type == "customer" ? (
                    <NavbarButton name="Book a room" page={"/"} />
                ) : (
                    <NavbarButton name="Dashboard" page={"/dashboard"} />
                )}
                {/* <NavbarButton name="Support" page={"/"} /> */}
            </div>

            <div className="flex justify-end gap-5 w-52">
                <ThemeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>
                                {!login && <PersonIcon />}
                                {login && <HamburgerMenuIcon />}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {!login && (
                            <>
                                <DropdownMenuItem>
                                    <Link href="/signup">Sign up</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/login">Log in</Link>
                                </DropdownMenuItem>
                            </>
                        )}
                        {login && (
                            <>
                                {type == "customer" ? (
                                    <DropdownMenuItem>
                                        <Link href="/account">My Account</Link>
                                    </DropdownMenuItem>
                                ) : (
                                    <></>
                                )}

                                <DropdownMenuItem
                                    onClick={() => {
                                        signOut();
                                        router.push("/");
                                    }}
                                >
                                    Log out
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
