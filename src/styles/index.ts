import { StyleSheet } from "react-native";
import { COLORS, WINDOW_WIDTH } from "../utils/constants";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.black,
        flex: 1,
    },
    containerFlatList: {
        flexGrow: 1,
        backgroundColor: COLORS.black,
        padding: WINDOW_WIDTH * 0.05
    },
    centerChildren: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerPadding: {
        padding: WINDOW_WIDTH * 0.02
    },
    containerLogsInput: {
        width: WINDOW_WIDTH * 0.9,
        alignSelf: 'center',
        borderBottomWidth: 0,
    },
    containerShadow: {
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: WINDOW_WIDTH * 0.01,
        shadowOffset: {
            width: 0,
            height: WINDOW_WIDTH * 0.01
        }
    },
    stayConnected: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: WINDOW_WIDTH * 0.02
    },
    stayConnectedText: {
        fontSize: WINDOW_WIDTH * 0.05,
        color: COLORS.white,
        fontFamily: 'BAHNSCHRIFT',
        fontWeight: 'bold',
        marginRight: WINDOW_WIDTH * 0.01
    },
    miniLogo: {
        width: WINDOW_WIDTH * 0.1,
        height: WINDOW_WIDTH * 0.1
    },
    hello: {
        fontSize: WINDOW_WIDTH * 0.15,
        color: COLORS.white,
        marginLeft: WINDOW_WIDTH * 0.05,
        marginTop: WINDOW_WIDTH * 0.05,
        fontFamily: 'BAHNSCHRIFT'
    },
    logo: {
        width: WINDOW_WIDTH * 0.5,
        height: WINDOW_WIDTH * 0.5
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: WINDOW_WIDTH * 0.1,
        color: COLORS.white,
        textAlignVertical: 'center',
        fontFamily: 'BAHNSCHRIFT',
        fontWeight: "700"
    },
    title: {
        fontSize: WINDOW_WIDTH * 0.15,
        textAlign: 'center',
        color: COLORS.white,
        fontFamily: 'BAHNSCHRIFT'
    },
    logsInput: {
        backgroundColor: COLORS.white,
        marginVertical: WINDOW_WIDTH * 0.01,
        alignSelf: 'center',
        borderRadius: 10
    },
    logsButton: {
        width: WINDOW_WIDTH * 0.6,
        marginVertical: WINDOW_WIDTH * 0.01,
        borderRadius: 10,
        alignSelf: 'center'
    },
    logsButtonText: {
        fontSize: WINDOW_WIDTH * 0.07,
        textAlign: 'center',
        color: COLORS.white,
        fontFamily: 'BAHNSCHRIFT'
    },
    drawer: {
        backgroundColor: COLORS.lightGrey,
        width: WINDOW_WIDTH * 0.9
    },
    headerDrawer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemDrawer: {
        paddingVertical: WINDOW_WIDTH * 0.02,
        marginHorizontal: WINDOW_WIDTH * 0.02,
        marginVertical: WINDOW_WIDTH * 0.03
    },
    borderBottomDrawerItems: {
        borderBottomColor: COLORS.white,
        borderBottomWidth: 5
    },
    pokemonItem: {
        width: WINDOW_WIDTH * 0.43,
        height: WINDOW_WIDTH * 0.43,
        borderRadius: 10,
        backgroundColor: "#ececec",// COLORS.white,
        marginBottom: WINDOW_WIDTH * 0.05,
        padding: WINDOW_WIDTH * 0.03,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pokemonSprite: {
        width: WINDOW_WIDTH * 0.3,
        height: WINDOW_WIDTH * 0.3
    },
    pokemonCard: {
        borderRadius: 15,
        backgroundColor: "#ececec",
        paddingVertical: WINDOW_WIDTH * 0.05
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: WINDOW_WIDTH * 0.03,
        marginLeft: WINDOW_WIDTH * 0.03
    },
    backTitle: {
        color: COLORS.white,
        fontSize: WINDOW_WIDTH * 0.06,
        fontWeight: '900',
        fontFamily: 'BAHNSCHRIFT'
    },
    pokemonSpriteContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginHorizontal: WINDOW_WIDTH * 0.05,
    },
    pokemonInformation: {
        borderRadius: 10,
        padding: WINDOW_WIDTH * 0.02,
        marginHorizontal: WINDOW_WIDTH * 0.05,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pokemonInformationLabel: {
        fontSize: WINDOW_WIDTH * 0.05,
        fontWeight: 'bold',
    },
    inputCountCard: {
        width: WINDOW_WIDTH * 0.4,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        fontSize: WINDOW_WIDTH * 0.07,
        textAlign: 'center',
        color: COLORS.darkGrey,
        fontFamily: 'BAHNSCHRIFT'
    },
})
export default styles