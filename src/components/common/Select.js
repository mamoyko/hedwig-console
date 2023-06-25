import React, { useState, useEffect, useRef } from "react";
import {
  FormErrorMessage,
  FormControl,
  InputGroup,
  Text,
  Flex,
  Box
} from "@chakra-ui/react";
import { ArrowDropDownIcon, CheckIcon } from "../../assets/images/icons";

export default function Select({
  name,
  placeholder,
  errors,
  register,
  label,
  options,
  validations = {},
  watch,
  setValue,
  defaultValue= "",
  ...rest
}) {
  const inputRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const currentValue = watch(name);
  const HAS_VALUE_CLASS = !currentValue ? "dropdown__input-placeholder" : "";
  const ERROR_CLASS = errors[name] ? "floating__error" : "";
  const INPUT_ERROR_CLASS = errors[name] ? "floating__input__error" : "";

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const handleItemClick = (selected) => {
    setSelectedValue(selected);
    setValue(name, selected.value, { shouldValidate: true });
  };

  const getDisplayValue = () => {
    if (selectedValue) {
      return selectedValue.text;
    }

    return placeholder;
  };

  const renderOptions = (option) => {
    const isSelected = selectedValue && selectedValue.value === option.value;

    return (
      <Flex
        key={option.value}
        className={`dropdown__item ${isSelected ? "dropdown__item-selected" : ""}`}
        justifyContent="space-between"
        alignItems="center"
        onClick={() => handleItemClick(option)}
      >
        <span>{option.text}</span>
        {
          isSelected && <span><img src={CheckIcon} alt="CheckIcon" width={20} height={20} /></span>
        }
      </Flex>
    );
  };

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.addEventListener("click", handler);
    };
  });

  useEffect(() => {
    if (defaultValue !== "") {
      const selected = options.find(opt => opt.value === defaultValue);
      handleItemClick(selected);
    }
  }, []);

  return (
    <>
      {
        label && <Text mb="16px">{label}</Text>
      }
      <FormControl isInvalid={errors[name]} pb="24px" {...rest}>
        <input name={name} type="hidden" {...register(name, validations)} />

        <InputGroup>
          <Box className={`floating custom__select ${ERROR_CLASS}`}>
            <Box ref={inputRef} className={`dropdown__input ${HAS_VALUE_CLASS} ${INPUT_ERROR_CLASS}`} onClick={handleInputClick}>
              <Box className="dropdown__selected-value">
                {getDisplayValue()}
              </Box>
              <Box className="dropdown__tools">
                <Box className="dropdown__tool">
                  <img src={ArrowDropDownIcon} alt="Dropdown" width={26} height={26} />
                </Box>
              </Box>
            </Box>

            {
              showMenu &&
              <Box className="dropdown__menu">
                {
                  options.map((option) => renderOptions(option))
                }
              </Box>
            }

            {
              selectedValue &&
              <label
                htmlFor={name}
                className={`floating__label ${ERROR_CLASS}`}
                data-content={placeholder}
              >
                <span className="hidden__visually">{placeholder}</span>
              </label>
            }
          </Box>
        </InputGroup>
        <FormErrorMessage fontSize="12px">
          {errors[name] && errors[name].message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
}