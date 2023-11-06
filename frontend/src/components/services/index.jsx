import './services.css'
import AddService from './AddService'
import { useEffect, useState } from 'react'
import DeleteService from './DeleteService'
import EditService from './EditService'

import { useContext } from 'react';
import { UserContext } from '../../main';
import { useNavigate } from 'react-router'

import tint from "../../assets/window-tint.jpg";
import sedanWrap from "../../assets/sedan-wrap.jpg";
import suvWrap from "../../assets/suv-wrap.jpg";
import intDetail from "../../assets/interior-detail.jpg";
import intSteam from "../../assets/int-steaming.jpg";
import extDetail from "../../assets/exterior-detail.jpg"; 

function ServiceTile({ service, user }) {
    const navigate = useNavigate();
    let image
    switch (service.title) {
        case "SUV Side Window Tint":
            image = tint
            break;
        case "Sedan Side Window Tint":
                image = "https://m.media-amazon.com/images/I/81NDm2mZn-L._AC_SX679_.jpg"
                break;
        case "Head light/tail light Tint":
            image = "https://m.media-amazon.com/images/I/7103oV3VMjL._AC_UF894,1000_QL80_.jpg"
            break;
        case "SUV Rear Window Tint":
            image = tint
            break;
        case "Sedan Rear Window Tint":
            image = tint
            break;
        case "Sedan full car wrap":
            image = sedanWrap;
            break;
        case "SUV full car wrap":
            image = suvWrap;
            break;
        case "Interior detailing":
            image = intDetail;
            break;
        case  "Interior/Exterior detailing":
            image = intDetail;
            break;
        case "Interior/Exterior steaming":
            image = intSteam;
            break;
        case "Exterior detailing":
            image = extDetail;
            break;    
        case "Door chrome delete":
            image = "https://m.media-amazon.com/images/I/61rzQ45BGKL.jpg"
            break
        case "Full chrome delete":
            image = "https://m.media-amazon.com/images/I/61rzQ45BGKL.jpg"
            break
        default:
            break;
    }

    function bookRedirect(){
        !user ? navigate("/login") : navigate("/booking")
    };

    return (
        <div className='service-tile-wrapper'>
            <div className='service-tile-img-wrapper'>
                <img className='service-tile-img' src={image} alt={`${service.title}`} />
            </div>
            <div className='service-tile-text-wrapper'>
                <div className='service-tile-title'>{service.title}</div>
                <div className='service-tile-middle'>
                    <div className='service-tile-description'>{service.description}</div>
                    <div className='service-tile-price'>Price: ${service.price}</div>
                </div>
                <div className='service-tile-buttons'>
                    <div className='service-tile-book-button' onClick={bookRedirect}>BOOK NOW</div>
                    {/* {user.is_admin ? (
                        <>
                        <DeleteService id={service.id} />
                        <EditService service={service} />
                        </>
                    ) : null } */}
                </div>
            </div>
        </div>
    )
};

const Services = () => {
    const [services, setServices] = useState([])
    const { user, setUser } = useContext(UserContext);

    async function getServices() {
        const response = await fetch("/api/services")

        if (response.ok) {
            const res = await response.json()
            if (res.services) {
                setServices(res.services)
                sessionStorage.setItem("services", JSON.stringify(res.services))
            }
        }
    }
    useEffect(() => {
        getServices()
    }, [])
    return (
        <>
        <h2 id='section-title'>Services</h2>
        <div id='service-section-wrapper'>
            {/* {user && user.is_admin ? <AddService /> : null} */}
            {services.map((service) => {
                return (
                    <ServiceTile user={user} service={service} />
                    )
                })}
        </div>
        </>
    )
}

export default Services
