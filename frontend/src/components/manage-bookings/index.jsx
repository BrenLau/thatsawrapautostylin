import './manage-bookings.css'
import { useEffect, useState, useContext} from 'react';
import { CalendarContext, UserContext } from '../../main';

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
  const { user, setUser } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState({});
  const [errors, setErrors] = useState({})
  const {apiCalendar, setApiCalendar} = useContext(CalendarContext)

  useEffect(() => {
    if (!user) return
    setIsAdmin(user.is_admin)
  }, [user])

  useEffect(()=>{
    const getBookings = async () => {
      try{
        if(!user || !isAdmin) return;
        let res;
        if(user && isAdmin){//fetch all as admin, fetch current user as current user
          res = await fetch("/api/bookings");
        } else if(user && !isAdmin) {
          res = await fetch("/api/bookings/current")
        }
        const userBookings = await res.json()
        setBookings(userBookings);

      } catch (error) {
        console.error("Error fetching bookings: ", error)

      }
    }

    getBookings();
  }, [isAdmin]);

  if (!Object.values(bookings).length) return

  const handleApprove = async (booking) => {
    setErrors({})
    console.log(apiCalendar)
    const startTime = new Date(booking.times)
    const endTime = new Date()
    endTime.setTime(startTime.getTime())
    endTime.setTime(endTime.getTime() + 7200000)
    console.log({
      startTime,
      endTime
    })
    const resource = {
      summary: `${booking.service_id.description} for ${booking.user_id.name}`,
      start: {
        "dateTime": startTime.toISOString(),
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
      }, 
      end: {
        "dateTime": endTime.toISOString(),
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      attendees: [
        {"email": booking.user_id.email}
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
    if (bookedEvent.length) setErrors({
      "error": "Time already booked"
    })
  })
  .then(() => {
    if (errors.error) return
    const approvedBookings = approveBooking(booking.id)
    .then(() => {
      if (approvedBookings.unauthorized) {
      return
      } 
      setBookings(approvedBookings)
    })
  
    
  })
  .then(() => {
    if (errors.error) return
    console.log(bookings)
    const calEvent = apiCalendar.createEvent(resource).execute()
    // console.log(calEvent)

  })
  }



  const populateTable = (filteredBookings, isApproved) => {
    if (Object.values(filteredBookings).length === 0) {
      return (
        <>
        {isApproved ?( <h4>No approved bookings</h4>) : (<h4>No Pending bookings</h4>)}
        </>
      )
    }
    return Object.values(filteredBookings)?.map((booking)=>
       (
         <table id="bookings-table" key={booking.id}>
          {console.log(booking)}
          <tbody>

          <tr id="headings">
            <th>car</th>
            <th>service</th>
            <th>time</th>
            <th>total price</th>
            <th>user</th>
          </tr>
          <tr id="data">
            <td>{booking.service_id.car_type === 2 ? "Sedan/Coupe" : "Truck/SUV"}</td>
            <td>{booking.service_id.title}</td>
            <td>{booking.times}</td>
            <td>${booking.service_id.price}</td>
            <td>{booking.user_id.name}</td>
            {!isApproved ? (
              <td id='approve-button' onClick={() => handleApprove(booking)}>
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
      { !user? (
          <h1>Not logged in</h1>
      ) : (
          <div id="bookings-div" >
            <h2 id='section-title'>Pending Approval</h2>
              {populateTable(bookings.pending, false)}
            <h2 id='section-title'>Approved Bookings</h2>
              {populateTable(bookings.approved, true)}

            </div>

      )}

    </div>
  )
}

export default ManageBookings;
