import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from "@react-navigation/drawer";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Home from "./HomeComponent";
import ContactUs from "./ContactComponent";
import AboutUs from "./AboutComponent";
import { View, Platform, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const ContactUsNavigator = createStackNavigator();
const AboutUsNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();

function HomeNavigatorScreen({ navigation }) {
	return (
		<HomeNavigator.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "#512DA8",
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					color: "#fff",
				},
			}}
		>
			<MenuNavigator.Screen
				name="Home"
				component={Home}
				options={{
					headerTitle: "Home",
					headerLeft: () => (
						<Icon
							containerStyle={{ marginLeft: 10 }}
							name="menu"
							size={24}
							color="white"
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				}}
			/>
		</HomeNavigator.Navigator>
	);
}

function MenuNavigatorScreen({ navigation }) {
	return (
		<MenuNavigator.Navigator
			initialRouteName="Menu"
			screenOptions={{
				headerStyle: {
					backgroundColor: "#512DA8",
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					color: "#fff",
				},
			}}
		>
			<MenuNavigator.Screen
				name="Menu"
				component={Menu}
				options={{
					headerLeft: () => (
						<Icon
							containerStyle={{ marginLeft: 10 }}
							name="menu"
							size={24}
							color="white"
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				}}
			/>
			<MenuNavigator.Screen
				name="Dishdetail"
				component={Dishdetail}
				options={{
					headerTitle: "Dish Detail",
				}}
			/>
		</MenuNavigator.Navigator>
	);
}

function ContactUsNavigatorScreen({ navigation }) {
	return (
		<ContactUsNavigator.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "#512DA8",
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					color: "#fff",
				},
			}}
		>
			<ContactUsNavigator.Screen
				name="Contact Us"
				component={ContactUs}
				options={{
					headerTitle: "Contact Information",
					headerLeft: () => (
						<Icon
							containerStyle={{ marginLeft: 10 }}
							name="menu"
							size={24}
							color="white"
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				}}
			/>
		</ContactUsNavigator.Navigator>
	);
}

function AboutUsNavigatorScreen({ navigation }) {
	return (
		<AboutUsNavigator.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "#512DA8",
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					color: "#fff",
				},
			}}
		>
			<AboutUsNavigator.Screen
				name="About Us"
				component={AboutUs}
				options={{
					headerTitle: "About Us",
					headerLeft: () => (
						<Icon
							containerStyle={{ marginLeft: 10 }}
							name="menu"
							size={24}
							color="white"
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				}}
			/>
		</AboutUsNavigator.Navigator>
	);
}

function MainNavigatorScreen() {
	return (
		<MainNavigator.Navigator
			initialRouteName="Home"
			drawerStyle={{ backgroundColor: "#D1C4E9" }}
		>
			<MainNavigator.Screen name="Home" component={HomeNavigatorScreen} />
			<MainNavigator.Screen name="About Us" component={AboutUsNavigatorScreen} />
			<MainNavigator.Screen name="Menu" component={MenuNavigatorScreen} />
			<MainNavigator.Screen name="Contact Us" component={ContactUsNavigatorScreen} />
		</MainNavigator.Navigator>
	);
}

class Main extends Component {
	render() {
		return (
			<NavigationContainer>
				<MainNavigatorScreen />
			</NavigationContainer>
		);
	}
}

export default Main;
