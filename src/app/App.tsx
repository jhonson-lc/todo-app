import { DeleteIcon } from "@chakra-ui/icons";
import {
  Container,
  Image,
  Box,
  Heading,
  Text,
  Stack,
  Input,
  Button,
  HStack,
  IconButton,
  Center,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

import NumberInput from "../components/NumberInput";

const GIFTS: Gift[] = [];

const Todo: React.FC = () => {
  const t = useToast();
  const [value, setValue] = useState<string>("");
  const [image, setImage] = useState<string>("")
  const [order, setOrder] = useState<number>(2);
  const [gifts, setGifts] = useState(() => new Map<Gift["id"], Gift>(
    (localStorage.getItem("gifts") ?
      JSON.parse(localStorage.getItem("gifts") || "[]") :
      GIFTS).map((gift: Gift) => [gift.id, gift]))
  );

  const handleClick = () => {

    let cacheGifts = new Map(gifts);

    if (value === "") return t({
      title: "No hay un regalo",
      description: "Debes agregar el nombre de tu regalo",
      status: "error",
      duration: 9001,
      isClosable: true,
      position: "top"
    });

    const newGift: Gift = {
      id: gifts.size + 2,
      name: value,
      quantity: order,
    };

    for (const gift of gifts.values()) {
      if (gift.name === value) {
        t({
          title: "Gift already exists",
          description: "You already have this gift in your list",
          status: "error",
          duration: 9001,
          isClosable: true,
          position: "top",
        });

        return
      }
    }

    cacheGifts.set(newGift.id, newGift);

    setGifts(cacheGifts);
    localStorage.setItem("gifts", JSON.stringify(Array.from(cacheGifts.values())));
  };

  const handleDelete = (gift: Gift) => {
    const newGifts = new Map(gifts);

    newGifts.delete(gift.id);
    setGifts(newGifts);
    localStorage.setItem("gifts", JSON.stringify(Array.from(newGifts.values())));
  };

  return (
    <Box
      h="101vh"
      pt={5}
      style={{
        backgroundImage: "url(public/banner.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      w="full"
    >
      <Container display="grid" h="full" placeItems="center" w="full">
        <Stack bg="white" p={7}>
          <Heading>Lista de Regalos</Heading>
          <HStack>
            <Input fontSize={12} placeholder="Medias" value={value} onChange={(e) => setValue(e.target.value)} />
            <Input fontSize={12} placeholder="http://image" value={image} onChange={(e) => setImage(e.target.value)} />
            <HStack>
              <NumberInput setValue={setOrder} value={order} />
              <Button colorScheme="red" onClick={handleClick}>
                Agregar
              </Button>
            </HStack>
          </HStack>
          <Stack>
            {gifts.size == 0 && (
              <Center py={7}>No hay regalos papu! Agrega algo!</Center>
            )}
            {Array.from(gifts.values()).map((gift) => (
              <HStack key={gift.id} justify="space-between">
                <HStack>
                  <Image src={image} w={50} fallbackSrc='https://via.placeholder.com/150'/>
                  <Text>
                    {gift.name} x{gift.quantity}
                  </Text>
                </HStack>
                <IconButton
                  aria-label={"Delete button"}
                  colorScheme={"red"}
                  icon={<DeleteIcon />}
                  onClick={() => handleDelete(gift)}
                />
              </HStack>
            ))}
          </Stack>
          {Array.from(gifts).length > 1 && (
            <Button colorScheme="red" onClick={() => setGifts(new Map())}>
              Borrar todo
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Todo;
