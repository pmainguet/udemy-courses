import React, { Component } from "react";
import { connect } from "react-redux";

class BookDetail extends Component {
  render() {
    //let displayedBook = (this.props.book) ? this.props.book:this.props.books[0];
    if (!this.props.book) {
      return <div>Select a book to get started</div>;
    }
    return (
      <div>
        <h3>Details for: </h3>
        <div>Title: {this.props.book.title}</div>
        <div>Pages: {this.props.book.pages}</div>
      </div>
    );
  }
}
//Only care about the Active Book
function mapStateToProps(state) {
  return {
    book: state.activeBook
    //books:state.books
  };
}

export default connect(mapStateToProps)(BookDetail);
