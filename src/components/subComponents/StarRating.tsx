import { Star } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const fullStar = star <= rating;
        const halfStar = star > rating && star - 1 < rating;

        return (
          <div key={star} className="relative">
            <Star className="w-4 h-4 text-gray-300 fill-gray-300" />
            {fullStar && (
              <Star className="w-4 h-4 text-[#ffae00] fill-[#ffae00] absolute top-0 left-0" />
            )}
            {halfStar && (
              <Star
                className="w-4 h-4 text-[#ffae00] fill-[#ffae00] absolute top-0 left-0"
                style={{
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
