import SearchBar from '../SearchBar/SearchBar'
import style from './NavBar.module.css'
import { Link, NavLink } from 'react-router-dom'

const NavBar = ({ onSearch, randomSearch, logout }) => {
    return (
        <div className={style.nav}>
            <div className={style.buttons2}>
                <Link to='/home'>
                    <button className={style.buttonHome}>Home</button>
                </Link>
                <NavLink to='/about'>
                    <button className={style.buttonAb}>About</button>
                </NavLink>
                <Link to='/favorites'>
                    <button className={style.buttonAb}>❤️</button>
                </Link>
            </div>
            <SearchBar onSearch={onSearch} randomSearch={randomSearch} />

            <button onClick={() => { logout() }} className={style.buttonLogOut}>Log Out</button>

        </div>
    )
};

export default NavBar