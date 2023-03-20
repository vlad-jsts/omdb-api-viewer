import { MovieType, MoviePlot } from "../enums";

export type MovieFilter = {
    s: string;
    type?: MovieType;
    plot?: MoviePlot;
    y?: number;
    page?: number;
}
