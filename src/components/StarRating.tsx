import { useState } from "react";

const StarRating = ({ value }: any) => {
    return (
        <div>
            {[1, 2, 3, 4, 5].map((index) => (
                <Star key={index} filled={index <= value} />
            ))}
        </div>
    );
};

const Star = ({ filled, onClick }: any) => {
    return (
        <span onClick={onClick} style={{ color: filled ? "yellow" : "" }}>
            {filled ? "★" : "☆"}
        </span>
    );
};

export default StarRating;
