
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseAuth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { createContext, useContext, useEffect } from 'react';

type AuthContextType = {
    isSignedIn: boolean;
    user?: FirebaseAuthTypes.User | { uid: string | null };
    userFirstname?: string | null
    register: (email: string, password: string, firstname: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    getUserInfo: () => void
}

const defaultAuthState: AuthContextType = {
    isSignedIn: true,
    register: async () => undefined,
    signIn: async () => undefined,
    signOut: async () => undefined,
    getUserInfo: async () => undefined
}

const AuthContext = createContext<AuthContextType>(defaultAuthState)

export const AuthContextProvider: React.FC = ({ children }) => {

    const [auth, setAuth] = React.useState<{ user?: FirebaseAuthTypes.User | { uid: string | null }; isSignedIn: boolean }>({
        isSignedIn: false,
    })
    const [userFirstname, setUserFirstname] = React.useState<string | null>('')

    const usersCollection = firestore().collection('users')

    useEffect(() => {
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
                    usersCollection.doc(register.user.uid).set({ uid: register.user.uid, username: register.user.email, firstname })
                    setUserFirstname(firstname)
                    await AsyncStorage.setItem('PokeTrackUserUID', register.user.uid)
                    await AsyncStorage.setItem('PokeTrackFirstname', firstname)

                }
            })
    }

    const signIn = async (email: string, password: string) => {
        const signIn = await firebaseAuth().signInWithEmailAndPassword(email, password)
        usersCollection.doc(signIn.user.uid).get()
            .then(async (documentSnapshot) => {
                const data = documentSnapshot.data()
                setUserFirstname(data?.firstname)

                await AsyncStorage.setItem('PokeTrackUserUID', signIn.user.uid)
                await AsyncStorage.setItem('PokeTrackFirstname', data?.firstname)
            })
    }

    const signOut = async () => {
        await firebaseAuth().signOut()
    }

    const getUserInfo = async () => {
        const uid = await AsyncStorage.getItem('PokeTrackUserUID')
        const firstname = await AsyncStorage.getItem('PokeTrackFirstname')
        setAuth({ user: { uid: uid }, isSignedIn: true })
        setUserFirstname(firstname)
    }

    return (
        <AuthContext.Provider
            value={{
                isSignedIn: auth.isSignedIn,
                user: auth.user,
                userFirstname,
                register,
                signIn,
                signOut,
                getUserInfo
            }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
    const auth = useContext(AuthContext)
    return auth
}