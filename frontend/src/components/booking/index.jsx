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
                referral
            })
        })

        if (times < new Date().toJSON().slice(0, 10)) {
            errors.times = "Date must be in future"
        }
    }

    let inputProps = {
        placeholder: "Select a date and time*"
    }
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
                            <option value="sedan">Sedan</option>
                            <option value="coupe">Coupe</option>
                            <option value="truck">Truck</option>
                            <option value="suv">SUV</option>
                        </select>
                    </div>
                </div>
                <div className='dates'>
                    <div className='date-div'>
                        <div className='date-select'>
                            <DateTime
                                inputProps={inputProps}
                                value={times}
                                onChange={(e) => setTimes(e.target.value)}
                            />
                            {errors.times && <p className="errors">{errors.times}</p>}
                        </div>
                    </div>
                </div>
                <div className='service-referral'>
                    <div className='service-div'>
                        <label>
                            <input
                                type='checkbox'
                            />
                            <label>Service 1</label>
                            <input
                                type='checkbox'
                            />
                            <label>Service 2</label>
                            <input
                                type='checkbox'
                            />
                            <label>Service 3</label>
                        </label>
                    </div>
                    <div className='addon-div'>
                        <label>
                            <input
                                type='checkbox'
                            />
                            <label>Add-on 1</label>
                            <input
                                type='checkbox'
                            />
                            <label>Add-on 2</label>
                            <input
                                type='checkbox'
                            />
                            <label>Add-on 3</label>
                        </label>
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
                    Total Price: $$
                </div>

                <button className='booking-submit' onSubmit={handleSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default Booking
