"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
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
import ColorButton from "../../components/ColorButton";
import Datepicker from "../../components/Datepicker";

interface FormData {
    custId: string;
    room_booked: any;
    hotel_name: string;
    date: any;
}

export default function CreateRenting({ rentingCreate }: any) {
    const [rentAlertOpen, setRentAlertOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        custId: "",
        room_booked: "",
        hotel_name: "",
        date: "",
    });
    const { toast } = useToast();

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const formSubmit = () => {
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

        rentingCreate(formData);
        setRentAlertOpen(false);
    };

    const onDateChange = (dates: any) => {
        setFormData((prev) => ({ ...prev, date: dates }));
    };

    return (
        <AlertDialog open={rentAlertOpen} onOpenChange={setRentAlertOpen}>
            <AlertDialogTrigger>
                <ColorButton className="w-64">Create Renting</ColorButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl shadow-input  dark:bg-background">
                        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                            Create Renting
                        </h2>

                        <form className="my-8 mx-2">
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 gap-5">
                                <LabelInputContainer>
                                    <Label htmlFor="hotel_name">
                                        Hotel Name
                                    </Label>
                                    <Input
                                        name="hotel_name"
                                        placeholder=""
                                        type="text"
                                        onChange={handleChange}
                                        className="w-[18.75rem]"
                                    />
                                </LabelInputContainer>
                                <LabelInputContainer className="w-full">
                                    <Label htmlFor="room_booked">
                                        Room Number
                                    </Label>
                                    <Input
                                        name="room_booked"
                                        placeholder=""
                                        type="number"
                                        onChange={handleChange}
                                    />
                                </LabelInputContainer>
                            </div>
                            <LabelInputContainer className="mb-4 w-[18.75rem]">
                                <Label htmlFor="custId">Customer Id:</Label>
                                <Input
                                    name="custId"
                                    placeholder=""
                                    type="text"
                                    onChange={handleChange}
                                />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="date">Dates</Label>
                                <Datepicker
                                    date={formData.date}
                                    onDateChange={onDateChange}
                                ></Datepicker>
                            </LabelInputContainer>
                        </form>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <ColorButton onClick={() => formSubmit()}>
                        Create
                    </ColorButton>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
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
