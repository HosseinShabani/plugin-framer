import * as SelectPrimitive from "@radix-ui/react-select";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { RegisterOptions } from "react-hook-form";

export enum INPUT_TYPE {
  TEXT = "text",
  SELECT = "select",
  SWITCH = "switch",
  NUMBER = "number",
  IMAGES = "images",
}

export type InputType = "text" | "select" | "switch" | "number" | "images";

type General = {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  default?: any;
  rules?: Omit<
    RegisterOptions<any, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabledWhen?:
    | {
        field: string;
        operator: "equals" | "notEquals";
        value: string | number | boolean;
      }
    | {};
};

export type TextInputType = General & {
  props?: Omit<React.ComponentProps<"input">, "value">;
};

export type NumberInputType = General & {
  maximum?: number;
  minimum?: number;
  props?: Omit<React.ComponentProps<"input">, "value">;
};

export type SwitchInputType = Omit<General, "placeholder"> & {
  props?: React.ComponentProps<typeof SwitchPrimitive.Root>;
};

export type SelectInputType = General & {
  options?: { title: string; value: any; disabled?: boolean }[];
  props?: Omit<React.ComponentProps<typeof SelectPrimitive.Trigger>, "value"> & {
    size?: "sm" | "default";
  };
};

export type ImagesInputType = General & {
  accept?: string;
  subPlaceholder?: string;
};

export type FormInputTypes =
  | (TextInputType & {
      type: INPUT_TYPE.TEXT;
    })
  | (SelectInputType & {
      type: INPUT_TYPE.SELECT;
    })
  | (SwitchInputType & {
      type: INPUT_TYPE.SWITCH;
    })
  | (ImagesInputType & {
      type: INPUT_TYPE.IMAGES;
    })
  | (TextInputType & {
      type: INPUT_TYPE.NUMBER;
    });

export type GeneralInputType = (
  | TextInputType
  | SelectInputType
  | SwitchInputType
  | NumberInputType
  | ImagesInputType
) & {
  type: InputType;
};
