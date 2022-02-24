import { DrawerScreenProps } from '@react-navigation/drawer'
import React from 'react'
import { Animated, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent'
import { useApp } from '../contexts/AppContext'
import { useAuth } from '../contexts/AuthContext'
import styles from '../styles'
import { COLORS, WINDOW_WIDTH } from '../utils/constants'
import { RootStackParamsList } from '../utils/types'

type Props = DrawerScreenProps<RootStackParamsList, "Account">

const AccountScreen: React.FC<Props> = ({ navigation, route }) => {

    const [totalNbCards, setTotalNbCards] = React.useState<number>(0)
    const [username, setUsername] = React.useState<string>("")
    const [flipped, setFlipped] = React.useState<boolean>(false)

    let defaultValue = 0;

    let animatedValue = React.useRef(new Animated.Value(0)).current
    animatedValue.addListener(({ value }) => {
        defaultValue = value
    })

    const auth = useAuth()
    const app = useApp()

    React.useEffect(() => {
        let nbTotal = 0
        app.userCardIds.map((card) => {
            nbTotal += card.count
        })
        setTotalNbCards(nbTotal)
    }, [app.userCardIds])



    const frontInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg']
    })


    const backInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
    })

    const frontStyle = {
        transform: [
            { rotateY: frontInterpolate }
        ]
    }

    const backStyle = {
        transform: [
            { rotateY: backInterpolate }
        ]
    }

    const flipCard = () => {
        if (flipped) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true
            }).start()
        } else {
            Animated.timing(animatedValue, {
                toValue: 180,
                duration: 800,
                useNativeDriver: true
            }).start()
        }
        setFlipped(!flipped)
    }

    return (
        <View style={styles.container}>
            <HeaderComponent title="Mon compte" handleDrawer={() => navigation.toggleDrawer()} />
            <View style={[styles.container]}>
                <TouchableOpacity style={{ marginHorizontal: WINDOW_WIDTH * 0.05, marginTop: WINDOW_WIDTH * 0.05, }} onPress={() => flipCard()}>
                    <Animated.View style={[styles.containerPadding, { width: WINDOW_WIDTH * 0.9, height: WINDOW_WIDTH * 0.4, backgroundColor: COLORS.white, borderRadius: 15, alignItems: 'center', backfaceVisibility: "hidden", }, frontStyle]}>
                        <Text style={[styles.title, { fontSize: WINDOW_WIDTH * 0.08, color: COLORS.darkGrey }]}>Solde</Text>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={[styles.title, { color: COLORS.darkGrey }]}>{auth.userInfo?.solde?.toString()} €</Text>
                        </View>
                    </Animated.View>
                    <Animated.View style={[backStyle, styles.containerPadding, { width: WINDOW_WIDTH * 0.9, height: WINDOW_WIDTH * 0.4, backgroundColor: COLORS.lightGrey, borderRadius: 15, alignItems: 'center', backfaceVisibility: "hidden", position: "absolute", top: 0, right: 0, bottom: 0, left: 0, }]}>
                        <View>
                            <Text style={[styles.title, { color: COLORS.darkGrey }]}>{totalNbCards}</Text>
                            <Text style={[styles.title, { fontSize: WINDOW_WIDTH * 0.08, color: COLORS.darkGrey }]}>cartes possédée{totalNbCards > 1 ? "s" : ""}</Text>
                            <Text style={[styles.title, { fontSize: WINDOW_WIDTH * 0.06, color: COLORS.darkGrey }]}>dont {app.userCardIds.length} espèce{app.userCardIds.length > 1 ? "s" : ""}</Text>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
                {/* <View style={{ marginTop: WINDOW_WIDTH * 0.02 }}>
                    <Input containerStyle={styles.containerLogsInput} inputContainerStyle={{ borderBottomWidth: 0 }} style={[styles.containerPadding, styles.logsInput]} placeholder="jeanne.dupont@domain.fr" placeholderTextColor={COLORS.lightGrey}
                        label="Identifiant" keyboardType="email-address"
                        value={username} onChangeText={usernameInput => setUsername(usernameInput)}
                    />
                    <Input containerStyle={styles.containerLogsInput} inputContainerStyle={{ borderBottomWidth: 0 }} style={[styles.containerPadding, styles.logsInput]} placeholder="jeanne.dupont@domain.fr" placeholderTextColor={COLORS.lightGrey}
                        label="Identifiant" keyboardType="email-address"
                        value={username} onChangeText={usernameInput => setUsername(usernameInput)}
                    />
                </View> */}
            </View>
        </View>
    )
}

export default AccountScreen