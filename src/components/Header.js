import React from 'react';
import {Dimensions, Image, TouchableOpacity} from 'react-native';
import {Layout, Text, StyleService, useStyleSheet} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

import colors from '../styles/palette.json';
import backButtom from '../../assets/backButtom.png';
import {StageProgress} from '../components';

const Header = ({title, goBack, translucent, stageProgress, onStageBack}) => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();

  return (
    <Layout
      style={[
        styles.container,
        {
          position: translucent ? 'absolute' : 'relative',
          backgroundColor: translucent ? 'transparent' : colors.secundary,
          zIndex: translucent ? 999 : 0,
          height: translucent ? 80 : 120,
          justifyContent: goBack ? 'space-between' : 'center',
        },
      ]}>
      {goBack && (
        <TouchableOpacity
          style={styles.backButtom}
          onPress={() => navigation.goBack()}>
          <Image style={styles.backButtomIcon} source={backButtom} />
        </TouchableOpacity>
      )}
      {onStageBack !== undefined && (
        <TouchableOpacity
          style={styles.backButtom}
          onPress={() => onStageBack()}>
          <Image style={styles.backButtomIcon} source={backButtom} />
        </TouchableOpacity>
      )}
      <Layout style={styles.contentBox}>
        {stageProgress !== undefined ? (
          <StageProgress progress={stageProgress} />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </Layout>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    alignItems: 'center',
    width: '100%',
    top: 0,
    flexDirection: 'row',
  },

  backButtom: {
    left: 20,
  },

  backButtomIcon: {
    width: 30,
    height: 20,
  },

  contentBox: {
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    width: '100%',
  },

  text: {
    color: colors.headerText,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
});

export default Header;
