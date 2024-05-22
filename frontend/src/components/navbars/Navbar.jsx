import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/logo.png'
import { useUserDetails } from '../../shared/hooks'

const NavLogo = ({ onClickHandler }) => {
    return(
        <span className="nav-logo-container" onClick={onClickHandler}>
            <img
                className="nav-logo"
                width='100%'
                height='100%'
                src={logo}
                alt="Logo"
            />
            Soul Bistro
        </span>
    )
}

const NavButton = ({ text, icon, onClickHandler }) => {
    return (
        <span className="nav-button" onClick={onClickHandler}>
            <i className={icon} style={{ color: '#000000' }}></i>
            {text}
        </span>
    )
}

export const Navbar = () => {
    const { isLogged, logout } = useUserDetails()

    const navigate = useNavigate()

    const handleNavigateToHomePage = () => {
        navigate('/')
    }

    const handleNavigateToAuthPage = () => {
        navigate('/auth')
    }

    const handleNavigateToSettingPage = () => {
        navigate('/settings')
    }

    const handleNavigateToHotelsPage = () => {
        navigate('/hotel')
    }

    const handleNavigateToRoomsPage = () => {
        navigate('/room')
    }

    const handleNavigateToEventsPage = () => {
        navigate('/event')
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="nav-container">
            <NavLogo onClickHandler={handleNavigateToHomePage}/>
            <div className="nav-buttons-container">
                <NavButton text={'   Hotels'} icon={'fa-solid fa-hotel'} onClickHandler={handleNavigateToHotelsPage}/>
                <NavButton text={'   Rooms'} icon={'fa-solid fa-bed'} onClickHandler={handleNavigateToRoomsPage}/>
                <NavButton text={'   Events'} icon={'fa-regular fa-calendar-days'} onClickHandler={handleNavigateToEventsPage}/>
                {!isLogged ? (
                    <NavButton text='   Log in' icon={'fa-solid fa-right-to-bracket'} onClickHandler={handleNavigateToAuthPage}/>
                ) : (
                    <div className="mini-buttons-container">
                        <NavButton text='   Settings' icon={'fa-solid fa-gear'} onClickHandler={handleNavigateToSettingPage}/>
                        <NavButton text='   Log out' icon={'fa-solid fa-right-from-bracket'} onClickHandler={handleLogout}/>
                    </div>
                )}
            </div>
        </div>
    )
}