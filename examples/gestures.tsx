import { StyleSheet, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming, BounceIn } from 'react-native-reanimated';

const startingPosition = 0;
const colors = {
	active: '#FEEF86',
	unactive: '#001972'
};

const Gestures = () => {
	const pressed = useSharedValue(false);
	const x = useSharedValue(startingPosition);
	const y = useSharedValue(startingPosition);

	const circleAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: withSpring(pressed.value ? colors.active : colors.unactive),
		transform: [{ translateX: x.value }, { translateY: y.value }],
	}));

	const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
		onStart: (event, ctx: any) => {
			pressed.value = true;
			ctx.startX = x.value;
			ctx.startY = y.value;
		},
		onActive: (event, ctx: any) => {
			x.value = ctx.startX + event.translationX;
			y.value = ctx.startY + event.translationY;
		},
		onEnd: () => {
			pressed.value = false;
		},
	});

	return (
		<View style={styles.container}>
			<PanGestureHandler onGestureEvent={onGestureEvent}>
				<Animated.View entering={BounceIn.duration(1000)} style={[styles.circle, circleAnimatedStyle]} />
			</PanGestureHandler>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	circle: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: 'blue'
	}
});

export default Gestures;
