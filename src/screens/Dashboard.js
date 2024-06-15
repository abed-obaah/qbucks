import React, { useState, useEffect } from 'react';
import {Text,View,StyleSheet,Modal,Image,TouchableOpacity,StatusBar,ScrollView,TextInput, Touchable, FlatList} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome'
import {dummyData} from '../constants'
import { ProfitIndicator,ActionCenter } from '../components'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Dashboard = () =>{
    const [walletValue, setWalletValue] = useState(0.00); // Initial wallet value
    const [inputValue, setInputValue] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [TransferModalVisible, setTransferModalVisible] = useState(false);
    const [WithdrawModalVisible, setWithdrawModalVisible] = useState(false);
    const [transactionData, setTransactionData] = useState([]);
    const [transferPhoneNumber, setTransferPhoneNumber] = useState('');
    const [transferAmount, setTransferAmount] = useState('');

    useEffect(() => {
        loadWalletFromStorage();
      }, []);
    
      const loadWalletFromStorage = async () => {
        try {
          const value = await AsyncStorage.getItem('walletValue');
          if (value !== null) {
            const { walletValue, expirationTime } = JSON.parse(value);
            if (Date.now() < expirationTime) {
              setWalletValue(walletValue);
            } else {
              setWalletValue(0); // Wallet expired, reset value
            }
          }
        } catch (error) {
          console.error('Error loading wallet from AsyncStorage:', error);
        }
      };
    
      const saveWalletToStorage = async (value) => {
        try {
          const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days expiration time
          const walletData = { walletValue: value, expirationTime };
          await AsyncStorage.setItem('walletValue', JSON.stringify(walletData));
        } catch (error) {
          console.error('Error saving wallet to AsyncStorage:', error);
        }
      };
    
      const addToWallet = () => {
        if (inputValue !== '') {
          const amountToAdd = parseFloat(inputValue);
          const updatedValue = walletValue + amountToAdd;
          setWalletValue(updatedValue);
          setInputValue('');
          setModalVisible(false);
          saveWalletToStorage(updatedValue);
        }
      };

      useEffect(() => {
        // Make a GET request using Axios
        axios.get('http://bankapi.veegil.com/transactions')
          .then(response => {
            // Log the received data to the console
            console.log('Received Data:', response.data.data);
            setTransactionData(response.data.data);
          })
          .catch(error => {
            // Log any errors if the request fails
            console.error('Error fetching data:', error);
          });
      }, []);

      const formatDate = dateString => {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };

      const transferToPhoneNumber = async () => {
        try {
          const transferData = {
            phoneNumber: transferPhoneNumber,
            amount: parseFloat(transferAmount)
          };
    
          const response = await axios.post('http://bankapi.veegil.com/accounts/transfer', transferData);
          console.log('Transfer successful:', response.data);
    
          setTransferPhoneNumber('');
          setTransferAmount('');
          setTransferModalVisible(false);
        } catch (error) {
          console.error('Error during transfer:', error);
        }
      };
      const withdrawToPhoneNumber = async () => {
        try {
          const transferData = {
            phoneNumber: transferPhoneNumber,
            amount: parseFloat(transferAmount)
          };
    
          const response = await axios.post('http://bankapi.veegil.com/accounts//withdraw`', transferData);
          console.log('Transfer successful:', response.data);
    
          setTransferPhoneNumber('');
          setTransferAmount('');
          setTransferModalVisible(false);
        } catch (error) {
          console.error('Error during transfer:', error);
        }
      };


    return (
        
        <View style={{flex:1}} >
            
            {/* Statusbar */}
            <StatusBar barStyle='light-content' translucent={true} backgroundColor='transparent' />
            {/* Header section */}
            <LinearGradient start={{x:0.0,y:0.4}} end={{x:0.5,y:1.0}} location={[0,1]} colors={['#2D97DE','#2249AD']} style={{flex:1.2,flexDirection:'column'}} >
                <View style={{flexDirection:'column',marginTop:hp('10%'),paddingHorizontal:'5%'}} >
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'}} >
                    {/* Welcome message and name */}
                    <View style={{flexDirection:'column'}} >
                        <Text style={{fontFamily:'Roboto-Regular',fontSize:16,color:'#fff'}} >Welcome Back</Text>
                        <Text style={{fontFamily:'Roboto-Medium',color:'#fff',fontSize:22}} >Abed</Text>
                    </View>

                    {/* Bell icon and profile pic */}
                    <View style={{flexDirection:'row',alignItems:'center'}} >
                        <Icon name='bell' size={30} color="#fff" />
                        <Image source={require('../assets/images/avatar.jpeg')} resizeMode='cover' style={{width:40,height:40,borderRadius:20,marginLeft:15}} />
                    </View>
                </View>

                
                {/* amount  */}
                <View style={{flexDirection:'row',marginTop:25,justifyContent:'space-between',alignItems:'center'}} >
                        {/* Amount */}
                        <View style={{flexDirection:'column'}} >
                            {/* <Text style={{color:'#fff',fontSize:28,fontFamily:'Roboto-Bold'}} >$32,7456.68</Text> */}
                            <Text style={{ color: '#fff', fontSize: 28, fontFamily: 'Roboto-Bold' }}>
                                N{walletValue.toFixed(2)}
                            </Text>
                            <Text style={{color:'rgba(255,255,255,0.3)',fontFamily:'Roboto-Regular-Italic',fontSize:14}} >Updated 2 mins ago</Text>
                        </View>
                        
                        {/* profit loss indicator */}
                        <ProfitIndicator type="I" percentage_change={dummyData.portfolio.changes} />            
                </View>
            </View>

            </LinearGradient>
            
            {/* Body section */}
            <View style={{flex:2.5,backgroundColor:'#fff',paddingHorizontal:wp('5%')}} >
                {/* Action Center */}
                <View style={{flexDirection:'row',backgroundColor:'#fff',height:hp('13%'),width:'100%',alignItems:'center',justifyContent:'space-around',borderRadius:10,borderWidth:1,borderColor:'rgba(255,255,255,0.1)',elevation:10,shadowColor:'#000',shadowRadius:10,marginTop:-25}} >
                    <ActionCenter
                        img_src={require('../assets/icons/top-up.png')}
                        img_text="Fund"
                        onPress={() => setModalVisible(true)}
                    />

                    <ActionCenter img_src={require('../assets/icons/buy.png')}
                     img_text="Transfer" 
                     onPress={() => setTransferModalVisible(true)}
                     />

                    <ActionCenter img_src={require('../assets/icons/withdraw.png')} 
                    img_text="WithDraw" 
                    onPress={() => setWithdrawModalVisible(true)}
                    />

                </View>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
             >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                        <TextInput
                        value={inputValue}
                        onChangeText={text => setInputValue(text)}
                        keyboardType="numeric"
                        placeholder="Enter amount"
                        style={{ borderColor: 'gray', borderWidth: 1, marginVertical: 10, padding: 5 }}
                        />
                        <TouchableOpacity onPress={addToWallet} style={{ backgroundColor: 'blue', padding: 10 }}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Add to Wallet</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: 'red', padding: 10,marginTop:10 }}>
                             <Text style={{ color: '#fff', textAlign: 'center' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>

                <Modal transparent visible={TransferModalVisible}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.successText}>Transfer!</Text>
              <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                    <TextInput
                        value={transferPhoneNumber}
                        onChangeText={text => setTransferPhoneNumber(text)}
                        placeholder="Enter phone number"
                        style={{ borderColor: 'gray', borderWidth: 1, marginVertical: 10, padding: 5 }}
                    />
                    <TextInput
                        value={transferAmount}
                        onChangeText={text => setTransferAmount(text)}
                        keyboardType="numeric"
                        placeholder="Enter amount"
                        style={{ borderColor: 'gray', borderWidth: 1, marginVertical: 10, padding: 5 }}
                    />
                    </View>

              <TouchableOpacity onPress={transferToPhoneNumber} style={{position:'relative',width:'100%',backgroundColor:'#6488EA',height:50,borderRadius:10,justifyContent:'center',alignItems:'center',marginTop:30}} >
                            <Text style={{fontFamily:'Roboto-Bold',fontSize:15,color:'#fff'}} >Transfer</Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => setTransferModalVisible(false)} style={{position:'relative',width:'100%',backgroundColor:'#E2A499',height:50,borderRadius:10,justifyContent:'center',alignItems:'center',marginTop:30}} >
                            <Text style={{fontFamily:'Roboto-Bold',fontSize:15,color:'#fff'}} >Close</Text>
            </TouchableOpacity>
            </View>
          </View>
                </Modal>

                 
                <Modal transparent visible={WithdrawModalVisible}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.successText}>You are about to make a WithDraw!</Text>
              <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                    <TextInput
                        value={transferPhoneNumber}
                        onChangeText={text => setTransferPhoneNumber(text)}
                        placeholder="Enter phone number"
                        style={{ borderColor: 'gray', borderWidth: 1, marginVertical: 10, padding: 5 }}
                    />
                    <TextInput
                        value={transferAmount}
                        onChangeText={text => setTransferAmount(text)}
                        keyboardType="numeric"
                        placeholder="Enter amount"
                        style={{ borderColor: 'gray', borderWidth: 1, marginVertical: 10, padding: 5 }}
                    />
                    </View>

                    <TouchableOpacity onPress={withdrawToPhoneNumber} style={{position:'relative',width:'100%',backgroundColor:'#6488EA',height:50,borderRadius:10,justifyContent:'center',alignItems:'center',marginTop:30}} >
                                    <Text style={{fontFamily:'Roboto-Bold',fontSize:15,color:'#fff'}} >Withdraw</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setWithdrawModalVisible(false)} style={{position:'relative',width:'100%',backgroundColor:'#E2A499',height:50,borderRadius:10,justifyContent:'center',alignItems:'center',marginTop:30}} >
                                    <Text style={{fontFamily:'Roboto-Bold',fontSize:15,color:'#fff'}} >Close</Text>
                    </TouchableOpacity>
            </View>
          </View>
                 </Modal>

                {/* My Assets */}
                <View style={{flexDirection:'column'}} >
                    {/* Text and button */}
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}} >
                        <Text style={{fontFamily:'Roboto-Medium',color:'#333',fontSize:22}} >Transactions</Text>
                        <TouchableOpacity onPress={()=>console.log('see all')} >
                            <Text style={{fontFamily:'Roboto-Medium',color:'#2249DA',fontSize:20}} >See All</Text>
                        </TouchableOpacity>
                    </View>


                    {/* Horizontal asset slider */} 
                     <FlatList
                        keyExtractor={(item)=>item.id}
                        data={transactionData}
                        renderItem={({item})=>(
                            <View style={{position:'relative',flexDirection:'column',height:hp('20%'),width:wp('65%'),borderWidth:1,borderColor:'#ddd',backgroundColor:'#fff',borderRadius:15,marginRight:10,marginTop:10}}  >
                                {/* Coin and symbol */}
                                <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingTop:20}} >
                                    <Image style={{height:25,width:25}} source={item.image} />
                                    <Text style={{fontFamily:'Roboto-Bold',color:'#333',fontSize:18}} > {item.phoneNumber} - Acc</Text>
                                </View>

                                {/* coin and price indicator */}
                                <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-around',alignItems:'center'}} >
                                    <ProfitIndicator type={item.type} percentage_change={item.changes} />
                                </View>

                            </View>
                        )}
                        horizontal={true}
                     />
                </View>

                {/* History */}
                <View style={{flex:1,flexDirection:'column'}} >
                   
                    <Text style={{fontFamily:'Roboto-Bold',fontSize:22,color:'#333'}} >History</Text>

                    {/* coin list */}
                    <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={transactionData}
                    renderItem={({ item }) => (
                    <View style={{flexDirection:'row',height:hp('10%'),width:'100%',borderWidth:1,borderColor:'#ddd',borderRadius:15,justifyContent:'space-between',paddingRight:10,marginBottom:10}}>
                    <View style={{flexDirection:'row',alignItems:'center'}} >
                         <View style={{flexDirection:'column',justifyContent:'flex-start',marginLeft:10}} >
                            <Text style={{fontFamily:'Roboto-Medium',color:'#333',fontSize:20}} >{item.phoneNumber}</Text>
                            <Text>{formatDate(item.created)}</Text>
                        </View>
                        </View>


                        <View style={{flexDirection:'column',backgroundColor:'#fff',alignContent:'center',justifyContent:'center'}} >
                                                {/* price */}
                                                <Text style={{fontFamily:'Roboto-Medium',fontSize:14,color:'#333'}} >${item.amount}</Text>

                                                {/* indicator */}
                                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
                                                    <Text style={{color: item.type =="credit" ? 'green':'red',fontFamily:'Roboto-Bold',fontSize:12}} >{item.type}</Text>
                                                    <Icon name={item.type == "credit" ? 'chevron-circle-up':'chevron-circle-down'} color={item.type == "credit" ? 'green':'red'} />
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

export default Dashboard

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '100%',
      height:'50%',
      backgroundColor: 'white',
      paddingHorizontal: 30,
      paddingVertical: 20,
      borderRadius: 20,
      elevation: 10,
      marginTop:'100%'
    },
    bankItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    cancelButton: {
      marginTop: 10,
      alignItems: 'center',
    },
    remarkNote: {
      color: 'gray',
      fontSize: 12,
      marginBottom: 5,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginBottom: 5,
    },
    successText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
  });