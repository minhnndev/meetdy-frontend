import React from "react";
import { useController, useFormContext } from "react-hook-form";

import { Form } from "@douyinfe/semi-ui";
import { InputProps } from "@douyinfe/semi-ui/lib/es/input";

const FormInput = Form.Input;
interface InputFormHookProps extends InputProps {
  label: string | { text: string; extra: React.ReactNode };
  name: string;
  rules: any;
  defaultValue?: any;
}

const InputFormHook: React.FC<InputFormHookProps> = ({
  label,
  name,
  rules,
  defaultValue,
  ...props
}) => {
  const formContext = useFormContext();
  const { formState } = formContext;
  const { field } = useController({ name, rules, defaultValue });

  return (
    <FormInput label={label} field={name} value={field.value} {...props} />
  );
};

export default InputFormHook;
