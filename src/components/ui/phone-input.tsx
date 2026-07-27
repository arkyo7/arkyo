import { forwardRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  FlagImage,
  defaultCountries,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import { useTranslation } from "react-i18next";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type PhoneInputProps = {
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  defaultCountry?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

const PREFERRED = ["be", "fr", "pt", "br", "us", "de", "es", "gb", "nl", "it"];

const countries = [...defaultCountries].sort((a, b) => {
  const ca = parseCountry(a);
  const cb = parseCountry(b);
  const ia = PREFERRED.indexOf(ca.iso2);
  const ib = PREFERRED.indexOf(cb.iso2);
  if (ia !== -1 || ib !== -1) {
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  }
  return ca.name.localeCompare(cb.name);
});

/**
 * International phone field: single container matching the other form inputs,
 * searchable country selector and E.164 output. The dial code lives only in the
 * selector: the input holds the national number typed by the visitor.
 */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput(
  {
    value,
    onChange,
    onBlur,
    defaultCountry = "be",
    disabled,
    className,
    id,
    name,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedBy,
  },
  ref,
) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const { inputValue, country, setCountry, handlePhoneValueChange, inputRef } = usePhoneInput({
    defaultCountry,
    value: value ?? "",
    countries,
    disableDialCodeAndPrefix: true,
    onChange: ({ phone }) => onChange(phone),
  });

  return (
    <div
      className={cn(
        "flex h-9 w-full items-center gap-1 rounded-md border border-input bg-transparent pl-1.5 pr-3 text-base shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring md:text-sm",
        ariaInvalid && "border-destructive focus-within:ring-destructive",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      data-invalid={ariaInvalid ? "true" : undefined}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label={`${t("contact.phone.selectCountry")} (+${country.dialCode})`}
            className="inline-flex h-7 shrink-0 items-center gap-1 rounded-sm px-1.5 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none"
          >
            <FlagImage iso2={country.iso2} className="h-4 w-4 shrink-0" />
            <span className="tabular-nums text-muted-foreground">+{country.dialCode}</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" aria-hidden />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="z-[80] w-[min(20rem,calc(100vw-2rem))] p-0">
          <Command>
            <CommandInput placeholder={t("contact.phone.searchPlaceholder")} />
            <CommandList>
              <CommandEmpty>{t("contact.phone.noResults")}</CommandEmpty>
              <CommandGroup>
                {countries.map((raw) => {
                  const c = parseCountry(raw);
                  return (
                    <CommandItem
                      key={c.iso2}
                      value={`${c.name} +${c.dialCode} ${c.iso2}`}
                      onSelect={() => {
                        setCountry(c.iso2);
                        setOpen(false);
                        inputRef.current?.focus();
                      }}
                      className="gap-2"
                    >
                      <FlagImage iso2={c.iso2} className="h-4 w-4 shrink-0" />
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="tabular-nums text-muted-foreground">+{c.dialCode}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <input
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        id={id}
        name={name}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        disabled={disabled}
        value={inputValue}
        onChange={handlePhoneValueChange}
        onBlur={onBlur}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        className="h-full w-full min-w-0 bg-transparent text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
      />
    </div>
  );
});
