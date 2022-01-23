import React from 'react';
import { _getAllCards } from '../backend';
import { Card } from '../utils/types';
import firestore from '@react-native-firebase/firestore';
import { toCard } from '../utils/functions';

type AppContextType = {
    cards: Card[]
}

const defaultAppState: AppContextType = {
    cards: []
}

const AppContext = React.createContext<AppContextType>(defaultAppState)

export const AppContextProvider: React.FC = ({ children }) => {

    const [cards, setCards] = React.useState<Card[]>([])

    const cardsCollection = firestore().collection("cards")

    React.useEffect(() => {
        getAllCards()
    }, [])

    const getAllCards = async () => {
        const subscriber = cardsCollection.onSnapshot((querySnapshot) => {
            console.log(querySnapshot)
            const cardsData = querySnapshot.docs.map(card => toCard(card.data()))
            console.log(cardsData)
            setCards(cardsData)
        })

        return () => subscriber()
    }

    return (
        <AppContext.Provider
            value={{
                cards
            }}>
            {children}
        </AppContext.Provider>
    );

}

export const useApp = () => {
    const app = React.useContext(AppContext)
    return app
}