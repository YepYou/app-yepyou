import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { WorldStack, ProfileStack } from './stacks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import imageLogBook from '../../assets/menuIcons/logBook.png';
import imageExplorerGuide from '../../assets/menuIcons/explorerGuide.png';
import imageProfile from '../../assets/menuIcons/profile.png';

import colors from '../styles/palette.json';

const Tab = createBottomTabNavigator();

const LogBookIcon = (props) => (
    <Image resizeMode="contain" {...props} style={styles.iconImage} source={imageLogBook}/>
);

const ProfileIcon = (props) => (
    <Image resizeMode="contain" {...props} style={styles.iconImageProfile} source={imageProfile}/>
);

const ExplorerGuideIcon = (props) => (
    <Image resizeMode="contain" {...props} style={styles.iconImage} source={imageExplorerGuide}/>
);

function MyTabs() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    backgroundColor: colors.backgroundMenu,
                    paddingBottom: 3
                }
            }}
        >
            <Tab.Screen 
                name="LogBook" 
                component={WorldStack}
                options={{
                    tabBarIcon: ({ tintColor }) => (
                        <ExplorerGuideIcon color={tintColor} />
                    )
                }}
            />

            <Tab.Screen 
                name="Profile" 
                component={ProfileStack}
                options={() => ({
                    tabBarIcon: ({tintColor}) => (
                        <ProfileIcon style={styles.iconImageProfile} color={tintColor} />
                    )
                })}
            />
            
            <Tab.Screen 
                name="ExplorerGuide" 
                component={ProfileStack} 
                options={{
                    tabBarIcon: () => (
                        <LogBookIcon />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const MainNavigator = () => (
        <MyTabs />
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

    iconImage: {
        width: 48,
        height: 48
    },

    iconImageProfile: {
        height: 96,
        marginBottom: 60,
        width: 96
    }
});

export default MainNavigator;