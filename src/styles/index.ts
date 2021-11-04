import { StyleSheet } from "react-native";
import { COLORS, WINDOW_WIDTH } from "../utils/constants";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.black,
        flex: 1,
    },
    columnContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    centerChildren: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerPadding: {
        padding: WINDOW_WIDTH * 0.02
    },
    containerMargin: {
        margin: WINDOW_WIDTH * 0.01
    },
    containerLogsInput: {
        width: WINDOW_WIDTH * 0.9,
        alignSelf: 'center',
        borderBottomWidth: 0,
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
    flatlistText: {
        fontSize: WINDOW_WIDTH * 0.05,
        color: COLORS.white,
        marginLeft: WINDOW_WIDTH * 0.05,
        paddingBottom: WINDOW_WIDTH * 0.07,
        fontFamily: 'BAHNSCHRIFT'
    },
    logo: {
        width: WINDOW_WIDTH * 0.5,
        height: WINDOW_WIDTH * 0.5
    },
    bigDivider: {
        width: WINDOW_WIDTH * 0.9,
        height: 5,
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        marginVertical: WINDOW_WIDTH * 0.03
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#00A3D8'
    },
    headerText: {
        fontSize: WINDOW_WIDTH * 0.1,
        fontWeight: 'bold',
        color: COLORS.white,
        textAlignVertical: 'center',
        fontFamily: 'BAHNSCHRIFT'
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
        backgroundColor: '#E4B429',
        width: WINDOW_WIDTH * 0.9
    },
    expenseCard: {
        width: WINDOW_WIDTH * 0.85,
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        flex: 1,
        borderRadius: 15,
        margin: WINDOW_WIDTH * 0.02,
    },
    expenseTitle: {
        fontSize: WINDOW_WIDTH * 0.06,
        fontWeight: 'bold',
        fontFamily: 'BAHNSCHRIFT'
    },
    expenseDate: {
        fontSize: WINDOW_WIDTH * 0.05,
        fontFamily: 'BAHNSCHRIFT',
    },
    expenseAmount: {
        fontSize: WINDOW_WIDTH * 0.07,
        fontWeight: 'bold',
        color: COLORS.white,
        fontFamily: 'BAHNSCHRIFT'
    },
    swipeComponent: {
        borderRadius: 15,
        margin: WINDOW_WIDTH * 0.02,
        backgroundColor: COLORS.white
    },
    swipeItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        margin: WINDOW_WIDTH * 0.02,
        width: '80%',
        height: 100,
        alignSelf: 'center',
        marginVertical: 5,
    },
    headerDrawer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: WINDOW_WIDTH * 0.06
    },
    itemDrawer: {
        paddingVertical: WINDOW_WIDTH * 0.02,
        marginHorizontal: WINDOW_WIDTH * 0.02,
        marginVertical: WINDOW_WIDTH * 0.06
    },
    borderBottomDrawerItems: {
        borderBottomColor: COLORS.white,
        borderBottomWidth: 5
    },
    swipeLeftAction: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    swipeActionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    swipeRightAction: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    seeAllButton: {
        borderRadius: 10,
        backgroundColor: '#00A3D8',
        alignSelf: 'center',
    },
    seeAllButtonText: {
        color: COLORS.white,
        fontSize: WINDOW_WIDTH * 0.05,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    filterText: {
        fontSize: WINDOW_WIDTH * 0.08,
        color: '#00A3D8',
        fontFamily: 'BAHNSCHRIFT'
    },
    containerPickerFilter: {
        margin: WINDOW_WIDTH * 0.03,
        backgroundColor: COLORS.white,
        borderRadius: 10,
    },
})
export default styles