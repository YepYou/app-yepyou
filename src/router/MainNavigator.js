import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';

import { WorldStack, ProfileStack } from './stacks';
import imageLogBook from '../../assets/menuIcons/logBook.png';
import imageExplorerGuide from '../../assets/menuIcons/explorerGuide.png';

const { Navigator, Screen } = createBottomTabNavigator();

const WorldIcon = (props) => (
    <Icon {...props} name='globe-outline'/>
);

const Profile = (props) => (
    <Icon {...props} name='person-outline'/>
);
  
const LogBookIcon = (props) => (
    <Image {...props} source={imageLogBook}/>
);

const ExplorerGuideIcon = (props) => (
    <Image {...props} source={imageExplorerGuide}/>
);

const BottomTabBar = ({ navigation, state }) => {
    const styles = useStyleSheet(themedStyles);

    return (
        <BottomNavigation
            style={styles.menuIcons}
            selectedIndex={state.index}
            onSelect={(index) => navigation.navigate(state.routeNames[index])}>
                <BottomNavigationTab icon={WorldIcon}/>
                <BottomNavigationTab disabled icon={LogBookIcon}/>
                <BottomNavigationTab disabled icon={ExplorerGuideIcon}/>
                <BottomNavigationTab icon={Profile}/>
        </BottomNavigation>
    );
};

// TODO - The Screen Navigator Profile2 and Profile3 will be change to others screens
const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name="World" component={WorldStack} />
        <Screen name="Profile2" component={ProfileStack} />
        <Screen name="Profile3" component={ProfileStack} />
        <Screen name="Profile" component={ProfileStack} />
    </Navigator>
);

const MainNavigator = () => (
    <TabNavigator />
);

const themedStyles = StyleService.create({
    menuIcons: {
        height: 90,
		backgroundColor: 'color-basic-200'
    },
});

export default MainNavigator;