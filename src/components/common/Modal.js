import React from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Divider
} from "@chakra-ui/react";
import Button from "./Button";

const Modal = ({
  title,
  message,
  primaryBtnText,
  secondaryBtnText,
  primaryBtnAction,
  secondaryBtnAction,
  isOpen
}) => {
  return (
    <ChakraModal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent alignSelf="center" alignItems="center" minW="568px">
        <ModalHeader alignSelf="flex-start" bg="#EBEDEE" w="full" borderTopRadius="0.375rem" fontWeight={500} py="20px">
          {title}
        </ModalHeader>

        <ModalBody p="20px 24px 40px 24px" alignSelf="flex-start" fontWeight={400}>
          {message}
        </ModalBody>

        <Divider opacity={1} />

        <ModalFooter alignSelf="flex-end">
          {
            secondaryBtnText &&
            <Button width="111px" mr="12px" variant="outlined" data-testid="logout-goBack-btn" onClick={secondaryBtnAction}>
              {secondaryBtnText}
            </Button>
          }
          <Button width="153px" data-testid="logout-submit-btn" onClick={primaryBtnAction}>
            {primaryBtnText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;