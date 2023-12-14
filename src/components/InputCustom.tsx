import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Input } from "@nextui-org/react";

interface InputCustomProps<T extends FieldValues> {
  autoComplete?: string;
  className?: string;
  control: Control<T>;
  defaultValue?: any;
  label?: string;
  name: Path<T>;
  placeholder?: string;
  type?: string;
  variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
}

const InputCustom = <T extends FieldValues>(props: InputCustomProps<T>) => {
  return (
    <Controller
      control={props.control}
      defaultValue={props.defaultValue}
      name={props.name}
      render={({
        field: { onChange, value },
        fieldState: { invalid, error },
      }) => (
        <Input
          autoComplete={props.autoComplete}
          className={props.className}
          classNames={{ inputWrapper: "bg-white" }}
          errorMessage={error?.message}
          isInvalid={invalid}
          label={props.label}
          onChange={(event) => {
            if (props.type === "number") {
              const valueAux = parseInt(event.target.value, 10);
              onChange(isNaN(valueAux) ? null : valueAux);
            } else {
              onChange(event.target.value);
            }
          }}
          onDrop={(event) => {
            if (props.type === "number") {
              const droppedData = event.dataTransfer.getData("text/plain");
              if (droppedData.includes("e") || droppedData.includes(".")) {
                event.preventDefault();
              }
            }
          }}
          onKeyDown={(event) => {
            if (props.type === "number") {
              if (event.key === "e" || event.key === ".") {
                event.preventDefault();
              }
            }
          }}
          onPaste={(event) => {
            if (props.type === "number") {
              const pastedData = event.clipboardData.getData("text/plain");
              if (pastedData.includes("e") || pastedData.includes(".")) {
                event.preventDefault();
              }
            }
          }}
          placeholder={props.placeholder}
          type={props.type}
          value={value}
          variant={props.variant}
        />
      )}
    />
  );
};

export default InputCustom;
