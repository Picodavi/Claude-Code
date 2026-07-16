"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useT, useLang } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { brand, waTemplate } from "@/content/i18n";

export function Contact() {
  const t = useT();
  const { lang } = useLang();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const tpl = waTemplate[lang] ?? waTemplate.es;
    const text = tpl
      .replace("{name}", name.trim() || "—")
      .replace("{type}", type.trim() || "—")
      .replace("{business}", type.trim() || "—")
      .replace("{message}", [contact.trim(), message.trim()].filter(Boolean).join(" · "));
    window.open(
      `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener",
    );
  }

  const field =
    "mt-1 w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-pine";

  return (
    <Section id="contact">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div>
          <SectionHeader
            tagKey="contact.tag"
            headingKey="contact.heading"
            leadKey="contact.lead"
          />
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <label className="block text-sm font-medium text-text">
              {t("contact.l1")}
              <input
                className={field}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("contact.ph1")}
                required
              />
            </label>
            <label className="block text-sm font-medium text-text">
              {t("contact.l2")}
              <input
                className={field}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={t("contact.ph2")}
              />
            </label>
            <label className="block text-sm font-medium text-text">
              {t("contact.l3")}
              <input
                className={field}
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder={t("contact.ph3")}
              />
            </label>
            <label className="block text-sm font-medium text-text">
              {t("contact.l4")}{" "}
              <span className="text-muted">{t("contact.l4opt")}</span>
              <textarea
                className={`${field} min-h-24`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("contact.ph4")}
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-pine px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pine-700"
            >
              {t("contact.submit")}
            </button>
            <p className="text-xs text-muted">
              {t("contact.privacyPre")}
              <Link className="underline hover:text-pine" href="/legal/privacidad/">
                {t("contact.privacyLink")}
              </Link>
              {t("contact.privacyPost")}
            </p>
          </form>
        </div>

        <aside className="self-start rounded-3xl border border-border bg-surface p-8">
          <p className="font-display text-xl font-bold text-ink">
            {t("contact.sideTitle")}
          </p>
          <dl className="mt-6 space-y-5 text-sm">
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-gold-800">
                {t("contact.sideEmail")}
              </dt>
              <dd className="mt-1">
                <a className="text-ink hover:text-pine" href={`mailto:${brand.email}`}>
                  {brand.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-gold-800">
                {t("contact.sideWhats")}
              </dt>
              <dd className="mt-1">
                <a
                  className="text-ink hover:text-pine"
                  href={`https://wa.me/${brand.whatsapp}`}
                  target="_blank"
                  rel="noopener"
                >
                  {brand.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-gold-800">
                {t("contact.sideArea")}
              </dt>
              <dd className="mt-1 text-text">{t("contact.sideAreaVal")}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-gold-800">
                {t("contact.sideResp")}
              </dt>
              <dd className="mt-1 text-text">{brand.responseTime}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}
