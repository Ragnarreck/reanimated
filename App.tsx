import { LogBox } from 'react-native';
import AnimationHelpers from './examples/animationHelpers';
import BasicMovement from './examples/basicMovement';
import Gestures from './examples/gestures';

LogBox.ignoreLogs([
	'[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!',
]);

const App = () => {
	return (
		<>
			{/* <BasicMovement /> */}
			{/* <AnimationHelpers /> */}
			<Gestures />
		</>
	);
};

export default App;