import { Booking } from '@/app/account/columns';
import api from '@/services/api_services'
import { BookingDto, CreateBookingDto } from '@/types/booking_type';
import { booking } from '@prisma/client';


const URL = '/booking'

export const createBooking = async (booking: CreateBookingDto): Promise<booking> => {
    const { data } = await api.post(URL, booking);
    return data;
};

export const getBookings = async (customer_booked: number): Promise<booking[]> => {
    const { data } = await api.get(URL);
    return data;
};

/*
export const getBookingWCost = async (customer_booked: number): Promise<booking[]> => {
    const { data } = await api.get(URL);
    const costs: Promise<number>[] = data.map(getCost);

    Promise.all(costs)
        .then((costs) => {
            const booking: Booking[] = data.map((item: any, index: number) => ({
            ...item,
            cost: costs[index]
        }));
        return booking;
    })
}

function getDayDiff(check_in: Date, check_out: Date): number {
    const check_in_ms = check_in.getTime();
    const check_out_ms = check_out.getTime();

    const diff_ms = Math.abs(check_out_ms - check_in_ms);
    const diff_days = Math.ceil(diff_ms/ (1000*60*60*24));

    return diff_days;
}

async function getCost(booking: BookingDto): Promise<number> {
    try {
        const { data } = await api.get('/room', booking);
        const roomPrice = parseFloat(data.price.toString());

        return (roomPrice * getDayDiff(booking.check_in, booking.check_out))
    } catch(error) {
        console.log(error);
    }

    return 0
}
*/