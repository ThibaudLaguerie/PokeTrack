import React from "react";
import { View } from "react-native";
import { Image } from "react-native-elements";
import styles from "../styles";
import { COLORS, WINDOW_WIDTH } from "../utils/constants";
import { useColor } from "../utils/functions";

interface Props {
    url: string,
    type: string,
}

const PokemonSpriteComponent: React.FC<Props> = ({ url, type }) => {
    return (
        <View style={styles.containerShadow}>
            <Image source={{ uri: url }} resizeMode="contain" style={styles.pokemonSprite} containerStyle={[styles.pokemonSpriteContainer, { backgroundColor: useColor(type, "light") }]} />
        </View>
    )
}

export default PokemonSpriteComponent