import React from "react";
import { View,Text,} from "react-native";
import { Button, Dialog } from "@rneui/themed";
import * as Updates from "expo-updates";
export default function CheckAndUpdate() {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
        alert('更新成功')
      }else{
        alert('已是最新版本')
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }
  return (
    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
      <View style={{ width: 150, marginRight: 5 }}>
        <Button onPress={onFetchUpdateAsync}>检查更新(?)</Button>
      </View>
      {/* <View style={{ width: 150,marginLeft:5 }}>
        <Button>检查更新2</Button>
      </View> */}
    </View>
  );
}
