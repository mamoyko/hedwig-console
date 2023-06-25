import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Link } from "@chakra-ui/react";
import TextInput from "../../common/TextInput";

import { ViewIcon, ViewOffIcon } from "../../../assets/images/icons";

const LoginForm = ({
  onSubmit
}) => {
  const [show, setShow] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        name="username"
        type="email"
        placeholder="Email Address"
        errors={errors}
        register={register}
        validations={{
          required: "Please enter an Email Address"
        }}
      />

      <TextInput
        name="password"
        placeholder="Password"
        type={show ? "text" : "password"}
        errors={errors}
        register={register}
        icon={
          <img src={show ? ViewIcon : ViewOffIcon} alt="me" width={22} height={19} onClick={() => setShow(!show)} data-testid="show-password-btn" />
        }
        validations={{
          required: "Please enter your password"
        }}
      />

      <Link color="text.link" fontSize="16px" fontWeight={500} textDecoration="underline" href="#">
        Request for an account
      </Link>

      <Button mt="40px" w="full" bg="button.primary" borderRadius="100px" isLoading={isSubmitting} type="submit">
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;