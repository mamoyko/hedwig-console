import React, { } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box
} from "@chakra-ui/react";
import {
  InfoOutlineIcon,
  CheckCircleIcon,
  CloseIcon,
  WarningDiamondIcon
} from "../../assets/images/icons";

const AlertBox = ({
  title,
  message,
  type = "info",
  onClose = null
}) => {
  const ALERT_PROPERTIES = {
    success: {
      icon: CheckCircleIcon,
      iconMargin: "17px",
      textColor: "black",
      backgroundColor: "alert.success",
      fontWeight: 600,
      border: "1px solid #0FBD1E"
    },
    error: {
      icon: WarningDiamondIcon,
      iconMargin: "17px",
      textColor: "black",
      backgroundColor: "alert.error",
      fontWeight: 600,
      border: "1px solid #F04747"
    },
    warning: {
      icon: InfoOutlineIcon,
      iconMargin: "8px",
      textColor: "text.darkgray",
      backgroundColor: "alert.warning",
      fontWeight: 400,
      border: "none"
    }
  };

  return (
    <Alert
      display="flex"
      bg={ALERT_PROPERTIES[type].backgroundColor}
      border={ALERT_PROPERTIES[type].border}
      color="black"
      mb="24px"
      borderRadius="4px"
      p="20px"
    >
      <Box minWidth="24px" minHeight="24px" mr={ALERT_PROPERTIES[type].iconMargin} alignSelf="flex-start">
        <img src={ALERT_PROPERTIES[type].icon} alt="me" width={26} height={26} />
      </Box>
      <Box>
        {
          title && <AlertTitle mb="8px">{title}</AlertTitle>
        }
        <AlertDescription
          fontSize="14px"
          fontWeight={ALERT_PROPERTIES[type].fontWeight}
          color={ALERT_PROPERTIES[type].textColor}
        >
          {message}
        </AlertDescription>
      </Box>
      {
        onClose &&
        <Box minWidth="20px" minHeight="20px" ml="auto" cursor="pointer" data-testid="alertbox-close-button" onClick={onClose}>
          <img src={CloseIcon} alt="me" width={20} height={20} />
        </Box>
      }
    </Alert>
  );
};

export default AlertBox;