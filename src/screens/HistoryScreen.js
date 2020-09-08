import React, { Component } from 'react'
import {View, Text, StyleSheet, AsyncStorage, ScrollView} from 'react-native'

import { Table } from '../components/Table'


class HistoryScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('storageData');
          if (value !== null) {
            const data = JSON.parse(value)
            this.setState({ data }) 
          }
        } catch (error) {
            console.log(error)
        }
    }

    render(){
        const { data } = this.state
        return (
            <ScrollView>
                <View style={styles.conrainer}>
                    <View style={styles.header}>
                        <Text style={styles.text}>История запросов</Text> 
                    </View> 

                    {data.map(item => ( 

                        <Table 
                            adress={item.adress}
                            coordinate={item.coordinate}
                            requestTime={item.requestTime}
                            weather={item.weather}
                            city={item.city}
                            key={item.key}
                        />

                    ))} 

                </View>
            </ScrollView>
        
        )
    }
}

const styles = StyleSheet.create({
    conrainer: {
        flexDirection: 'column',
    },

    header: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'blue',
        paddingBottom: 10,
    },

    text: {
        color: 'orange',
        fontSize: 16,
    }
})

export default HistoryScreen