// import { StyleSheet } from 'react-native';
import React from "react";
import EditScreenInfo from "../../components/EditScreenInfo";
// import { Text, View } from '../../components/Themed';
import { StyleSheet, View, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import DownLoadFile from "../../components/DownLoadFile";
import CheckAndUpdate from "../../components/CheckAndUpdate";

export default function TabOneScreen() {
  const [selectedImage, setSelectedImage] = useState<any>(
    "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
  );
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      // console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 60 }}>
        <DownLoadFile></DownLoadFile>
      </View>
      <View style={{ height: 60 ,marginTop:10}}>
        <CheckAndUpdate></CheckAndUpdate>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
    // backgroundColor:'red'
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
