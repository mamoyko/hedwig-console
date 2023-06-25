import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Text as Title,
} from "@chakra-ui/react";
import { blastState } from "../../../../../slices/blast/blastSlice";
import { sendSMSBlast, showSMSBlastPrompt } from "../../../../../slices/blast/blastActions";
import AlertBox from "../../../../common/AlertBox";
import Loader from "../../../../common/Loader";
import SendSMSForm from "./SendSMSForm";
import SendSMSConfirmation from "./SendSMSConfirmation";

const SendSMS = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(blastState);
  const [step, setStep] = useState(1);
  const [blastDetails, setBlastDetails] = useState({});

  const handleCancelAction = () => {
    navigate(-1);
  };

  const handlePreviousAction = () => {
    setStep(step - 1);
  };

  const onSubmit = (values) => {
    setBlastDetails(values);
    setStep(2);
  };

  /* istanbul ignore next */
  const handleSendSMSBlast = () => {
    let values = {
      name: blastDetails.blastName,
      recipient_type: blastDetails.recipientType,
      message: blastDetails.blastMessage,
      sender_masks_id: blastDetails.senderMask,
    };

    if (blastDetails.recipientType === "single") {
      values = {
        ...values,
        phone_number: blastDetails.mobileNumber
      };
    } else {
      values = {
        ...values,
        file: blastDetails.multipleRecipientFile[0]
      };
    }

    dispatch(sendSMSBlast(values)).unwrap()
      .then(() => {
        dispatch(showSMSBlastPrompt({ type: "success" }));
        navigate("/blaster/sms");
      })
      .catch(() => {
        dispatch(showSMSBlastPrompt({ type: "error" }));
        navigate("/blaster/sms");
      });
  };

  return (
    <Box>
      <Loader isLoading={isLoading} />

      <Flex justifyContent="space-between" alignItems="center" fontWeight={500} mb="32px">
        <Title fontSize="24px">{step === 1 ? "Send an SMS Blast" : "Review SMS Blast"}</Title>
        <Text color="text.darkgray">{`Step ${step} of 2`}</Text>
      </Flex>

      <AlertBox
        type="warning"
        title="Reminder"
        message="NTC Guideline states that SMS Blasts between 9PM to 7AM are not allowed. Please refrain from doing such activities during said time or you will be sanctioned ☠️"
      />

      {
        step === 1 &&
        <SendSMSForm
          blastDetails={blastDetails}
          onSubmit={onSubmit}
          handleCancelAction={handleCancelAction}
        />
      }

      {
        step === 2 &&
        <SendSMSConfirmation
          blastDetails={blastDetails}
          handleCancelAction={handleCancelAction}
          handlePreviousAction={handlePreviousAction}
          sendSMSBlast={handleSendSMSBlast}
        />
      }
    </Box>
  );
};

export default SendSMS;