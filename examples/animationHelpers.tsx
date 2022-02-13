import { Button, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

const AnimationHelpers = () => {
	const repeatRotation = useSharedValue(0);
	const sequenceRotation = useSharedValue(0);

	const repeatAnimatedStyles = useAnimatedStyle(() => ({
		transform: [{ rotateZ: `${repeatRotation.value}deg` }]
	}));

	const sequenceAnimatedStyles = useAnimatedStyle(() => ({
		transform: [{ rotateZ: `${sequenceRotation.value}deg` }]
	}));

	const onMoveWithRepeat = () => {
		repeatRotation.value = withRepeat(withTiming(80), 9, true);
	};

	const onMoveWithSequence = () => {
		sequenceRotation.value = withSequence(
			withTiming(-30, { duration: 500 }),
			withRepeat(withTiming(80, { duration: 500 }), 6, true),
			withTiming(0, { duration: 500 })
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.block}>
				<Animated.View style={[styles.square, repeatAnimatedStyles]} />
				<Button onPress={onMoveWithRepeat} title="Move withRepeat" />
			</View>
			<View style={styles.block}>
				<Animated.View style={[styles.square, sequenceAnimatedStyles]} />
				<Button onPress={onMoveWithSequence} title="Move withSequence" />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	square: {
		width: 100,
		height: 100,
		borderRadius: 20,
		backgroundColor: 'blue'
	},
	block: {
		padding: 30,
		borderWidth: 4,
		borderColor: '#000000',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default AnimationHelpers;
