const axios = require("axios").default;
import {
  TMDB_BASE_URL,
  TMDB_API_KEY,
  TMDB_IMAGE_BASE_URL,
  ENDPOINTS,
  TVPOINTS,
  YOUTUBE_BASE_URL,
} from "../constants/Urls";
import LANGUAGES from "../constants/Languages";

const TMDB_HTTP_REQUEST = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

// search

const getSearch = (query) =>
TMDB_HTTP_REQUEST.get(
  `${ENDPOINTS.SEARCH}`,
  query ? { params: { query } } : null
);

// movie

const getNowPlayingMovies = (page=1) =>
  TMDB_HTTP_REQUEST.get(ENDPOINTS.NOW_PLAYING_MOVIES,{params:{page}});

const getUpcomingMovies = (page=1) =>
  TMDB_HTTP_REQUEST.get(ENDPOINTS.UPCOMING_MOVIES,{params:{page}});

const getTopRatedMovies = (page=1)=>
  TMDB_HTTP_REQUEST.get(ENDPOINTS.TOP_RATED,{params:{page}});

const getPopularMovies = (page=1) =>
TMDB_HTTP_REQUEST.get(ENDPOINTS.POPULAR,{params:{page}});

const getMovieById = (movieId, append_to_response = "") =>
  TMDB_HTTP_REQUEST.get(
    `${ENDPOINTS.MOVIE}/${movieId}`,
    append_to_response ? { params: { append_to_response } } : null
  );

// constant

const getAllGenres = () => TMDB_HTTP_REQUEST.get(ENDPOINTS.GENRES);

const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;

const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`;

const getLanguage = (language_iso) =>
  LANGUAGES.find((language) => language.iso_639_1 === language_iso);


// tv show

const getAiringToday = (page=1)=>
  TMDB_HTTP_REQUEST.get(TVPOINTS.AIRING_TODAY,{params:{page}});

const getOnTheAir = (page=1)=>
  TMDB_HTTP_REQUEST.get(TVPOINTS.ON_THE_AIR,{params:{page}});

const getPopularTv = (page=1)=>
  TMDB_HTTP_REQUEST.get(TVPOINTS.POPULAR,{params:{page}});

const getTopRated = (page=1)=>
  TMDB_HTTP_REQUEST.get(TVPOINTS.TOP_RATED,{params:{page}});

const getTvById = (TvId,append_to_response = "")=>
  TMDB_HTTP_REQUEST.get(
    `${TVPOINTS.TV}/${TvId}`,
    append_to_response ? { params: { append_to_response } } : null
  );

const getEipsode = (TvId,season=1,episode=1)=>{
  // url = `https://api.themoviedb.org/3${TVPOINTS.TV}/101723/season/${season}/episode/${episode}?api_key=886f45aceef91357640893d9a9bc8395`;
  // fetch(url);
};

export {
  getNowPlayingMovies,
  getUpcomingMovies,
  getAllGenres,
  getPopularMovies,
  getMovieById,
  getSearch,
  getPoster,
  getTopRatedMovies,
  getLanguage,
  getVideo,
  // tv shows
  getAiringToday,
  getOnTheAir,
  getPopularTv,
  getTopRated,
  getEipsode,
  getTvById,
};
