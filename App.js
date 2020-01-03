import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SearchScreen from './SRC/screens/SearchScreen'
import SingleRestaurant from './SRC/screens/SingleRestaurant'

const stackNavigator = createStackNavigator({
  Search: SearchScreen,
  Rest_Details: SingleRestaurant
},
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      headerTitle: 'Restaurants App'
    }
  })

export default createAppContainer(stackNavigator)