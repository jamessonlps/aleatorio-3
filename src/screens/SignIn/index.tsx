import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import * as Yup from "yup";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/InputPassword";
import { useAuth } from "../../hooks/auth";
import { AppNavigatorRoutesProps } from "../../routes/app.stack.routes";
import { AppTabNavigatorRoutesProps } from "../../routes/app.tab.routes";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";

import {
  Container,
  Header,
  SubTitle,
  Title,
  Form,
  Footer,
} from "./styles";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const theme = useTheme();
  const { signIn } = useAuth();

  const appNavigation = useNavigation<AppTabNavigatorRoutesProps>()
  const authNavigation = useNavigation<AuthNavigatorRoutesProps>()

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup
          .string()
          .required("O email é obrigatório")
          .email("Insita um e-mail válido."),
        password: Yup
          .string()
          .required("A senha é obrigatória")
      })

      await schema.validate({ email, password })

      signIn({ email, password })
        .then(() => {
          appNavigation.navigate("HomeStack")
        })
        .catch(() => {
          Alert.alert("Error");
        })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("haha", error.message)
      }
      Alert.alert("Errou aí, doidão", "Melhor checar tudo aí de novo")
    }
  }

  function handleNewAccount() {
    authNavigation.navigate("SignUpFirstStep");
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>Estamos{"\n"}quase lá.</Title>
            <SubTitle>Faça seu login para começar{"\n"}uma experiência incrível.</SubTitle>
          </Header>

          <Form>
            <Input
              icon="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              placeholder="Senha"
              icon="lock"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Entrar"
              onPress={handleSignIn}
              loading={false}
              enabled={true}
            />
            <Button
              title="Criar conta gratuita"
              light
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              loading={false}
            />
          </Footer>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}