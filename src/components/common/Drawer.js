import React from "react";
import {
  Drawer as ChakraDrawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Divider,
  Box,
  Text,
  Flex
} from "@chakra-ui/react";
import { CloseIcon } from "../../assets/images/icons";

const Drawer = ({
  title,
  isOpen,
  onClose,
  children
}) => {
  return (
    <ChakraDrawer onClose={onClose} isOpen={isOpen} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Text>{title}</Text>
            {
              onClose &&
              <Box my="16px" minWidth="20px" minHeight="20px" cursor="pointer" data-testid="alertbox-close-button" onClick={onClose}>
                <img src={CloseIcon} alt="me" width={20} height={20} />
              </Box>
            }
          </Flex>
        </DrawerHeader>

        <Divider mb="16px" opacity={1} />

        <DrawerBody>
          {children}
        </DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
};

export default Drawer;