import React from "react";
import { useSelector } from "react-redux";
import { blastState } from "../../../../../slices/blast/blastSlice";
import {
  Flex,
  Box,
  Text,
  Grid,
  GridItem
} from "@chakra-ui/react";
import Button from "../../../../common/Button";
import { ArrowForwardIcon, ArrowBackIcon, DownloadIcon } from "../../../../../assets/images/icons";

const SendSMSConfirmation = ({
  blastDetails,
  handleCancelAction,
  handlePreviousAction,
  sendSMSBlast
}) => {
  const { senderMasks } = useSelector(blastState);

  const isSingleRecipient = blastDetails.recipientType === "single";
  const selectedSenderMask = senderMasks.find((mask) => mask.id === blastDetails.senderMask).name;
  const file = !isSingleRecipient ? blastDetails.multipleRecipientFile[0] : null;
  const fileName = file && file.name;

  const details = [
    { label: "Name", value: blastDetails.blastName },
    { label: "Audience", value: isSingleRecipient ? "Single Recipient" : "Multiple Recipients" },
    { label: "Sender Mask", value: selectedSenderMask },
    { label: "Message", value: blastDetails.blastMessage }
  ];

  /* istanbul ignore next */
  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const RenderBlastDetails = ({ label, value }) => (
    <Grid templateColumns="repeat(5, 1fr)" mb="12px" key={label}>
      <GridItem colSpan="2" color="text.darkgray" fontWeight="600" fontSize="14px">{label}</GridItem>
      <GridItem colSpan="3" fontSize="14px" maxHeight="75px" overflow="scroll">{value}</GridItem>
    </Grid>
  );

  return (
    <Box>
      <Text mb="16px">Your current blast details are as follows:</Text>

      <Box h="213px" borderRadius="4px" bg="#F6F8FE" p="20px" mb="32px">
        {details.map((item) => RenderBlastDetails(item))}
      </Box>

      <Grid templateColumns="repeat(5, 1fr)" mb="12px">
        <GridItem colSpan="2" fontWeight="600">
          {isSingleRecipient ? "Recipient" : "Recipients"}
        </GridItem>
        <GridItem colSpan="3">
          {
            isSingleRecipient ? blastDetails.mobileNumber :
              <Flex cursor="pointer" onClick={downloadFile}>
                <Text className="file-upload__replace" mr="8px">{fileName}</Text>
                <img src={DownloadIcon} alt="Logo" width={16} height={16} />
              </Flex>
          }
        </GridItem>
      </Grid>

      <Flex mt="64px" justifyContent="space-between">
        <Button width="auto" bg="none" color="button.primary" _hover={{ bg: "none", color: "bg.primary" }} onClick={handleCancelAction}>
          Cancel
        </Button>

        <Flex justifyContent="space-between">
          <Button width="156px" mr="12px" variant="outlined" data-testid="sendSMS-previous-btn" icon={ArrowBackIcon} onClick={handlePreviousAction}>
            Previous
          </Button>
          <Button type="submit" width="201px" data-testid="sendSMS-submit-btn" rightIcon={ArrowForwardIcon} onClick={sendSMSBlast}>
            Send SMS Blast
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SendSMSConfirmation;