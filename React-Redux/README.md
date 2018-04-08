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
* example: Promise used with Axios to handle ajax request

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
