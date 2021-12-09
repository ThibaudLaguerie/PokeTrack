import { toMove } from './../utils/functions';
import { PokemonBase } from './../utils/types';
import { defaultMove, defaultPokemon } from './../utils/constants';
import { URL_POKEMON_API } from "../utils/constants"
import { toPokemon, toPokemonBase } from "../utils/functions"

export const _getPokedex = async (offset: number = 0) => {
    try {
        const url = URL_POKEMON_API + "/pokemon?limit=20&offset=" + offset
        const response = await fetch(url)
        if (response.ok) {
            const responseJSON = await response.json()
            const pokemons: PokemonBase[] = responseJSON.results.map((data: any) => toPokemonBase(data))
            return pokemons
        } else {
            console.log("Erreur _getPokedex => response.ok = false ")
            return []
        }
    } catch (error) {
        console.log("Erreur _getPokedex => ", error)
        return []
    }

}

export const _getPokemon = async (url: string) => {
    try {
        const response = await fetch(url)
        if (response.ok) {
            const responseJSON = await response.json()
            const pokemon = toPokemon(responseJSON)
            return pokemon
        } else {
            console.log("Erreur _getPokemon => response.ok = false ")
            return defaultPokemon
        }
    } catch (error) {
        console.log("Erreur _getPokedex => ", error)
        return defaultPokemon
    }

}

export const _getMove = async (url: string) => {
    try {
        const response = await fetch(url)
        if (response.ok) {
            const responseJSON = await response.json()
            const move = toMove(responseJSON)
            return move
        } else {
            console.log("Erreur _getPokemon => response.ok = false ")
            return defaultMove
        }
    } catch (error) {
        console.log("Erreur _getPokedex => ", error)
        return defaultMove
    }

}