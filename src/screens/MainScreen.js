import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import moment from 'moment'

import { Info } from '../components/Info'

import { REACT_APP_WEATHER_API_KEY, REACT_YANDEX_API_KEY } from '../keys'


class MainScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            coordinate: {
                latitude: 0,
                longitude: 0,
            },
            latitudeDelta: 45,
            longitudeDelta: 45,
            error: null,
            city: null,
            adress: null,
            weather: null,
            requestTime: null,
            storageData: [] 
        }
    }
    
    componentDidMount(){
        // this.removeItemValue('storageData')
        this.retrieveData()
        this.getPosition().then(pos => {
            this.getWeather(pos.coords.latitude, pos.coords.longitude).then(data => {
                this.setState({
                    weather: `${Math.round(data.main.temp - 273)}` 
                })
            })
            this.getAdress(pos.coords.latitude, pos.coords.longitude).then(data => {
                this.setState({
                    adress: data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AddressLine,
                    city: data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName
                })
            })
        }).catch((err) => {
            console.error(err.message)
        })
    }

    getPosition(){
        return new Promise(resolve => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve(position)
                    this.setState({
                        coordinate: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        },
                        error: null,
                        requestTime: moment().format('MMMM Do YYYY, h:mm:ss a')
                    })
                    this.regionFrom(position.coords.latitude, position.coords.accuracy)
                },
                error => this.setState({ error: error.message }),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
              )
        })
    }

    getAdress(latitude, longitude){
       return new Promise ((resolve, reject) => {
            const api = `https://geocode-maps.yandex.ru/1.x/?apikey=${REACT_YANDEX_API_KEY}&format=json&geocode=${longitude},${latitude}`
            const request = new XMLHttpRequest()
            request.withCredentails = true
            request.open("GET", api, true)
            request.onload = () => (request.status === 200) ? resolve(JSON.parse(request.response)) : reject(Error(request.statusText))
            request.onerror = (err) => reject(err)
            request.send()
        });

    }

    getWeather(latitude, longitude){
        return new Promise ((resolve, reject) => {
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_WEATHER_API_KEY}`
             const request = new XMLHttpRequest()
             request.withCredentails = true
             request.open("GET", api, true)
             request.onload = () => (request.status === 200) ? resolve(JSON.parse(request.response)) : reject(Error(request.statusText))
             request.onerror = (err) => reject(err)
             request.send()
         });
    }

    regionFrom(lat, accuracy){
        const oneDegreeOfLongitudeInMeters = 111.32 * 1000
        const circumference = (40075 / 360) * 1000
    
        const latDelta = accuracy * (1 / (Math.cos(lat) * circumference))
        const lonDelta = (accuracy / oneDegreeOfLongitudeInMeters)
    
        this.setState({
            latitudeDelta: latDelta,
            longitudeDelta: lonDelta,
        })
    }

    storeData = async () => {
        try {
            const { coordinate, city, adress, weather, requestTime, storageData } = this.state
            if(adress && weather)
            storageData.push({
                coordinate,
                city,
                adress,
                weather,
                requestTime,
                key: Date.parse(new Date()).toString()
            })
          await AsyncStorage.setItem(
            'storageData',
            JSON.stringify(storageData)
          );
        } catch (error) {
            console.log(error)
        }
    }

    retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('storageData')
          if (value !== null) {
            const { storageData } = this.state
            const newData = JSON.parse(value)
            storageData.push(...newData)
            this.setState({ storageData })    
          }
        } catch (error) {
            console.log(error)
        }
    }

    removeItemValue = async(key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch(exception) {
            return false;
        }
    }

  
    render(){
        const { adress, weather } = this.state

        if(adress && weather){
            this.storeData()
        }

      return (
        <View style={styles.container}>
            <MapView 
                style={styles.map}
                region={{
                    latitude: this.state.coordinate.latitude,
                    longitude: this.state.coordinate.longitude,
                    latitudeDelta: this.state.latitudeDelta,
                    longitudeDelta: this.state.longitudeDelta,
                }}
            >
                <Marker coordinate={this.state.coordinate}  />
            </MapView>  
            <Info 
                style={styles.info}
                latitude={this.state.coordinate.latitude} 
                longitude={this.state.coordinate.longitude} 
                error={this.state.error}
                adress={this.state.adress}
                weather={this.state.weather}
            />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})
  
export default MainScreen
