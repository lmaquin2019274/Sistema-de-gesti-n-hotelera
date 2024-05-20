import logo from '../assets/img/logo.svg'

export const Logo = ({ text }) => {
    return (
        <div className='auth-form-logo-container' style={{ textAlign: 'center' }}>
            <img src={logo} alt='Logo' style={{ width: '200px', height: 'auto' }} />
            <br />
            <span >{text}</span>
        </div>
    )
}
