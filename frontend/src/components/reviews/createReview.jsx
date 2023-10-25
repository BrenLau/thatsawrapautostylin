import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function CreateReviews() {
  const [user, setUser] = useState()

  const [firstName, setFirstName] = useState('')
  const [rating, setRating] = useState()
  const [fillStars, setFillStars] = useState(rating);
  const [description, setDescription] = useState('')
  const [userId, setUserId] = useState(user?.id)
  const [serviceId, setServiceId] = useState(null)
  const [imageUrl, setImageUrl] = useState('')


  const navigate = useNavigate();


  const data = {
    first_name: firstName,
    rating,
    description,
    user_id: userId,
    service_id: serviceId,
    image_url: imageUrl
  }


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

  console.log(user)

  function handleSubmit(event) {
    event.preventDefault();
    fetch("/api/reviews/new_review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        res.json().then(() => {

          navigate("/");
        });
      }
    });
  }

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="First Name"
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <div>
          <div onClick={() => { setRating(1) }} onMouseEnter={() => { setFillStars(1) }} onMouseLeave={() => setFillStars(rating)} className={fillStars >= 1 ? "filled" : "empty"} >
            <i className="fa-sharp fa-solid fa-star"></i>
          </div>
          <div onClick={() => { setRating(2) }} onMouseEnter={() => { setFillStars(2) }} onMouseLeave={() => setFillStars(rating)} className={fillStars >= 2 ? "filled" : "empty"} >
            <i className="fa-sharp fa-solid fa-star"></i>
          </div>
          <div onClick={() => { setRating(3) }} onMouseEnter={() => { setFillStars(3) }} onMouseLeave={() => setFillStars(rating)} className={fillStars >= 3 ? "filled" : "empty"} >
            <i className="fa-sharp fa-solid fa-star"></i>
          </div>
          <div onClick={() => { setRating(4) }} onMouseEnter={() => { setFillStars(4) }} onMouseLeave={() => setFillStars(rating)} className={fillStars >= 4 ? "filled" : "empty"} >
            <i className="fa-sharp fa-solid fa-star"></i>
          </div>
          <div onClick={() => { setRating(5) }} onMouseEnter={() => { setFillStars(5) }} onMouseLeave={() => setFillStars(rating)} className={fillStars >= 5 ? "filled" : "empty"} >
            <i className="fa-sharp fa-solid fa-star"></i>
          </div>
          <div>Stars</div>
        </div>

        <textarea
          placeholder="Tell us how we did..."
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button >Submit Your Revieew</button>


      </form>
    </div>
  )
}
