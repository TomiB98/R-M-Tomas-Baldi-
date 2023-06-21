const initialState = {
    characterDetail: {},
    myFavorites: [],
    allCharactersFav: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FAV':
            return {
                ...state,
                myFavorites: action.payload,
                allCharactersFav: action.payload
            }
        case 'REMOVE_FAV':
            return {
                ...state,
                myFavorites: action.payload,
                allCharactersFav: action.payload
            }
        case 'FILTER':
            const allCharactersFavFiltered = state.allCharactersFav.filter((char) => char.gender === action.payload)
            return {
                ...state,
                myFavorites: action.payload === 'allCharacters' ? [...state.allCharactersFav] : allCharactersFavFiltered
            }
        case 'ORDER':
            const allCharactersFavCopy = [...state.allCharactersFav]
            return {
                ...state,
                myFavorites:
                    action.payload === 'A'
                        ? allCharactersFavCopy.sort((a, b) => a.id - b.id) : allCharactersFavCopy.sort((a, b) => b.id - a.id)
            }
        //
        // case 'GET_CARD_DETAIL':
        //     return {
        //         ...state,
        //         characterDetail: action.payload
        //     }
        default:
            return { ...state }
    }
};

export default reducer;