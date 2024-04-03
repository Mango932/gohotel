"use client";
import Navbar from "@/components/Navbar";
import LoginForm from "@/app/login/LoginForm";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function signin() {
    const { toast } = useToast();
    //function that handles submitting data to the database
    const router = useRouter();
    const formSubmit = async (data: any) => {
        const signInData = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (signInData?.error) {
            toast({
                title: "Error",
                description: "You must me logged in to make a booking",
                variant: "destructive",
            });
        } else {
            router.push("/");
        }
    };

    return (
        <div className="h-screen ">
            <Navbar />
            <div className="flex justify-center items-center pt-10">
                <LoginForm formSubmit={formSubmit} />
            </div>
        </div>
    );
}
