import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Login = () => {
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
            <StatusBar backgroundColor="#201856" barStyle="light-content" />
            <View style={{ flex: 1 }}>
                <WebView
                    source={{ uri: 'https://qbucks.com.ng/mobile/login/' }}
                    style={{ flex: 1 }}
                    mixedContentMode="compatibility"
                />
            </View>
        </SafeAreaView>
    );
}

export default Login;
