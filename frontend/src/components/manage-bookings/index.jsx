import './manage-bookings.css'
import { useEffect, useState} from 'react';
const ManageBookings = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState({});

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(user && user.is_admin) setIsAdmin(true);

  }, [])

  useEffect(()=>{
    const getAllBookings = async () => {
      try{
        const res = await fetch("/api/booking");
        const allBookings = await res.json()
        // console.log(allBookings.bookings, "all the bookings")
        setBookings(allBookings.bookings);

      } catch (error) {
        console.error("Error fetching bookings: ", error)

      }
    }

    getAllBookings();
  }, []);

  console.log(bookings, "!!@#")
  // for(let booking of bookings){
  //   console.log(booking, "HAHA")
  // }
  return (
    <div id="manage-bookings">
      { !isAdmin? (
          <h1>unauthorized</h1>
      ) : (
          <h1>authorized</h1>
      )}

    </div>
  )
}

export default ManageBookings;
