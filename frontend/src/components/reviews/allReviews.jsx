import React, { useState, useEffect } from "react";


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

    return (
        <>
        </>
    )
}
