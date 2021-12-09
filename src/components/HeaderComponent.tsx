import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from '../styles';
import { COLORS } from '../utils/constants';
import { toUpperLabel, useColor } from '../utils/functions';

type Props = {
    title: string,
    handleDrawer: () => void,
    pokemonType?: string
}

const HeaderComponent: React.FC<Props> = ({ title, handleDrawer, pokemonType }) => {
    return (
        <View style={[styles.header, styles.containerPadding, { backgroundColor: pokemonType != undefined ? useColor(pokemonType, "dark") : COLORS.red }]}>
            <TouchableOpacity onPress={() => handleDrawer()}>
                <Image style={styles.miniLogo}
                    source={require('../resources/logo.png')}
                />
            </TouchableOpacity>
            <Text style={styles.headerText}>{toUpperLabel(title)}</Text>
        </View>
    )
}

export default HeaderComponent