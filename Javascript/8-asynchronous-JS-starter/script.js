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

// const getIds = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         const recipeId = [523, 569, 58, 25];
//         resolve(recipeId);
//     }, 1500);
// });

// const getRecipe = recId => {
//     return new Promise((resolve, reject) => {
//         setTimeout((ID) => {
//             const recipe = {
//                 title: 'Fresh',
//                 publisher: 'Jonas',
//             }
//             resolve(recipe.publisher);
//         }, 1500, recId);
//     });
// }

// const getPublisher = publisher => {
//     return new Promise((resolve, reject) => {
//         setTimeout(pub => {
//                 const recipe = {
//                     title: 'Pizza',
//                     publisher: 'Jonas'
//                 }
//                 resolve(`${pub}: ${recipe.title}`)
//             },
//             1500, publisher);
//     });
// }

// async function getRecipeAW() {
//     const IDs = await getIds;
//     const publisher = await getRecipe(IDs[2]);
//     const related = await getPublisher(publisher);
//     return related;
// }
// getRecipeAW().then(result => console.log(result));

// 4 - Make API Call with Fetch and Promises

// const proxy = "https://cors-anywhere.herokuapp.com/";
// const url = `${proxy}https://www.metaweather.com/api/location/`;

// function getWeather(woeid) {
//   fetch(url + woeid)
//     .then(response => {
//       //console.log(response);
//       return response.json();
//     })
//     .then(response => {
//       //console.log(response);
//       const today = response.consolidated_weather[0];
//       console.log(
//         `Temperatures in ${response.title} stay between ${today.min_temp} and ${
//           today.max_temp
//         }.`
//       );
//     })
//     .catch(error => console.log(error));
// }

// getWeather(2487956);
// getWeather(44418);

// 5 - Make API Call with Fetch and Async/Await

const proxy = "https://cors-anywhere.herokuapp.com/";
const url = `${proxy}https://www.metaweather.com/api/location/`;

async function getWeatherAW(woeid) {
  try {
    const response = await fetch(url + woeid);
    const data = await response.json();
    const today = data.consolidated_weather[0];
    console.log(
      `Temperatures in ${data.title} stay between ${today.min_temp} and ${
        today.max_temp
      }.`
    );
  } catch (error) {
    alert(error);
  }
}
getWeatherAW(2487956);
getWeatherAW(44418);
