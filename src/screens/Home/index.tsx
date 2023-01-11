import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { CarDTO } from "../../interfaces/CarDTO";
import { AppNavigatorRoutesProps } from "../../routes/app.stack.routes";
import { api } from "../../services/api";

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from "./styles";
import { LoadingAnimated } from "../../components/LoadingAnimated";


// const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  // const positionY = useSharedValue(0);
  // const positionX = useSharedValue(0);

  // const myCarsButtonStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       { translateX: positionX.value },
  //       { translateY: positionY.value },
  //     ]
  //   }
  // });

  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart(event, ctx: any) {
  //     ctx.positionX = positionX.value
  //     ctx.positionY = positionY.value
  //   },
  //   onActive(event, ctx: any) {
  //     positionX.value = event.translationX + ctx.positionX
  //     positionY.value = event.translationY + ctx.positionY
  //   },
  //   onEnd() {

  //   },
  // })

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  // function handleOpenMyCars() {
  //   navigation.navigate("MyCars");
  // }

  async function fetchCars() {
    try {
      const response = await api.get("/cars");
      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);


  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          {!loading && (
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          )}
        </HeaderContent>
      </Header>

      {loading ? <LoadingAnimated /> : (
        <CarList
          data={cars}
          renderItem={({ item }) => (
            <Car
              data={item}
              onPress={() => handleCarDetails(item)}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}

      {/* <PanGestureHandler onGestureEvent={onGestureEvent} >
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            }
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}

    </Container>
  )
}

// const styles = StyleSheet.create({
//   button: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//   }
// })