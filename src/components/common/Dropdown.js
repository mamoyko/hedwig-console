import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Box
} from "@chakra-ui/react";
import { ArrowDropDownIcon } from "../../assets/images/icons";

const Dropdown = ({
  width,
  height,
  defaultValue = "",
  options,
  setValue
}) => {
  const inputRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const handleItemClick = (selected) => {
    setSelectedValue(selected);
    setValue(selected.value);
  };

  const getDisplayValue = () => {
    if (selectedValue) {
      return selectedValue.text;
    }
  };

  const renderOptions = (option) => {
    const isSelected = selectedValue && selectedValue.value === option.value;

    return (
      <Flex
        key={option.value}
        className={`dropdown__item ${isSelected ? "dropdown__item-selected" : ""}`}
        justifyContent="center"
        alignItems="center"
        onClick={() => handleItemClick(option)}
        p="13px"
        textAlign="center"
      >
        <span>{option.text}</span>
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
      const selected = options.find(opt => opt.value == defaultValue);
      handleItemClick(selected);
    }
  }, []);

  return (
    <Box w={width} h={height} border="1px solid #E0E4E6" cursor="pointer" borderRadius="2px">
      <Flex ref={inputRef} className="" onClick={handleInputClick} w="full" h="full" pl="8px" alignItems="center" justifyContent="space-between">
        <Box className="dropdown__selected-value" color="#A8ADB0">
          {getDisplayValue()}
        </Box>
        <Box className="dropdown__tools">
          <Box className="dropdown__tool">
            <img src={ArrowDropDownIcon} alt="Dropdown" width={26} height={26} />
          </Box>
        </Box>
      </Flex>

      {
        showMenu &&
        <Box className="dropdown__menu" position="unset" w={width} transform="translateX(-1px)">
          {
            options.map((option) => renderOptions(option))
          }
        </Box>
      }
    </Box>
  );
};

export default Dropdown;