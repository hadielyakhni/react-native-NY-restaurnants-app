import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

class ResultsList extends Component {
  renderSingleResult({ item }) {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Rest_Details', { restaurant: item })}
        activeOpacity={0.92}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: item.image_url }}
            style={styles.image}
          />
          <Text style={styles.name}>
            {item.name}
          </Text>
          <Text>
            {item.rating} Stars , {item.review_count} Reviews
        </Text>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    if (!this.props.results.length)
      return null
    return (
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.title}>
          {this.props.title}
        </Text>
        <FlatList
          horizontal
          data={this.props.results}
          keyExtractor={(result) => result.id}
          renderItem={this.renderSingleResult.bind(this)}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15
  },
  name: {
    fontWeight: 'bold'
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 12
  }
})

export default withNavigation(ResultsList)