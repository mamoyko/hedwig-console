import React from "react";
import {
  Divider,
  Box
} from "@chakra-ui/react";
import ActivityList from "./ActivityList";
import ActivityHeader from "../Header";

const MyActivities = () => {
  return (
    <Box bg="white" w="full" borderRadius="xl" borderWidth="1px" borderColor="#E0E4E6">
      <ActivityHeader title="My Activities" />

      <Divider opacity={1} />

      <Box>
        <ActivityList />
      </Box>
    </Box>
  );
};

export default MyActivities;