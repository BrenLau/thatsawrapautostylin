import { useState, useEffect } from "react"

const AddService = () => {
    const [carTypes, setCarTypes] = useState([])
    const [carTypeSelected, setCarTypeSelected] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [time, setTime] = useState(2)
    useEffect(() => {
        // console.log(price)
    }, [price])
    useEffect(() => {
        const getCarTypes = async () => {
            const response = await fetch('http://127.0.0.1:5000/api/cartypes')
            if (response.ok) {
                const res = await response.json()
                setCarTypes(res.cars)
                console.log(carTypes)
            }
        }
        getCarTypes()
    }, [])
    return (
        <form>
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
                            < input type="radio" value={car.car_type} checked={carTypeSelected === car.car_type ? true : false} onClick={(e) => {
                                setCarTypeSelected(car.car_type)
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

        </form >
    )
}

export default AddService
