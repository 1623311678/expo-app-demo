import React from "react";
import { View,Text,} from "react-native";
import { Button, Dialog } from "@rneui/themed";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { useState, useEffect } from "react";
import * as Sharing from "expo-sharing";
import { WebView } from "react-native-webview";
import { Link, Tabs,useNavigation } from "expo-router";
// const htmlStr = require('./downFileDist/index.html')
// alert(htmlStr)
export default function DownLoadFile() {
  const [selectedPdf, setselectedPdf] = useState<any>(
    "https://pdf.dfcfw.com/pdf/H3_AP202304201585601855_1.pdf?1681977223000.pdf"
  );
  const [downloadProgress, setProgess] = useState(0);
  const [htmlStr, setHtml] = useState("<div></div>");
  const [visible, setVisible] = useState(false);
  //   const [webViewRef, setWebViewRef] = useState<any>(null);
  let webViewRef: any = null;
  const injectedJavaScript = `
  (function() {
    window.postMessage2 = function(data) {
      window.ReactNativeWebView.postMessage(data);
    };
  })()`;
  const navigation:any = useNavigation()
  return (
    <View
      style={{
        marginTop: 20,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View style={{ width: 150, marginRight: 5 }}>
        <Button
          onPress={async () => {
            setProgess(0);
            if (
              selectedPdf.startsWith("http") ||
              selectedPdf.startsWith("https")
            ) {
              //处理网络图片
              const callback = (downloadProgress: any) => {
                const progress =
                  downloadProgress.totalBytesWritten /
                  downloadProgress.totalBytesExpectedToWrite;
                setProgess(progress);
              };

              const downloadResumable = FileSystem.createDownloadResumable(
                selectedPdf,
                FileSystem.documentDirectory + "大模型.pdf",
                {},
                callback
              );
              try {
                const photoData: any = await downloadResumable.downloadAsync();
                const uri = photoData.uri;
                if (!(await Sharing.isAvailableAsync())) {
                  alert(`分享无法使用`);
                  return;
                }
                await Sharing.shareAsync(uri);
              } catch (e) {
                alert(e);
              }
            } else {
              const asset = await MediaLibrary.createAssetAsync(selectedPdf);
              alert(JSON.stringify(asset));
            }
          }}
        >
          {`下载文件(${parseInt(String(downloadProgress * 100))})%`}
        </Button>
      </View>
      <View style={{ width: 150, marginLeft: 5 }}>
        <Button
          onPress={() => {
            setVisible(true);
          }}
        >
          预览文件
        </Button>
      </View>

      <Dialog
        isVisible={visible}
        overlayStyle={{
          height: "100%",
          width: "100%",
          backgroundColor: "black",
        }}
        onBackdropPress={() => {
          //   reset();
          setVisible(false);
        }}
      >
        <Dialog.Title title="相机" />

        <View style={{ width: "100%", height: "100%" }}>
          <WebView
            ref={(ref: any) => {
              //   setWebViewRef(ref);
              webViewRef = ref;
            }}
            onNavigationStateChange={(navState:any) => {
              alert(JSON.stringify(navState))
               if (navState.canGoBack) {
                alert('truetrue')
                 navigation.setParams({
                   headerLeftInfo: {
                     title: '',
                     onPress: () =>  webViewRef.current.goBack(),
                   },
                 });
               } else {
                 navigation.setParams({
                   headerLeftInfo: null,
                 });
               }
             }}
            injectedJavaScript={injectedJavaScript}
            onMessage={(event) => {
              try {
                // 传过来的 data 肯定为字符串，可以跟 web 端约定好交互的数据格式
                // const data = JSON.parse(event.nativeEvent.data);
                alert(JSON.stringify(event))
              } catch (error) {
                alert(error)
                // handle parse error
              }
            }}
            useWebKit
            javaScriptEnabled={true}
            allowFileAccess
            onLoadEnd={() => {
              if (webViewRef) {
                // alert(JSON.stringify(webViewRef.postMessage))
                webViewRef.postMessage(selectedPdf);
              }
            }}
            source={{
              uri: "http://hundun.site/hundun-web-view/previewPDF.html",
              method: "GET",
              headers: { "Cache-Control": "no-cache" },
              // uri:"http://localhost:9002/previewPDF.html"
            }}
          />
        </View>
        <View style={{ position: "absolute", right: 20, top: 20 }}>
          <Text
            style={{ color: "white" }}
            onPress={() => {
              setVisible(false);
            }}
          >
            关闭
          </Text>
        </View>
      </Dialog>
    </View>
  );
}
