import './manage-bookings.css'
import { useEffect, useState, useContext} from 'react';
import { CalendarContext } from '../../main';

async function approveBooking(bookingId, isAdmin){
  const res = await fetch(`/api/bookings/${bookingId}/approve`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: bookingId
  })

  const data = await res.json();

  return data
}

const ManageBookings = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState({});
  const {apiCalendar, setApiCalendar} = useContext(CalendarContext)

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(user && user.is_admin) setIsAdmin(true);

  }, [])

  useEffect(()=>{
    const getAllBookings = async () => {
      try{
        const res = await fetch("/api/bookings");
        const allBookings = await res.json()
        setBookings(allBookings);
      } catch (error) {
        console.error("Error fetching bookings: ", error)

      }
    }


    getAllBookings();
  }, []);

  if (!Object.values(bookings).length) return

  const handleApprove = async (booking) => {
    const startTime = new Date(booking.times)
    const endTime = new Date()
    endTime.setTime(startTime.getTime())
    endTime.setTime(endTime.getTime() + 7200000)
    const resource = {
      summary: `${booking.service.description} with ${booking.user.name}`,
      start: {
        "dateTime": startTime
      }, 
      end: {
        "dateTime": endTime
      },
      attendees: [
        {"email": booking.user.email}
      ]
    }
    apiCalendar.handleAuthClick()
    .then(() => {
    const bookedEvent = Object.values(bookings.approved).filter(current_booking => {
      const start = new Date(current_booking.times)
      const end = new Date(current_booking.times + 3600000)
      // booking
      if (start > resource.end.dateTime || end < resource.start.dateTime) {
        return true
      }
    })
    if (bookedEvent.length) return
  })
  .then(() => {
    const approvedBookings = approveBooking(booking.id)
    if (approvedBookings.unauthorized) {
      return
    } 
    setBookings(approvedBookings)

  })
  .then(() => {
    const calEvent = apiCalendar.createEvent(resource)

  })
  }

  const populateTable = (filteredBookings, isApproved) => {
    return Object.values(filteredBookings)?.map((booking)=>
       (
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
            {!isApproved ? (
              <td onClick={() => handleApprove(booking)}>
                approve
              </td>
            ) : null}
          </tr>
          </tbody>

        </table>
        )

      )
  }
  return (
    <div id="manage-bookings">
      { !isAdmin? (
          <h1>unauthorized</h1>
      ) : (<>
          <h1>authorized</h1>
          <div id="bookings-div" >
            <h2>Pending Approval</h2>
              {populateTable(bookings.pending, false)}
            <h2>Approved Bookings</h2>
              {populateTable(bookings.approved, true)}

            </div>
          </>
      )}

    </div>
  )
}

export default ManageBookings;
