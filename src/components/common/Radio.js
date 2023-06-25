import React from "react";
import {
  FormErrorMessage,
  FormControl,
  Stack,
  Flex,
  Text
} from "@chakra-ui/react";

export default function Radio({
  name,
  errors,
  label,
  options,
  register,
  validations,
  subComponents,
  watch,
  ...rest
}) {
  const currentValue = watch && watch(name);
  const ERROR_CLASS = errors[name] ? "radio__error" : "";

  return (
    <>
      {
        label && <Text mb="24px">{label}</Text>
      }

      <FormControl isInvalid={errors[name]} pb="24px" {...rest}>
        <Stack spacing="26px">
          {
            options && options.map(({ text, value }) => (
              <Flex flexDirection="column" key={value}>
                <Flex key={value} alignItems="center" className="custom__radio">
                  <input
                    id={`${ERROR_CLASS}`}
                    type="radio"
                    name={name}
                    value={value}
                    {...register(name, validations)}
                  />
                  <Text>{text}</Text>
                </Flex>

                {
                  (subComponents && currentValue === value) && subComponents[currentValue]
                }
              </Flex>
            ))
          }

        </Stack>
        <FormErrorMessage fontSize="12px">
          {errors[name] && errors[name].message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
}