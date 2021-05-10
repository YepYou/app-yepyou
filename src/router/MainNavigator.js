import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

import { WorldStack, ProfileStack } from './stacks';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab title='World'/>
            <BottomNavigationTab title='Profile'/>
    </BottomNavigation>
);

const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name="World" component={WorldStack} />
        <Screen name="Profile" component={ProfileStack} />
    </Navigator>
);

const MainNavigator = () => (
    <TabNavigator />
);

export default MainNavigator;