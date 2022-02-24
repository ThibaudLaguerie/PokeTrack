
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseAuth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';

type AuthContextType = {
    isSignedIn: boolean;
    user?: FirebaseAuthTypes.User | { uid: string | null };
    userInfo?: { email: string| null, firstname: string | null, solde: number | null }
    register: (email: string, password: string, firstname: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    getUserInfo: () => void,
    updateSolde: (newSolde: number) => void
}

const defaultAuthState: AuthContextType = {
    isSignedIn: true,
    register: async () => undefined,
    signIn: async () => undefined,
    signOut: async () => undefined,
    getUserInfo: async () => undefined,
    updateSolde: () => undefined
}

const AuthContext = React.createContext<AuthContextType>(defaultAuthState)

export const AuthContextProvider: React.FC = ({ children }) => {

    const [auth, setAuth] = React.useState<{ user?: FirebaseAuthTypes.User | { uid: string | null }; isSignedIn: boolean }>({
        isSignedIn: false,
    })
    const [userInfo, setUserInfo] = React.useState<{ email: string| null, firstname: string | null, solde: number | null }>({email: "", firstname: "", solde: 0 })

    const usersCollection = firestore().collection('users')

    React.useEffect(() => {
        const unsubscribe = firebaseAuth().onAuthStateChanged((_user) => {
            if (_user) {
                // user is logged in
                setAuth({
                    user: _user,
                    isSignedIn: true
                })
            } else {
                // user is logged out
                setAuth({
                    user: undefined,
                    isSignedIn: false
                })
            }
        })

        return unsubscribe
    }, [])

    const register = async (email: string, password: string, firstname: string) => {
        const register = await firebaseAuth().createUserWithEmailAndPassword(email, password)
        usersCollection.doc(register.user.uid).get()
            .then(async (documentSnapshot) => {
                if (!documentSnapshot.exists) {
                    usersCollection.doc(register.user.uid).set({ uid: register.user.uid, email: register.user.email, firstname, solde: 1000, cards: [] })
                    setUserInfo({ email: register.user.email!, firstname, solde: 1000 })
                    await AsyncStorage.setItem('PokeTrackUserUID', register.user.uid)
                    await AsyncStorage.setItem('PokeTrackFirstname', firstname)
                    await AsyncStorage.setItem('PokeTrackSolde', "1000")
                    await AsyncStorage.setItem('PokeTrackEmail', register.user.email!)
                }
            })
    }

    const signIn = async (email: string, password: string) => {
        const signIn = await firebaseAuth().signInWithEmailAndPassword(email, password)
        usersCollection.doc(signIn.user.uid).get()
            .then(async (documentSnapshot) => {
                const data = documentSnapshot.data()
                setUserInfo({ email: data?.email, firstname: data?.firstname, solde: data?.solde })

                await AsyncStorage.setItem('PokeTrackEmail', email)
                await AsyncStorage.setItem('PokeTrackUserUID', signIn.user.uid)
                await AsyncStorage.setItem('PokeTrackFirstname', data?.firstname)
                await AsyncStorage.setItem('PokeTrackSolde', data?.solde.toString())
            })
    }

    const signOut = async () => {
        await firebaseAuth().signOut()
            .then(() => {
                setAuth({ isSignedIn: false, user: undefined })
                setUserInfo({ email: "", firstname: "", solde: 0})
            })
    }

    const getUserInfo = async () => {
        const uid = await AsyncStorage.getItem('PokeTrackUserUID')
        const firstname = await AsyncStorage.getItem('PokeTrackFirstname')
        const solde = await AsyncStorage.getItem('PokeTrackSolde')
        const email = await AsyncStorage.getItem('PokeTrackEmail')
        setAuth({ user: { uid: uid }, isSignedIn: true })
        setUserInfo({email, firstname, solde: parseInt(solde!) })
    }

    const updateSolde = (newSolde: number) => {
        setUserInfo({ email: userInfo.email, firstname: userInfo.firstname, solde: newSolde})
    }

    return (
        <AuthContext.Provider
            value={{
                isSignedIn: auth.isSignedIn,
                user: auth.user,
                userInfo,
                register,
                signIn,
                signOut,
                getUserInfo,
                updateSolde
            }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
    const auth = React.useContext(AuthContext)
    return auth
}