import './manage-bookings.css'
import { useEffect, useState} from 'react';
const ManageBookings = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(user && user.is_admin) setIsAdmin(true);

  }, [])

  useEffect(()=>{
    const getAllBookings = async () => {
      try{
        const res = await fetch("/api/booking");
        const allBookings = await res.json()
        setBookings(allBookings.bookings);
      } catch (error) {
        console.error("Error fetching bookings: ", error)

      }
    }


    getAllBookings();
  }, []);

  // const acceptBooking = async (bookingId) =>{
  //   const res = await fetch(`/api/booking/${bookingId}`, {
  //     method: "POST",


  //   })

  //   }


  const populateTable = (isApproved) => {
    return bookings?.map((booking)=>{
      return(isApproved === booking.is_approved ? (
        <table id="bookings-table" key={booking.id}>
          <tbody>


          <tr id="headings">
            <th>car</th>
            <th>service</th>
            <th>time</th>
            <th>total price</th>
            <th>user</th>
          </tr>
          <tr id="data">
            <td>{booking.car}</td>
            <td>{booking.service_id}</td>
            <td>{booking.times}</td>
            <td>{booking.total_price}</td>
            <td>{booking.user_id}</td>
          </tr>
          </tbody>

        </table>
        ) : <></>)

      })
  }
  return (
    <div id="manage-bookings">
      { !isAdmin? (
          <h1>unauthorized</h1>
      ) : (<>
          <h1>authorized</h1>
          <div id="bookings-div" >
            <h2>Pending Approval</h2>
              {populateTable(false)}
            <h2>Approved Bookings</h2>
              {populateTable(true)}

            </div>
          </>
      )}

    </div>
  )
}

export default ManageBookings;
