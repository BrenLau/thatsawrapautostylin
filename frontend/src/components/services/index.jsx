import './services.css'
import AddService from './AddService'
import { useEffect, useState } from 'react'
import DeleteService from './DeleteService'

const Services = () => {
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
    }, [])
    return (
        <div id='serviceDiv'>
            <AddService />
            {services.map((service) => {
                return (
                    <div>
                        <div>{service.title}</div>
                        <div>{service.description}</div>
                        <div>{service.price}</div>
                        <DeleteService id={service.id} />
                    </div>
                )
            })}
        </div>
    )
}

export default Services
