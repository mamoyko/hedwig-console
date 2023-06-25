import React from "react";
import { Container, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Container bg="bg.primary" color="white" textAlign="center" p={12}>
      <Text fontSize="6xl">404</Text>
      <Text fontSize="4xl">Page Not Found</Text>
    </Container>
  );
};

export default NotFound;