import React from "react";
import { Spinner, Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";

const Loader = ({ isLoading }) => {
  return (
    <Modal isOpen={isLoading}>
      <ModalOverlay />
      <ModalContent alignSelf="center" alignItems="center" width="auto" p="25px">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="bg.primary"
          size="xl"
        />
      </ModalContent>
    </Modal>
  );
};

export default Loader;