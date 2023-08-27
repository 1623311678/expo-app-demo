import { StyleSheet, } from 'react-native';
import React from "react";
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { WebView } from 'react-native-webview';


export default function TabTwoScreen() {
  return (
   <View  style={styles.container}>
    <Text>视频</Text>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
