import axios from "axios";
import { useState, useEffect } from "react"; //useState,
import { useParams } from "react-router-dom";
import style from './Detail.module.css'
import { Link } from "react-router-dom";
//
//import { useDispatch, useSelector } from 'react-redux'
//import { getCardDetail } from "../../Redux/Actions";

const Detail = () => {
    const { id } = useParams();
    //
    // const character = useSelector(state => state.characterDetail)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getCardDetail(id))
    //   }, [dispatch, id])

    const [character, setCharacter] = useState({});

    useEffect(() => {
        axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
            if (data.name) {
                setCharacter(data);
            } else {
                window.alert('No hay personajes con ese ID');
            }
        });
        return setCharacter({});
    }, [id]);

    return (
        <div className={style.detail}>
            <div className={style.detailImg}>
                <img src={character.image && character.image} alt='' />
            </div>
            <div className={style.detailTxt}>
                <h1>Name: '{character.name && character.name}'</h1>
                <h1>Status: '{character.status && character.status}'</h1>
                <h1>Species: '{character.species && character.species}'</h1>
                <h1>Gender: '{character.gender && character.gender}'</h1>
                <h1>Origin: '{character.origin?.name && character.origin?.name}'</h1>
                <Link to='/home'>
                    <button className={style.buttonBack}>Home</button>
                </Link>
            </div>
        </div>
    )
}

export default Detail; 