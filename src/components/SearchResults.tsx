import HotelRoomCard from "./HotelRoomCard";

export default function SearchResults({ data }: any) {
    return (
        <div className="w-full flex justify-center pb-20">
            <div className="flex gap-10 justify-center flex-wrap mt-10 max-w-[1800px] px-20">
                {data.rooms.map((info: any, index: any) => (
                    <HotelRoomCard
                        info={info}
                        key={index}
                        start={data.startDate}
                        end={data.endDate}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}
