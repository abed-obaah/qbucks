import React from 'react'
import {StyleSheet,Text,View,StatusBar, Image,TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const Welcome = ({navigation})=>{
    return(
        <View style={{flex:1,flexDirection:'column'}} >
            <StatusBar barstyle="light-content" translucent={true} backgroundColor="#201856" />

            <LinearGradient start={{x:0.0,y:0.4}} end={{x:0.5,y:1.0}} location={[0,1]} colors={['#201856','#201856']} style={{flex:1}} >

                {/* Top Section */}
                <View style={{flex:2.5, justifyContent:'center', alignItems:'center'}} >
                        <Text style={{fontSize:50,fontWeight:'bold',color:'#ffffff',fontFamily:'Roboto-Regular'}}>Qbucks App</Text>
                        <Text style={{fontSize:12,fontWeight:'bold',color:'#ffffff',fontFamily:'Roboto-Regular'}}>Stay connected always.</Text>
                </View>

                {/* Button and text section */}
                <View style={{flex:2,justifyContent:'center',paddingHorizontal:wp('5%')}} >
                    <View style={{position:'relative',flexDirection:'column',backgroundColor:'rgba(79, 67, 134, 0.8)',height:hp('35%'),borderRadius:15,paddingTop:20,paddingHorizontal:wp('5%')}} >
                        <Text style={{fontFamily:'Roboto-Black',fontSize:25,color:'#fff',alignSelf:'center',textAlign:'center'}} >Buy Data,Airtime and more</Text>

                        <Text style={{fontSize:15,fontFamily:'Roboto-Regular',alignSelf:'center',paddingTop:20,color:'#fff',textAlign:'center'}} >you can Buy, airtime, data, cable subscription here very easily and reliably</Text>
                        
                        <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{position:'relative',width:'100%',backgroundColor:'#fff',height:50,borderRadius:10,justifyContent:'center',alignItems:'center',marginTop:30}} >
                            <Text style={{fontFamily:'Roboto-Bold',fontSize:15,color:'#2D97DA'}} >Get Started</Text>

                        </TouchableOpacity>

                    </View>

                </View>    

            </LinearGradient>
        </View>
    );

}

export default Welcome

const styles = StyleSheet.create({})