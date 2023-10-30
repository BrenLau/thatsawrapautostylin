import { useState, useEffect } from "react"

const AddService = () => {
    const [carTypes, setCarTypes] = useState([])
    const [carTypeSelected, setCarTypeSelected] = useState('')

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
                <input></input>
            </label>

            <label>
                Description
                <input type="textarea"></input>
            </label>

            <label>
                Price
                <input type="int"></input>
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
                <input></input>
            </label>

        </form >
    )
}

export default AddService
