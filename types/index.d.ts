import {
  ImageSourcePropType,
  KeyboardType,
  TextInputProps,
} from 'react-native';

interface ITabIconProp {
  icon: ImageSourcePropType | undefined;
  focused: boolean;
  name: string;
  color: string;
}

interface ICustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles?: string;
  isLoading?: boolean;
}

interface IFormFieldProps extends TextInputProps {
  title: string;
  value: string | undefined;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: StyleProp<ViewStyle | TextStyle>;
  keyboardType?: KeyboardType;
}
