/_Note taken during Udemy course "Modern React with Redux" https://www.udemy.com/react-redux/learn/v4/overview_/..

//Simple template for React https://github.com/stephengrider/reduxsimplestarter

\*REACT COMPONENTS / CONTAINERS

* props === "arguments" of component
* Whenever state changes, components are regenerated.
* class component instead of function component => state available in classes
* callbacks => way to communicate simply between children and parent via callbacks set as prop
* controlled components: value set by component state (for input for example)
* lifecycle mof component used to launch certain actions (ex: componentDidMount to fetch actions that fetch all posts)
* container === smart component === component that need to talk to application state / redux

\*REDUCERS

* Map Application State
* Create generale CombineReducer
* Create each reducer
* Bind reducer to container via mapStateProps function and connect component
* use data from state via this.props of container to display data

\*ACTIONS

* modify application state through reducers (actions are set to all reducers)
* good place to put access to data via API
* Create Action Creator (type, payload)
* Bind Action Creator with container via mapDispatchToProp function and connect component
* add action trigger in elt of container to use action
* consume action in reducers

\*MIDDLEWARE:

* functions that stop any actions, check, let it pass, logs it ...
* Promise used with Axios to handle ajax request => simple implementation. For more complex implementation (ie, delays, ..), use React Thunk

\*ROUTER/HISTORY

* React Router parse changes made to URL and decide to update / show different sets of React Components
* No request to the server to change page => Single Page Application
* Switch component allows to easily handle more than one matchable route by rendering the first that matches (order of <Route> Component)

\*FORM

* via redux-form
* similar to html form
* use reduxForm like connect to wire up component to specific reducer, defined in combineReducers
* use <Field/> to add handlers on input component, refer to helper function to define how it should render
* validation of form through configuration of reduxForm with available error fields on helper function that renders input
* reduxForm is not responsible for submission, need to setup onSubmit event handler of form through handleSubmit reduxForm function and a custom callback function
* Field / Form states: pristine/touched/invalid => meta available on input
* Possible to combine reduxForm with connect if we wire up actions and application states to form.
* callback to the action to submit data to API is history.push, that redirects to specific path
* ownProps, set of props that is going to the target component, available in mapStateProps.
* mapStateProps is a good place to make some intermediate calculation such as lookup in object

\*THUX - DISPATCH

* Use of dispatch function through Thux, in order to use onsuccess/failure action

\*SELECTORS

* Return calculated state from piece of states => for example, selectedPost from a big list of posts

\*DATA LOADING METHODS

* Possible to use component lifecycle function such as componentWillMount or componentDidMount but component are tied to states
* Better solution is to use onEnter callback provided by React router

\*ANIMATION OF COMPONENTS

* ReactCSSTransitionGroup wrapper of items that need to be animated + css rules for the animation based on class created by the wrapper

\*BEST WAYS TO STORE DATA IN REDUX (array vs object)

* Array not a good approach
* Example find element in array vs object

state.posts.find(post => post.id === 34)

state.posts[34]

* Example on update elt in array / object

newPost=state.posts.filter(post => post.id!==id);
return [...state,newPost];

return {...state,[newPost.id]:newPost};

* example on delete elt in array/object

return state.posts.filter(post => post.id!==postIdToDelete);

return \_.omit(state,postIdToDelete);

* \_.mapKeys(payload,'id') => function that transforms an array into an object with key 'id'

\*COMMON ERRORS

* Warning: React.createElement => not valid React component somewhere => check import / export statement for mispel
* nothing happen after reducer modification => undefined action case => check import / export statement, maybe missing {} around import case name
* action creator: uncaught in promise => check action promise and / or middleware
* Objects are not valid as a React child => it's not possible to directly render plain javascript within react (wrapper needed)

\*MODALS

* warning of z-index rules only
* better solution, is to break rootcomponent hierarchy by making a sibling element directly under document.body

\*DEPLOYMENT OF REACT/WEBPACK APP

* use package.json to define action to be run by 'npm run'
* postinstall script to generate bundle.js => 'webpack -p'
* simple webserver with express for example

\*BROWSERHISTORY VS HASHHISTORY

* hashhistory => example.com/#/users -> /users || example.com/users -> nothing
* browserhistory => example.com/#/users -> /#/users || example.com/users -> /users
* If browserhistory is used need to setup web server to always serve index.html with every url, so React can be launched and then take care of the root provided by the user

\*INTEGRATING 3RD PARTY LIBRARIES

* use a wrapper to render script
* make use of ref prop to make a reference to a specific DOM element to be fed to the library
