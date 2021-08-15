import React from 'react';
import {Layout, Spinner} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

const Loading = () => (
  <Layout style={styles.container}>
    <Spinner size="giant" />
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Loading;
