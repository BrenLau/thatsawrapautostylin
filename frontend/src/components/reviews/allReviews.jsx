import React, { useState, useEffect } from "react";
import DeleteReview from "./deleteReview";


export default function AllReviews(){

    const [reviews, setReviews] = useState()

    useEffect(() => {
        async function fetchReviews() {
          const response = await fetch("/api/reviews/get_reviews");
          if (response.ok) {
            const data = await response.json();
            setReviews(data);
          }
        }
        fetchReviews();
      }, []);

      if (reviews === undefined) return null

    return (
        <>
            {reviews?.map((rev)=> {
                return (
                    <div key={rev.id}>
                        <div>{rev.first_name}</div>
                        <div>{rev.rating}</div>
                        <div>{rev.description}</div>
                        <div>{rev.image_url}</div>
                        <DeleteReview reviewId={rev.id} userId={rev.user_id} />
                    </div>
                )
            })}
        </>
    )
}
