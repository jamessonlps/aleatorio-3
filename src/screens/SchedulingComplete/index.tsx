import { StatusBar, useWindowDimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
} from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { ConfirmButton } from "../../components/ConfirmButton";
import { AppNavigatorRoutesProps, RootStackParamList } from "../../routes/stack.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


interface Params {
  title: string;
  message: string;
  nextScreenRoute: keyof RootStackParamList;
}

type ConfirmationScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "Confirmation"
>;


export function Confirmation() {
  const { width } = useWindowDimensions();
  const route = useRoute();
  const navigation = useNavigation<ConfirmationScreenProp>();

  const { title, message, nextScreenRoute } = route.params as Params;

  function handleConfirm() {
    navigation.navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>
        <Title>{title}</Title>

        <Message>
          Agora você só precisa ir {"\n"}
          até a concessionária da RENTX {"\n"}
          pegar o seu automóvel
        </Message>
        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton
          title="OK"
          onPress={handleConfirm}
        />
      </Footer>


    </Container>
  )
}