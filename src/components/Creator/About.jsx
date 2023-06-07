import style from './About.module.css'

const About = () => {
    return (
        <div className={style.me}>
            {/* <img src={``} alt='' /> */}
            <h1><i>Tomás Baldi</i></h1>
            <p>Status: Alive</p>
            <p>Species: Human</p>
            <p>Gender: Male</p>
            <p>Origin: Earth (C-137)</p>
        </div>
    )
}

export default About;