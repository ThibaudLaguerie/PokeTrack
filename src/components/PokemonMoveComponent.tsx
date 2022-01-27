import React from "react";
import { Text, View } from "react-native";
import { _getMove } from "../backend";
import styles from "../styles";
import { defaultMove, WINDOW_WIDTH } from "../utils/constants";
import { toUpperLabel, useColor } from "../utils/functions";
import { Move, MoveBase } from "../utils/types";

interface Props {
    moveBase: MoveBase
}

const PokemonMoveComponent: React.FC<Props> = ({ moveBase }) => {

    const [move, setMove] = React.useState<Move>()

    React.useEffect(() => {
        _getMoveData()
    }, [])

    const _getMoveData = async () => {
        const moveData = await _getMove(moveBase.url)
        setMove(moveData)
    }

    return (
        <>
            {
                move != undefined &&
                <View style={[styles.pokemonInformation, {
                    backgroundColor: useColor(move.type, "light"), flex: 1, marginHorizontal: WINDOW_WIDTH * 0.02
                }]}>
                    <Text numberOfLines={1} style={[styles.pokemonInformationLabel, { textAlign: "center" }]}>{toUpperLabel(move.name)}</Text>
                </View>
            }
        </>
    )
}

export default PokemonMoveComponent