import React from "react";
import { useController, useFormContext } from "react-hook-form";

import { Input } from "meetdy/core/atoms";
import { InputProps } from "@douyinfe/semi-ui/lib/es/input";

interface InputFormHookProps extends InputProps {
  name: string;
  rules: any;
}

const InputFormHook: React.FC<InputFormHookProps> = ({
  name,
  rules,
  defaultValue,
  ...props
}) => {
  const formContext = useFormContext();
  const { formState } = formContext;
  const { field } = useController({ name, rules, defaultValue });

  return <Input {...props} />;
};

export default InputFormHook;
