import './manage-bookings.css'
import { useEffect, useState } from 'react';
const ManageBookings = () => {
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    console.log(user, "!!!")

  }, [])

  return (
    <div id="manage-bookings">
      <h1>testing123</h1>

    </div>
  )
}

export default ManageBookings;
