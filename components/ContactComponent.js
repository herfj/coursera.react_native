import React, { Component } from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";
import * as Animatable from "react-native-animatable";

function RenderCard() {
	return (
		<Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
			<Card>
				<Card.Title>Contact Information</Card.Title>
				<Text style={{ margin: 10 }}>
					121, Clear Water Bay Road {"\n"}Clear Water Bay, Kowloon
					{"\n"}HONG KONG {"\n"}Tel: +852 1234 5678 {"\n"}Fax: +852 8765 4321 {"\n"}
					Email:confusion@food.net
				</Text>
			</Card>
		</Animatable.View>
	);
}

class ContactUs extends Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		title: "ContactUs",
	};

	render() {
		return <RenderCard />;
	}
}
export default ContactUs;
