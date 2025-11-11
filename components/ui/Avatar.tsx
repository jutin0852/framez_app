import { getImageSrc } from "@/services/imageService";
import { clsx } from "clsx";
import { Image } from "expo-image";
import React from "react";

export default function Avatar({
  uri,
  className,
}: {
  uri: string;
  className?: string;
}) {
  return (
    <Image
      className={clsx("w-10 h-10 ", className)}
      source={getImageSrc(uri)}
      transition={100}
    />
  );
}
