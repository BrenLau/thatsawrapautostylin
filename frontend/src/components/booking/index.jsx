import './booking.css'

const Booking = () => {
    return (
        <form>
            <h1>Book your service</h1>
            <div className='name-div'>
                <label className='name'>
                    Name:
                    <input
                        type="text"
                        placeholder="Name"
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className='email-div'>
                <label>
                    Email:
                    <input
                        className="email"
                        type="email"
                        placeholder="Email Address"
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className='number-div'>
                <label>
                    Phone Number:
                    <input
                        className='phone'
                        type='number'
                        placeholder='Phone Number'
                        // value={number}
                        // onChamge={(e) => setNumber(e.target.value)}
                        minLength={10}
                        maxLength={10}
                        required
                    />
                </label>
            </div>
            <div className='insta-div'>
                <label>
                    Instagram:
                    <input
                        className='insta'
                        placeholder='Instagram'
                        type='text'
                        // value={instagram}
                        // onChange={(e) => setInstagram(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className='car-div'>
                <label>
                    Car Model/Type:
                    <input
                        className='car-type'
                        placeholder='Car Type'
                        type='text'
                        // value={car}
                        // onChange={(e) = setCar(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className='date-div'>
                <label>
                    Date and Time:
                    <input
                        className='date/time'
                        type='datetime-local'
                        //value = {times}
                        // onChange={(e) => setTimes(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className='service-div'>
                <label> Service:
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
                <label>Add ons:
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
                    Referral Code:
                    <input
                        type='text'
                    />
                </label>
            </div>
            <div className='price-div'>
                Total Price: $$
            </div>

            <button className='booking-submit'>Submit</button>
        </form>
    )
}

export default Booking
