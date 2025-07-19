import { 
  Platform, 
  View, 
  Button, 
  Text, 
  ActionSheetIOS, 
  useWindowDimensions, 
} from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks';

export default function PlatformFeatures() {
  const { width } = useWindowDimensions();
  const { portrait } = useDeviceOrientation();

  const showActionSheet = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Option 1', 'Option 2'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) console.log('Option 1 selected');
          if (buttonIndex === 2) console.log('Option 2 selected');
        }
      );
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ marginBottom: 10 }}>
        Width: {width.toFixed(0)}, Orientation: {portrait ? 'Portrait' : 'Landscape'}
      </Text>

      {/* Show Action Sheet button on iOS */}
      {Platform.OS === 'ios' && <Button title="Show Action Sheet" onPress={showActionSheet} />}
    </View>
  );
}
