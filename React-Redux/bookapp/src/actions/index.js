//action creator that need to return an action, object with type (compulsory) and payload (optional) properties
export function selectBook(book){
    return {
        type: 'BOOK_SELECTED',
        payload: book
    };
}