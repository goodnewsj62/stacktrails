"use client";

import CenterOnLgScreen from "@/common/utils/CenterOnLgScreen";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CSSProperties } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

type params = {
  className?: string;
  style?: CSSProperties;
};

export default function ClientFooter({ className, style }: params) {
  const t = useTranslations("PUBLIC_FOOTER");
  const year = new Date().getFullYear();

  return (
    <footer className={`bg-base ${className}`} style={style}>
      <CenterOnLgScreen className="py-8 ">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 ">
          {/* Layer 1: logo + navs */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/black-logo.svg"
                alt="StackTrails"
                width={48}
                height={48}
              />
              <span className="font-semibold text-lg">StackTrails</span>
            </div>

            <nav aria-label="Footer primary navigation">
              <ul className="flex flex-wrap gap-6 text-sm">
                <li>
                  <a href="/about" className="hover:underline">
                    {t("ABOUT")}
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:underline">
                    {t("BLOG")}
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    {t("CONTACT")}
                  </a>
                </li>
                <li>
                  <a href="/support" className="hover:underline">
                    {t("SUPPORT")}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Layer 2: social icons */}
          <div className="flex justify-center gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            >
              <SiTiktok />
            </a>
            <a
              href="#"
              aria-label="X"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            >
              <FaTwitter />
            </a>
          </div>

          {/* Layer 3: copyright + utility nav */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700/90">
              © {year} Stack Trails — {t("RIGHTS")}
            </div>

            <nav aria-label="Footer legal">
              <ul className="flex gap-4 text-sm">
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-700 hover:text-[var(--color-primary)]"
                  >
                    {t("PRIVACY")}
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-gray-700 hover:text-[var(--color-primary)]"
                  >
                    {t("Terms")}
                  </a>
                </li>
                <li>
                  <a
                    href="/faqs"
                    className="text-gray-700 hover:text-[var(--color-primary)]"
                  >
                    {t("FAQs")}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </CenterOnLgScreen>
    </footer>
  );
}
