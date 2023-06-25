import React, { } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box
} from "@chakra-ui/react";
import { WarningDiamondIcon, CloseIcon } from "../../assets/images/icons";

export default function ErrorAlertBox({
  title,
  message,
  onClose
}) {
  return (
    <Alert
      display="flex"
      bg="bg.warning"
      color="black"
      mb="24px"
      borderColor="bg.alert"
      borderWidth={1}
      borderRadius="4px"
      p="24px 16px"
    >
      <Box minWidth="26px" minHeight="26px" mr="18px">
        <img src={WarningDiamondIcon} alt="me" width={26} height={26} />
      </Box>

      <Box>
        {
          title && <AlertTitle>{title}</AlertTitle>
        }
        <AlertDescription fontSize="14px" fontWeight={600}>
          {message}
        </AlertDescription>
      </Box>

      <Box minWidth="24px" minHeight="24px" ml="15px" onClick={onClose} data-testid="error-alertbox-close-btn">
        <img src={CloseIcon} alt="me" width={24} height={24} />
      </Box>
    </Alert>
  );
}