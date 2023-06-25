import React from "react";
import {
  Divider,
  Box
} from "@chakra-ui/react";
import AuditTrailList from "./AuditTrailList";
import ActivityHeader from "../Header";

const AuditTrail = () => {
  return (
    <Box bg="white" w="full" borderRadius="xl" borderWidth="1px" borderColor="#E0E4E6">
      <ActivityHeader title="Audit Trail" />

      <Divider opacity={1} />

      <Box>
        <AuditTrailList />
      </Box>
    </Box>
  );
};

export default AuditTrail;