import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Input,
  Button,
  useToast
} from '@chakra-ui/react'
import { Gift } from "../types";

import NumberInput from "./NumberInput";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  stateGifts: {
    gifts: Map<Gift["id"], Gift>,
    setGifts: React.Dispatch<React.SetStateAction<Map<number, Gift>>>
  }
  gift?: Gift;
}

const ModalGift: React.FC<Props> = ({ isOpen, gift, onClose, stateGifts }) => {
  const [value, setValue] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [order, setOrder] = useState<number>(1)
  const [destination, setDestination] = useState<string>("")
  const t = useToast();

  React.useEffect(() => {
    setValue(gift?.name || "")
    setImage(gift?.image || "")
    setOrder(gift?.quantity || 1)
    setDestination(gift?.destination || "")
  }, [gift])

  const handleClick = () => {

    let cacheGifts = new Map(stateGifts.gifts);

    if (value === "") return t({
      title: "No hay un regalo",
      description: "Debes agregar el nombre de tu regalo",
      status: "error",
      duration: 9001,
      isClosable: true,
      position: "top"
    });

    const newGift: Gift = {
      id: gift?.name ? gift?.id :stateGifts.gifts.size + 2,
      name: value,
      quantity: order,
      image: image,
      destination: destination
    };

    if(!gift?.name){
    for (const gift of stateGifts.gifts.values()) {
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
    };
    }

    cacheGifts.set(newGift.id, newGift);

    stateGifts.setGifts(cacheGifts);
    localStorage.setItem("gifts", JSON.stringify(Array.from(cacheGifts.values())));
    setValue("");
    setImage("");
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={300}>
          <ModalHeader>Tu regalo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Input fontSize={12} placeholder="Medias" value={value} onChange={(e) => setValue(e.target.value)} />
              <Input fontSize={12} placeholder="Jhon" value={destination} onChange={(e) => setDestination(e.target.value)} />
              <Input fontSize={12} placeholder="http://image" value={image} onChange={(e) => setImage(e.target.value)} />
              <NumberInput setValue={setOrder} value={order} />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme="red" onClick={handleClick}>
              {gift?.name ? "Guardar" : "Agregar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalGift;
