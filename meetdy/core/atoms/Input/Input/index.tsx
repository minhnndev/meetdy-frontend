import { Input as InputSemi } from "@douyinfe/semi-ui";
import { InputProps } from "@douyinfe/semi-ui/lib/es/input";

const Input = ({ ...props }: InputProps) => {
  return <InputSemi {...props} />;
};

export type { InputProps };

export default Input;
