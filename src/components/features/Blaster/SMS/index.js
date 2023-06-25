import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Flex,
  Divider,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text as Title,
  Box as Header
} from "@chakra-ui/react";
import { showSMSBlastPrompt } from "../../../../slices/blast/blastActions";
import { blastState } from "../../../../slices/blast/blastSlice";
import Button from "../../../common/Button";
import AlertBox from "../../../common/AlertBox";
import { AddIcon, BlasterIconPurple, ChevronRightIcon } from "../../../../assets/images/icons";
import ActivityList from "../../Activity/MyActivities/ActivityList";

const SMS = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blastPromptType } = useSelector(blastState);

  const handlePromptOnClose = () => {
    dispatch(showSMSBlastPrompt({ type: null }));
  };

  useEffect(() => {
    return () => {
      dispatch(showSMSBlastPrompt({ type: null }));
    };
  }, []);

  return (
    <Box>
      {
        blastPromptType === "success" &&
        <AlertBox
          type="success"
          message="SMS Sent! Please monitor the status to check if the SMS Blast has completed."
          onClose={handlePromptOnClose}
        />
      }

      {
        blastPromptType === "error" &&
        <AlertBox
          type="error"
          message="SMS blast not sent. Try sending a blast again."
          onClose={handlePromptOnClose}
        />
      }

      <Box bg="white" w="full" borderRadius="xl" borderWidth="1px" borderColor="#E0E4E6">
        <Header px="24px" py="28px">
          <Breadcrumb fontSize={"14px"} spacing="8px" mb="28px" separator={<img src={ChevronRightIcon} alt="right-icon" width={20} height={20} />}>
            <BreadcrumbItem>
              <img src={BlasterIconPurple} alt="blaster-icon" width={20} height={20} />
              <BreadcrumbLink color="text.link" ml="8px" href="#">Blaster</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">SMS</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Flex justifyContent="space-between">
            <Title ml="8px" fontSize="32px">SMS</Title>
            <Button icon={AddIcon} onClick={() => navigate("send")}>Send an SMS Blast</Button>
          </Flex>
        </Header>

        <Divider opacity={1} />

        <Box>
          <ActivityList />
        </Box>
      </Box>
    </Box>
  );
};

export default SMS;