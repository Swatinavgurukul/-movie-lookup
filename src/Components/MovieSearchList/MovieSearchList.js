import React, { Component } from 'react';
import './MovieSearchList.css';
import axios from 'axios';
import MovieDetails from '../MovieDetails/MovieDetails';

// This component is for displaying list of movies from the movieListApiCall.
class MovieSearchList extends Component {

    state = {
        movies: [],
        error: null,
        clicked: false,
        movieId: '',
    };

    componentDidMount() {
        this.movieListApiCall()
        this.setState({ movies: [] })
    };

    componentDidUpdate(props) {
        console.log(props, "kriti")
        if (this.props.searchString !== props.searchString) {
            this.movieListApiCall()
        }
    };

    movieListApiCall = () => {
        var arr = [];
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=3583464c166eb3446babdeabbc188153&language=en-US&query=${this.props.searchString}&page=1&include_adult=false`)
            .then((response) => {
                response.data.results.map((movie) => {
                    let oneMovie = [];
                    oneMovie.push(movie.id, movie.title, movie.overview);
                    arr.push(oneMovie);
                    return arr;
                });
                return this.setState({ movies: arr })
            }).catch((error) => {
                this.setState({ error: "Invalid Search, please try again!" })
            });
    };

    handlerClick = (id) => {
        this.setState({ movieId: id })
        this.setState({ clicked: true })
    };

    render() {

        let displayError = null;
        if (this.state.movies.length === 0 && this.state.error) {
            displayError = (<div className="card-invalid-search">{this.state.error}</div>)
        }
        return (
            <React.Fragment>
                <div className="movies-left-column">
                    {displayError}
                    {this.state.movies.map((movie) => {
                        return (<div className="card" key={movie[0]} onClick={() => this.handlerClick(movie[0])}>
                            <h2>{movie[1]}</h2>
                            <p>{movie[2]}</p>
                        </div>)
                    })}
                </div>
                {this.state.clicked ? <MovieDetails movieId={this.state.movieId} /> : null}
            </React.Fragment>
        )
    }
};

export default MovieSearchList;