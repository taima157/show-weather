import { Box, Text, Button, Icon, ScrollView } from "native-base";
import { propStack } from "../../types/routes";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CityCard from "../../components/CityCard";
import ModalAddCity from "../../components/ModalAddCity";
import { useEffect, useState } from "react";
import { City } from "../../types/city";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SelectCity() {
  const [citys, setCitys] = useState<City[] | null>(null);
  const navigation = useNavigation<propStack>();
  const [localCitysCount, setLocalCityCount] = useState<number>(0);

  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal(!modal);
  }

  async function getLocalCitys() {
    const localCitys = await AsyncStorage.getItem("citys");

    if (localCitys !== null) {
      let citys: City[] = JSON.parse(localCitys);
      setLocalCityCount(citys.length);
      setCitys(citys);
    }
  }

  useEffect(() => {
    getLocalCitys();
  }, []);

  return (
    <Box
      flex={1}
      _dark={{ bgColor: "#0B0B0B" }}
      _light={{ bgColor: "#FFF" }}
      px={5}
    >
      <Box
        display="flex"
        flexDirection="row"
        w="full"
        justifyContent="space-between"
        alignItems="center"
        pt={5}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <Button
            p={0}
            m={0}
            _dark={{
              bgColor: "#1C1C1C",
            }}
            _light={{
              bgColor: "#eeeeeeee",
            }}
            variant="ghost"
            _pressed={{
              opacity: 0.5,
            }}
            onPress={() => navigation.goBack()}
          >
            <Icon
              as={<Ionicons name="chevron-back" />}
              size={8}
              _dark={{ color: "#A4A4A4" }}
            />
          </Button>
          <Text fontFamily="Poppins_600SemiBold" pl={3} color="#A4A4A4">
            Select City
          </Text>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Text fontFamily="Poppins_600SemiBold" pr={3} color="#A4A4A4">
            (Max: 5)
          </Text>
          <Button
            p={0}
            m={0}
            _dark={{
              bgColor: "#1C1C1C",
            }}
            _light={{
              bgColor: "#eeeeeeee",
            }}
            _pressed={{
              opacity: 0.5,
            }}
            onPress={toggleModal}
            isDisabled={localCitysCount >= 5}
          >
            <Icon
              as={<MaterialCommunityIcons name="plus" />}
              size={8}
              _dark={{ color: "#A4A4A4" }}
            />
          </Button>
        </Box>
      </Box>

      <Box w="full" pt={10}>
        {citys !== null ? (
          <ScrollView w="full">
            {citys?.map((city, index) => {
              return (
                <CityCard key={index} city={city} updateList={getLocalCitys} />
              );
            })}
          </ScrollView>
        ) : null}
      </Box>
      <ModalAddCity
        isVisible={modal}
        toggleModal={toggleModal}
        updateList={getLocalCitys}
      />
    </Box>
  );
}
