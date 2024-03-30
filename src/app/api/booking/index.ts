import { findBookings } from "@/DataBase/Bookings";
import { getUserId } from "@/services/userUtils";
import { CreateBookingZod } from "@/types/booking_type";
import { booking } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const bookingHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body} = req;
    const userId = await getUserId(req, res);
    switch (method) {
        case 'POST': {
            const booking = CreateBookingZod.parse(body);
        } case 'GET': {
            const bookings = await findBookings(1);
            res.status(HttpStatusCode.Ok).json(bookings);
            break;
        } default: {
            res.status(HttpStatusCode.MethodNotAllowed).end('Method ${methode} Not Allowed')
        }
    }
}

export default bookingHandler;