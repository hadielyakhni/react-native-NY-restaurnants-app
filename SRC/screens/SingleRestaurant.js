import React, { Component } from 'react'
import { Image, View, Dimensions, StyleSheet, FlatList, Text } from 'react-native'
import yelp from '../api/Yelp'
import MapButton from '../components/MapButton';

export default class SingleRestaurant extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            headerTitle: params.restaurant.name
        }
    };
    constructor(props) {
        super(props)
        this.state = {
            results: [],
            restaurant: this.props.navigation.getParam('restaurant')
        }
    }
    componentDidMount() {
        this.searchApi()
    }
    searchApi = async () => {
        try {
            const response = await yelp.get(`/${this.state.restaurant.id}`)
            this.setState({ results: response.data.photos })
        }
        catch (err) {
            this.setState({ error: 'Something went Wrong!' })
        }
    }
    renderImages = (image) => {
        return (
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: image.item }}
                />
            </View>
        )
    }
    render() {
        return (
            <>
                <FlatList
                    style={{ borderRadius: 12, flex: 1, marginTop: 10 }}
                    contentContainerStyle={{ borderRadius: 12, alignItems: 'center' }}
                    data={this.state.results}
                    keyExtractor={(image) => image}
                    renderItem={this.renderImages}
                />
                <MapButton
                    latitude={this.state.restaurant.coordinates.latitude}
                    longitude={this.state.restaurant.coordinates.longitude}
                />
            </>
        )
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        height: 400,
        width: Dimensions.get('window').width - 40,
        marginVertical: 15
    },
    image: {
        flex: 1,
        width: null,
        borderRadius: 12
    }
})