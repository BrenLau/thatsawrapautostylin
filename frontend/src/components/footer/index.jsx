import "./footer.css"
import { SocialIcon } from 'react-social-icons'


const Footer = () => {

    const email = () => {
        window.open('mailto:thatsawrapautostylin@gmail.com/?subject=&body=')
    }

    return (
        <footer className="footer">
            <span>Vinson Zheng</span>
            <SocialIcon className="email" network='email' onClick={email}></SocialIcon>
            <SocialIcon url="https://www.instagram.com/thatsawrapautostylin/?igshid=MzRlODBiNWFlZA%3D%3D" />
            {/* <i className="fa-brands fa-instagram"></i> */}
        </footer>
    )

}

export default Footer
