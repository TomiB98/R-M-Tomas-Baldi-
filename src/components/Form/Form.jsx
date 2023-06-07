import style from './Form.module.css'
import { useState } from "react";
import Validation from "./Validation";

const Form = ({ login }) => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        setErrors(Validation({ ...userData, [event.target.name]: event.target.value }))
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        login(userData)
    }

    return (
        <div className={style.loginBack}>
            <form>
                <div className={style.login}>
                    <div className={style.h1}>
                        <h1>Rick & Morty</h1>
                    </div>
                    <div className={style.searchBars}>
                        <label htmlFor='email'>Email: </label>
                        <input className={style.search} onChange={handleChange} value={userData.email} type="text" name='email'/>

                        {errors.e1 ? (<p>{errors.e1}</p>) : errors.e2 ? (<p>{errors.e2}</p>) : (<p>{errors.e3}</p>)}

                        <label htmlFor='password'>Password: </label>
                        <input className={style.search} onChange={handleChange} value={userData.password} type="password" name='password' />

                        {errors.p1 ? (<p>{errors.p1}</p>) : (<p>{errors.p2}</p>)}
                    </div>
                    

                    <button className={style.loginButton} onClick={handleSubmit} type="submit">SUBMIT</button>
                </div>
            </form>
        </div>
    )
}

export default Form;