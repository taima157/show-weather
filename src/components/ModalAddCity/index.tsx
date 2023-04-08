import { Box, Input, Text, Button } from "native-base";
import { useContext, useState } from "react";
import Modal from "react-native-modal";
import { geoApi } from "../../services/api";
import { WeatherContext } from "../../context/weather";
import { API_KEY } from "@env";
import { GeoCity } from "../../types/geolocation";
import { City } from "../../types/city";

type PropsType = {
  isVisible: boolean;
  toggleModal: () => void;
  updateList: () => Promise<void>;
};

export default function ModalAddCity({
  isVisible,
  toggleModal,
  updateList,
}: PropsType) {
  const weather = useContext(WeatherContext);
  const [cityValue, setCityValue] = useState<string>("");
  const [request, setRequest] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  function handleClose() {
    setCityValue("");
    setError("");
    toggleModal();
  }

  async function handleAddCity() {
    setRequest(true);
    setCityValue("");
    setError("");

    try {
      const response = await geoApi.get(
        `geocode?q=${cityValue}&lang=en&apiKey=${API_KEY}`
      );

      if (response.data.items.length === 0) {
        throw new Error("City not found");
      }

      const requestCity: GeoCity = await response.data.items[0];
      const city: City = {
        name:
          requestCity.address.city !== undefined
            ? requestCity.address.city
            : requestCity.address.state,
        selected: false,
        location: requestCity.position,
      };

      await weather?.addCity(city);

      setRequest(false);
      toggleModal();
      await updateList();
    } catch (error: any) {
      setRequest(false);
      if (error.message) {
        setError(error.message);
      } else {
        setError("Unable to add city");
      }
    }
  }

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.2}>
      <Box
        _dark={{ bgColor: "#0E0E0E", borderColor: "#1C1C1C" }}
        _light={{ bgColor: "#f8fafc", borderColor: "#C5C5C5" }}
        borderWidth={1}
        p={5}
        borderRadius={10}
      >
        <Text fontFamily="Poppins_500Medium">Add City</Text>
        <Box>
          <Input
            value={cityValue}
            onChangeText={(e) => setCityValue(e)}
            mt={5}
            placeholder="Ex..: Tokyo"
            fontFamily="Poppins_400Regular"
            fontSize={14}
            isDisabled={request}
            returnKeyType="go"
            onSubmitEditing={handleAddCity}
          />
        </Box>
        <Text fontFamily="Poppins_400Regular" textAlign="center" my={4}>
          {error}
        </Text>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Button
            onPress={handleClose}
            variant="outline"
            borderWidth={1}
            w="45%"
            isDisabled={request}
            _pressed={{
              opacity: 0.5,
            }}
          >
            <Text fontFamily="Poppins_400Regular">Cancel</Text>
          </Button>
          <Button
            w="45%"
            isLoadingText="Loading"
            _text={{ fontFamily: "Poppins_400Regular" }}
            isLoading={request}
            onPress={handleAddCity}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
