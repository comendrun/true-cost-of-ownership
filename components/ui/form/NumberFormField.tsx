/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";

export default function NumberFormField({
  control,
  errors,
  disabled,
  label,
  inputSuffix,
  name,
  formDescription,
}: {
  name: string;
  label: string;
  control: any;
  errors: any;
  disabled?: boolean;
  inputSuffix?: string;
  formDescription?: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => {
        return (
          <FormItem>
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel>{label}</FormLabel>
              <div className="col-span-3 flex w-full items-center gap-2">
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                    }}
                    // onChange={(e) => {
                    //   const { value } = e?.target;

                    //   if (/^\d*\.?\d{0,2}$/.test(value))
                    //     field.onChange(Number(value));
                    // }}
                    suffix={inputSuffix}
                  />
                </FormControl>
              </div>
            </div>
            <FormDescription>{formDescription}</FormDescription>
            <FormMessage>{errors?.[name]?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
}
