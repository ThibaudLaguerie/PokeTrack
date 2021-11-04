import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

type FirestoreContextType = {
}

const defaultFirestoreState: FirestoreContextType = {

}

const FirestoreContext = createContext<FirestoreContextType>(defaultFirestoreState)

export const FirestoreContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | { uid: string | null }>()

    const auth = useAuth()


    useEffect(() => {
        if (auth.user != undefined) {
            setUser(auth.user)
        }
    }, [auth])


    return (
        <FirestoreContext.Provider
            value={{
            }}>
            {children}
        </FirestoreContext.Provider>
    )
}


export const useFirestore = () => {
    const firestore = useContext(FirestoreContext)
    return firestore
}