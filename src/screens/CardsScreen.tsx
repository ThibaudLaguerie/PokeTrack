import { DrawerScreenProps } from '@react-navigation/drawer'
import React from 'react'
import { FlatList, View } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import PokemonCardItem from '../components/PokemonCardItem'
import { useApp } from '../contexts/AppContext'
import styles from '../styles'
import { RootStackParamsList } from '../utils/types'

type Props = DrawerScreenProps<RootStackParamsList, 'Home'>

const CardsScreen: React.FC<Props> = ({ navigation }) => {

    const app = useApp()

    return (
        <View style={styles.container}>
            <HeaderComponent title="Mon compte" handleDrawer={() => navigation.toggleDrawer()} />
            <FlatList 
                data={app.userCards}
                keyExtractor={(item) => item.uid}
                bounces={false}
                renderItem={({ item }) => <PokemonCardItem key={item.uid} pokemonCard={item} isUserCard={true} />}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
            />
        </View>
    )
}

export default CardsScreen