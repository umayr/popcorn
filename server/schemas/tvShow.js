/**
 * Created by Umayr on 11/24/2014.
 */
var mongoose = require('mongoose');
var tvShow = new mongoose.Schema({
    id: Number,
    backdrop_path: String,
    created_by: [
        {
            id: Number,
            name: String,
            profile_path: String
        }
    ],
    episode_run_time: [Number],
    networks: [
        {id: Number, name: String}
    ],
    first_air_date: Date,
    last_air_date: Date,
    genres: [
        {id: Number, name: String}
    ],
    homepage: String,
    in_production: Boolean,
    languages: [String],
    name: String,
    _name: String,
    original_name: String,
    origin_country: [String],
    number_of_episodes: Number,
    number_of_seasons: Number,
    content_ratings: [
        {
            iso_3166_1: String,
            rating: String
        }
    ],
    credits: {
        cast: [
            {
                character: String,
                credit_id: String,
                id: Number,
                name: String,
                profile_path: String,
                order: Number
            }
        ],
        crew: [
            {
                department: String,
                id: Number,
                name: String,
                job: String,
                profile_path: String
            }
        ]},
    external_ids: {
        imdb_id: String,
        freebase_id: String,
        freebase_mid: String,
        id: Number,
        tvdb_id: Number,
        tvrage_id: Number
    },
    images: {
        backdrops: [
            {
                aspect_ratio: Number,
                file_path: String,
                height: Number,
                iso_639_1: String,
                vote_average: Number,
                vote_count: Number,
                width: Number
            }
        ],
        id: Number,
        posters: [
            {
                aspect_ratio: Number,
                file_path: String,
                height: Number,
                iso_639_1: String,
                vote_average: Number,
                vote_count: Number,
                width: Number
            }
        ]
    },
    keywords: [
        {
            id: Number,
            name: String
        }
    ],
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
    videos: [
        {
            id: String,
            iso_639_1: String,
            key: String,
            name: String,
            site: String,
            size: Number,
            type: String
        }
    ],
    vote_average: Number,
    vote_count: Number
});

module.exports = tvShow;