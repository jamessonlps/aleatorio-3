import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { PasswordInput } from "../../../components/InputPassword";
import { AppNavigatorRoutesProps } from "../../../routes/app.stack.routes";
import { api } from "../../../services/api";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !confirmPassword) {
      return Alert.alert("Erro", "Senha e a confirmação da senha são obrigatórias");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Erro", "As senhas não coincidem")
    }

    await api.post("/users", {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password,
    })
      .then(() => {
        navigation.navigate("Confirmation", {
          nextScreenRoute: "SignIn",
          message: `Agora é só fazer login\ne aproveitar`,
          title: "Conta criada!"
        })
      })
      .catch(() => {
        Alert.alert("Erro", "Não foi possível completar o seu cadastro")
      })

  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />

            <Steps>
              <Bullet />
              <Bullet />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua {"\n"}conta.
          </Title>
          <Subtitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil.
          </Subtitle>

          <Form>
            <FormTitle>
              2. Senha
            </FormTitle>

            <PasswordInput
              icon="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              icon="lock"
              placeholder="Confirme a senha"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />

          </Form>

          <Button
            color={theme.colors.success}
            title="Cadastrar"
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}