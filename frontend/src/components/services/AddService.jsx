import { useState, useEffect } from "react"

const AddService = () => {
    const [carTypes, setCarTypes] = useState([])
    const [carTypeSelected, setCarTypeSelected] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [time, setTime] = useState(2)
    useEffect(() => {
    }, [price])
    useEffect(() => {
        const getCarTypes = async () => {
            const response = await fetch('http://127.0.0.1:5000/api/cartypes')
            if (response.ok) {
                const res = await response.json()
                setCarTypes(res.cars)
            }
        }
        getCarTypes()
    }, [])

    const onSubmit = async (e) => {
        const data = {
            car_type: carTypeSelected,
            title,
            description,
            price,
            duration: time,
            image_url: 'fdsa'
        }
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:5000/api/services', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            const res = await response.json()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <label>
                Service Title
                <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </label >

            <label>
                Description
                <input type="textarea" value={description} onChange={(e) => setDescription(e.target.value)}></input>
            </label>

            <label>
                Price
                <input type="number" value={price} onChange={(e) => {
                    setPrice(e.target.value)
                }}></input>
                $
            </label>

            <label>
                image
                <input type="file"></input>
            </label>

            <div>
                Car Type
                {carTypes.map((car) => {
                    return (
                        <label key={car.id}>
                            {car.car_type}
                            < input type="radio" value={car.id} checked={carTypeSelected === car.id ? true : false} onClick={(e) => {
                                setCarTypeSelected(car.id)
                            }}></input>

                        </label>
                    )
                }
                )}
            </div >

            <label>
                Duration(Hours)
                <input type="number" value={time} onChange={(e) => setTime(e.target.value)}></input>
            </label>
            <button>Submit</button>

        </form >
    )
}

export default AddService
