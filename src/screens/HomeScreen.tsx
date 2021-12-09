import { DrawerScreenProps } from '@react-navigation/drawer'
import React from 'react'
import { View } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import { RootStackParamsList } from '../utils/types'

type Props = DrawerScreenProps<RootStackParamsList, 'Home'>

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View>
            <HeaderComponent title="Mon compte" handleDrawer={() => navigation.toggleDrawer()} />

        </View>
    )
}

export default HomeScreen