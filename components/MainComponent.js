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
import Favorite from "./FavoriteComponent";
import { View, Platform, Text, ScrollView, Image, StyleSheet, ToastAndroid } from "react-native";
import { Icon } from "react-native-elements";
import SafeAreaView from "react-native-safe-area-view";
import { connect } from "react-redux";
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from "../redux/ActionCreators";
import Reservation from "./ReservationComponent";
import MyTabs from "./LoginComponent";
import NetInfo from "@react-native-community/netinfo";

const mapStateToProps = (state) => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		promotions: state.promotions,
		leaders: state.leaders,
	};
};

const mapDispatchToProps = (dispatch) => ({
	fetchDishes: () => dispatch(fetchDishes()),
	fetchComments: () => dispatch(fetchComments()),
	fetchPromos: () => dispatch(fetchPromos()),
	fetchLeaders: () => dispatch(fetchLeaders()),
});

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const ContactUsNavigator = createStackNavigator();
const AboutUsNavigator = createStackNavigator();
const ReservationNavigator = createStackNavigator();
const FavoriteNavigator = createStackNavigator();
const LoginNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();

const CustomDrawerContent = (props) => (
	<ScrollView>
		<SafeAreaView style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
			<View style={styles.drawerHeader}>
				<View style={{ flex: 1 }}>
					<Image source={require("./images/logo.png")} style={styles.drawerImage} />
				</View>
				<View style={{ flex: 2 }}>
					<Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
				</View>
			</View>
			<DrawerItemList {...props} />
		</SafeAreaView>
	</ScrollView>
);

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

function ReservationNavigatorScreen({ navigation }) {
	return (
		<ReservationNavigator.Navigator
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
			<ReservationNavigator.Screen
				name="Reserve Table"
				component={Reservation}
				options={{
					headerTitle: "Reserve Table",
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
		</ReservationNavigator.Navigator>
	);
}

function FavoriteNavigatorScreen({ navigation }) {
	return (
		<FavoriteNavigator.Navigator
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
			<FavoriteNavigator.Screen
				name="My Favorites"
				component={Favorite}
				options={{
					headerTitle: "My Favorites",
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
		</FavoriteNavigator.Navigator>
	);
}

function LoginNavigatorScreen({ navigation }) {
	return (
		<LoginNavigator.Navigator
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
			<LoginNavigator.Screen
				name="Login"
				component={MyTabs}
				options={{
					headerTitle: "Login",
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
		</LoginNavigator.Navigator>
	);
}

function MainNavigatorScreen() {
	return (
		<MainNavigator.Navigator
			initialRouteName="Home"
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			drawerStyle={{ backgroundColor: "#D1C4E9" }}
		>
			<MainNavigator.Screen
				name="Login"
				component={LoginNavigatorScreen}
				options={{
					drawerIcon: ({ tintColor, focused }) => (
						<Icon name="sign-in" type="font-awesome" size={24} color={tintColor} />
					),
				}}
			/>
			<MainNavigator.Screen
				name="Home"
				component={HomeNavigatorScreen}
				options={{
					drawerIcon: ({ tintColor, focused }) => (
						<Icon name="home" type="font-awesome" size={24} color={tintColor} />
					),
				}}
			/>
			<MainNavigator.Screen
				name="About Us"
				component={AboutUsNavigatorScreen}
				options={{
					drawerIcon: ({ tintColor, focused }) => (
						<Icon name="info-circle" type="font-awesome" size={24} color={tintColor} />
					),
				}}
			/>
			<MainNavigator.Screen
				name="Menu"
				component={MenuNavigatorScreen}
				options={{
					drawerIcon: ({ tintColor, focused }) => (
						<Icon name="list" type="font-awesome" size={24} color={tintColor} />
					),
				}}
			/>
			<MainNavigator.Screen
				name="Contact Us"
				component={ContactUsNavigatorScreen}
				options={{
					drawerIcon: ({ tintColor, focused }) => (
						<Icon name="address-card" type="font-awesome" size={24} color={tintColor} />
					),
				}}
			/>
			<MainNavigator.Screen
				name="Reserve Table"
				component={ReservationNavigatorScreen}
				options={{
					drawerIcon: ({ tintColor, focused }) => (
						<Icon name="cutlery" type="font-awesome" size={24} color={tintColor} />
					),
				}}
			/>
			<MainNavigator.Screen
				name="My Favorites"
				component={FavoriteNavigatorScreen}
				options={{
					drawerIcon: ({ tintColor, focused }) => (
						<Icon name="heart" type="font-awesome" size={24} color={tintColor} />
					),
				}}
			/>
		</MainNavigator.Navigator>
	);
}

class Main extends Component {
	componentDidMount() {
		this.props.fetchDishes();
		this.props.fetchComments();
		this.props.fetchPromos();
		this.props.fetchLeaders();

		NetInfo.fetch().then((connectionInfo) => {
			ToastAndroid.show(
				"Initial Network Connectivity Type: " +
					connectionInfo.type +
					", effectiveType: " +
					connectionInfo.effectiveType,
				ToastAndroid.LONG
			);
		});

		NetInfo.addEventListener((state) => {
			this.handleConnectivityChange(state);
		});
	}

	componentWillUnmount() {
		// Subscribe
		const unsubscribe = NetInfo.addEventListener((state) => {
			console.log("Connection type", state.type);
			console.log("Is connected?", state.isConnected);
		});

		// Unsubscribe
		unsubscribe();
	}

	handleConnectivityChange = (connectionInfo) => {
		switch (connectionInfo.type) {
			case "none":
				ToastAndroid.show("You are now offline!", ToastAndroid.LONG);
				break;
			case "wifi":
				ToastAndroid.show("You are now connected to WiFi!", ToastAndroid.LONG);
				break;
			case "cellular":
				ToastAndroid.show("You are now connected to Cellular!", ToastAndroid.LONG);
				break;
			case "unknown":
				ToastAndroid.show("You now have unknown connection!", ToastAndroid.LONG);
				break;
			default:
				break;
		}
	};
	render() {
		return (
			<NavigationContainer>
				<MainNavigatorScreen />
			</NavigationContainer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	drawerHeader: {
		backgroundColor: "#512DA8",
		height: 140,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		flexDirection: "row",
	},
	drawerHeaderText: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
	},
	drawerImage: {
		margin: 10,
		width: 80,
		height: 60,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
