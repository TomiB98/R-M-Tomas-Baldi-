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


function App() {
   const dispatch = useDispatch();

   const [characters, setCharacters] = useState([])
   const { pathname } = useLocation()

   const navigate = useNavigate();
   const [access, setAccess] = useState(false);

   async function login(userData) {
      try {
         const { email, password } = userData;
         const URL = 'http://localhost:3001/rickandmorty/login/';
         const { data } = await axios(URL + `?email=${email}&password=${password}`)
         const { access } = data;
         setAccess(access);
         access && navigate('/home');
         
      } catch (error) {
         console.log(error.message)
      }
   }

   function logout() {
      setAccess(false)
      navigate('/')
   }

   useEffect(() => {
      !access && navigate('/');
   }, [navigate, access]);

   async function onSearch(id) {
      try {
         const {data} = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
         if (characters.some(char => char.id === data.id)) {
            alert('¡El personaje ya fue cargado!');
         }
         else if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } 
         else {
            alert('¡No hay personajes con este ID!');
         }

      } catch (error) {
         console.log(error)
      }
   }

   const randomSearch = () => {
      let min = 1
      let max = 826
      let randomId = Math.floor((Math.random() * (max - min + 1)) + min)
      axios(`http://localhost:3001/rickandmorty/character/${randomId}`).then(({ data }) => {
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
            <Route path='/favorites' element={<Favorites />} />
            <Route path='*' element={<Error404 />} />
         </Routes>
      </div>
   );
}

export default App;
