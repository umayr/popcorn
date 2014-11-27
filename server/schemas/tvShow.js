/**
 * Created by Umayr on 11/24/2014.
 */
var mongoose = require('mongoose');
var tvShow = new mongoose.Schema({
    id: Number,
    backdrop_path: String,
    created_by: {
        id: Number,
        name: String,
        profile_path: String
    },
    episode_run_time: [Number],
    networks: [String],
    first_air_date: Date,
    last_air_date: Date,
    genres: [
        {id: Number, name: String}
    ],
    homepage: String,
    in_production: Boolean,
    language: [String],
    name: String,
    original_name: String,
    original_country: [String],
    number_of_episodes: Number,
    number_of_seasons: Number,
    overview: String,
    popularity: Number,
    poster_path: String,
    production_companies: [
        {id: Number, name: String}
    ],
    seasons: [
        {
            air_date: Date,
            id: Number,
            poster_path: String,
            number: Number
        }
    ],
    status: String,
    vote_average: Number,
    vote_count: Number
});

module.exports = tvShow;