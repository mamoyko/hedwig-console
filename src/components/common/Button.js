import React from "react";
import {
  Button as ChakraButton
} from "@chakra-ui/react";

const Button = ({ icon, rightIcon, variant = "default", onClick, children, ...rest }) => {
  const variants = {
    default: {
      backgroundColor: "button.primary",
      color: "white",
      borderColor: "none",
      borderWidth: 0,
      hover: {
        bg: "bg.primary"
      }
    },
    outlined: {
      backgroundColor: "none",
      color: "bg.secondary",
      borderColor: "bg.secondary",
      borderWidth: 2,
      hover: {
        boxShadow: "0px -2px 8px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(115, 117, 118, 0.2)"
      }
    }
  };

  return (
    <ChakraButton
      bg={variants[variant].backgroundColor}
      color={variants[variant].color}
      py="16px"
      px="24px"
      h="48px"
      w="240px"
      colorScheme="none"
      borderColor={variants[variant].borderColor}
      borderWidth={variants[variant].borderWidth}
      borderRadius="100px"
      alignSelf={"center"}
      _hover={variants[variant].hover}
      leftIcon={icon ? <img src={icon} alt="icon" width={20} height={20} /> : null}
      rightIcon={rightIcon ? <img src={rightIcon} alt="icon" width={20} height={20} /> : null}
      onClick={onClick}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;