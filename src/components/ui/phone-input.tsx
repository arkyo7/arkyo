import { forwardRef } from "react";
import PhoneInputWithCountry from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

type PhoneInputProps = {
  value?: string;
  onChange: (value: string | undefined) => void;
  defaultCountry?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  name?: string;
  "aria-invalid"?: boolean;
};

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput(
  { value, onChange, defaultCountry = "BE", placeholder, className, ...rest },
  ref,
) {
  return (
    <PhoneInputWithCountry
      international
      countryCallingCodeEditable={false}
      defaultCountry={defaultCountry as never}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      numberInputProps={{
        ref: ref as never,
        className:
          "flex h-10 w-full min-w-0 rounded-md bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground",
        ...rest,
      }}
      className={cn(
        "nexo-phone-input flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-3 text-sm shadow-xs transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        className,
      )}
    />
  );
});
