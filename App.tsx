
import React from 'react';
import { WebView } from 'react-native-webview';
import {
  StyleSheet, Alert
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import fs from 'fs';

declare const global: { HermesInternal: null | {} };

const App = () => {

  return (
    <WebView
      source={{ uri: 'file:///android_asset/Web.bundle/aula2.html' }}
      onMessage={(event) => {
        Alert.alert(event.nativeEvent.data);
      }}
      style={{flex: 1}}
    />
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
