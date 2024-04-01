"use client";
import Navbar from "@/components/Navbar";
import SignupForm from "@/app/signup/SignupForm";
import { useRouter } from "next/navigation";

export default function signin() {
    const router = useRouter();
    //function that handles submitting data to the database
    const formSubmit = async (data: any) => {
        const response = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                address: data.address,
                password: data.password,
            }),
        });

        if (response.ok) {
            router.push("/login");
        } else {
            console.error("Registration failed");
        }
    };

    return (
        <div className="h-screen ">
            <Navbar />
            <div className="flex justify-center items-center pt-10">
                <SignupForm formSubmit={formSubmit} />
            </div>
        </div>
    );
}
