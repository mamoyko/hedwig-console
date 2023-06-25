import React from "react";
import {
  FormErrorMessage,
  FormControl,
  InputGroup,
  InputRightElement,
  Text
} from "@chakra-ui/react";

const TextInput = ({
  name,
  placeholder,
  icon,
  type,
  errors,
  register,
  label,
  maxLength,
  validations = {},
  ...rest
}) => {
  const ERROR_CLASS = errors[name] ? "floating__error" : "";
  const INPUT_ERROR_CLASS = errors[name] ? "floating__input__error" : "";

  return (
    <>
      {
        label && <Text mb="16px">{ label }</Text>
      }

      <FormControl isInvalid={errors[name]} pb="24px" {...rest}>
        <InputGroup>
          <div className={`floating ${ERROR_CLASS}`}>
            <input
              id={name}
              className="custom__input floating__input"
              type={type ? type : "text"}
              placeholder={placeholder}
              maxLength={maxLength}
              {...register(name, validations)}
            />
            <label
              htmlFor={name}
              className={`floating__label ${INPUT_ERROR_CLASS}`}
              data-content={placeholder}
            >
              <span className="hidden__visually">{placeholder}</span>
            </label>
          </div>

          {
            icon &&
            <InputRightElement width="4.5rem" alignItems="flex-end" cursor="pointer">
              {icon}
            </InputRightElement>
          }
        </InputGroup>
        <FormErrorMessage fontSize="12px">
          {errors[name] && errors[name].message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default TextInput;