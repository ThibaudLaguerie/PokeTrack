import React from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RootStackParamsList } from '../utils/types'
import { Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import styles from '../styles'
import { COLORS } from '../utils/constants'

interface Props {
    navigation: DrawerNavigationProp<RootStackParamsList, "PokemonDetails">
}

const BackComponent: React.FC<Props> = ({ navigation }) => {
    return (
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Icon type="ionicon" name="chevron-back" tvParallaxProperties color={COLORS.white} />
            <Text style={styles.backTitle}>Retour</Text>
        </TouchableOpacity>
    )
}

export default BackComponent