import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Container,
  Image,
  Box,
  Heading,
  IconButton,
  Text,
  Stack,
  Button,
  HStack,
  VStack,
  Center,
  useDisclosure
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Gift } from "./types";
import ModalGift from "./components/ModalGift";

const GIFTS: Gift[] = [];

const Todo: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEdit, setSelectedEdit] = useState<Gift>();
  const [gifts, setGifts] = useState(() => new Map<Gift["id"], Gift>(
    (localStorage.getItem("gifts") ?
      JSON.parse(localStorage.getItem("gifts") || "[]") :
      GIFTS).map((gift: Gift) => [gift.id, gift]))
  );


  const handleDelete = (gift: Gift) => {
    const newGifts = new Map(gifts);

    newGifts.delete(gift.id);
    setGifts(newGifts);
    localStorage.setItem("gifts", JSON.stringify(Array.from(newGifts.values())));
  };

  const handleEdit = (gift: Gift) => {
    setSelectedEdit(gift);
    onOpen();
  }

  const handleCreate = () => {
    setSelectedEdit({} as Gift);
    onOpen();
  }

  return (
    <Box
      h="101vh"
      pt={5}
      style={{
        backgroundImage: "url(/banner.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      w="full"
    >
      <Container display="grid" h="full" placeItems="center" w="full">
        <Stack minW="350px" bg="white" p={7}>
          <Heading>Lista de Regalos</Heading>
          <ModalGift gift={selectedEdit} stateGifts={{ gifts: gifts, setGifts: setGifts }} isOpen={isOpen} onClose={onClose} />
          <Button colorScheme={"red"} onClick={handleCreate}>Agregar regalo</Button>
          <Stack>
            {gifts.size == 0 && (
              <Center py={7}>No hay regalos papu! Agrega algo!</Center>
            )}
            {Array.from(gifts.values()).map((gift) => (
              <HStack key={gift.id} justify="space-between">
                <HStack>
                  <Image borderRadius="lg" objectFit="cover" src={gift.image} w={50} h={50} />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight={"bold"}>
                      {gift.name} x{gift.quantity}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {gift.destination}
                    </Text>
                  </VStack>
                </HStack>
                <HStack>
                  <IconButton
                    aria-label="Edit button"
                    colorScheme="teal"
                    icon={<EditIcon />}
                    onClick={() => handleEdit(gift)}
                  />
                  <IconButton
                    aria-label="Delete button"
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(gift)}
                  />
                </HStack>
              </HStack>
            ))}
          </Stack>
          {Array.from(gifts).length > 0 && (
            <Button variant={"link"} colorScheme="red" onClick={() => setGifts(new Map())}>
              Borrar todo
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Todo;
