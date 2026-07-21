"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useT, useLang } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { brand, waTemplate } from "@/content/i18n";
import { trackEvent, type ContactIntent } from "@/lib/analytics";

export function Contact() {
  const t = useT();
  const { lang } = useLang();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const formStarted = useRef(false);

  useEffect(() => {
    function onContactIntent(event: Event) {
      const detail = (event as CustomEvent<{ intent?: ContactIntent }>).detail;
      if (detail?.intent === "audit") setType(t("contact.intentAudit"));
      if (detail?.intent === "plan_help") setType(t("contact.intentPlan"));
    }

    window.addEventListener("picodavi:contact-intent", onContactIntent);
    return () =>
      window.removeEventListener("picodavi:contact-intent", onContactIntent);
  }, [t]);

  function onFormFocus() {
    if (formStarted.current) return;
    formStarted.current = true;
    trackEvent("lead_form_started", { placement: "contact" });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const tpl = waTemplate[lang] ?? waTemplate.es;
    const text = tpl
      .replace("{name}", name.trim() || "—")
      .replace("{type}", type.trim() || "—")
      .replace("{message}", message.trim());
    const url = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`;
    setFallbackUrl(null);
    trackEvent("lead_form_submitted", { placement: "contact", language: lang });

    const popup = window.open("", "_blank");
    if (!popup) {
      setFallbackUrl(url);
      trackEvent("lead_form_open_failed", { placement: "contact", language: lang });
      return;
    }

    popup.opener = null;
    popup.location.replace(url);
    trackEvent("contact_clicked", { placement: "contact_form", channel: "whatsapp" });
  }

  function onDirectContact(channel: "email" | "whatsapp") {
    trackEvent("contact_clicked", { placement: "contact_details", channel });
  }

  const field =
    "mt-1 w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-pine focus-visible:ring-2 focus-visible:ring-pine/20";

  return (
    <Section id="contact">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div>
          <SectionHeader
            tagKey="contact.tag"
            headingKey="contact.heading"
            leadKey="contact.lead"
          />
          <form onSubmit={onSubmit} onFocusCapture={onFormFocus} className="mt-8 space-y-4">
            <label className="block text-sm font-medium text-text">
              {t("contact.l1")}
              <input
                className={field}
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("contact.ph1")}
                maxLength={80}
                required
              />
            </label>
            <label className="block text-sm font-medium text-text">
              {t("contact.l3")}
              <input
                className={field}
                name="need"
                autoComplete="off"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder={t("contact.ph3")}
                maxLength={160}
                required
              />
            </label>
            <label className="block text-sm font-medium text-text">
              {t("contact.l4")}{" "}
              <span className="text-muted">{t("contact.l4opt")}</span>
              <textarea
                className={`${field} min-h-24`}
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("contact.ph4")}
                maxLength={500}
              />
            </label>
            <button
              type="submit"
              aria-describedby="whatsapp-note"
              className="w-full rounded-full bg-pine px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pine-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine"
            >
              {t("contact.submit")}
            </button>
            <p id="whatsapp-note" className="text-xs leading-relaxed text-muted">
              {t("contact.whatsappNote")}
            </p>
            {fallbackUrl ? (
              <p role="status" aria-live="polite" className="rounded-xl border border-gold/60 bg-gold/10 p-3 text-sm text-text">
                {t("contact.popupBlocked")} {" "}
                <a
                  className="font-semibold text-pine underline underline-offset-2"
                  href={fallbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("contact.popupLink")}
                </a>
              </p>
            ) : null}
            <p className="text-xs text-muted">
              {t("contact.privacyPre")}
              <Link
                className="underline hover:text-pine"
                href="/legal/privacidad/"
                prefetch={false}
              >
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
                <a
                  className="text-ink hover:text-pine"
                  href={`mailto:${brand.email}`}
                  onClick={() => onDirectContact("email")}
                >
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
                  rel="noopener noreferrer"
                  onClick={() => onDirectContact("whatsapp")}
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
              <dd className="mt-1 text-text">{t("contact.sideRespVal")}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}
