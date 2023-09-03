// To parse this data:
//
//   import { Convert, MovieDetail } from "./file";
//
//   const movieDetail = Convert.toMovieDetail(json);

export interface MovieDetail {
    adult?:                 boolean;
    backdrop_path?:         null;
    belongs_to_collection?: null;
    budget?:                number;
    genres?:                Genre[];
    homepage?:              string;
    id?:                    number;
    imdb_id?:               null;
    original_language?:     string;
    original_title?:        string;
    overview?:              string;
    popularity?:            number;
    poster_path?:           null;
    production_companies?:  any[];
    production_countries?:  ProductionCountry[];
    release_date?:          Date;
    revenue?:               number;
    runtime?:               number;
    spoken_languages?:      SpokenLanguage[];
    status?:                string;
    tagline?:               string;
    title?:                 string;
    video?:                 boolean;
    vote_average?:          number;
    vote_count?:            number;
}

export interface Genre {
    id?:   number;
    name?: string;
}

export interface ProductionCountry {
    iso_3166_1?: string;
    name?:       string;
}

export interface SpokenLanguage {
    english_name?: string;
    iso_639_1?:    string;
    name?:         string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMovieDetail(json: string): MovieDetail {
        return JSON.parse(json);
    }

    public static movieDetailToJson(value: MovieDetail): string {
        return JSON.stringify(value);
    }
}
