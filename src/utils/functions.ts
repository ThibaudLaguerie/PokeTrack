import { TYPES_COLORS } from './constants';
import { Ability, HeldItem, Move, MoveBase, Pokemon, PokemonBase, Type, TypeColor, Card } from './types';

export const toPokemonBase = (data: any) => {
    const pokemonBase: PokemonBase = {
        name: data.name,
        url: data.url
    }

    return pokemonBase
}

export const toPokemon = (data: any) => {
    const pokemon: Pokemon = {
        abilities: data.abilities.map((dataAbility: any) => toAbility(dataAbility)), // talents
        height: data.height / 10,
        heldItems: data.held_items.map((dataHeldItem: any) => toHeldItem(dataHeldItem)),
        id: data.id,
        level: data.level,
        moves: data.moves.map((dataMove: any) => toMoveBase(dataMove)),
        name: data.name,
        order: data.order,
        sex: data.sex,
        sprites: {
            backDefault: data.sprites.back_default,
            backFemale: data.sprites.back_female,
            backShiny: data.sprites.back_shiny,
            backShinyFemale: data.sprites.back_shiny_female,
            frontDefault: data.sprites.front_default,
            frontFemale: data.sprites.front_female,
            frontShiny: data.sprites.front_shiny,
            frontShinyFemale: data.sprites.front_shiny_female
        },
        stats: [],
        types: data.types.map((dataType: any) => toType(dataType)),
        weight: data.weight / 10,
    }

    return pokemon
}

export const toAbility = (data: any) => {
    const ability: Ability = {
        name: data.ability.name,
        url: data.ability.url,
        isHidden: data.is_hidden,
        slot: data.slot
    }

    return ability
}

export const toMoveBase = (data: any) => {
    const move: MoveBase = {
        name: data.move.name,
        url: data.move.url,
        levelLearnedAt: 1
    }

    return move
}

export const toMove = (data: any) => {

    const move: Move = {
        name: data.name,
        type: data.type.name
    }

    return move
}

export const toHeldItem = (data: any) => {
    const heldItem: HeldItem = {
        name: data.item.name,
        url: data.item.url
    }

    return heldItem
}

export const toType = (data: any) => {
    const type: Type = {
        slot: data.slot,
        name: data.type.name,
        url: data.type.url
    }

    return type
}

export const useColor = (type: string, gradient: "light" | "normal" | "dark") => {
    let color = ""
    switch (gradient) {
        case "light":
            color = TYPES_COLORS[type as keyof { [key: string]: TypeColor }].light
            break;
        case "normal":
            color = TYPES_COLORS[type as keyof { [key: string]: TypeColor }].normal
            break;
        case "dark":
            color = TYPES_COLORS[type as keyof { [key: string]: TypeColor }].dark
            break;
        default:
            break;
    }

    return color
}

export const toUpperLabel = (label: string) => {
    return label.slice(0, 1).toUpperCase() + label.slice(1)
}

export const toCard = (data: any) => {
    const card: Card = {
        name: data.name,
        height: data.height,
        weight: data.weight,
        sex: data.sex,
        sprites: {
            front: data.sprites.front,
            back: data.sprites.back
        },
        moves: [data.move1, data.move2, data.move3, data.move4],
        price: data.price,
        nbGenerated: data.nbGenerated,
        sold: data.sold,
        id: data.id
    }

    return card
}