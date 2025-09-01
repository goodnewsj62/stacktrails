"use client";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { CiGlobe } from "react-icons/ci";

const AVAILABLE_LOCALES = ["en", "de", "es", "fr"]; // adjust to your supported locales

export default function LanguageSelector() {
  const t = useTranslations("LANGUAGE_SELECT");
  const router = useRouter();
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const LOCALE_LABELS: Record<string, string> = useMemo(
    () => ({
      en: t("ENGLISH"),
      fr: t("FRENCH"),
      es: t("SPANISH"),
      de: t("GERMAN"),
    }),
    []
  );

  const currentLocale = pathname.split("/")[1] || "en";

  const open = Boolean(anchorEl);
  const onOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const onClose = () => setAnchorEl(null);

  function buildNewPath(targetLocale: string) {
    const parts = pathname.split("/");
    if (parts[1] && AVAILABLE_LOCALES.includes(parts[1])) {
      parts[1] = targetLocale;
      return parts.join("/") || `/${targetLocale}`;
    }
    // no locale segment present, prefix it
    const p = pathname === "/" ? "" : pathname;
    return `/${targetLocale}${p}`;
  }

  const handleSelect = (locale: string) => {
    onClose();
    if (locale === currentLocale) return;
    const newPath = buildNewPath(locale);
    const qs = searchParams?.toString();
    router.push(qs ? `${newPath}?${qs}` : newPath);
  };

  return (
    <>
      <IconButton
        aria-label={t("CHANGE_LANGUAGE")}
        onClick={onOpen}
        size="large"
        color="inherit"
      >
        <CiGlobe />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        {AVAILABLE_LOCALES.map((loc) => (
          <MenuItem
            key={loc}
            selected={loc === currentLocale}
            onClick={() => handleSelect(loc)}
          >
            {LOCALE_LABELS[loc] ?? loc}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
