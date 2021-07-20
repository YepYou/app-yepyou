import React from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { Layout, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import Markdown from 'react-native-markdown-display';

import imageCharacter from '../../../assets/personagem2.png';
import imageCogs from '../../../assets/cogs.png';
import colors from '../../styles/palette.json';
import Header from '../../components/Header';

const MaterialList = ({navigation, route}) => {
    const styles = useStyleSheet(themedStyles);

	const {mission} = route.params;

	return (
		<>
			<Header goBack translucent />
			<Layout style={styles.container}>
				<Layout style={styles.header}>
					<Image style={styles.imageCharacter} resizeMode="contain" source={imageCharacter} />
					<Layout style={styles.boxBalloon}>
						<Layout style={styles.arrow} />
						<Layout style={styles.balloon}>
							<Text style={styles.balloonText}>Olá explorador, chegou a hora de separar os materiais, vamos lá?</Text>
						</Layout>
					</Layout>
				</Layout>
				<Layout style={styles.body}>
					<Layout style={styles.title}>
						<Image style={styles.imageCogs} resizeMode="contain" source={imageCogs} />
						<Text style={styles.titleText}>Lista de materiais</Text>
					</Layout>
					<ScrollView style={styles.listBody}>
						<Markdown>
							{mission.materialList}
						</Markdown>
					</ScrollView>
									<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Mission', {mission})}>
											<Text style={styles.buttonText}>Avançar</Text>
									</TouchableOpacity>
				</Layout>
			</Layout>
		</>
	);
};


const themedStyles = StyleService.create({
	container: {
		backgroundColor: 'color-info-500',
		width: '100%',
		height: '100%',
		paddingHorizontal: 16,
		paddingTop: 64,
		paddingBottom: 16,
	},

	header: {
		backgroundColor: 'transparent',
		paddingHorizontal: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},

	imageCharacter: {
		width: 256,
		height: 256,
		flex: 1,
	},
	
	boxBalloon: {
		flex: 2.5,
		backgroundColor: 'transparent',
		justifyContent: 'center',
	},

	balloon: {
		borderRadius: 32,
		backgroundColor: 'white',
		paddingVertical: 8,
		paddingHorizontal: 16,
	},

	arrow: {
        backgroundColor: 'transparent',
        borderLeftWidth: 27,
        borderRightWidth: 27,
        borderBottomWidth: 43,
        borderBottomColor: 'white',
        marginLeft: -6,
        borderColor: 'transparent',
		position: 'absolute',
		left: -10,
        transform: [{ rotate: '270deg' }],
	},

	balloonText: {
		color: '#706F6F',
		fontWeight: 'bold',
	},

	listBody: {
		backgroundColor: 'white',
		padding: 32,
		maxHeight: '95%',
		minHeight: '95%',
		borderRadius: 32,
		width: '100%',
	},

	body: {
		flex: 2,
		backgroundColor: 'transparent',
		alignItems: 'center',
	},

	title: {
		backgroundColor: '#560BA0',
		position: 'absolute',
		top: -8,
		height: 24,
		zIndex: 999,
		paddingHorizontal: 28,
		borderRadius: 12,
		justifyContent: 'center',
	},

	titleText: {
		color: 'white',
		fontWeight: 'bold',
	},

	button: {
			backgroundColor: colors.barColorPink,
			borderRadius: 10,
			width: 130,
			height: 35,
			bottom: 20
	},

	buttonText: {
			color: '#fff',
			alignSelf: 'center',
			marginTop: 7
	},

	imageCogs: {
		width: 40,
		position: 'absolute',
		right: -16,
	}
});

export default MaterialList;