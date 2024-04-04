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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface FormData {
    rentId: string;
    amount: any;
    paymentType: string;
}

export default function CreatePayement({ payementCreate }: any) {
    const [rentAlertOpen, setRentAlertOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        rentId: "",
        amount: "",
        paymentType: "",
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

        payementCreate(formData);
        setRentAlertOpen(false);
    };

    return (
        <AlertDialog open={rentAlertOpen} onOpenChange={setRentAlertOpen}>
            <AlertDialogTrigger>
                <ColorButton className="w-64">Create Payement</ColorButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogDescription>
                        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl shadow-input  dark:bg-background">
                            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                                Create Renting
                            </h2>

                            <form className="my-8 mx-2">
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="custId">Renting Id:</Label>
                                    <Input
                                        name="rentId"
                                        placeholder=""
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </LabelInputContainer>
                                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 gap-5 mt-8">
                                    <LabelInputContainer>
                                        <Label htmlFor="hotel_name">
                                            Amount:
                                        </Label>
                                        <Input
                                            name="amount"
                                            placeholder=""
                                            type="number"
                                            onChange={handleChange}
                                            className=""
                                        />
                                    </LabelInputContainer>
                                    <LabelInputContainer className="w-full">
                                        <Label htmlFor="room_booked">
                                            Payement Type:
                                        </Label>
                                        <Select
                                            onValueChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    paymentType: e,
                                                }))
                                            }
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Credit Card" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Credit Card">
                                                    Credit Card
                                                </SelectItem>
                                                <SelectItem value="Cash">
                                                    Cash
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </LabelInputContainer>
                                </div>
                            </form>
                        </div>
                    </AlertDialogDescription>
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
