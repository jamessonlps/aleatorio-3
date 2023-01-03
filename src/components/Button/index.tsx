import React from "react"
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";

import {
  Container,
  Title,
} from "./styles"


interface Props extends RectButtonProps {
  title: string;
  color?: string;
}

export function Button({ title, color, ...rest }: Props) {
  const theme = useTheme()

  return (
    <Container color={color ? color : theme.colors.main} {...rest} >
      <Title>{title}</Title>
    </Container>
  )
}