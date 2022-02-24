import React from 'react';
import { Alert, Image, Platform, Switch, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';
import { Input, Overlay } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamsList } from '../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../utils/constants';

type Props = NativeStackScreenProps<RootStackParamsList, 'Signup'>

const SignupScreen: React.FC<Props> = ({ navigation }) => {
    const [firstname, setFirstname] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('b4.mobileapp@gmail.com')
    const [password, setPassword] = React.useState<string>('')
    const [switched, setSwitched] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (switched) {
            setToken()
        }
    }, [switched])

    const auth = useAuth()

    const setToken = async () => {
        await AsyncStorage.setItem('MoneyTrackToken', 'autolog')
    }

    const reset = () => {
        setFirstname('')
        setEmail('')
        setPassword('')
    }

    const signup = async () => {
        try {
            await auth.register(email, password, firstname)
            Alert.alert("Votre espace personnalisé a été créée", "Nous vous souhaitons la bienvenue dans la MoneyTrack Family, en espérant vous être utile dans vos finances.", [
                {
                    text: 'Super !',
                    onPress: () => {
                        reset()
                        navigation.navigate('App')
                    }
                }
            ])
        } catch (e: any) {
            Alert.alert(e)
        }
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: COLORS.black }} keyboardShouldPersistTaps={'handled'} bounces={false}>
            <Overlay isVisible={false}>
                <>
                </>
            </Overlay>
            <TouchableOpacity style={styles.centerChildren} onPress={() => navigation.goBack()}>
                <Image style={styles.logo}
                    source={require('../resources/logo.png')}
                />
            </TouchableOpacity>

            <View style={[styles.container, { justifyContent: 'space-around' }]}>
                <Text style={styles.title}>Poke Track</Text>

                <View>
                    <Input containerStyle={styles.containerLogsInput} inputContainerStyle={{ borderBottomWidth: 0 }} style={[styles.containerPadding, styles.logsInput]}
                        label="Prénom"
                        value={firstname} onChangeText={setFirstname}
                    />
                    <Input containerStyle={styles.containerLogsInput} inputContainerStyle={{ borderBottomWidth: 0 }} style={[styles.containerPadding, styles.logsInput]}
                        label="Adresse e-mail" keyboardType='email-address'
                        value={email} onChangeText={setEmail}
                    />
                    <Input containerStyle={styles.containerLogsInput} inputContainerStyle={{ borderBottomWidth: 0 }} style={[styles.containerPadding, styles.logsInput]}
                        label="Mot de passe" secureTextEntry
                        value={password} onChangeText={setPassword}
                    />
                </View>
                <View>
                    <View style={styles.stayConnected}>
                        <Text style={styles.stayConnectedText}>Rester connecté</Text>
                        <Switch ios_backgroundColor={COLORS.white} thumbColor={Platform.OS === "ios" && switched ? COLORS.white : COLORS.red} trackColor={{ false: COLORS.white, true: COLORS.red }} value={switched} onValueChange={switched => setSwitched(switched)} />
                    </View>
                    <TouchableOpacity style={[styles.containerPadding, styles.logsButton, { backgroundColor: COLORS.red }]}
                        onPress={() => signup()}>
                        <Text style={styles.logsButtonText}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default SignupScreen