# TABLE OF CONTENTS

- [A - INTRODUCTION](#a)
- [B - IMMUTABLE DATA STRUCTURES](#b)
- [C - TYPE OF FUNCTIONS](#c)
- [D - HTML and CSS](#d)
- [E - FUNCTIONAL CONCEPTS](#e)
- [F - FUNCTIONAL APPS](#f)

Source: https://www.udemy.com/functional-programming-for-beginners-with-javascript/learn/v4/overview

# <a name="a"></a> A - INTRODUCTION

- Most software written today, is overly complex, difficult to understand, challenging to test, hard to change and filled with hard find bugs, because:

  - Not using the simplest building blocks possible… If you start with something complicated, you’ll end up with something even more complicated.
  - Programming in a style that is more susceptible to complex bugs
  - Not properly respecting and handling Side effects(talking to servers, input / output, etc)
  - “Sprinkling” Application State all throughout codebases
  - Unnecessarily mutating data
  - Code Duplication (particularly sneaky ones, like similar class methods in Object Oriented Programming )
  - Writing more code than necessary

- Functional programming addresses the above problems in the following ways:

  - Simpler apps, because functional programming uses the simplest building blocks possible, just plain old data and pure functions to transform the data (easier to understand and work with)
  - Uses code styles that are simpler and less prone to complicated bugs (more time doing productive work)
  - Eliminating Side Effects, as much as possible and controlling them when they are needed (reduces bugs)
  - Avoids data mutation as much as possible (reduces bugs)
  - Uses pure functions, that can work with many different types of data (improved code reuse)
  - Uses generalized functions, that can be specialized to suit different needs (less code, same functionality)
  - Creating new functions, without adding any new logic, using function composition (more functionality, no code added)

- Functional programming, in my experience, is more productive than Object Oriented Programming because there are fewer things to think about, so you don’t overwhelm your working memory. Usually your just thinking about plain old data, and data transformations, using functions. Additionally, in Functional Programming, there aren’t tons of competing ways of doing the same thing, so you don’t have to think about unnecessary things. Functional Programming is constraining, and thats a good thing. You’re able to better focus, on the problem you’re solving, rather than the tools you’re using to solve the problem.
- In Object Oriented Programming, you have to think about many different types of complicated, stateful objects that can be interacted with in different ways. You’ve got to think about more than just data, and data transformation… You’ve got to think about things like State and Side Effects, far more than you do in Functional Programming.

## Libraries used in the course

- **Ramda** - We'll use the awesome Ramda JavaScript Library, which similar to lodash and underscore, but it's built to leverage Functional Programming Concepts. In my opinion, this library is a must use library for functional programming in JavaScript.
- **Hyperscript** - We'll use the hyperscript library to generate html and css. For example, we'll call hyperscripts 'div' function to generate html divs. ie div('hello') => <div>hello</div>
- **Tachyons** - This is a css framework that embraces Functional Programming concepts like composition.
- **Webpack/Babel** - We'll setup a minimal build system using webpack, babel and a few related plugins. This is a onetime setup step.
- **Virtual-Dom** - We'll use a virtual dom library to efficiently update webpages. This is the technology used by modern frameworks like React and Vuejs. This is a onetime setup step.

## What are apps ?

- Apps are at the core DATA, organised in LISTS OF DATA, that can be transformed through DATA TRANSFORMATIONS triggered by interactions.

# <a name="b"></a> B - IMMUTABLE DATA STRUCTURES

- Generaly, it's a good idea NOT TO MUTATE DATA, so you don't worry to share this data with a function, and it is simpler.
- Javascript does not care if you mutate data or not.
- WARNING: const keyword does not protect again change of variable, it only prevents reassignment of a the variable.

        const PI = 3.14;
        PI = 3.14566;
        => error

        const obj = {
            prop1: 1,
            prop2:'are'
        }
        const obj.prop1 = 26
        => no error

## Updating objects/records in an immutable way

- You make state changes.
- State is the things your program remembers.
- Maintaining state means that you keep tracks of changes made on the data (ADD, UPDATE, DELETE ...)
- However, how to you maintain state if all data is immutable ?

            const meal = {
                id: 2,
                description: 'Breakfast'
            };

  1.  Use a new constant => too verbose

            const updatedMeal = {
                id: meal.id,
                description: meal.description,
                calories: 600
            }

  2.  use the ... operator

            //add property with Spread Operator
            const updatedMeal2 = {
                ...meal,
                calories: 600
            }

            //update property
            const updatedMeal3 = {
                ...meal,
                description: 'truc'
            }

            //delete property using Desctructuring with Rest syntax
            const {
                id,
                ...mealWithoutId
            } = updatedMeal

## Updating arrays in an immutable way

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

- Add item => Usee the spread operator

            const array2 = [
                ...array,
                newMeal
            ];

- Update property of an element in array => use map function

            const array3 = array.map((e, i) => {
                if (e.id === 2) {
                    return {
                        ...e,
                        description: 'frite',
                    }
                }
                return e
            });

- Remove an element from an array => use filter function

            const array4 = array.filter(e => e.id !== 2);

## Summarize informations in an array

- Use reduce function

            //group by grade
            const numberBygrade = grades.reduce((acc, grade) => {
                const {
                    a = 0, b = 0, c = 0, d = 0, e = 0, f = 0
                } = acc;
                if (grade > 90) {
                    return { ...acc,
                        a: a + 1
                    }
                } else if (grade > 80) {
                    return { ...acc,
                        b: b + 1
                    }
                } else if (grade > 70) {
                    return { ...acc,
                        c: c + 1
                    }
                } else if (grade > 60) {
                    return { ...acc,
                        d: d + 1
                    }
                } else if (grade > 50) {
                    return { ...acc,
                        e: e + 1
                    }
                } else if (grade < 40) {
                    return { ...acc,
                        f: f + 1
                    }
                }
            });

# <a name="c"></a> C - TYPE OF FUNCTIONS

## Currying and Partial Application

- High order function: function that take a function as a parameter or return a function
- Closure: functions that can access and use variable that are not directly passed into the function
- Currying: transforming a function that takes multiple arguments into a function that take a single argument, and returns a function that use the remaining parameters.
  - Currying is what you do to a function before actually using it.
  - Currying is about Creating Function in the absence of Data
- Partial Application: Specializing a more general function.
  - It is what is done to a function when you begin to use the function
  - Partial Application is related to consuming or using the function with actual data


            //First function
            greet(greeting, name){
                return `${greeting} ${name}
            }

            //Currying by creating a high order function that returns another function with a closure on greeting and using the remaining parameter (name)
            greet(greeting){
                return function(name){
                    return `${greeting} ${name}`
                }
            }

            greet('Good Afternoon')('Pierre')

            const names = ['robert','ernest','celia'];

            //Map is a high order function that takes a function with partial application of the curryied greeting function
            names.map(greeting('hello'));

- It is possible to use partial application on a curryied function or a regular function (a non-curryied function), in the later case with the use of an helper

            function add(x,y){
                return x + y;
            }

            const add3 = partial(add,[3])

            add3(4);

- In a curryied function, the order parameter is important

  - it depends on what you need to supply the function the first time.
  - any parameters that turns a more general function into a more specialized function should be first

- Currying is not a feature of the Javascript language. We use the _ramda_ library to simplify the syntax of curryied functions and actually transform a regular function to a curried one. We need to use the () => {} syntax instead of the function(){} syntax for the regular function declaration.

            const Ramda = require('ramda');
            const regularGreet = (greeting, name) => `${greeting} ${name}`;
            const curryiedGreet = Ramda.curry(regularGreet)

            regularGreet('Good morning', 'Roger')
            curryiedGreet('Good morning')('Roger')
            curryiedGreet('Good morning', 'Roger')

## Pure Functions

- Pure functions creates and returns value only based on the input parameters and it causes no side effects
  - A pure function must have parameters
  - A pure function does not use stateful values, ie they should not rely on external data that can change over time
  - A pure function returns a value that's determined only by its input parameters
  - A pure function should not cause any side effects (like saving to the database, write to a file, change UX)
- Impure functions are called Procedure

            //pure function
            function add(x,y){
                return x + y;
            }

            //Impure function
            let counter = 0;

            function increment(){
                counter++;
            }

- It's hard to write only pure functions but

  - They are reusable, often in ways you never anticipated
  - They are composable, so you can create new functions by combining pure functions
  - They are easy to test
  - They are easy to cache

- Functional programming does not say there should be no state in an app (there is always), but
  - that you should eliminate state as much as possible
  - that you should tightly control state when it is needed

## Function composition

- It is making new functions out of other functions by combining the logic of the other functions.

            const countWords = R.split(R.length(' ',sentence))

            const countWords2 = R.compose(R.length,R.split(' '))(sentence)      => from right to left
            const countWords3 = R.pipe(R.split(' '), R.length)(text);           => similar but from left to right

# <a name="d"></a> D - HTML and CSS

## Tachyons CSS Library

It is usually pretty hard to maintain CSS. Tachyons is a css framework that does not have component classes, instead you combine simple CSS rules to get what you need.

            <!DOCTYPE html>
            <html>
                <head>
                    <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" />
                </head>
                <body>
                    <button>Save</button>
                    <button class="ph3 pv2 bg-blue white bn br1 pointer dim" style="">Save</button>
                </body>
            </html>

## Generating HTML and CSS

- As a functional programer, you try to keep data and functions separate as much as possible.
- From the wireframe, define the data structure you need, then define the HTML and CSS that will represent this data
- We use Hyperscript and its helpers to generate HTML and CSS from JS data

            const cell = (tag, className, value) => {
                return h(tag, {
                    className
                }, value);
            }

# <a name="e"></a> E - FUNCTIONAL CONCEPTS

## Programming Paradigms:

- Imperative => Structured => Procedural => OOP + Event Driven
- Declarative => Functional

## Declarative Programming

- Declarative: Defines program logic but not detailed control flow - spreadsheets, SQL, regular expressions, CSS, SPARQL.

            ex: 'Where do you live ?' => 'My address is ...' (Result)

- Imperative: defines programs as statements that directly changes a program state (datafields)

            ex: 'Where do you live ?' => 'You take the second left, then right ...' (Directions)

## Functional Programming

- It is a style of programming where you use pure functions almost exclusively.
- Treats programs as evaluating mathematical functions and avoid state and mutable data - lambda calculus, recursion - C++, Clojure, Coffeescript,Elixir, Erlang, F#, Haskell, Lisp, Python, Ruby, Scala, SequenceL, Standard ML, JavaScript, React

# <a name="f"></a> F - FUNCTIONAL APPS

## Planning App

- Wireframe (layout) + user interaction
- Data Model structure
- Function(s) to create layout from data (View function)
- Function(s) to transform/updating data model based on user interactions (Update function)

## Simple Counter

- Data model

            let model = initModel;

- Separate concern in different functions (generate view, update state) and link them inside a central "controller" and use a dispatch function to trigger data flow

            const view = (dispatch, model) => {
                return div([
                    div({
                        className: 'mv2'
                    }, `Count: ${model}`),
                    div({
                        className: 'buttons'
                    }, [
                        button({
                            className: 'pv1 ph2 mr2',
                            onclick: () => dispatch(MSGS.SUBTRACT)
                        }, '-'),
                        button({
                            className: 'pv1 ph2',
                            onclick: () => dispatch(MSGS.ADD)
                        }, '+')
                    ])
                ]);
            }

            const update = (msg, model) => {
                switch (msg) {
                    case MSGS.ADD:
                        return model + 1;
                    case MSGS.SUBTRACT:
                        return model - 1;
                    default:
                        return model;
                }
            }

            const app = (initModel, update, view, node) => {
                let model = initModel;
                let currentView = view(dispatch, model);
                node.appendChild(currentView);
                function dispatch(msg) {
                    model = update(msg, model);
                    const updatedView = view(dispatch, model);
                    node.replaceChild(updatedView, currentView);
                    currentView = updatedView;
                }
            }

            app(initModel, update, view, node);

- It is good practice to use constants instead of string for messages inside app

            const MSGS = {
                ADD: 'ADD',
                SUBTRACT: 'SUBTRACT',
            };

- regenerating DOM inside the browser is expensive, so it is better to only update what is needed. The solution is to make a diff between the two "states" of the global view by using a virtual dom.
- A virtual DOM library is a performance library that sits between the view function and the DOM and that will compare the current view and the updated view, and will only update the changed portion of the DOM

            npm install virtual-dom --save

            let rootNode = createElement(currentView);
            node.appendChild(rootNode);

            //Event Listener
            function dispatch(msg) {
                ...
                const patches = diff(currentView, updatedView);
                rootNode = patch(rootNode, patches);
                ...
            }

## Calories counter

- Data Model

            let model = {
                meals: [
                    //{id: xxx, description: xxx, calories: xxx},
                ],
                showForm: false,
                description: 'Dinner',
                calories: 600,
                editId: 3,
                nextId:1
            }

- View Function(s)

            view
                title
                formView
                    fieldSet
                    buttonSet
                tableView
                    tableHeader
                    tableBody
                        tableRow
                            cell
                    tableFooter

- List of interactions (message type)

        ADDMEAL         -> click add meal button
        MEALINPUT       -> insert text in meal input
        CALINPUT        -> insert text in calorie input
        SAVEMEAL        -> save or update meal by clicking on save button
        EDITMEAL        -> display form and populate inputs
        DELETEMEAL      -> click trash icon

- Update Function(s)

        addMeal
        mealInput
        calorieInput
        saveNewmeal
        updateExistingmeal
        editMeal
        deleteMeal

- Create separate module: Model.js Update.js View.js App.js
- create initModel in Model.js
- create basic view function in View
- create app function that take all module in parameters and initialize the view
- create the dispatch function within the app function for update purpose
- create update function in Update.js
  - Create Message Type
  - Create New Message function (type and payload)
  - in update function, create case for Message
  - combine dispatch and New Message function within the View on events
