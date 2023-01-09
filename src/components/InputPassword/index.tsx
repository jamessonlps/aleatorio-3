import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import {
  Container,
  IconContainer,
  InputText,
  PasswordVisibilityButton,
} from "./styles";


interface Props extends TextInputProps {
  icon: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({
  icon,
  value,
  ...rest
}: Props) {
  const [isFilled, setisFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const theme = useTheme();


  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setisFilled(!!value);
  }

  function handleChangeVisibilityPassword() {
    setIsVisible(prev => !prev);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={icon}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        secureTextEntry={isVisible}
        {...rest}
      />

      <PasswordVisibilityButton onPress={handleChangeVisibilityPassword}>
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />

        </IconContainer>
      </PasswordVisibilityButton>
    </Container>
  )
}