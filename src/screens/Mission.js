import React, { useState } from 'react';
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { ScrollView, TouchableOpacity } from 'react-native';

import Header from '../components/Header';
import { Title, Subtitle, Img, Dialogue } from '../components/contents';
import colors from '../styles/palette.json';
import config from '../config';
import { StageTitle } from '../components';

const Mission = ({navigation, route}) => {
    const [stage, setStage] = useState(1);
    const styles = useStyleSheet(themedStyles);

	const {mission} = route.params;

    console.tron.log({mission});

    const renderContent = () => {
        const { contents } = mission.stages[stage - 1] || [];

        return contents.map(content => {
            switch (content.type) {
                case config.contentTypes.title:
                    return <Title text={content.textContent} />;
                case config.contentTypes.subTitle:
                    return <Subtitle text={content.textContent} />;
                case config.contentTypes.text:
                    return <Dialogue text={content.textContent} />;
                case config.contentTypes.image:
                    return <Img url={content.url} />;
                default:
                    return null;
            };
        });
    }

    const nextStage = () => {
        if (mission.stages.length === stage) {
            finishMission();
        } else {
            setStage(stage + 1);
        }
    }

    return (
        <>
            {stage > 1 ? (
                <Header onStageBack={() => setStage(stage - 1)} stageProgress={(stage * 100) / mission.stages.length} />
            ) : (
                <Header goBack stageProgress={(stage * 100) / mission.stages.length} /> 
            )}
            <ScrollView
                style={styles.container}
                contentContainerStyle={{alignItems: 'center'}}>
                {mission.stages[stage - 1] && (
                    <StageTitle text={mission.stages[stage - 1].name} />
                )}
                {renderContent()}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => nextStage()}>
                    <Text style={styles.buttonText}>{mission.stages.length === stage ? 'Finalizar missão' : 'Próxima etapa'}</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
};

const themedStyles = StyleService.create({
    backdropModal: {
        backgroundColor: colors.backdropModal
    },
    
	container: {
        paddingHorizontal: 16,
        width: '100%',
        flex: 1
	},

    list: {
		flex: 1,
		height: '100%',
		width: '100%',
        backgroundColor: colors.backgroundScreen
	},

    cardWorld: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20
    },

    cardWorldImage: {
        width: '95%',
        height: 160,
        borderRadius: 14
    },

    cardWorldAvatar: {
        bottom: 10,
        position: 'absolute',
        right: 25
    },

	button: {
			backgroundColor: colors.barColorPink,
			borderRadius: 10,
			width: 130,
			height: 35,
			bottom: 20,
            marginTop: 32,
	},

	buttonText: {
			color: '#fff',
			alignSelf: 'center',
			marginTop: 7
	},
});

export default Mission;