import { toMove, toCard } from './../utils/functions';
import { PokemonBase } from './../utils/types';
import { defaultMove, defaultPokemon } from './../utils/constants';
import { URL_POKEMON_API } from "../utils/constants"
import { toPokemon, toPokemonBase } from "../utils/functions"

import soapRequest from 'easy-soap-request'
import X2JS from 'x2js';


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

export const _getSoap = async (pokemonName: string) => {

    try {
        const url = "http://localhost:8001/Bourse?wsdl"
        const sampleHeaders = {
            'Content-Type': 'text/xml;charset=UTF-8',
            'soapAction': "bourse"
        }

        const prix = Math.random() * (50 - 1) + 1;
        const taux = Math.random();

        const xml = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <bourseRequest>
              <Monnaie>€</Monnaie>
              <Item>`+ pokemonName + `</Item>
              <Prix>`+ prix + `</Prix>
              <Taux>`+ taux + `</Taux>
            </bourseRequest>
          </soap:Body>
        </soap:Envelope>
        `

        const { response } = await soapRequest({ method: "POST", url: url, headers: sampleHeaders, xml: xml, timeout: 2000 })
        const { body } = response
        const x2js = new X2JS()
        const json: any = x2js.xml2js(body)

        return json.Envelope.Body.bourseRequestResponse.bourseMessage.__text + " " + json.Envelope.Body.bourseRequestResponse.bourseRes.__text

    } catch (error) {
        console.log("Error", error)
        return ""
    }

}

export const _getAllCards = async () => {
    try {
        // const url = "http://localhost:5001/poketrack-8f346/us-central1/app/api/cards/all"
        // const response = await fetch(url)
        // if (response.status == 200) {
        //     const responseJSON = await response.json()
        //     const cards = responseJSON.pokemons.map((pokemon: any) => toCard(pokemon))
        //     return cards
        // } else {
        //     console.log("Bad status => ", response.status)
        //     return []
        // }

    } catch (error) {
        console.log("Error => ", error)
        return []
    }



} 