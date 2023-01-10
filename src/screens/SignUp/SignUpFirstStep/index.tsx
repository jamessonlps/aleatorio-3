import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import * as Yup from "yup";

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
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { AppNavigatorRoutesProps } from "../../../routes/stack.routes";

export function SignUpFirstStep() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup
          .string()
          .required("A CNH é obrigatória"),
        email: Yup
          .string()
          .email("Insira um e-mail válido")
          .required("O e-mail é obrigatório"),
        name: Yup
          .string()
          .required("Nome é obrigatório"),
      })

      const data = { name, email, driverLicense };
      await schema.validate(data);


      navigation.navigate("SignUpSecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert(error.message)
      }
      Alert.alert("Erro", "Não foi possível completar o cadastro. Verifique sua conexão com a internet e os dados enviados")
    }
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
              1. Dados
            </FormTitle>

            <Input
              icon="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              icon="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              icon="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />

          </Form>

          <Button
            title="Próximo"
            onPress={handleNextStep}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}