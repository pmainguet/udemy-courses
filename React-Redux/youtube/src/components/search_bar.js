import React,{Component} from 'react';

//functional component (does not have state)
//const SearchBar=()=>{
//   return <input />; // translates to React.createElement
//};

//Class Components (can reflect on itself, compare to a functional component, through a state object)
//State = JS object that record and react to JS input
//Every Class Components has a state object
//When state changed, the component re-render itself has well as trigger re-rendering of its children
//State must be initialized throught the class constructor
class SearchBar extends  Component{

    //Initialize state
    constructor(props){
        //call props of parent class
        super(props);
        //only time in a class that we setup state like that, anywhere else we use this.setState
        this.state={term:''};
    }

    render(){
        return (
            //Controlled component (value set by state)
            <div className="search-bar">
                <input
                    value={this.state.term}
                    onChange={event => this.onInputChange(event.target.value)}
                />
            </div>
        );
    }

    //event handler
    onInputChange(term){
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

//Start with a functional component and then if additional functionnalities needed, refactor to class

export default SearchBar;

