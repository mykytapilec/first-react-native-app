import React, { Component } from 'react'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'

export class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
        modalVisible: false
    }
  }

  setModalVisible(visible){
    this.setState({ modalVisible: visible })
  }

  getInfo(data){
    return `Время запроса: ${data.requestTime};
      Координаты: ${data.coordinate.latitude} / ${data.coordinate.longitude};
      Город: ${data.city}`
  }

  getModalInfo(data){
    return `Время запроса: 
      ${data.requestTime};
      Координаты: ${data.coordinate.latitude} / ${data.coordinate.longitude};
      Адрес: ${data.adress}; 
      Температура по адресу в момент запроса: ${data.weather} °C`
  }

  render() {
    const { modalVisible } = this.state
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.")
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>{this.getModalInfo(this.props)}</Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Назад</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>{this.getInfo(this.props)}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
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
    elevation: 5
  },
  openButton: {
    backgroundColor: "orange",
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})