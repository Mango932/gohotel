import HotelRoomCard from "./HotelRoomCard";

export default function SearchResults({ data }: any) {
    return (
        <div className="w-full flex justify-center">
            <div className="flex gap-10 justify-center flex-wrap mt-20 max-w-[1800px] px-20">
                {data.map((info: any, index: any) => (
                    <HotelRoomCard info={info} key={index} />
                ))}
            </div>
        </div>
    );
}
