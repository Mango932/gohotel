"use client";
import Navbar from "@/components/Navbar";
import LoginForm from "@/app/login/LoginForm";

export default function signin() {
    //function that handles submitting data to the database
    const formSubmit = (data: any) => {
        console.log(data);
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
