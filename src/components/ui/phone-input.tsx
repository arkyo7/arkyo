import { forwardRef, useState } from "react";
import PhoneInputWithCountry, { type Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

type PhoneInputProps = {
  value?: string;
  onChange: (value: string | undefined) => void;
  defaultCountry?: Country;
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
  // Control country state internally so the flag + calling code always
  // stay in sync with what the user selects in the dropdown, even when
  // the `value` is empty and cannot derive a country on its own.
  const [country, setCountry] = useState<Country | undefined>(defaultCountry);

  return (
    <PhoneInputWithCountry
      international
      countryCallingCodeEditable={false}
      country={country}
      onCountryChange={(c) => setCountry(c ?? defaultCountry)}
      value={value}
      onChange={(v) => onChange(v)}
      placeholder={placeholder}
      numberInputProps={{
        ref: ref as never,
        className:
          "flex h-10 w-full min-w-0 rounded-md bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground",
        ...rest,
      }}
      className={cn(
        "arkyo-phone-input flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-3 text-sm shadow-xs transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        className,
      )}
    />
  );
});
