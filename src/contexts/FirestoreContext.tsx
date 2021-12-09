import React from 'react'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useAuth } from './AuthContext'

type FirestoreContextType = {
}

const defaultFirestoreState: FirestoreContextType = {

}

const FirestoreContext = React.createContext<FirestoreContextType>(defaultFirestoreState)

export const FirestoreContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<FirebaseAuthTypes.User | { uid: string | null }>()

    const auth = useAuth()


    React.useEffect(() => {
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
    const firestore = React.useContext(FirestoreContext)
    return firestore
}