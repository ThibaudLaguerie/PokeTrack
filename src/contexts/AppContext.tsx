import React from 'react';
import { _getAllCards } from '../backend';
import { Card } from '../utils/types';
import firestore from '@react-native-firebase/firestore';
import { toCard } from '../utils/functions';
import { URL_BACKEND } from '../utils/constants';
import { useAuth } from './AuthContext';
import { Alert } from 'react-native';

type AppContextType = {
    cards: Card[],
    userCards: Card[],
    userCardIds: string[],
    buyCard: (cardId: string, price: number) => Promise<void>
}

const defaultAppState: AppContextType = {
    cards: [],
    userCards: [],
    userCardIds: [],
    buyCard: async () => undefined
}

const AppContext = React.createContext<AppContextType>(defaultAppState)

export const AppContextProvider: React.FC = ({ children }) => {

    const [cards, setCards] = React.useState<Card[]>([])
    const [userCardIds, setUserCardIds] = React.useState<string[]>([])
    const [userCards, setUserCards] = React.useState<Card[]>([])

    const cardsCollection = firestore().collection("cards")
    const usersCollection = firestore().collection("users")
    const auth = useAuth()

    React.useEffect(() => {
        getAllCards()
    }, [])

    React.useEffect(() => {
        if (auth.user != null) {
            getUserCardIds()
        }
    }, [auth.user])

    React.useEffect(() => {
        if (userCardIds.length > 0) {
            getUserCards()
        }
    }, [userCardIds])

    const getAllCards = async () => {
        const subscriber = cardsCollection.onSnapshot((querySnapshot) => {
            const cardsData = querySnapshot.docs.map(card => toCard(card.data(), card.id))
            console.log(cardsData.length)
            setCards(cardsData)
        })

        return () => subscriber()
    }

    const getUserCardIds = async () => {
        const subscriber = usersCollection.doc(auth.user!.uid!)
            .onSnapshot((documentSnapshot) => {
                const userData = documentSnapshot.data()

                const userCards: string[] = userData?.cards.map((cardId: string) => cardId)
                console.log("USER CARDS", userCards)
                setUserCardIds(userCards)
            })

        return () => subscriber()
    }

    const getUserCards = () => {
        const tempUserCards: Card[] = []
        userCardIds.map(async (cardId) => {
            const card = await getCard(cardId)
            if (card != false) {
                tempUserCards.push(card)
            }
        })

        setUserCards(tempUserCards)
    }

    const getCard = async (cardId: string) => {
        try {
            const url = URL_BACKEND + "/api/cards/card/" + cardId
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            })
            if (response.status == 200) {
                const responseJSON = await response.json()
                const card = toCard(responseJSON.card, cardId)
                console.log("Card reached => ", card)
                return card
            } else {
                console.log("erreur response status")
                return false
            }
        } catch (error) {
            console.log("erreur catch")
            return false
        }
    }

    const buyCard = async (cardId: string, price: number) => {
        try {
            const url = URL_BACKEND + "/api/cards/shop"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: auth.user?.uid,
                    cardId,
                    price,
                    soldeUser: auth.userInfo?.solde
                })
            })
            if (response.status == 200) {
                const responseJSON = await response.json()
                if (responseJSON.code == 1) {
                    Alert.alert("La carte a bien été acheté ! Félicitations !")
                } else {
                    Alert.alert("La carte n'a pas pu être acheté ! Votre solde n'est pas suffisant !")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AppContext.Provider
            value={{
                cards,
                userCards,
                userCardIds,
                buyCard
            }}>
            {children}
        </AppContext.Provider>
    );

}

export const useApp = () => {
    const app = React.useContext(AppContext)
    return app
}