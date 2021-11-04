import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { COLORS } from '../utils/constants';

type Props = {
    title: string | ((props: { color: string; focused: boolean; }) => React.ReactNode) | undefined
    focused?: boolean
    onPress: () => void
}

const DrawerItemCustom: React.FC<Props> = ({ title, onPress, focused }) => {

    return (
        <TouchableOpacity onPress={() => onPress()}
            style={[styles.borderBottomDrawerItems, styles.itemDrawer, { borderBottomColor: focused ? COLORS.black : COLORS.white }]}>
            <Text style={[styles.headerText, { color: focused ? COLORS.black : COLORS.white }]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default DrawerItemCustom