import { DrawerScreenProps } from '@react-navigation/drawer'
import React from 'react'
import { View } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import styles from '../styles'
import { RootStackParamsList } from '../utils/types'

type Props = DrawerScreenProps<RootStackParamsList, "Account">

const AccountScreen: React.FC<Props> = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <HeaderComponent title="Mon compte" handleDrawer={() => navigation.toggleDrawer()} />

        </View>
    )
}

export default AccountScreen