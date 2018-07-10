//Updating arrays in an immutable way

const array = [{
        id: 1,
        description: 'patate',
        calories: 600
    },
    {
        id: 2,
        description: 'jambon',
        calories: 200
    }
];

//USe the spread operator / rest parameter

//add item

const newMeal = {
    id: 3,
    description: 'tarte',
    calories: 1000
}

const array2 = [
    ...array,
    newMeal
];

console.log('Array vs Array2:\n', array, '\n', array2);

//update property of an element in array => use map function
const array3 = array.map((e, i) => {
    if (e.id === 2) {
        return {
            ...e,
            description: 'frite',
        }
    }
    return e
});

console.log('Array vs Array3:\n', array, '\n', array3);

//Remove an element from an array => use filter function
const array4 = array.filter(e => e.id !== 2);

console.log('Array vs Array4:\n', array, '\n', array4);