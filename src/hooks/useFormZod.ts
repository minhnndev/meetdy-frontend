import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useFormZod = ({ resolver, ...props }) => {
  const form = useForm({
    ...props,
    mode: "onChange",
    resolver: zodResolver(resolver),
  });
  return form;
};
