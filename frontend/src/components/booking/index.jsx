import './booking.css'
import { useEffect, useState } from 'react';
import "react-datetime/css/react-datetime.css"
import DateTime from 'react-datetime'
import { useContext } from 'react';
import { UserContext } from '../../main';
import { useNavigate } from 'react-router-dom';
// import SignupFormModal from '../signup-form-modal';

const Booking = () => {
    const { user } = useContext(UserContext)
    const [referral, setReferral] = useState("")
    const [times, setTimes] = useState("")
    const [servic, setService] = useState("")
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    // console.log('services', servic)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [insta, setInsta] = useState("");
    const [car, setCar] = useState("");
    const services = JSON.parse(sessionStorage.getItem("services"))
    console.log("name: ", name, "email: ", email, "number: ", number, "insta: ", insta, "car: ", car, "times: ", times)

    useEffect(() => {
        const user = sessionStorage.getItem("user");
        console.log(user)

        if (user) {
            const { name, email, phone_number, instagram } = JSON.parse(user);
            console.log("instagram from user: ", instagram)
            console.log("insta state: ", insta)
            setName(name)
            setEmail(email)
            if (number) setNumber(phone_number)

            if (instagram) {
                console.log("truthy")
                setInsta(instagram)}
            // setInsta("" || instagram)
        }
    }, []);

    const booked = () => {
        window.alert('Your service has been booked')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("submitting... ")
        setErrors({})
        const res = await fetch('/api/booking', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.id,
                car,
                times,
                service_id: servic.id,
                total_price: servic.price
            })
        })
        console.log('ressss', res)
        let data = await res.json()
        console.log('data', data)
        if (data.errors) {
            setErrors(data.errors);
        } else {
            sessionStorage.setItem("booking", JSON.stringify(data))
            navigate('/')
            return booked()

        }
console.log('service price', servic.split("$"))
        if (times < new Date()) {
            errors.times = "Date must be in future"
        }
    }
    // console.log('times', times)

    // console.log('serice price', servic)

    let inputProps = {
        placeholder: "Select a date and time*"
    }

    const serviceList = services.filter(service => service.car_type !== Number(car))
    // console.log('car', Number(car))
    // console.log('service list', serviceList)

    // if(car === 2){
    //      const serviceList = services.filter( service => service.car_type !== 3)
    // } else if(car === 3){
    //     services.filter(service => service.car_type == 2)
    // }

    return (
        <form>
            <div className='top-form'>
                <h1>Book Service</h1>
                <div className='name-car'>
                    <div className='name-div'>
                        <label className='name'>
                            {/* Name: */}
                            <input
                                type="text"
                                placeholder="Name*"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className='email-div'>
                        <label>
                            {/* Email: */}
                            <input
                                className="email"
                                type="email"
                                placeholder="Email Address*"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className='number-div'>
                        <label>
                            {/* Phone Number: */}
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
                    </div>
                    <div className='insta-div'>
                        <label>
                            {/* Instagram: */}
                            <input
                                className='insta'
                                placeholder='Instagram'
                                type='text'
                                value={insta}
                                onChange={(e) => setInsta(e.target.value)}

                            />
                        </label>
                    </div>
                    <div className='car-div'>
                        <select name="cars" id="car-select" value={car} onChange={(e) => {
                            console.log(e.target.value)
                            setCar(e.target.value)}} required>
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
                            <div className='referral-div'>
                                <label>
                                    {/* Referral Code: */}
                                    <input
                                        type='text'
                                        placeholder='Referral Code'
                                        value={referral}
                                        onChange={(e) => setReferral(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='service-referral'>
                    <div className='service-div'>
                        <select onChange={(e) => console.log('e, ', e.target.value)}>
                            {serviceList.map((service) => {
                                return (
                                    <option key={service.id} onChange={(e) => console.log('eeee', e)} value={service.id}>
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
                    Total Price: ${servic.price}
                </div>

                <button className='booking-submit' onSubmit={handleSubmit} >Submit</button>
            </div>
        </form>
    )
}

export default Booking
