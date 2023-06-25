import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIdleTimer } from "react-idle-timer";
import { Outlet, Navigate } from "react-router-dom";
import { Box, Center, Text, Flex } from "@chakra-ui/react";

import { configState } from "../../slices/config";
import { userState } from "../../slices/user/userSlice";
import { blastState } from "../../slices/blast/blastSlice";
import { getUserInfo, resetUserState } from "../../slices/user/userActions";
import { getSenderMasks } from "../../slices/blast/blastActions";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import Logo from "../../assets/images/hc_logo_purple.svg";

import { isEmpty } from "../../utils/helpers";

const TIMEOUT_IN_MINUTES = 1_5;

/* istanbul ignore next */
const IdleHandler = ({ children }) => {
  const dispatch = useDispatch();

  const onIdleState = (resetTimer) => {
    dispatch(getUserInfo()).unwrap()
      .then(() => resetTimer())
      .catch(() => dispatch(resetUserState()));
  };

  const { activate } = useIdleTimer({
    timeout: 1000 * 60 * TIMEOUT_IN_MINUTES,
    crossTab: true,
    onIdle: () => onIdleState(activate)
  });

  return children;
};

const Layout = ({ authorize, type }) => {
  const dispatch = useDispatch();
  const { details, isLoading: isUserLoading } = useSelector(userState);
  const { senderMasks, isLoading: isBlastLoading } = useSelector(blastState);
  const { HEDWIG_TOKEN } = useSelector(configState);

  const [isToggle, setIsToggle] = useState(false);

  const HAS_SESSION_TOKEN = sessionStorage.getItem(HEDWIG_TOKEN);
  const ROLE = details && details.role === 1 ? "ADMIN" : "COORDINATOR";

  const sidebarWidth = isToggle ? "60px" : "286px";

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  useEffect(() => {
    if (isEmpty(details)) {
      dispatch(getUserInfo());
    }

    if (isEmpty(senderMasks)) {
      dispatch(getSenderMasks());
    }
  }, []);

  if (!HAS_SESSION_TOKEN) {
    return <Navigate to="/login" replace />;
  }

  if (HAS_SESSION_TOKEN && authorize && authorize !== ROLE) {
    return <Navigate to="/dashboard" replace />;
  }

  if (type === "modal") {
    return (
      <IdleHandler>
        <Flex minH="100vh" bg={"bg.gray.100"} flexDirection="column" alignItems="center">
          <Center h="56px" bg="white" w="full" position="fixed" zIndex={1}>
            <img src={Logo} alt="blaster-icon" width={28} height={32} />
            <Text ml="8px" fontSize="24px" color="bg.secondary" fontFamily="sans-serif" fontWeight="bold">HEDWIG</Text>
          </Center>
          <Box w="620px" bg="white" py="40px" px="24px" mt="81px" mb="25px" borderRadius="lg" borderWidth="1px" borderColor="#E0E4E6">
            <Outlet />
          </Box>
        </Flex>
      </IdleHandler>
    );
  }

  return (
    <IdleHandler>
      <Box bg={"bg.gray.100"}>
        <Loader isLoading={isUserLoading || isBlastLoading} />
        <Sidebar display="block" isToggle={isToggle} sidebarWidth={sidebarWidth} toggleSidebar={handleToggle} />
        <Header />
        <Box transition="0.5s ease" ml={sidebarWidth} p="92px 36px 36px 36px" h="100vh" overflow="scroll">
          <Outlet />
        </Box>
      </Box>
    </IdleHandler>
  );
};

export default Layout;