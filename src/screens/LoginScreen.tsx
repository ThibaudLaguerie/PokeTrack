import React from 'react';
import { Alert, Image, Platform, Switch, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';
import { Input } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFirestore } from '../contexts/FirestoreContext';
import { RootStackParamsList } from '../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS } from '../utils/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = NativeStackScreenProps<RootStackParamsList, 'Login'>

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = React.useState<string>('tib@gmail.com')
    const [password, setPassword] = React.useState<string>('password')
    const [switched, setSwitched] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (switched) {
            setToken()
        }
    }, [switched])

    const auth = useAuth()

    const setToken = async () => {
        await AsyncStorage.setItem('PokeTrackToken', 'autolog')
    }

    const reset = () => {
        setUsername('')
        setPassword('')
    }

    const login = async () => {
        try {
            await auth.signIn(username, password)

            navigation.navigate('App')
            reset()
        } catch (e: any) {
            console.log(e)
            // e.code = "auth/user-not-found"
            // e.message = "There is no user record corresponding to this identifier. The user may have been deleted."
            if (e.code === "auth/user-not-found") {
                Alert.alert('Ce compte n\'existe pas')
            }
            else {
                Alert.alert(e.message)
            }
        }
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: COLORS.black }} keyboardShouldPersistTaps={'handled'} bounces={false}>
            <View style={styles.centerChildren}>
                <Image style={styles.logo}
                    source={require('../resources/logo.png')}
                />
            </View>
            <View style={[styles.container, { justifyContent: 'space-around' }]}>
                <Text style={styles.title}>PokeTrack</Text>
                <View>
                    <Input containerStyle={styles.containerLogsInput} inputContainerStyle={{ borderBottomWidth: 0 }} style={[styles.containerPadding, styles.logsInput]} placeholder="jeanne.dupont@domain.fr" placeholderTextColor={COLORS.lightGrey}
                        label="Identifiant" keyboardType="email-address"
                        value={username} onChangeText={usernameInput => setUsername(usernameInput)}
                    />
                    <Input containerStyle={[styles.containerLogsInput]} inputContainerStyle={{ borderBottomWidth: 0 }} style={[styles.containerPadding, styles.logsInput]} placeholder="Mot de passe" placeholderTextColor={COLORS.lightGrey}
                        label="Mot de passe" secureTextEntry
                        value={password} onChangeText={passwordInput => setPassword(passwordInput)}
                    />
                </View>
                <View>
                    <View style={styles.stayConnected}>
                        <Text style={styles.stayConnectedText}>Rester connecté</Text>
                        <Switch ios_backgroundColor={COLORS.white} thumbColor={Platform.OS === "ios" && switched ? COLORS.white : COLORS.red} trackColor={{ false: COLORS.white, true: COLORS.red }} value={switched} onValueChange={switched => setSwitched(switched)} />
                    </View>

                    <TouchableOpacity style={[styles.containerPadding, styles.logsButton, { backgroundColor: COLORS.lightGrey }]}
                        onPress={() => login()}>
                        <Text style={styles.logsButtonText}>Connexion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.containerPadding, styles.logsButton, { backgroundColor: COLORS.red }]}
                        onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.logsButtonText}>Inscription</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default LoginScreen