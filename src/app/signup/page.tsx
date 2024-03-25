"use client";
import Navbar from "@/components/Navbar";
import SignupForm from "@/app/signup/SignupForm";

export default function signin() {
    //function that handles submitting data to the database
    const formSubmit = (data: any) => {
        console.log(data);
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
