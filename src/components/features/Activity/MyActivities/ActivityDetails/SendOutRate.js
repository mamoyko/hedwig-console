import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Flex
} from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";

const SendOutRate = ({ values }) => {
  const data = {
    labels: ["Delivered", "Undelivered"],
    datasets: [
      {
        data: values,
        backgroundColor: ["#0FBD1E", "#F04747"],
        borderWidth: 0,
        cutout: 45
      }
    ]
  };

  return (

    <Grid templateColumns="repeat(5, 1fr)" mb="20px">
      <GridItem colSpan="2" color="text.lightgray">Sendout Rate</GridItem>
      <GridItem colSpan="3" fontWeight={500} overflow="scroll">
        <Flex flexDirection="column" alignItems="center" ml="-50px">
          <Box w="120px" h="120px" mb="24px">
            <Doughnut data={data} weight={5} />
          </Box>
          <Flex fontSize="14px">
            <Flex color="#0FBD1E" mr="24px" alignItems="center">
              <Box w="10px" h="10px" bg="#0FBD1E" mr="8px" />
              Delivered
            </Flex>
            <Flex color="#F04747" mr="24px" alignItems="center">
              <Box w="10px" h="10px" bg="#F04747" mr="8px" />
              Undelivered
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>

  );
};

export default SendOutRate;