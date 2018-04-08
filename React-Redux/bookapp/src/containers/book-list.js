import React, { Component } from "react";
import { connect } from "react-redux";
import { selectBook } from "../actions/index";
import { bindActionCreators } from "redux";

class BookList extends Component {
  render() {
    return <ul className="list-group col-sm-4">{this.renderList()}</ul>;
  }

  renderList() {
    return this.props.books.map(book => {
      return (
        <li
          onClick={() => this.props.selectBook(book)}
          key={book.title}
          className="list-group-item"
        >
          {book.title}
        </li>
      );
    });
  }
}

//Only care about the List of Books

//takes application state and return this.props
//Glue between Redux and React
function mapStateToProps(state) {
  return {
    books: state.books
  };
}

//Needed to bind Action Creator to Container
//Anything return from this function will be a props on the BookList container
function mapDispatchToProps(dispatch) {
  //Whenever selectBook is called, the result should be passed to all of our reducers (through dispatch)
  return bindActionCreators({ selectBook: selectBook }, dispatch);
}

//export a container through connect
//Through this connect function, whenever application state change, the container re-render
//+ the object and the state function mapStateToProps will be assigned as props to the component
//it needs to know about this new dispatch method, selectBook. Make it availale as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
