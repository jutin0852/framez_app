import { clsx } from "clsx";
import { View, type ViewProps } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedView({
  className,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  // const backgroundColor = useThemeColor(
  //   { light: lightColor, dark: darkColor },
  //   "background"
  // );
  const inset = useSafeAreaInsets();

  return (
    <View
      className={clsx("flex-1 bg-[#FAFAFA]", className)}
      style={{ paddingTop: inset.top }}
      {...otherProps}
    />
  );
}
