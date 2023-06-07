const initialState = {
    myFavorites: [],
    allCharactersFav: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FAV':
            return {
                ...state,
                myFavorites: [...state.allCharactersFav, action.payload],
                allCharactersFav: [...state.allCharactersFav, action.payload]
            }
        case 'REMOVE_FAV':
            return {
                ...state,
                myFavorites: state.myFavorites.filter(fav => fav.id !== Number(action.payload))
            }
        case 'FILTER':
            const allCharactersFavFiltered = state.allCharactersFav.filter((char) => char.gender === action.payload)
            return {
                ...state,
                myFavorites: allCharactersFavFiltered
            }
        case 'ORDER':
            const allCharactersFavCopy = [...state.allCharactersFav]
            return {
                ...state,
                myFavorites: 
                action.payload === 'A' 
                ? allCharactersFavCopy.sort((a, b)=> a.id - b.id) : allCharactersFavCopy.sort((a, b)=> b.id - a.id)
            }
        default:
            return { ...state }
    }
};

export default reducer;