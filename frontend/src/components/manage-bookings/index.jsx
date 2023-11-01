import './manage-bookings.css'
import { useEffect, useState} from 'react';
const ManageBookings = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(user && user.is_admin) setIsAdmin(true);

  }, [])

  useEffect(()=>{
    const getAllBookings = async () => {

      const bookings = await fetch("/api/booking");

    }

    getAllBookings();
  })

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
