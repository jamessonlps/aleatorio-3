import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";

import LoadingCar from "../../assets/loading_car.json";

import { Container } from "./styles";


export function LoadingAnimated() {
  const animation = useRef<LottieView | null>(null);

  useEffect(() => {
    animation.current?.play()
  }, [])

  return (
    <Container>
      <LottieView
        source={LoadingCar}
        autoPlay
        loop
        ref={animation}
        style={{ height: 180 }}
        resizeMode="contain"
      />
    </Container>
  )
}