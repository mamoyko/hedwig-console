import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownDarkIcon } from "../../assets/images/icons";
import Modal from "./Modal";

import { userState } from "../../slices/user/userSlice";
import { logoutUser } from "../../slices/auth/authActions";
import { resetUserState } from "../../slices/user/userActions";

const Header = ({ ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { details } = useSelector(userState);
  const [showSignOutConfirmation, setShowSignOutConfirmation] = useState(false);

  const handleLogoutConfirmation = () => {
    setShowSignOutConfirmation(!showSignOutConfirmation);
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    await dispatch(logoutUser());
    await dispatch(resetUserState());
    navigate("/login");
  };

  return (
    <Flex
      position="fixed"
      w="full"
      zIndex={1}
      transition="0.5s ease"
      px={{ base: 4, md: 4 }}
      height="56px"
      alignItems="center"
      bg="#fff"
      justifyContent="flex-end"
      {...rest}
    >
      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
              <HStack spacing="41px">
                <VStack display={{ md: "flex" }} alignItems="flex-start" spacing="1px" ml="2">
                  <Text fontSize="sm">{`${details.firstname} ${details.lastname}`}</Text>
                  <Text fontSize="xs" color="text.lightgray" fontWeight={500}>
                    {details.email}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <img src={ChevronDownDarkIcon} alt="Logo" width={28} height={32} />
                </Box>
              </HStack>
            </MenuButton>

            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}>
              <MenuItem onClick={handleLogoutConfirmation}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>

      <Modal
        title="Log out?"
        message="Are you sure you want to log out of Hedwig?"
        primaryBtnText="Log Out"
        secondaryBtnText="Go Back"
        primaryBtnAction={handleLogout}
        secondaryBtnAction={handleLogoutConfirmation}
        isOpen={showSignOutConfirmation}
      />
    </Flex>
  );
};

export default Header;