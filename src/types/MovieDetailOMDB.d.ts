// To parse this data:
//
//   import { Convert, MovieDetailOMDB } from "./file";
//
//   const movieDetailOMDB = Convert.toMovieDetailOMDB(json);

export interface MovieDetailOMDB {
    Title?:      string;
    Year?:       string;
    Rated?:      string;
    Released?:   string;
    Runtime?:    string;
    Genre?:      string;
    Director?:   string;
    Writer?:     string;
    Actors?:     string;
    Plot?:       string;
    Language?:   string;
    Country?:    string;
    Awards?:     string;
    Poster?:     string;
    Ratings?:    Rating[];
    Metascore?:  string;
    imdbRating?: string;
    imdbVotes?:  string;
    imdbID?:     string;
    Type?:       string;
    DVD?:        string;
    BoxOffice?:  string;
    Production?: string;
    Website?:    string;
    Response?:   string;
}

export interface Rating {
    Source?: string;
    Value?:  string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMovieDetailOMDB(json: string): MovieDetailOMDB {
        return JSON.parse(json);
    }

    public static movieDetailOMDBToJson(value: MovieDetailOMDB): string {
        return JSON.stringify(value);
    }
}
