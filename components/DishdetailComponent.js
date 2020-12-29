import React, { Component } from "react";
import {
	Text,
	View,
	ScrollView,
	FlatList,
	Modal,
	StyleSheet,
	Button,
	Alert,
	PanResponder,
} from "react-native";
import { Rating, AirbnbRating, Input, Card, Icon } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import { postFavorite } from "../redux/ActionCreators";
import { postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		favorites: state.favorites,
	};
};

const mapDispatchToProps = (dispatch) => ({
	postFavorite: (dishId) => dispatch(postFavorite(dishId)),
	postComment: (dishId, rating, author, comment) =>
		dispatch(postComment(dishId, rating, author, comment)),
});

function RenderComments(props) {
	const comments = props.comments;

	const renderCommentItem = ({ item, index }) => {
		return (
			<View key={index} style={{ margin: 10 }}>
				<Text style={{ fontSize: 14 }}>{item.comment}</Text>
				<Rating
					imageSize={15}
					readonly
					startingValue={item.rating}
					style={styles.leftContainer}
				/>
				<Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
				<Text style={{ fontSize: 12 }}>{"-- " + item.author + ", " + item.date} </Text>
			</View>
		);
	};
	return (
		<Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
			<Card>
				<Card.Title>Comments</Card.Title>
				<FlatList
					data={comments}
					renderItem={renderCommentItem}
					keyExtractor={(item) => item.id.toString()}
				/>
			</Card>
		</Animatable.View>
	);
}

function RenderDish(props) {
	const dish = props.dish;

	handleViewRef = (ref) => (this.view = ref);

	const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
		if (dx < -200) return true;
		else return false;
	};

	const recognizeComment = ({ moveX, moveY, dx, dy }) => {
		if (dx < 200) return true;
		else return false;
	};

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: (e, gestureState) => {
			return true;
		},
		onPanResponderGrant: () => {
			this.view
				.rubberBand(1000)
				.then((endState) => console.log(endState.finished ? "finished" : "cancelled"));
		},
		onPanResponderEnd: (e, gestureState) => {
			console.log("pan responder end", gestureState);

			if (recognizeDrag(gestureState)) {
				Alert.alert(
					"Add Favorite",
					"Are you sure you wish to add " + dish.name + " to favorite?",
					[
						{
							text: "Cancel",
							onPress: () => console.log("Cancel Pressed"),
							style: "cancel",
						},
						{
							text: "OK",
							onPress: () => {
								props.favorite ? console.log("Already favorite") : props.onPress();
							},
						},
					],
					{ cancelable: false }
				);
			}
			if (recognizeComment(gestureState)) {
				props.onPress1();
			}

			return true;
		},
	});

	if (dish != null) {
		return (
			<Animatable.View
				animation="fadeInDown"
				duration={2000}
				delay={1000}
				ref={this.handleViewRef}
				{...panResponder.panHandlers}
			>
				<Card>
					<Card.Title>{dish.name}</Card.Title>
					<Card.Divider />
					<Image
						source={{ uri: baseUrl + dish.image }}
						style={{
							width: 200,
							height: 200,
						}}
					/>
					<Text style={{ margin: 10 }}>{dish.description}</Text>
					<Icon
						raised
						reverse
						name={props.favorite ? "heart" : "heart-o"}
						type="font-awesome"
						color="#f50"
						onPress={() =>
							props.favorite ? console.log("Already favorite") : props.onPress()
						}
					/>
					<Icon
						raised
						reverse
						name="pencil"
						type="font-awesome"
						color="#512DA8"
						onPress={() => props.onPress1()}
					/>
				</Card>
			</Animatable.View>
		);
	} else {
		return <View></View>;
	}
}

class Dishdetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dishes: DISHES,
			comments: COMMENTS,
			comment: "",
			rating: 5,
			author: "",
			favorites: [],
			showModal: false,
		};
	}

	toggleModal() {
		this.setState({ showModal: !this.state.showModal });
	}

	handleComment() {
		this.props.postComment(
			this.props.route.params.dishId,
			this.state.rating,
			this.state.author,
			this.state.comment
		);
		this.toggleModal();
	}

	markFavorite(dishId) {
		this.props.postFavorite(dishId);
	}

	render() {
		const dishId = this.props.route.params.dishId;
		return (
			<ScrollView>
				<RenderDish
					dish={this.props.dishes.dishes[+dishId]}
					favorite={this.props.favorites.some((el) => el === dishId)}
					onPress={() => this.markFavorite(dishId)}
					onPress1={() => this.handleComment(dishId)}
				/>
				<RenderComments
					comments={this.props.comments.comments.filter(
						(comment) => comment.dishId === dishId
					)}
				/>
				<Modal
					animationType={"slide"}
					transparent={false}
					visible={this.state.showModal}
					onDismiss={() => this.toggleModal()}
					onRequestClose={() => this.toggleModal()}
				>
					<View style={styles.formRow}>
						<Rating
							showRating
							style={{ paddingVertical: 10 }}
							style={styles.formItem}
							startingValue={this.state.rating}
							onTintColor="#512DA8"
							onValueChange={(value) => this.setState({ rating: value })}
						/>
					</View>
					<View style={styles.formRow}>
						<Input
							placeholder="Author"
							leftIcon={{ type: "font-awesome", name: "user" }}
							onChangeText={(value) => this.setState({ author: value })}
						/>
					</View>

					<View style={styles.formRow}>
						<Input
							placeholder="Comment"
							leftIcon={{ type: "font-awesome", name: "comment" }}
							onChangeText={(value) => this.setState({ comment: value })}
						/>
					</View>
					<Button
						onPress={() => {
							this.handleComment();
						}}
						color="#512DA8"
						title="Submit"
					/>
					<Button
						onPress={() => {
							this.toggleModal();
						}}
						color="#808080"
						title="Close"
					/>
				</Modal>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	formRow: {
		alignItems: "center",
		justifyContent: "center",
		flex: 0,
		flexDirection: "row",
		margin: 20,
	},
	formLabel: {
		fontSize: 18,
		flex: 2,
	},
	formItem: {
		flex: 1,
	},
	modal: {
		justifyContent: "center",
		margin: 20,
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		backgroundColor: "#512DA8",
		textAlign: "center",
		color: "white",
		marginBottom: 20,
	},
	modalText: {
		fontSize: 18,
		margin: 10,
	},
	leftContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-start",
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
