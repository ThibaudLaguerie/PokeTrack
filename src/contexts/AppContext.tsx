import React from 'react';
import { _getAllCards } from '../backend';
import { Card } from '../utils/types';
import firestore from '@react-native-firebase/firestore';
import { toCard, toUpperLabel } from '../utils/functions';
import { URL_BACKEND } from '../utils/constants';
import { useAuth } from './AuthContext';
import { Alert } from 'react-native';

type AppContextType = {
    cards: Card[],
    userCards: Card[],
    userCardIds: { uid: string, count: number }[],
    buyCard: (cardId: string, price: number, count: number) => Promise<void>
    getStockExchangeValue: (id: number) => Promise<number>
}

const defaultAppState: AppContextType = {
    cards: [],
    userCards: [],
    userCardIds: [],
    buyCard: async () => undefined,
    getStockExchangeValue: async () => 0
}

const AppContext = React.createContext<AppContextType>(defaultAppState)

export const AppContextProvider: React.FC = ({ children }) => {

    const [cards, setCards] = React.useState<Card[]>([])
    const [userCardIds, setUserCardIds] = React.useState<{ uid: string, count: number }[]>([])
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
        } else if (auth.user == undefined) {
            setUserCardIds([])
            setUserCards([])
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
            setCards(cardsData)
        })

        return () => subscriber()
    }

    const getUserCardIds = async () => {
        const subscriber = usersCollection.doc(auth.user!.uid!)
            .onSnapshot((documentSnapshot) => {
                const userData = documentSnapshot.data()

                const userCards: { uid: string, count: number }[] = userData?.cards.map((cardId: string) => cardId)
                if (userCards != undefined) {
                    setUserCardIds(userCards)
                } else {
                    setUserCardIds([])
                }
            })

        return () => subscriber()
    }

    const getUserCards = () => {
        const tempUserCards: Card[] = []
        userCardIds.map(async (cardTmp) => {
            const card = await getCard(cardTmp.uid)
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

    const buyCard = async (cardId: string, price: number, count: number) => {
        console.log(auth.userInfo?.solde)
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
                    soldeUser: auth.userInfo?.solde,
                    count
                })
            })
            if (response.status == 200) {
                const responseJSON = await response.json()
                if (responseJSON.code == 1) {
                    auth.updateSolde(auth.userInfo?.solde! - (price * count))

                    await sendMail(cards.find((card) => card.uid == cardId)?.name!, count)
                    Alert.alert("La carte a bien été acheté ! Félicitations !")
                } else {
                    Alert.alert("La carte n'a pas pu être acheté ! Votre solde n'est pas suffisant !")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const sendMail = async (cardName: string, count: number) => {
        try {
            const url = "http://localhost:4444/api/v1/mail/send"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    to: [auth.userInfo?.email],
                    subject: "Achat de cartes",
                    message: "Nous vous félicitons pour votre achat de la carte " + toUpperLabel(cardName) + " ! Vous en possédez " + count
                })
            })
        } catch (error) {

        }
    }

    const getStockExchangeValue = async (id: number) => {
        try {
            const url = URL_BACKEND + "/api/cards/stockexchange/value/" + id
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (response.status == 200) {
                const responseJSON = await response.json()
                console.log(responseJSON)
                return responseJSON.value
            } else {
                Alert.alert("Aucune carte n'a été générée pour ce pokémon !")
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
                buyCard,
                getStockExchangeValue
            }}>
            {children}
        </AppContext.Provider>
    );

}

export const useApp = () => {
    const app = React.useContext(AppContext)
    return app
}