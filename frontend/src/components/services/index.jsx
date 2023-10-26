import './services.css'
import { useEffect, useState } from 'react'

const Services = () => {
    const [services, setServices] = useState([{ id: 1, title: 'wash', description: 'description', price: 24.32, image_url: 'na', car_type: 1, duration: 2 }])
    async function getServices() {
        const response = await fetch("/api/services")
        const res = await response.json()
        console.log(res)
    }
    useEffect(() => {
        // setServices()
        getServices()
    }, [])
    return (
        <div id='serviceDiv'>
            {services.map((service) => {
                return (
                    <div>{service.title}</div>
                )
            })}
        </div>
    )
}

export default Services
