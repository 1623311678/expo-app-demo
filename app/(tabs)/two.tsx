import { StyleSheet, } from 'react-native';
import React,{useEffect,useState} from "react";
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { WebView } from 'react-native-webview';
import { Link, Tabs,useNavigation } from "expo-router";
import { BackHandler } from 'react-native';


export default function TabTwoScreen() {
  let webViewRef: any = null;
  const navigation:any = useNavigation()
  const [canWebGoBack, setCanWebGoBack] = useState(false);
  useEffect(() => {
    const backHandlerListener = BackHandler.addEventListener('hardwareBackPress',
      () => {
        // console.log('BACK PRESSED FROM APP');
        // // doSomethingThatIWant();
        // // alert('BACK PRESSED FROM APP')
        // console.log('canWebGoBack',canWebGoBack)
        if(canWebGoBack&&webViewRef){
         webViewRef.goBack()
        }else if(navigation.canGoBack()){
          // alert('o')
          try{
          navigation.goBack()
          }catch(e){
            return false

          }
        }
        // webViewRef.goBack()
        return true; // prevent default behaviour;
      }
    );

    return () => {
      backHandlerListener.remove();
    };
  }, [canWebGoBack]);
  return (
    <WebView
    style={styles.container}
    source={{ uri: 'http://hundun.site/hundun-web-view/previewPDF.html', method: "GET",
    headers: { "Cache-Control": "no-cache" }, }}
    allowsBackForwardNavigationGestures
    ref={(ref: any) => {
      //   setWebViewRef(ref);
      webViewRef = ref;
    }}
    onNavigationStateChange={(navState:any) => {
      //  alert(JSON.stringify(navState))
        if (navState.canGoBack) {
          setCanWebGoBack(true)
        } else {
          setCanWebGoBack(false)
        }
      }}
  />
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
