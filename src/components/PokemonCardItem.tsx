import React from "react";
import { Alert, Animated, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Image, Overlay } from "react-native-elements";
import { _getPokemon } from "../backend";
import { useApp } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles";
import { COLORS, TYPES_COLORS, URL_POKEMON_API, WINDOW_WIDTH } from "../utils/constants";
import { toUpperLabel, useColor } from "../utils/functions";
import { Card, Pokemon, TypeColor } from "../utils/types";
import PokemonMoveComponent from "./PokemonMoveComponent";
import PokemonTypeComponent from "./PokemonTypeComponent";

interface Props {
    pokemonCard: Card,
    isUserCard: boolean
}

const PokemonCardItem: React.FC<Props> = ({ pokemonCard, isUserCard }) => {

    const [pokemon, setPokemon] = React.useState<Pokemon>()
    const [flipped, setFlipped] = React.useState<boolean>(false)
    const [show, setShow] = React.useState<boolean>(false)
    const [countToBuy, setCountToBuy] = React.useState<string>("")
    const [userCount, setUserCount] = React.useState<number>(0)

    const app = useApp()
    const auth = useAuth()

    let defaultValue = 0;

    let animatedValue = React.useRef(new Animated.Value(0)).current
    animatedValue.addListener(({ value }) => {
        defaultValue = value
    })

    React.useEffect(() => {
        _getPokemonInfo()
        if (isUserCard) {
            const count = app.userCardIds.find((card) => card.uid == pokemonCard.uid)?.count
            if (count != undefined) {
                setUserCount(count)
            }
        }
    }, [])

    const _getPokemonInfo = async () => {
        const pokemonData = await _getPokemon(URL_POKEMON_API + "/pokemon/" + pokemonCard.id)
        setPokemon(pokemonData)
    }


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

    const buyCard = () => {
        app.buyCard(pokemonCard.uid, pokemonCard.price, parseInt(countToBuy))
        setShow(false)
    }

    const handleCountToBuy = (value: string) => {
        const count = parseInt(value)
        if (count > pokemonCard.nbGenerated - pokemonCard.sold) {
            setCountToBuy((pokemonCard.nbGenerated - pokemonCard.sold).toString())
        } else {
            setCountToBuy(value)
        }
    }

    return (
        <>
            <Overlay isVisible={show} onBackdropPress={() => setShow(false)}
                overlayStyle={{ width: WINDOW_WIDTH * 0.7, backgroundColor: COLORS.black }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.logsButtonText}>Nombre de carte à acheter</Text>
                    <TextInput value={countToBuy} onChangeText={(value) => handleCountToBuy(value)} keyboardType="number-pad"
                        placeholder="1" style={[styles.inputCountCard, styles.containerPadding, { marginVertical: WINDOW_WIDTH * 0.04 }]}
                    />
                    <TouchableOpacity disabled={countToBuy == ""} style={[styles.containerPadding, styles.logsButton, { backgroundColor: COLORS.red }]}
                        onPress={() => {
                            if (auth.userInfo?.solde! >= pokemonCard.price * parseInt(countToBuy)) {
                                Alert.alert("Achat de cartes", "Êtes-vous sûr(e) de vouloir continuer ?",
                                    [
                                        {
                                            text: "Oui, je confirme",
                                            onPress: () => buyCard()
                                        },
                                        {
                                            text: "Non",
                                            onPress: () => false
                                        }
                                    ]
                                )
                            } else {
                                Alert.alert("Solde", "Votre solde actuel ne vous permet d'acheter autant de cartes !")
                            }
                        }}
                    >
                        <Text style={styles.logsButtonText}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
            <TouchableOpacity style={{ marginHorizontal: WINDOW_WIDTH * 0.05, marginTop: WINDOW_WIDTH * 0.05,}} onPress={() => flipCard()}>
                {
                    pokemon != undefined &&
                    <>
                        <Animated.View style={[styles.pokemonCard, styles.containerShadow, { backfaceVisibility: "hidden", backgroundColor: pokemon != undefined ? TYPES_COLORS[pokemon.types[0].name as keyof { [key: string]: TypeColor }].light : undefined }, frontStyle]}>
                            <View style={[styles.containerPadding, { flexDirection: 'row', justifyContent: 'center' }]}>
                                {
                                    pokemonCard != undefined &&
                                    <Image source={{ uri: pokemonCard.sprites.front }} resizeMode="contain" style={{ width: WINDOW_WIDTH * 0.4, height: WINDOW_WIDTH * 0.4 }} />
                                }
                                <View>
                                    <View style={{ justifyContent: 'space-around', }}>
                                        {
                                            [pokemonCard.height, pokemonCard.weight].map((value, index) => {
                                                return (
                                                    <View key={index == 0 ? "height" : "weight"} style={[styles.pokemonInformation, { backgroundColor: useColor(pokemon!.types[0].name, "light"), }]}>
                                                        <Text style={styles.pokemonInformationLabel}>{index == 0 ? "Taille : " : "Poids : "} {value} {index == 0 ? "m" : "kg"}</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                    <View style={[{ flex: 1, paddingVertical: WINDOW_WIDTH * 0.02 }]}>

                                        <View style={[styles.pokemonInformation, styles.containerShadow, { backgroundColor: useColor(pokemon.types[0].name, "normal") }]}>
                                            <Text style={styles.pokemonInformationLabel}>{toUpperLabel(pokemon.types[0].name)}</Text>
                                        </View>
                                        {
                                            pokemon.types.length > 1 &&
                                            <View style={[styles.pokemonInformation, styles.containerShadow, { marginTop: WINDOW_WIDTH * 0.02, backgroundColor: useColor(pokemon.types[1].name, "normal") }]}>
                                                <Text style={styles.pokemonInformationLabel}>{toUpperLabel(pokemon.types[1].name)}</Text>
                                            </View>
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: "space-evenly" }}>
                                <Text style={{ fontSize: WINDOW_WIDTH * 0.07, fontWeight: 'bold' }}>{toUpperLabel(pokemonCard.name)}</Text>
                            </View>
                        </Animated.View>
                        <Animated.View style={[backStyle, styles.pokemonCard, styles.containerShadow, { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backfaceVisibility: 'hidden', paddingVertical: 0 }]}>
                            <View style={[styles.containerPadding, { flex: 1, flexDirection: 'row', borderTopLeftRadius: 15, borderTopRightRadius: 15 }]}>
                                <FlatList
                                    style={{ flex: 1 }}
                                    data={pokemonCard.moves}
                                    keyExtractor={(item, index) => item.name + "_" + index.toString()}
                                    renderItem={({ item, index }) => <PokemonMoveComponent key={item.name + "_" + index.toString()} moveBase={item} />}
                                    numColumns={2}
                                    columnWrapperStyle={{ marginVertical: 5, marginHorizontal: 2 }}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                            {
                                isUserCard ?
                                    <>
                                        <Text style={[styles.title, { color: COLORS.darkGrey }]}>{userCount}</Text>
                                        <Text style={[styles.pokemonInformationLabel, { textAlign: 'center', color: COLORS.darkGrey }]}>possédé{pokemonCard.nbGenerated - pokemonCard.sold > 1 ? "s" : ""}</Text>
                                    </>
                                    :
                                    <>
                                        <Text style={[styles.title, { color: COLORS.darkGrey }]}>{pokemonCard.nbGenerated - pokemonCard.sold}</Text>
                                        <Text style={[styles.pokemonInformationLabel, { textAlign: 'center', color: COLORS.darkGrey }]}>disponible{pokemonCard.nbGenerated - pokemonCard.sold > 1 ? "s" : ""}</Text>
                                    </>
                            }
                            <TouchableOpacity onPress={() => {
                                if (flipped) {
                                    setShow(true)
                                }
                            }} style={[styles.containerPadding, { flexDirection: 'row', justifyContent: "space-evenly", borderBottomLeftRadius: 15, borderBottomRightRadius: 15, backgroundColor: pokemon != undefined ? TYPES_COLORS[pokemon.types[0].name as keyof { [key: string]: TypeColor }].light : undefined }]}>
                                <Text style={{ fontSize: WINDOW_WIDTH * 0.07, fontWeight: 'bold' }}>Acheter pour {pokemonCard.price} €</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </>
                }
            </TouchableOpacity>
        </>
    )
}

export default PokemonCardItem