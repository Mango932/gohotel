"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "../../lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
}

export default function SignupForm({ formSubmit }: any) {
    const [formData, setFormData] = useState<FormData>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
    });
    const { toast } = useToast();

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        for (let key in formData) {
            if ((formData as any)[key] == "") {
                toast({
                    title: "Error",
                    description: "Make sure to fill out every field!",
                    variant: "destructive",
                });
                return;
            }
        }
        if (formData.password != formData.confirmPassword) {
            toast({
                title: "Error",
                description: "Make sure your passwords match!",
                variant: "destructive",
            });
            return;
        }

        //Add the call to the database to send accont data
        formSubmit(formData);
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input border-dark-secondary border-2 bg-secondary dark:bg-background">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to GoHotel
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Make an account to make and keep track of your bookings!
            </p>

            <form className="my-8" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="firstname">First name</Label>
                        <Input
                            name="firstname"
                            placeholder=""
                            type="text"
                            onChange={handleChange}
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="lastname">Last name</Label>
                        <Input
                            name="lastname"
                            placeholder=""
                            type="text"
                            onChange={handleChange}
                        />
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        name="email"
                        placeholder=""
                        type="email"
                        onChange={handleChange}
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        name="address"
                        placeholder=""
                        type="address"
                        onChange={handleChange}
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        name="password"
                        placeholder=""
                        type="password"
                        onChange={handleChange}
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-8">
                    <Label htmlFor="confirmPassowrd">Confirm Password</Label>
                    <Input
                        name="confirmPassword"
                        placeholder=""
                        type="password"
                        onChange={handleChange}
                    />
                </LabelInputContainer>

                <button
                    className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#e11d48] to-[#e11daa] group-hover:from-[#e11d48] group-hover:to-[#e11daa] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                    type="submit"
                >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
                        Sign up
                    </span>
                </button>
            </form>
        </div>
    );
}

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
