import { forwardRef } from "react";
import { PhoneInput as IntlPhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { cn } from "@/lib/utils";

type PhoneInputProps = {
  value?: string;
  onChange: (value: string | undefined) => void;
  defaultCountry?: string;
  className?: string;
  id?: string;
  name?: string;
  "aria-invalid"?: boolean;
};

/**
 * International phone input with country search, per-country placeholder
 * (mask), automatic flag/dial-code sync and E.164 output.
 */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput(
  { value, onChange, defaultCountry = "be", className, ...rest },
  ref,
) {
  return (
    <IntlPhoneInput
      defaultCountry={defaultCountry}
      value={value ?? ""}
      onChange={(phone) => onChange(phone || undefined)}
      forceDialCode
      preferredCountries={["be", "fr", "pt", "br", "us", "de", "es", "gb"]}
      ref={ref as never}
      inputProps={{ ...rest }}
      className={cn("arkyo-phone-input", className)}
    />
  );
});
