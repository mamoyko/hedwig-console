import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useNavigate, Navigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import Loader from "../../common/Loader";
import ErrorAlertBox from "../../common/ErrorAlertBox";

import { configState } from "../../../slices/config";
import { authState } from "../../../slices/auth/authSlice";
import { loginUser } from "../../../slices/auth/authActions";

import Logo from "../../../assets/images/hc_logo.svg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { HEDWIG_TOKEN } = useSelector(configState);
  const { isLoggedIn, isLoading, error } = useSelector(authState);
  const [openAlertBox, setOpenAlertBox] = useState(false);

  const HAS_SESSION_TOKEN = sessionStorage.getItem(HEDWIG_TOKEN);

  const onSubmit = (values) => {
    dispatch(loginUser(values));
  };

  /* istanbul ignore next */
  useEffect(() => {
    if (HAS_SESSION_TOKEN && isLoggedIn) {
      navigate("/dashboard");
    }

    if (error) {
      setOpenAlertBox(true);
    }
  }, [isLoggedIn, error, navigate, HAS_SESSION_TOKEN]);

  /* istanbul ignore next */
  if (HAS_SESSION_TOKEN) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Flex color="white" height="full">
      <Box flex="1" bg="bg.primary" pt="120px" pl="80px">
        <img src={Logo} alt="Logo" width={112} height={128} />
        <Text pt="27px" fontSize="48px">Hedwig Dashboard</Text>
        <Text pt="28px" fontSize="20px" fontWeight={500}>Maya Communications Console</Text>
      </Box>
      <Flex w="640px" flexDirection="column">
        <Loader isLoading={isLoading} />

        <Flex flex="1" flexDirection="column" justifyContent="center" pl="80px" pr="80px" minWidth="100%">
          <Text fontSize="32px" color="text.black" mb="24px" fontWeight={600}>
            Log in to Hedwig
          </Text>

          {
            openAlertBox &&
            <ErrorAlertBox
              message="Invalid log in. Please reach out to system administrator."
              onClose={() => setOpenAlertBox(false)}
            />
          }

          <LoginForm onSubmit={onSubmit} />
        </Flex>

        <Box alignSelf="center">
          <Text fontSize="12px" color="text.gray" mb="24px">
            Copyright © 2022 Maya. All rights reserved.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;