import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
}

const StarRating = ({ rating, size = 16 }: StarRatingProps) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const fullStar = star <= rating;
        const halfStar = star > rating && star - 1 < rating;

        return (
          <div key={star} className="relative">
            <Star
              className="text-gray-300 fill-gray-300"
              style={{ width: size, height: size }}
            />
            {fullStar && (
              <Star
                className="text-[#ffae00] fill-[#ffae00] absolute top-0 left-0"
                style={{ width: size, height: size }}
              />
            )}
            {halfStar && (
              <Star
                className="text-[#ffae00] fill-[#ffae00] absolute top-0 left-0"
                style={{
                  width: size,
                  height: size,
                  clipPath: "inset(0 50% 0 0)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
