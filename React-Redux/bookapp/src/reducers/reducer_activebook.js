//reducer has two arguments, state (see below) and action
//state argument is not application state, only the state the reducer is responsible for
//always return a fresh object, DO NOT MUTATE state like state.title = book.title for example
export default function (state = null,action){
    switch(action.type){
        case 'BOOK_SELECTED':
            return action.payload
    }
    return state    
}