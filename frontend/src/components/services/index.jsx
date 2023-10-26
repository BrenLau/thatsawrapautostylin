import './services.css'
import { useEffect, useState } from 'react'

const Services = () => {
    const [services, setServices] = useState([{ id: 1, title: 'wash', description: 'description', price: 24.32, image_url: 'na', car_type: 1, duration: 2 }])
    async function getServices() {
        const response = await fetch("http://127.0.0.1:5000/api/services")

        if (response.ok) {
            console.log('hello inside')
            const res = await response.json()
            if (res.services) {
                setServices(res.services)
            }
        }
    }
    useEffect(() => {
        getServices()
        // setServices()
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
