import "./footer.css"

const Footer = () => {

    const email = () => {
        window.open('mailto:thatsawrapautostylin@gmail.com?subject=&body=')
    }

    return (
        <footer className="footer">
            <span>Vinson Zheng</span>
            <span onClick={email} className="email"><i className="fa-regular fa-envelope"></i></span>
            <a href='https://www.instagram.com/thatsawrapautostylin/?igshid=MzRlODBiNWFlZA%3D%3D'><i className="fa-brands fa-instagram"></i></a>
        </footer>
    )

}

export default Footer
g
