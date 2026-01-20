"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeFlags, type Locale } from "@/i18n/config";
import { Button } from "@moni/ui/components/ui/button";

export function LanguageToggle() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  // Get the other locale
  const otherLocale: Locale = locale === "en" ? "zh" : "en";

  const switchLocale = (newLocale: Locale) => {
    // Replace the current locale in the pathname with the new one
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => switchLocale(otherLocale)}
      className="h-8 px-2 rounded-xl hover:bg-muted/60 gap-1.5"
      title={`Switch to ${otherLocale === "en" ? "English" : "中文"}`}
    >
      <span className="text-sm">{localeFlags[locale]}</span>
      <span className="text-xs text-muted-foreground hidden sm:inline">
        {otherLocale === "en" ? "EN" : "中文"}
      </span>
    </Button>
  );
}
