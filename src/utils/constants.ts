import { Move, Pokemon, TypeColor } from './types';
import { Dimensions } from "react-native"

export const COLORS = {
    red: "#F13E2D",
    lightGrey: "#A09D9D",
    darkGrey: "#58585A",
    white: "#FFFFFF",
    black: "#202020"
}
export const URL_POKEMON_API = "https://pokeapi.co/api/v2"
export const WINDOW_WIDTH = Dimensions.get('window').width

export const defaultPokemon: Pokemon = {
    abilities: [], // talents
    height: 0,
    heldItems: [],
    id: 0,
    level: 0,
    moves: [],
    name: "",
    order: 0,
    sex: "",
    sprites: {
        backDefault: "",
        backFemale: "",
        backShiny: "",
        backShinyFemale: "",
        frontDefault: "",
        frontFemale: "",
        frontShiny: "",
        frontShinyFemale: ""
    },
    stats: [],
    types: [],
    weight: 0,
}

export const defaultMove: Move = {
    name: "",
    type: ""
}

export const TYPES_COLORS: { [key: string]: TypeColor } = {
    bug: { light: "#C6D16E", normal: "#A8B820", dark: "#6D7815" },
    dark: { light: "#A29288", normal: "#705848", dark: "#49392F" },
    dragon: { light: "#A27DFA", normal: "#7038F8", dark: "#4924A1" },
    electric: { light: "#FAE078", normal: "#F8D030", dark: "#A1871F" },
    fairy: { light: "#F4BDC9", normal: "#EE99AC", dark: "#9B6470" },
    fighting: { light: "#D67873", normal: "#C03028", dark: "#7D1F1A" },
    fire: { light: "#F5AC78", normal: "#F08030", dark: "#9C531F" },
    flying: { light: "#C6B7F5", normal: "#A890F0", dark: "#6D5E9C" },
    ghost: { light: "#A292BC", normal: "#705898", dark: "#493963" },
    grass: { light: "#A7DB8D", normal: "#78C850", dark: "#4E8234" },
    ground: { light: "#EBD69D", normal: "#E0C068", dark: "#927D44" },
    ice: { light: "#BCE6E6", normal: "#98D8D8", dark: "#638D8D" },
    normal: { light: "#C6C6A7", normal: "#A8A878", dark: "#6D6D4E" },
    poison: { light: "#C183C1", normal: "#A040A0", dark: "#682A68" },
    psychic: { light: "#FA92B2", normal: "#F85888", dark: "#A13959" },
    rock: { light: "#D1C17D", normal: "#B8A038", dark: "#786824" },
    steel: { light: "#D1D1E0", normal: "#B8B8D0", dark: "#787887" },
    water: { light: "#9DB7F5", normal: "#6890F0", dark: "#445E9C" }
}