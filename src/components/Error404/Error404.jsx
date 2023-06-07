import { Link } from "react-router-dom";
import style from './Error404.module.css'

const Error404 = () => {
    return (
        <div className={style.E404}>
            <Link to={'/home'}>
            <button className={style.button404}> Home / Rick & Morty</button>
            </Link>
        </div>
    )
}

export default Error404;