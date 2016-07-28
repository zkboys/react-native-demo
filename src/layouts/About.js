import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class About extends Component {
	render() {
		const {router} = this.props;
		return (
			<View style={styles.container}>
				<Text>
					Welcome to React About!
				</Text>
				<TouchableOpacity onPress={()=> router.toComment()}>
					<Text> to Comment</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		flex: 1
	},
});

export const LayoutComponent = About;

export function mapStateToProps(state) {
	return {
	};
}