import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,StatusBar,TouchableOpacity,FlatList,Image,TextInput} from 'react-native'
import { dummyData } from '../constants';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome'
import { ProfitIndicator } from '../components';
import axios from 'axios';


const Search =({navigation})=>{
    const [accountData, setAccountData] = useState([]);
    const [userData, setUserData] = useState([]);


    useEffect(() => {
        //  a GET request to fetch accounts data
        axios.get('http://bankapi.veegil.com/accounts/list')
          .then(response => {
            // received accounts data into state
            setAccountData(response.data.data);
          })
          .catch(error => {
            // Log any errors if the request fails
            console.error('Error fetching account data:', error);
          });
    
        //a GET request to fetch user data
        axios.get('http://bankapi.veegil.com/auth/users')
          .then(response => {
            // Set the received user data into state
            setUserData(response.data.data);
          })
          .catch(error => {
            // Log any errors if the request fails
            console.error('Error fetching user data:', error);
          });
      }, []);
      const formatDate = dateString => {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };

    return(
        
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <StatusBar barStyle='dark-content' translucent={true} />
            <View style={{flex:1,flexDirection:'column'}} >
                {/* Backbutton with header */}
                <View style={{flex:1,backgroundColor:'#fff',flexDirection:'row',justifyContent:"flex-start",alignItems:'center'}} >
                    {/* backbutton */}
                    <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')} >
                        <Icon name="arrow-left" size={23} color="#333" />
                    </TouchableOpacity>

                    {/* header Text */}
                    <Text style={{width:'80%',textAlign:'center',fontFamily:'Roboto-Bold',fontSize:18,color:'#333'}} >History</Text>
                </View>


                {/* search bar */}
                <View style={{flex:0.5,justifyContent:'flex-start',backgroundColor:'#fff',paddingHorizontal:'2%'}} >
                    <View style={{flexDirection:'row',borderWidth:1,borderColor:'#999',borderRadius:20,height:50,width:'100%',justifyContent:'flex-start',alignItems:'center',paddingLeft:20}} >
                        <Icon name='search' color='#ddd' size={22} />
                        <TextInput placeholder='Search' placeholderTextColor="#999" />
                    </View>
                </View>


                {/* horizontal scroll section */}
                <View style={{flex:1.5,backgroundColor:'#fff',paddingHorizontal:'2%',marginBottom:10}} >
                            <Text>User Accounts</Text>
                    <FlatList
                        keyExtractor={(item)=>item.id}
                        data={userData}
                        renderItem={({item})=>(
                            <View style={{position:'relative',flexDirection:'column',height:hp('20%'),width:wp('65%'),borderWidth:1,borderColor:'#ddd',backgroundColor:'#fff',borderRadius:15,marginRight:10,marginTop:10,marginBottom:10}}  >
                                {/* Coin and symbol */}
                                <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingTop:20}} >
                                   
                                    <Text style={{fontFamily:'Roboto-Bold',color:'#333',fontSize:18}} >Account Number</Text>
                                </View>


                                {/* coin and price indicator */}
                                <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-around',alignItems:'center'}} >
                                    {/* Coin Price */}

                                    <View style={{flexDirection:'column'}} >
                                        <Text style={{fontFamily:'Roboto-Bold',color:'#333',fontSize:20}} >{item.phoneNumber}</Text>
                                    </View>

                                    {/* indicator */}
                                    <ProfitIndicator type={item.type} percentage_change={item.changes} />

                                </View>

                            </View>
                        )}
                        horizontal={true}
                     />

                </View>

                {/* vertical scroll section */}
                <View style={{flex:4,backgroundColor:'#fff',paddingHorizontal:'2%',marginTop:10}} >
                
                 <FlatList
                        keyExtractor={(item) => item.id}
                        data={accountData}
                    renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', height: hp('12%'), width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 15, justifyContent: 'space-between', paddingRight: 10, marginBottom: 15 }}>
           
                    <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:10 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <Text style={{ fontFamily: 'Roboto-Medium', color: '#333', fontSize: 20 }}>{item.phoneNumber}</Text>
                        <Text>{formatDate(item.created)}</Text>
                    </View>
                    </View>
          </View>
        )}
      />

                </View>

            </View>
            
            
        </View>
    

    );
}

export default Search

const styles = StyleSheet.create({
        
})