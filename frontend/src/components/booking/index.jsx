import './booking.css'
import { useState } from 'react';
import "react-datetime/css/react-datetime.css"
import DateTime from 'react-datetime'
import { useContext } from 'react';
import { UserContext } from '../../main';
import { useNavigate } from 'react-router-dom';
import SignupFormModal from '../signup-form-modal';

const Booking = () => {
    const { user } = useContext(UserContext)
    const [times, setTimes] = useState("")
    const [servic, setService] = useState("")
    const [errors, setErrors] = useState({})
    const [car, setCar] = useState("");
    const navigate = useNavigate()
    console.log('user in the frontend', user)



    if (!user) {
        return (
            <SignupFormModal />
        )
    }

    const services = JSON.parse(sessionStorage.getItem("services"))

    // useEffect(() => {
    //     const user = sessionStorage.getItem("user");
    //     console.log(user)

    //     if (user) {
    //         const { name, email, phone_number, instagram } = JSON.parse(user);
    //         console.log("instagram from user: ", instagram)
    //         console.log("insta state: ", insta)
    //         setName(name)
    //         setEmail(email)
    //         if (number) setNumber(phone_number)

    //         if (instagram) {
    //             console.log("truthy")
    //             setInsta(instagram)}

    //     }
    // }, []);

    const booked = () => {
        window.alert('Your service has been booked')
    }

    console.log('Document cookie:', document.cookie);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})
        const res = await fetch('http://127.0.0.1:5000/api/booking', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                // user_id: user.id,
                // car,
                times,
                user_id: user.id,
                service: Number(servic),
                // is_approved: false
                // total_price: servic.price
            })
        })
        console.log('ressss', res)
        // let data = await res.json()
        if (!res.ok) {
            let data = await res.json();
            console.error('Error:', res.status);
            setErrors(data.errors);
        }
        else {
            let data = await res.json()
            sessionStorage.setItem("booking", JSON.stringify(data))
            navigate('/')
            return booked()
        }

        // if (times < new Date()) {
        //     console.log(new Date())
        //     errors.times = "Date must be in future"
        // }
    }

    let inputProps = {
        placeholder: "Select a date and time*"
    }

    const selectedService = services.find((service) => service.id === Number(servic));
    const totalPrice = selectedService ? selectedService.price : 0;

    const serviceList = services.filter(service => service.car_type !== Number(car))

    return (
        <form onSubmit={handleSubmit}>
            <div className='top-form'>
                <h1>Book Service</h1>
                <div className='name-car'>
                    {/* <div className='name-div'>
                        <label className='name'>

                            <input
                                type="text"
                                placeholder="Name*"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                    </div> */}
                    {/* <div className='email-div'>
                        <label>

                            <input
                                className="email"
                                type="email"
                                placeholder="Email Address*"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div> */}
                    {/* <div className='number-div'>
                        <label>

                            <input
                                className='phone'
                                type='number'
                                placeholder='Phone Number*'
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                minLength={10}
                                maxLength={10}
                                required
                            />
                        </label>
                    </div> */}
                    {/* <div className='insta-div'>
                        <label>

                            <input
                                className='insta'
                                placeholder='Instagram'
                                type='text'
                                value={insta}
                                onChange={(e) => setInsta(e.target.value)}

                            />
                        </label>
                    </div> */}
                    <div className='car-div'>
                        <select name="cars" id="car-select" value={car} onChange={(e) => {
                            console.log(e.target.value)
                            setCar(e.target.value)
                        }} required>
                            <option value="hi">--Please choose a car type--</option>
                            <option value={Number(3)}>Coupe/Sedan</option>
                            <option value={Number(2)}>SUV/Truck</option>
                        </select>
                    </div>
                </div>
                <div className='dates'>
                    <div className='date-div'>
                        <div className='date-select'>
                            <DateTime
                                required
                                inputProps={inputProps}
                                // minLength=''
                                stepMinute={60}
                                // minDetail='hour'
                                maxDetail='hour'
                                minDate={new Date()}
                                value={times}
                                onChange={(e) => {
                                    console.log(e._d)
                                    setTimes(e._d)
                                }}
                            />
                            {errors.times && <p className="errors">{errors.times}</p>}
                            {/* <div className='referral-div'>
                                <label>

                                    <input
                                        type='text'
                                        placeholder='Referral Code'
                                        value={referral}
                                        onChange={(e) => setReferral(e.target.value)}
                                    />
                                </label>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className='service-referral'>
                    <div className='service-div'>
                        <select onChange={(e) => setService(e.target.value)}>
                            {serviceList.map((service) => {
                                return (
                                    <option key={service.id} value={service.id}>
                                        {service.title}
                                        {service.description}
                                        ${service.price}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className='price-submit'>
                <div className='price-div'>
                    Total Price: ${totalPrice}
                </div>

                <button className='booking-submit'>Submit</button>
            </div>
        </form>
    )
}

export default Booking
