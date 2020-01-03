import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import yelp from '../api/Yelp'
import ResultsList from '../components/ResultsList'

export default class SearchScreen extends Component {
    state = {
        term: '',
        results: [],
        error: ''
    }
    componentDidMount() {
        this.searchApi('pasta')
    }
    searchApi = async (term) => {
        try {
            const response = await yelp.get('/search', {
                params: {
                    term,
                    limit: 50,
                    location: 'NY'
                }
            })
            this.setState({ results: response.data.businesses })
        }
        catch (err) {
            this.setState({ error: 'Something went Wrong!' })
            console.log('error')
        }
    }
    filterResultsByPrice(price) {
        return this.state.results.filter(result => result.price === price)
    }
    render() {
        return (
            <>
                <View style={styles.searchBar}>
                    <Icon
                        name='md-search'
                        style={styles.searchIcon}
                    />
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={this.state.term}
                        onChangeText={newTerm => this.setState({ term: newTerm })}
                        onEndEditing={() => this.searchApi(this.state.term)}
                        placeholder='restaurant name'
                        style={styles.textInput}
                    />
                </View>
                {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}
                <ScrollView style={{ marginTop: 10 }}>
                    <ResultsList
                        title='Cost Effect'
                        results={this.filterResultsByPrice('$')}
                    />
                    <ResultsList
                        title='Bit Pricier'
                        results={this.filterResultsByPrice('$$')}
                    />
                    <ResultsList
                        title='Bit Spender'
                        results={this.filterResultsByPrice('$$$')}
                    />
                </ScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 15,
        marginHorizontal: 15,
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: '#e5e5e5'
    },
    searchIcon: {
        fontSize: 30,
        alignSelf: 'center',
        marginHorizontal: 15
    },
    textInput: {
        flex: 1,
        fontSize: 16
    },
    error: {
        marginLeft: 15,
        color: '#8d1517'
    }
})