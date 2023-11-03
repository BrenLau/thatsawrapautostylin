import './manage-bookings.css'
import { useEffect, useState} from 'react';
import { UserContext } from '../../main';
import { useContext } from 'react';

const ManageBookings = () => {
  const { user, setUser} = useContext(UserContext)
  const isAdmin = user?.is_admin;
  const [bookings, setBookings] = useState([]);

  useEffect(()=>{

    const getBookings = async () => {
      try{
        if(!user) return;
        let res;
        console.log(user, "user??")
        console.log(isAdmin, "admin??")
        if(user && isAdmin){//fetch all as admin, fetch current user as current user
          res = await fetch("/api/booking");
          console.log("admin?")
        } else if(user && !isAdmin) {
          res = await fetch("/api/booking/current")
          console.log("not admin?")
        }
        const userBookings = await res.json()
        console.log(userBookings, 'USER BOOKINGS')
        setBookings(userBookings.bookings);

      } catch (error) {
        console.error("Error fetching bookings: ", error)

      }
    }


    getBookings();
  }, [isAdmin,user]);

  // const acceptBooking = async (bookingId) =>{
  //   const res = await fetch(`/api/booking/${bookingId}`, {
  //     method: "POST",


  //   })

  //   }


  const populateTable = (isApproved) => {
    return bookings?.map((booking)=>{
      // console.log(booking.is_approved, "approved??", booking.id)
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
      { !user? (
          <h1>Not logged in</h1>
      ) : (
          <div id="bookings-div" >
            <h2>Pending Approval</h2>
              {populateTable(false)}
            <h2>Approved Bookings</h2>
              {populateTable(true)}

            </div>

      )}

    </div>
  )
}

export default ManageBookings;
