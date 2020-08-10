import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from "react-native";
import InputSpinner from "react-native-input-spinner";
import { Button } from "react-native-paper";
import { AsyncStorage } from 'react-native';
const items = [1,2,3,4,5,6,7,8]
export const MovieModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(1);
  const [user, setUser] = useState('')
  React.useEffect(()=>{
    AsyncStorage.getItem('user').then(user=>setUser(user))
  }, ([]))
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={{height:200, width:150}} source={{ uri: props.image }}></Image>
            <Text style={styles.modalText}>Select Your Tickets</Text>
            <InputSpinner
            max={8}
            min={1}
            step={1}
            colorMax={"#c32528"}
            colorMin={"#c32528"}
            color={'#c32528'}
            value={selectedValue}
            onChange={(num) => {
                console.log(num);
                setSelectedValue(num);
            }}
        />
         <Text style={styles.modalText, {marginTop:10, fontSize:18}}>Price: {`${props.price} X ${selectedValue} = $${props.price * selectedValue}`}</Text>
         <Button style={styles.checkButton} color="white" onPress={()=>console.log('add to api')} title={'Checkout'}> Checkout</Button>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#c32528" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.timeButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>{props.time}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom:30
  },
  openButton: {
    backgroundColor: "#c32528",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    height:40,
    marginTop:10
  },
  timeButton: {
    backgroundColor: "#c32528",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    height:35,
    width:120,
    fontSize:10,
    marginRight:10,
    alignSelf:'center'

  },
  checkButton: {
    backgroundColor: "#c32528",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop:30,
    fontSize: 12,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:18,
    fontFamily:'Helvetica', color:'black'
  }
});
