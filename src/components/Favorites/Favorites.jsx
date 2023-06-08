import Card from "../Card/Card";
import style from './Favorites.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { filterCards, orderCards } from "../../Redux/Actions";
import { useState } from "react";
//import Detail from "../Detail/Detail";

//import { connect } from "react-redux";


const Favorites = ({onClose}) => { //{ myFavorites } 

    const [aux, setAux] = useState(false)

    const myFavorites = useSelector((state) => state.myFavorites)

    const dispatch = useDispatch();

    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value))
        setAux(!aux)
    }

    const handleFilter = (event) => {
        dispatch(filterCards(event.target.value))
    }

    return (
        <div>
            <div className={style.h1Fav}>
                <h1>❤️</h1>

                <select className={style.filtersBox} onChange={handleOrder}>
                    <option value="A">Ascendente</option>
                    <option value="D">Descendente</option>
                </select>
                <select className={style.filtersBox} onChange={handleFilter}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                </select>
                <button className={style.showAll} onClick={handleOrder} value="A">ShowAll</button>

            </div>
            <div className={style.conteinerFavs}>
                {
                    myFavorites?.map(({ id, name, status, species, gender, origin, image }) => {
                        return (
                            <Card
                                key={id}
                                name={name}
                                status={status}
                                species={species}
                                gender={gender}
                                origin={origin}
                                image={image}
                                onClose={onClose}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
};

// const mapStateToProps = (state) => {
//     return {
//         myFavorites: state.myFavorites
//     }
// }

//export default connect(mapStateToProps, null)(Favorites);

export default Favorites;