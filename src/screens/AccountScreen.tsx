import { DrawerScreenProps } from '@react-navigation/drawer'
import React from 'react'
import { Text, View } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import { useAuth } from '../contexts/AuthContext'
import styles from '../styles'
import { COLORS } from '../utils/constants'
import { RootStackParamsList } from '../utils/types'

type Props = DrawerScreenProps<RootStackParamsList, "Account">

const AccountScreen: React.FC<Props> = ({ navigation, route }) => {

    const auth = useAuth()
    return (
        <View style={styles.container}>
            <HeaderComponent title="Mon compte" handleDrawer={() => navigation.toggleDrawer()} />
            <View style={[styles.container, styles.containerPadding]}>
                <View style={{ flex: 1, backgroundColor: COLORS.white, borderRadius: 15 }}>
                    <Text>Solde {auth.userInfo?.solde?.toString()}</Text>
                </View>
            </View>
        </View>
    )
}

export default AccountScreen