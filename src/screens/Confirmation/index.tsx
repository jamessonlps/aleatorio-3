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
import { AppNavigatorRoutesProps, RootStackParamList } from "../../routes/app.stack.routes";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";


type ConfirmationScreenProp = NativeStackScreenProps<
  RootStackParamList,
  "Confirmation"
>;

type ConfirmationScreenRouteProp = ConfirmationScreenProp["route"]

type ConfirmationScreenNavigationProp = ConfirmationScreenProp["navigation"]


export function Confirmation() {
  const { width } = useWindowDimensions();
  const route = useRoute<ConfirmationScreenRouteProp>();
  const navigation = useNavigation<ConfirmationScreenNavigationProp>();

  const { title, message, nextScreenRoute } = route.params;

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
        <Title>{title}</Title>
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