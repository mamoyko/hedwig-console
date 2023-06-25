import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Stack, Text, Box, Flex } from "@chakra-ui/react";
import Button from "../../common/Button";
import { BlasterIconPurple, ActivityIconPurple } from "../../../assets/images/icons";

import { userState } from "../../../slices/user/userSlice";
import LatestActivity from "./LatestActivity";

const Dashboard = () => {
  const { details } = useSelector(userState);
  const IS_ADMIN = details && details.role === 1;

  return (
    <Box>
      <Stack spacing={2} pb="32px">
        <Text fontSize="20px" fontWeight={500}>Welcome back, {details.firstname}</Text>
      </Stack>

      <Flex>
        <Flex bg="white" px="24px" py="28px" w="343px" h="234px" mr="24px"
          borderRadius="xl"
          borderWidth="1px"
          borderColor="#E0E4E6"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Flex>
            <Box minW="64px" h="64px" bg="bg.gray.200" borderRadius="md" mr={4}>
              <img src={BlasterIconPurple} alt="blaster-icon" width={64} height={64} />
            </Box>
            <Stack spacing={2} pb="32px">
              <Text fontWeight={500}>Blast!</Text>
              <Text fontSize="14px">Create an SMS Blastoff</Text>
            </Stack>
          </Flex>

          <Flex justifyContent="center">
            <NavLink to="/blaster/sms/send">
              <Button>Send an SMS Blast</Button>
            </NavLink>
          </Flex>
        </Flex>

        {
          IS_ADMIN &&
          <Flex bg="white" px="24px" py="28px" w="343px" h="234px"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="#E0E4E6"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Flex>
              <Box minW="64px" h="64px" bg="bg.gray.200" borderRadius="md" mr={4}>
                <img src={ActivityIconPurple} alt="blaster-icon" width={64} height={64} />
              </Box>
              <Stack spacing={2} pb="32px">
                <Text fontWeight={500}>Audit Trail</Text>
                <Text fontSize="14px">Take a look at the numbers of the latest blasts.</Text>
              </Stack>
            </Flex>

            <Flex justifyContent="center">
              <NavLink to="/activity/audit-trail">
                <Button>View Audit Trail</Button>
              </NavLink>
            </Flex>
          </Flex>
        }
      </Flex>

      <LatestActivity />
    </Box>
  );
};

export default Dashboard;