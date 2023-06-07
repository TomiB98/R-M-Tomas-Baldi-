import './App.css';
import Cards from './components/Cards/Cards.jsx';
import NavBar from './components/NavBar/NavBar';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import About from './components/Creator/About';
import Detail from './components/Detail/Detail';
import Error404 from './components/Error404/Error404';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';

import { useDispatch } from 'react-redux';
import { removeFav } from './Redux/Actions';
const EMAIL = 'tomasbaldi@gmail.com';
const PASSWORD = 'tomas98';

function App() {
   const dispatch = useDispatch();

   const [characters, setCharacters] = useState([])
   const { pathname } = useLocation()

   const navigate = useNavigate();
   const [access, setAccess] = useState(false);

   function login(userData) {
      if (userData.password === PASSWORD && userData.email === EMAIL) {
         setAccess(true);
         navigate('/home');
      }
   }

   function logout() {
      navigate('/')
      setAccess(false)
   }

   useEffect(() => {
      !access && navigate('/');
   }, [navigate, access]);

   function onSearch(id) {
      axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
         console.log(data)
         if (characters.some(char => char.id === data.id)) {
            window.alert('¡El personaje ya fue cargado!');
         }
         else if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   }

   const randomSearch = () => {
      let min = 1
      let max = 826
      let randomId = Math.floor((Math.random() * (max - min + 1)) + min)
      axios(`https://rickandmortyapi.com/api/character/${randomId}`).then(({ data }) => {
         console.log(data)
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         }
      })
   }

   const onClose = (id) => {
      setCharacters(
         characters.filter((char) => {
            return char.id !== Number(id)
         })
      )
      dispatch(removeFav(id))
   }

   return (
      <div className='App'>
         {/* {pathname !== '/' && <NavBar onSearch={onSearch} randomSearch={randomSearch} />} */}
         {pathname === '/home' && <NavBar onSearch={onSearch} randomSearch={randomSearch} logout={logout} />}
         {pathname === '/about' && <NavBar onSearch={onSearch} randomSearch={randomSearch} logout={logout} />}
         {pathname === '/favorites' && <NavBar onSearch={onSearch} randomSearch={randomSearch} logout={logout} />}
         <Routes>
            <Route path='/' element={<Form login={login} />} />
            <Route path='/home' element={<Cards characters={characters} onClose={onClose} />} />
            <Route path='/about' element={<About />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/favorites' element={<Favorites onClose={onClose}/>} />
            <Route path='*' element={<Error404 />} />
         </Routes>
      </div>
   );
}

export default App;
