import logo from '../assets/img/pen.jpg'

export const LogoRegister = ({text}) => {
    return(
        <div className='auth-form-logo-container' style={{ textAlign: 'center' }}>
            <img src={logo} alt='Logo' style={{ width: '150px', height: 'auto' }}/>
            <br></br>
            <span>{text}</span>
        </div>
    )
}