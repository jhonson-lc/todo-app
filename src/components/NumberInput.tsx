import {Box, Text, HStack, VStack} from "@chakra-ui/react";
import React from "react";

interface Props {
  value: number;
  setValue: (number: any) => void;
}

const NumberInput: React.FC<Props> = ({value = 1, setValue}) => {
  const handleDecrement = () => {
    if (value === 1) return;
    setValue(value - 1);
  };

  return (
    <HStack border="1px solid #f2f2f2" borderRadius={10} justify={"space-between"} minW={16}>
      <Text p={2}>{value}</Text>
      <VStack spacing={0}>
        <Box
          _hover={{
            bg: "gray.300",
          }}
          alignItems="center"
          as="button"
          bg="gray.200"
          borderTopRightRadius={10}
          cursor={"pointer"}
          display="inline-flex"
          h={5}
          justifyContent={"center"}
          w={4}
          onClick={() => setValue(value + 1)}
        >
          +
        </Box>
        <Box
          _hover={{
            bg: "gray.300",
          }}
          alignItems="center"
          as="button"
          bg="gray.200"
          borderBottomRightRadius={10}
          cursor={"pointer"}
          display="inline-flex"
          h={5}
          justifyContent={"center"}
          w={4}
          onClick={handleDecrement}
        >
          -
        </Box>
      </VStack>
    </HStack>
  );
};

export default NumberInput;
