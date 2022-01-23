import { DrawerActions } from '@react-navigation/core'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { View, FlatList } from 'react-native'
import { _getPokedex } from '../backend'
import HeaderComponent from '../components/HeaderComponent'
import PokemonComponent from '../components/PokemonComponent'
import styles from '../styles'
import { Pokemon, PokemonBase, RootStackParamsList } from '../utils/types'

type Props = DrawerScreenProps<RootStackParamsList, 'Home'>

const PokedexScreen: React.FC<Props> = ({ navigation, route }) => {

    const [pokemons, setPokemons] = React.useState<PokemonBase[]>([])
    const [offsetIndex, setOffsetIndex] = React.useState<number>(0)

    React.useEffect(() => {
        _getListPokemons()
    }, [offsetIndex])

    const _getListPokemons = async () => {
        const pokemonsData = await _getPokedex(offsetIndex * 50)
        setPokemons([...pokemons, ...pokemonsData])
    }

    return (
        <View style={styles.container}>
            <HeaderComponent title="Pokedex" handleDrawer={() => navigation.toggleDrawer()} />
            <FlatList
                data={pokemons}
                renderItem={({ item }) => <PokemonComponent pokemonBase={item} navigation={navigation} />}
                keyExtractor={(item, index) => item.url + index.toString()}
                numColumns={2}
                contentContainerStyle={styles.containerFlatList}
                bounces={false}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                onEndReached={() => setOffsetIndex(offsetIndex + 1)}
                onEndReachedThreshold={0.3}
            />
        </View>
    )
}

export default PokedexScreen