import React from 'React';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class Hello extends React.Component {
    render() {
        return (
            <View>
                <Text style={styles.hello}>Hello From Hello.js</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    hello: {
        conlor:'#00FF00'
    }
})