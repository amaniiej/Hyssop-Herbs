import { useEffect, useState } from "react";

type Review = {
  name: string;
  message: string;
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section className="py-20 px-10">
      <h2 className="text-3xl text-center mb-10">Reviews</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <div key={i} className="bg-[#0f3d2e] p-6 rounded-xl">
            <p>{r.message}</p>
            <span className="text-gray-400 text-sm">- {r.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}