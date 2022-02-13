import { Button, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const BasicMovement = () => {
	const offset = useSharedValue(0);

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{ translateX: withSpring(offset.value * 255) }]
	}));

	const onMove = () => {
		offset.value = Math.random();
	};

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.block, animatedStyles]} />
			<Button onPress={onMove} title="Move" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	block: {
		width: 100,
		height: 100,
		borderRadius: 20,
		backgroundColor: 'blue'
	}
});

export default BasicMovement;
