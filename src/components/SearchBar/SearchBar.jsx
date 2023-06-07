import style from './SearchBar.module.css'
import { useState } from 'react'

const SearchBar = ({onSearch, randomSearch}) => {
   const [id, setId]= useState('')

   const handleChange = (event) => {
      setId(event.target.value)
   }

   return (
      <div className={style.searchBar}>
         <input className={style.search} type='search' onChange={handleChange} value={id}/>
         <button className={style.searchButton} onClick={() =>{onSearch(id)}}>Agregar</button>
         <button className={style.randomButton} onClick={() =>{randomSearch()}}>Random</button>
      </div>
   );
}

export default SearchBar