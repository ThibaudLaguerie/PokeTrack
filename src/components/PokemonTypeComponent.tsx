import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import { TYPES_COLORS } from "../utils/constants";
import { toUpperLabel, useColor } from "../utils/functions";
import { TypeColor } from "../utils/types";

interface Props {
    type: string
}

const PokemonTypeComponent: React.FC<Props> = ({ type }) => {
    return (
        <View style={[styles.pokemonInformation, styles.containerShadow, { flex: 1, backgroundColor: useColor(type, "normal") }]}>
            <Text style={styles.pokemonInformationLabel}>{toUpperLabel(type)}</Text>
        </View>
    )
}

export default PokemonTypeComponent