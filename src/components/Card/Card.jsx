import style from './Card.module.css'
import { useNavigate } from 'react-router-dom'
import { addFav, removeFav } from '../../Redux/Actions';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { connect } from 'react-redux'


const Card = ({ id, name, status, species, gender, origin, image, onClose }) => { // addFav, removeFav, myFavorites

   const navigate = useNavigate()
   const myFavorites = useSelector((state)=> state.myFavorites)

   const dispatch = useDispatch();

   const [isFav, setIsFav] = useState(false);

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [id, myFavorites]);

   const handleFavorite = () => {
      dispatch (isFav ? removeFav(id) : addFav({ id, name, status, species, gender, origin, image, onClose }))
      setIsFav(!isFav)
   };
   
   const handleNavigate = () => {
      navigate(`/detail/${id}`)
   }

   return (
      <div className={style.cards}>
         <div className={style.front}>
            <img src={image} alt='' />
            <p><i>{name}</i></p>
         </div>
         <div className={style.back}>
            <div className={style.buttonContainer}>
               <button className={style.buttonDelete} onClick={() => { onClose(id) }}>Delete</button>

               {
                  isFav ? (
                     <button className={style.buttonFav} onClick={handleFavorite}>❤️</button>
                  ) : (
                     <button className={style.buttonFav} onClick={handleFavorite}>🤍</button>
                  )
               }
               
               <button className={style.buttonInfo} onClick={handleNavigate}>More Info.</button>
            </div>
            <p>Status: {status}</p>
            <p>Species: {species}</p>
            <p>Gender: {gender}</p>
            <p>Origin: {origin}</p>
         </div>
      </div>
   );
};

export default Card;

// const mapDispatchToProps = (dispatch) => {
//    return {
//       addFav: (character) => dispatch(addFav(character)),
//       removeFav: (id) => dispatch(removeFav(id))
//    }
// };

// const mapStateToProps = (state) => {
//    return {
//       myFavorites: state.myFavorites
//    }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Card);