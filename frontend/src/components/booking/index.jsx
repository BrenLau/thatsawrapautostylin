import './booking.css'
import { useEffect, useState } from 'react';
import "react-datetime/css/react-datetime.css"
import DateTime from 'react-datetime'


const Booking = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [instagram, setInstagram] = useState("");
    const [car, setCar] = useState("")
    const [referral, setReferral] = useState("")
    const [times, setTimes] = useState("")
    const [errors, setErrors] = useState({})
    const [services, setServices] = useState([])
    async function getServices() {
        const response = await fetch("http://127.0.0.1:5000/api/services")

        if (response.ok) {
            const res = await response.json()
            if (res.services) {
                setServices(res.services)
            }
        }
    }
    useEffect(() => {
        getServices()
        // setServices()
    }, [car])

    // if(car === 'sedan' || car === 'coupe'){
    //      services.filter( service => service.car_type === 2)
    // } else if(car === 'truck' || car === 'suv'){
    //     services.filter(service => service.car_type === 3)
    // } else {
    //     services.filter(service => service.car_type === 1)
    // }

    console.log('services', services)

    useEffect(() => {
        const user = sessionStorage.getItem("user");
        console.log(user)

        if (user) {
            const { name, email, number, instagram } = JSON.parse(user);
            setName(name)
            setEmail(email)
            setNumber(number)
            setInstagram(instagram)
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})
        const res = await fetch('/api/booking', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                number,
                instagram,
                car,
                times,
                service_id: services.id,
                referral
            })
        })

        // if (times < new Date().toJSON().slice(0, 10)) {
        //     errors.times = "Date must be in future"
        // }
    }

    let inputProps = {
        placeholder: "Select a date and time*"
    }

    const serviceList = services.filter(service => service.car_type !== Number(car))
    console.log('car', Number(car))
    console.log('service list', serviceList)
    
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
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className='car-div'>
                        <select name="cars" id="car-select" value={car} onChange={(e) => setCar(e.target.value)} required>
                            <option value="">--Please choose a car type--</option>
                            <option value={Number(3)}>Coupe/Sedan</option>
                            <option value={Number(2)}>SUV/Truck</option>
                        </select>
                    </div>
                </div>
                <div className='dates'>
                    <div className='date-div'>
                        <div className='date-select'>
                            <DateTime
                                inputProps={inputProps}
                                minLength=''
                                minDetail='hour'
                                maxDetail='hour'
                                value={times}
                                onChange={(e) => setTimes(e.target.value)}
                            />
                            {errors.times && <p className="errors">{errors.times}</p>}
                        </div>
                    </div>
                </div>
                <div className='service-referral'>
                    <div className='service-div'>
                        {serviceList.map((service) => {
                            return (
                                <div key={service.id}>
                                    <input type="radio" />
                                    <div>{service.title}</div>
                                    <div>{service.description}</div>
                                    <div>${service.price}</div>
                                </div>
                            )
                        })}
                    </div>
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
            <div className='price-submit'>
                <div className='price-div'>
                    Total Price: ${services.price}
                </div>

                <button className='booking-submit' onSubmit={handleSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default Booking
