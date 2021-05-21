import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';

import { WorldStack, MenuStack } from './stacks';

import imageLogBook from '../../assets/menuIcons/logBook.png';
import imageExplorerGuide from '../../assets/menuIcons/explorerGuide.png';
import imageMenu from '../../assets/menuIcons/menu.png';

import colors from '../styles/palette.json';

const { Navigator, Screen } = createBottomTabNavigator();

const LogBookIcon = (props) => (
    <Image resizeMode="contain" {...props} style={styles.iconImage} source={imageLogBook}/>
);

const MenuIcon = (props) => (
    <Image resizeMode="contain" {...props} style={styles.iconImageProfile} source={imageMenu}/>
);

const ExplorerGuideIcon = (props) => (
    <Image resizeMode="contain" {...props} style={styles.iconImage} source={imageExplorerGuide}/>
);

const BottomTabBar = ({ navigation, state }) => {
    // hide menu when central option is open
    if (state.index == 1) return false;

    return (
        <BottomNavigation
            style={styles.menuIcons}
            appearance='noIndicator'
            selectedIndex={state.index}
            onSelect={(index) => navigation.navigate(state.routeNames[index])}>
                <BottomNavigationTab disabled icon={ExplorerGuideIcon}/>
                <BottomNavigationTab icon={MenuIcon}/>
                <BottomNavigationTab disabled icon={LogBookIcon}/>
        </BottomNavigation>
    );
};

const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name="World" component={WorldStack} />
        <Screen name="Profile2" component={MenuStack} />
        <Screen name="Profile3" component={WorldStack} />
    </Navigator>
);

const MainNavigator = () => (
    <TabNavigator />
);

const styles = StyleSheet.create({
    menuIcons: {
        backgroundColor: colors.backgroundMenu
    },

    iconImage: {
        width: 36,
        height: 36
    },

    iconImageProfile: {
        height: 72,
        width: 72
    }
});

export default MainNavigator;