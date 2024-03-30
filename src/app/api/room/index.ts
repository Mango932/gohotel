import { findRoom } from "@/DataBase/Room";
import { CreateBookingZod } from "@/types/booking_type";
import { room, booking } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const bookingHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body} = req;
    switch (method) {
        case 'POST': {
            const booking = CreateBookingZod.parse(body);
        } case 'GET': {
            const bookings = await findRoom(body.room_number, body.hotel_name);
            res.status(HttpStatusCode.Ok).json(bookings);
            break;
        } default: {
            res.status(HttpStatusCode.MethodNotAllowed).end('Method ${methode} Not Allowed')
        }
    }
}

export default bookingHandler;