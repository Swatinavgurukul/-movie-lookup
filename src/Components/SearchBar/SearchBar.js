import React, { Component } from 'react';
import './SearchBar.css';
import MovieSearchList from '../MovieSearchList/MovieSearchList';


// This Component is for the Search-Bar , handling input from user and passing as a prop ( Movie name ) to MovieSearchList component .

class SearchBar extends Component {
    state = {
        movieInput: '',
        clicked: false
    }

    inputHandler = (event) => {
        this.setState({ movieInput: event.target.value })
        console.log(this.state.movieInput)
    }

    clickHandler = (event) => {
        event.preventDefault();
        this.setState({ clicked: true })
    }

    render() {
        return (
            <div className="nav-header">
                <form className="input-ml">
                    <input
                        type="search"
                        placeholder="Search movie"
                        value={this.state.movieInput}
                        onChange={this.inputHandler} />
                    <button onClick={this.clickHandler} >Search</button>
                    {this.state.clicked ? <MovieSearchList searchString={this.state.movieInput} /> : null}
                </form>
            </div>
        )
    }
};

export default SearchBar;