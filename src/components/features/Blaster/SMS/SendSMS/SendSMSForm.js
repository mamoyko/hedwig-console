import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Flex, Box, Text } from "@chakra-ui/react";

import { isEmpty, containsDoubleByte } from "../../../../../utils/helpers";
import { blastState } from "../../../../../slices/blast/blastSlice";

import TextInput from "../../../../common/TextInput";
import Select from "../../../../common/Select";
import Button from "../../../../common/Button";
import Radio from "../../../../common/Radio";
import { ArrowForwardIcon } from "../../../../../assets/images/icons";

import MultipleRecipientsUploader from "./MultipleRecipientsUploader";

const SendSMSForm = ({
  blastDetails,
  onSubmit,
  handleCancelAction
}) => {
  const { senderMasks } = useSelector(blastState);
  const { handleSubmit, setValue, register, unregister, watch, trigger, formState: { errors } } = useForm({ defaultValues: blastDetails });
  const blastMessageValue = watch("blastMessage");

  const MAX_NON_UNICODE_CHAR = 800;
  const MAX_WITH_UNICODE_CHAR = 400;
  const HAS_UNICODE = blastMessageValue && containsDoubleByte(blastMessageValue);
  const BLAST_MESSAGE_CHAR_COUNT = blastMessageValue ? HAS_UNICODE ? [...blastMessageValue].length : blastMessageValue.length : 0;
  const IS_BUTTON_DISABLED = isEmpty(watch()) || !isEmpty(errors);
  const DEFAULT_MASK = !isEmpty(senderMasks) ? senderMasks[0].id : "";
  const RECIPIENT_TYPE = watch("recipientType");

  const SENDER_MASK_OPTIONS = !isEmpty(senderMasks) ? senderMasks.map(({ name, id }) => ({ text: name, value: id })) : [];
  const RECIPIENT_TYPE_OPTIONS = [
    { text: "Single Recipient", value: "single" },
    { text: "Multiple Recipients", value: "multiple" }
  ];

  const getMessageCount = () => {
    if (BLAST_MESSAGE_CHAR_COUNT === 0) return 0;

    return HAS_UNICODE ?
      BLAST_MESSAGE_CHAR_COUNT <= 70 ? 1 : Math.ceil((BLAST_MESSAGE_CHAR_COUNT - 70) / 70) + 1 :
      BLAST_MESSAGE_CHAR_COUNT <= 160 ? 1 : Math.ceil((BLAST_MESSAGE_CHAR_COUNT - 160) / 154) + 1;
  };

  useEffect(() => {
    if (RECIPIENT_TYPE === "single") {
      unregister("multipleRecipientFile");
    } else {
      unregister("mobileNumber");
    }
  }, [RECIPIENT_TYPE]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        name="blastName"
        type="text"
        label="Name"
        placeholder="What’s the name of the SMS Blast?"
        errors={errors}
        register={register}
        validations={{
          required: "Please enter an SMS Blast name",
          pattern: {
            value: /^[\w-_. ]+$/i,
            message: "Please enter a valid Blast name"
          },
          setValueAs: value => value.trim(),
          onChange: (event) => {
            event.target.value = event.target.value.replace(/^\s+/g, "");
          }
        }}
        mb="16px"
      />

      <Radio
        name="recipientType"
        label="Indicate Audience for the SMS Blast"
        errors={errors}
        register={register}
        watch={watch}
        validations={{
          required: "Please select recipient type"
        }}
        options={RECIPIENT_TYPE_OPTIONS}
        subComponents={{
          "single":
            <TextInput
              name="mobileNumber"
              type="text"
              placeholder="Mobile Number"
              maxLength={12}
              errors={errors}
              register={register}
              validations={{
                required: "Please enter a mobile number",
                validate: (value) => {
                  const regex = /^(639)\d{9}$/gm;
                  return regex.test(value) ? true : "Invalid phone number format (ex. 639XXXXXXXXX)";
                },
                onChange: (event) => {
                  event.target.value = event.target.value.replace(/\D/g, "");
                  trigger("mobileNumber");
                }
              }}
              mt="8px"
              ml="36px"
              w="auto"
            />,
          "multiple":
            <MultipleRecipientsUploader
              name="multipleRecipientFile"
              label="Contacts List"
              errors={errors}
              register={register}
              watch={watch}
            />
        }}
        mb="16px"
      />

      <Select
        name="senderMask"
        label="Sender Mask"
        placeholder="Select a Sender Mask"
        defaultValue={DEFAULT_MASK}
        errors={errors}
        register={register}
        validations={{
          required: "Please select sender mask"
        }}
        options={SENDER_MASK_OPTIONS}
        watch={watch}
        setValue={setValue}
        mb="16px"
        zIndex={1}
      />

      <TextInput
        name="blastMessage"
        type="text"
        label="Message"
        placeholder="Message"
        errors={errors}
        register={register}
        validations={{
          required: "Please enter an SMS Blast message",
          validate: (value) => {
            const MAX_LIMIT = HAS_UNICODE ? MAX_WITH_UNICODE_CHAR : MAX_NON_UNICODE_CHAR;
            if ([...value].length > MAX_LIMIT) {
              return "Max character count exceeded";
            }
            return true;
          },
          setValueAs: value => value.trim(),
          onChange: (event) => {
            event.target.value = event.target.value.replace(/^\s+/g, "");
          }
        }}
      />

      <Box
        color="text.lightgray"
        fontSize="12px"
        fontWeight={500}
        textAlign="right"
        mt="-16px"
      >
        <Text>{`Character count: ${BLAST_MESSAGE_CHAR_COUNT}/${HAS_UNICODE ? MAX_WITH_UNICODE_CHAR : MAX_NON_UNICODE_CHAR}`}</Text>
        <Text>{`Message count: ${getMessageCount()}`}</Text>
      </Box>

      <Flex mt="64px" justifyContent="space-between">
        <Button width="auto" bg="none" color="button.primary" _hover={{ bg: "none", color: "bg.primary" }} data-testid="sendSMS-cancel-btn" onClick={handleCancelAction}>
          Cancel
        </Button>
        <Button type="submit" width="121px" data-testid="sendSMS-next-btn" rightIcon={ArrowForwardIcon} disabled={IS_BUTTON_DISABLED}>
          Next
        </Button>
      </Flex>
    </form >
  );
};

export default SendSMSForm;