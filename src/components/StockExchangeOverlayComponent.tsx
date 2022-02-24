import React from "react";
import { Text, View } from "react-native";
import { Overlay } from "react-native-elements";
import styles from "../styles";
import { COLORS, WINDOW_WIDTH } from "../utils/constants";
import { useColor } from "../utils/functions";

interface Props {
    value: number,
    show: boolean,
    pokemonType: string,
    handleDismiss: () => void,
}

const StockExchangeOverlayComponent: React.FC<Props> = ({ value, show, pokemonType, handleDismiss }) => {
    return (
        <Overlay isVisible={show} onBackdropPress={() => handleDismiss()}
            overlayStyle={{ width: WINDOW_WIDTH * 0.7, backgroundColor: useColor(pokemonType, "dark") }}>
            <View>
                <Text style={[styles.logsButtonText, { fontWeight: "bold", color: COLORS.black }]}>{value}</Text>
            </View>
        </Overlay>
    )
}

export default StockExchangeOverlayComponent