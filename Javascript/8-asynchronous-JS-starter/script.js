/*

// 1 - CALLBACK HELL - ES5

function getRecipe() {
    //use to simulate fetching of data
    setTimeout(() => {
        const recipeId = [523, 569, 58, 25];
        console.log(recipeId);

        setTimeout((id) => {
            const recipe = {
                title: 'Fresh',
                publisher: 'Jonas',
            }
            console.log(`${id}: ${recipe.title}`)

            setTimeout(publisher => {
                const recipe = {
                    title: 'Pizza',
                    publisher: 'Jonas'
                }
                console.log(`${publisher}: ${recipe.title}`)

            }, 1500, recipe.publisher);

        }, 1000, recipeId[2]);

    }, 1500)
}
getRecipe();
*/

// // 2 - PROMISES - ES6

// {
//     const getIds = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const recipeId = [523, 569, 58, 25];
//             resolve(recipeId);
//         }, 1500);
//     });

//     const getRecipe = recId => {
//         return new Promise((resolve, reject) => {
//             setTimeout((ID) => {
//                 const recipe = {
//                     title: 'Fresh',
//                     publisher: 'Jonas',
//                 }
//                 resolve(recipe.publisher);
//             }, 1500, recId);
//         });
//     }

//     const getPublisher = publisher => {
//         return new Promise((resolve, reject) => {
//             setTimeout(pub => {
//                     const recipe = {
//                         title: 'Pizza',
//                         publisher: 'Jonas'
//                     }
//                     resolve(`${pub}: ${recipe.title}`)
//                 },
//                 1500, publisher);
//         });
//     }

//     getIds.then(IDs => {
//             return getRecipe(IDs[2]);

//         }).then(publisher => {
//             return getPublisher(publisher)
//         }).then(publisher => console.log(publisher))
//         .catch(error => console.log(error));
// }

// 3 - ASYNC / AWAIT - ES8

const getIds = new Promise((resolve, reject) => {
    setTimeout(() => {
        const recipeId = [523, 569, 58, 25];
        resolve(recipeId);
    }, 1500);
});

const getRecipe = recId => {
    return new Promise((resolve, reject) => {
        setTimeout((ID) => {
            const recipe = {
                title: 'Fresh',
                publisher: 'Jonas',
            }
            resolve(recipe.publisher);
        }, 1500, recId);
    });
}

const getPublisher = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(pub => {
                const recipe = {
                    title: 'Pizza',
                    publisher: 'Jonas'
                }
                resolve(`${pub}: ${recipe.title}`)
            },
            1500, publisher);
    });
}

async function getRecipeAW() {
    const IDs = await getIds;
    const publisher = await getRecipe(IDs[2]);
    const related = await getPublisher(publisher);
    return related;
}
getRecipeAW().then(result => console.log(result));