import { DrawerScreenProps } from "@react-navigation/drawer";
import React from "react";
import { Button, FlatList, View } from "react-native";
import { _getSoap } from "../backend";
import HeaderComponent from "../components/HeaderComponent";
import PokemonCardItem from "../components/PokemonCardItem";
import { useApp } from "../contexts/AppContext";
import styles from "../styles";
import { RootStackParamsList } from "../utils/types";

type Props = DrawerScreenProps<RootStackParamsList, "Marketplace">

const ShopScreen: React.FC<Props> = ({ navigation, route }) => {

    const app = useApp()

    return (
        <View style={styles.container}>
            <HeaderComponent title="Marketplace" handleDrawer={() => navigation.toggleDrawer()} />
            <FlatList
                data={app.cards}
                keyExtractor={(item, index) => item.uid}
                
                bounces={false}
                renderItem={({ item }) => <PokemonCardItem key={item.uid} pokemonCard={item} />}
            />
        </View>
    )
}

export default ShopScreen