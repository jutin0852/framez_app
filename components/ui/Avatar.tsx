import { getImageSrc } from "@/services/imageService";
import { clsx } from "clsx";
import React from "react";
import { Image } from "react-native";

export default function Avatar({
  uri,
  className,
}: {
  uri: string | null;
  className?: string;
}) {
  return (
    <Image
      className={clsx("w-10 h-10 rounded-full ", className)}
      source={getImageSrc(uri)}
    />
  );
}
