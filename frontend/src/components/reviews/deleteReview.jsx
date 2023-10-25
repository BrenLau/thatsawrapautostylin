import React, { useState, useEffect } from "react";



export default function DeleteReview({reviewId, userId}){
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

    function handleSubmit(){
        fetch(`/api/reviews/delete/${reviewId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            if (res.ok) {
              res.json().then((res) => {
                window.alert(res.message)
                navigate("/");
              });
            }
          })
    }

    return (
        <>
            {userId === user?.id ? <button onClick={handleSubmit}>Delete</button> : null}
        </>
    )
}
