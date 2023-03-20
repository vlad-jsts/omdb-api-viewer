import { MovieType } from "../enums";

export type Movie = {
    Poster: string;
    Title: string;
    Type: MovieType;
    Year: string;
    imdbID: string;
}
