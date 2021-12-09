import { CommonActions } from '@react-navigation/core'
import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native-elements'
import { _getPokemon } from '../backend'
import styles from '../styles'
import { COLORS } from '../utils/constants'
import { toUpperLabel } from '../utils/functions'
import { Pokemon, PokemonBase, RootStackParamsList } from '../utils/types'

interface Props {
    pokemonBase: PokemonBase
    navigation: DrawerNavigationProp<RootStackParamsList, "Home">
}

const PokemonComponent: React.FC<Props> = ({ pokemonBase, navigation }) => {

    const [pokemon, setPokemon] = React.useState<Pokemon>()

    React.useEffect(() => {
        _getPokemonInfo()
    }, [])

    const _getPokemonInfo = async () => {
        const pokemonData = await _getPokemon(pokemonBase.url)
        setPokemon(pokemonData)
    }

    return (
        <TouchableOpacity style={[styles.pokemonItem, styles.containerShadow]} onPress={() => navigation.navigate("PokemonDetails", { pokemon: pokemon! })}>
            <View style={{ flex: 1 }}>
                {
                    pokemon != undefined &&
                    <Image source={{ uri: pokemon.sprites.frontDefault }} resizeMode="contain" style={styles.pokemonSprite} />
                }
            </View>
            <Text style={styles.pokemonInformationLabel}>{toUpperLabel(pokemonBase.name)}</Text>
        </TouchableOpacity>
    )
}

export default PokemonComponent