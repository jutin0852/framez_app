import { clsx } from "clsx";
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  onPress?: (event: GestureResponderEvent) => void;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  onPress,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={clsx("py-4", className)}
      onPress={onPress}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}
