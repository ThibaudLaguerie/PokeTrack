import React from 'react'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { Pokemon, RootStackParamsList, TypeColor } from '../utils/types'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import styles from '../styles'
import { Icon, Image } from 'react-native-elements'
import BackComponent from '../components/BackComponent'
import PokemonSpriteComponent from '../components/PokemonSpriteComponent'
import PokemonTypeComponent from '../components/PokemonTypeComponent'
import { TYPES_COLORS, WINDOW_WIDTH } from '../utils/constants'
import { useColor } from '../utils/functions'
import LinearGradient from 'react-native-linear-gradient';
import PokemonMoveComponent from '../components/PokemonMoveComponent'

type Props = DrawerScreenProps<RootStackParamsList, "PokemonDetails">

const PokemonDetailsScreen: React.FC<Props> = ({ navigation, route }) => {

    const [pokemon, setPokemon] = React.useState<Pokemon>(route.params.pokemon)

    React.useEffect(() => {

    }, [])

    return (
        <View style={styles.container}>
            <HeaderComponent title={pokemon.name} handleDrawer={() => navigation.toggleDrawer()} pokemonType={pokemon.types[0].name} />
            <BackComponent navigation={navigation} />
            <View style={[styles.pokemonCard, styles.containerShadow]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'space-around', }}>
                        {
                            [pokemon.height, pokemon.weight].map((value, index) => {
                                return (
                                    <View key={value} style={[styles.pokemonInformation, { backgroundColor: useColor(pokemon.types[0].name, "light"), }]}>
                                        <Text style={styles.pokemonInformationLabel}>{index == 0 ? "Taille : " : "Poids : "} {value} {index == 0 ? "cm" : "g"}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <PokemonSpriteComponent url={pokemon.sprites.frontDefault} type={pokemon.types[0].name} />
                </View>
                <View style={{ flexDirection: 'row', marginTop: WINDOW_WIDTH * 0.05 }}>
                    <PokemonTypeComponent type={pokemon.types[0].name} />
                    {
                        pokemon.types.length > 1 &&
                        <PokemonTypeComponent type={pokemon.types[1].name} />
                    }
                </View>
            </View>
            <LinearGradient colors={[useColor(pokemon.types[0].name, "light"), useColor(pokemon.types[0].name, "normal"), useColor(pokemon.types[0].name, "dark")]} style={[styles.pokemonCard, styles.containerShadow, { flex: 1 }]}>
                <FlatList
                    style={{ marginHorizontal: WINDOW_WIDTH * 0.05 }}
                    data={pokemon.moves}
                    keyExtractor={(item) => item.name + "_" + item.levelLearnedAt}
                    renderItem={({ item }) => <PokemonMoveComponent moveBase={item} />}
                    numColumns={2}
                    columnWrapperStyle={{  margin: 10 }}
                />
            </LinearGradient>
        </View >
    )
}

export default PokemonDetailsScreen