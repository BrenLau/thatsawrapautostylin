import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DeleteReview from "./deleteReview";
import EditReview from "./editReview";


export default function AllReviews(){

    const navigate = useNavigate();
    const [reviews, setReviews] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        async function fetchReviews() {
          const response = await fetch("/api/auth/curr_user");
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          }
        }
        fetchReviews();
      }, []);

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
                        {/* {user.id === rev.user_id ? */}
                            <Link to={'/editReview'} state={{reviewId : rev.id, descript : rev.description, firstname : rev.first_name, rating : rev.rating, userid : rev.user_id, serviceid : rev.service_id, image : rev.image_url}}>Edit Review</Link>
                            {/* : null} */}
                        {/* <EditReview reviewId={rev.id} descript={rev.description} firstname={rev.first_name} rating={rev.rating} userid={rev.user_id} serviceid={rev.service_id} image={rev.image_url} /> */}
                    </div>
                )
            })}
        </>
    )
}
