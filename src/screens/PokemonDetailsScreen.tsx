import React from 'react'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { Pokemon, RootStackParamsList, TypeColor } from '../utils/types'
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import styles from '../styles'
import { Icon, Image } from 'react-native-elements'
import BackComponent from '../components/BackComponent'
import PokemonSpriteComponent from '../components/PokemonSpriteComponent'
import PokemonTypeComponent from '../components/PokemonTypeComponent'
import { COLORS, TYPES_COLORS, WINDOW_WIDTH } from '../utils/constants'
import { toUpperLabel, useColor } from '../utils/functions'
import LinearGradient from 'react-native-linear-gradient';
import PokemonMoveComponent from '../components/PokemonMoveComponent'
import { useApp } from '../contexts/AppContext'
import StockExchangeOverlayComponent from '../components/StockExchangeOverlayComponent'

type Props = DrawerScreenProps<RootStackParamsList, "PokemonDetails">

const PokemonDetailsScreen: React.FC<Props> = ({ navigation, route }) => {

    const [pokemon, setPokemon] = React.useState<Pokemon>(route.params.pokemon)
    const [stockExchangeValue, setStockExchangeValue] = React.useState<number>(0)
    const [showOverlay, setShowOverlay] = React.useState<boolean>(false)
    const app = useApp();

    const _getBourseValue = async () => {
        console.log(pokemon.id)
        const value = await app.getStockExchangeValue(pokemon.id)
        setShowOverlay(true)
        setStockExchangeValue(value)
    }

    return (
        <View style={styles.container}>
            <HeaderComponent title={pokemon.name} handleDrawer={() => navigation.toggleDrawer()} pokemonType={pokemon.types[0].name} />
            <BackComponent navigation={navigation} />
            <StockExchangeOverlayComponent value={stockExchangeValue} show={showOverlay} pokemonType={pokemon.types[0].name} handleDismiss={() => setShowOverlay(false)} />
            <View style={[styles.pokemonCard, styles.containerShadow]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'space-around', }}>
                        {
                            [pokemon.height, pokemon.weight].map((value, index) => {
                                return (
                                    <View key={index == 0 ? "height" : "weight"} style={[styles.pokemonInformation, { backgroundColor: useColor(pokemon.types[0].name, "light"), }]}>
                                        <Text style={styles.pokemonInformationLabel}>{index == 0 ? "Taille : " : "Poids : "} {value} {index == 0 ? "m" : "kg"}</Text>
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
                    columnWrapperStyle={{ marginVertical: 5, marginHorizontal: 2 }}
                    showsVerticalScrollIndicator={false}
                />
            </LinearGradient>
            <TouchableOpacity
                onPress={() => _getBourseValue()}
                style={[styles.containerPadding, styles.logsButton, { backgroundColor: useColor(pokemon.types[0].name, "light"), width: "90%", marginVertical: 10 }]}>
                <Text style={[styles.logsButtonText, { fontWeight: "bold" }]}>Evaluer la valeur en bourse</Text>
            </TouchableOpacity>
        </View >
    )
}

export default PokemonDetailsScreen