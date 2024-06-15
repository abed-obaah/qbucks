import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Pressable } from 'react-native';

export default function ImageButton({onPress, source, color}) {
  return (
    <Pressable onPress={onPress}>
        <Image source={ source } styles={{styles.imgIcon,{tintColor:color}}}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imgIcon:{
    width:30,
    height:30
  }
});