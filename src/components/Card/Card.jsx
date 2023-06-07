import style from './Card.module.css'
import { Link } from 'react-router-dom'
import { addFav, removeFav } from '../../Redux/Actions';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { connect } from 'react-redux'


const Card = ({ id, name, status, species, gender, origin, image, onClose}) => { // addFav, removeFav, myFavorites

   const myFavorites = useSelector((state)=> state.myFavorites)

   const dispatch = useDispatch();

   const [isFav, setIsFav] = useState(false);

   const handleFavorite = () => {
      dispatch (isFav ? removeFav(id) : addFav({ id, name, status, species, gender, origin, image, onClose }))
      setIsFav(!isFav)
   };

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [id, myFavorites]); 

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

               <Link to={`/detail/${id}`}>
                  <button className={style.buttonInfo}>More Info.</button>
               </Link>
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