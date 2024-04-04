"use client";
import Navbar from "@/components/Navbar";
import LoginForm from "@/app/login/LoginForm";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

export default function signin() {
    const { toast } = useToast();
    //function that handles submitting data to the database
    const router = useRouter();
    const { data: session } = useSession();
    //@ts-ignore
    const type = session?.user?.type;

    if (type == "customer") {
        router.push("/");
    } else if (type == "employee") {
        router.push("/dashboard");
    }
    const formSubmit = async (data: any) => {
        const signInData = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (signInData?.error) {
            toast({
                title: "Error",
                description: "Wrong email or password",
                variant: "destructive",
            });
        } else {
            router.refresh();
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
