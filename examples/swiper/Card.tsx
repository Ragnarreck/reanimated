import React, { useEffect } from 'react';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';

const { width: windowWidth, height } = Dimensions.get('window');

const aspectRatio = 722 / 368;
const CARD_WIDTH = windowWidth - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 250;
const sideWidth = (windowWidth + CARD_WIDTH) / 1.5;
const SNAP_POINTS = [-sideWidth, 0, sideWidth];

interface Props {
	index: number;
	image: ImageSourcePropType;
	shuffleBack: Animated.SharedValue<boolean>;
}

const Card = ({ image, index, shuffleBack }: Props) => {
	const currentTranslationX = useSharedValue(0);
	const currentTranslationY = useSharedValue(-height);
	const rotatedCardZ = Math.random() * 20 - 10;
	const currentRotateZ = useSharedValue(0);
	const scale = useSharedValue(1);

	useEffect(() => {
		const delay = (index + 1) * DURATION;
		currentTranslationY.value = withDelay(
			delay,
			withTiming(0,  { 
				duration: DURATION, 
				easing: Easing.inOut(Easing.ease )
			}, (isSuccess) => {
				if (isSuccess) {
					currentRotateZ.value = withDelay(
						delay,
						withTiming(rotatedCardZ, { 
							duration: DURATION, 
							easing: Easing.inOut(Easing.ease )
						})
					);
				}
			})
		);
	}, [index, currentTranslationY, currentRotateZ]);

	useAnimatedReaction(
		() => shuffleBack.value,
		() => {
			if (shuffleBack.value) {
				const delay = 150 * index;
				currentTranslationX.value = withDelay(delay, withSpring(0));
				currentRotateZ.value = withDelay(delay, withSpring(rotatedCardZ, {}, () => {
					shuffleBack.value = false;
				}));
			}
		}
	);

	const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number, y: number }>({
		onStart: (_, ctx) => {
			ctx.x = currentTranslationX.value;
			ctx.y = currentTranslationY.value;
			scale.value = withTiming(1.1, { easing: Easing.inOut(Easing.ease) });
		},
		onActive: ({ translationX, translationY }, ctx) => {
			currentTranslationX.value = ctx.x + translationX;
			currentTranslationY.value = ctx.y + translationY;
		},
		onEnd: ({ velocityX, velocityY }) => {
			const destination = snapPoint(currentTranslationX.value, velocityX, SNAP_POINTS);
			currentTranslationX.value = withSpring(destination, { velocity: velocityX });
			currentTranslationY.value = withSpring(0, { velocity: velocityY });
			scale.value = withTiming(1, { easing: Easing.inOut(Easing.ease) }, () => {
				if (index === 0 && destination !== 0) {
					shuffleBack.value = true;
				}
			});
		}
	});

	const cardAnimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: currentTranslationX.value },
			{ translateY: currentTranslationY.value },
			{ rotateZ: `${currentRotateZ.value}deg`},
			{ scale: scale.value },
		]
	}));

	return (
		<View style={styles.container} pointerEvents='box-none'>
			<PanGestureHandler onGestureEvent={onGestureEvent}>
				<Animated.View style={[styles.card, cardAnimatedStyle]}>
					<Image
						source={image}
						resizeMode='contain'
						style={styles.image}
					/>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		backgroundColor: 'white',
		borderRadius: 10,
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
	},
	image: {
		width: IMAGE_WIDTH,
		height: IMAGE_WIDTH * aspectRatio,
	}
});

export default Card;