import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';
import JusticeImage from '../../assets/justice.png';
import ChariotImage from '../../assets/chariot.png';
import DeathImage from '../../assets/death.png';
import DevilImage from '../../assets/devil.png';
import SunImage from '../../assets/sun.png';
import TowerImage from '../../assets/tower.png';
import { useSharedValue } from 'react-native-reanimated';

const images = [
	JusticeImage,
	ChariotImage,
	DeathImage,
	DevilImage,
	SunImage,
	TowerImage,
];

const Swiper = () => {
	const shuffleBack = useSharedValue(false);

	return (
		<View style={styles.container} pointerEvents='box-none'>
			{images.map((item, index) => <Card key={`card${index}`} image={item} index={index} shuffleBack={shuffleBack} />)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'lightblue',
	},
});

export default Swiper;