import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Bubbles } from 'react-native-loader'


export const Info = ({ latitude, longitude, error, adress, weather }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Широта: {Math.floor(latitude * 100) / 100}</Text>
      <Text style={styles.text}>Долгота: {Math.floor(longitude * 100) / 100}</Text>
      {error ? <Text style={styles.error}>Error: {error}</Text> : null}
      {adress ? <Text style={styles.text}>Адрес: {adress}</Text> : <Bubbles size={10} color="orange" />}
      {weather ? <Text style={styles.text}>Температура: {weather} &#xb0;C</Text> : <Bubbles size={10} color="orange" />}
    </View>
)
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'blue',
      paddingBottom: 10
    },

    text: {
      color: 'orange'
    },

    error: {
      color: 'red'
    }
})