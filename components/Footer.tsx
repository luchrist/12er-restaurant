import { InstagramLogo, FacebookLogo, TiktokLogo } from "@phosphor-icons/react/dist/ssr";
import config from "@/config/restaurant";

const socials = [
  { key: "instagram" as const, label: "Instagram", Icon: InstagramLogo },
  { key: "facebook" as const, label: "Facebook", Icon: FacebookLogo },
  { key: "tiktok" as const, label: "TikTok", Icon: TiktokLogo }
];

function getSocialHref(key: "instagram" | "facebook" | "tiktok"): string {
  const value = config.socialMedia[key];
  if (!value) return "#";
  if (key === "instagram") return `https://instagram.com/${value.replace("@", "")}`;
  if (key === "facebook") return `https://facebook.com/${value}`;
  return `https://tiktok.com/${value.replace("@", "@")}`;
}

export function Footer() {
  return (
    <footer className="relative bg-bone pb-10 pt-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col gap-12 border-t border-ink/15 pt-10 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-5">
            <img
              src="/assets/logo-mark.png"
              alt={`${config.name} Logo`}
              className="h-20 w-auto md:h-28"
            />
            <div className="font-display text-[36px] leading-none tracking-tight text-ink md:text-[64px]">
              {config.name}
              <span className="text-messing-500">.</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:flex md:items-end md:gap-12">
            <div>
              <div className="flex items-center gap-1">
                <span className="block h-3 w-5 bg-wald-500" />
                <span className="block h-3 w-5 bg-bone border border-ink/20" />
                <span className="block h-3 w-5 bg-messing-400" />
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">Telefon</div>
              <a
                href={config.contact.phone ? `tel:${config.contact.phone.replace(/\s/g, "")}` : "#"}
                className="mt-3 block font-mono text-[12px] tracking-[0.05em] text-ink hover:text-wald-500"
              >
                {config.contact.phone}
              </a>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">{config.address.city}</div>
              <div className="mt-3 font-mono text-[12px] tracking-[0.05em] text-ink">{config.address.street}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">Sozial</div>
              <ul className="mt-3 flex items-center gap-2">
                {socials
                  .filter(({ key }) => !config.socialMedia.hidden[key])
                  .map(({ key, label, Icon }) => (
                    <li key={key}>
                      <a
                        href={getSocialHref(key)}
                        aria-label={label}
                        className="group inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-all duration-300 hover:border-ink hover:bg-ink hover:text-bone active:scale-[0.94]"
                      >
                        <Icon size={14} weight="regular" />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 border-t border-ink/10 pt-6 md:flex-row md:items-center md:justify-between">
          <a
            href="mailto:luca@creatare.de"
            className="group inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.22em] text-ink transition-colors hover:text-wald-500"
          >
            <span className="block h-[6px] w-[6px] rotate-45 bg-wald-500" />
            <span>
              Erstellt von{" "}
              <span className="font-display text-[15px] normal-case tracking-tight text-ink group-hover:text-wald-500">
                Luca Christ
              </span>
              <span className="ml-2 text-ink/55 normal-case tracking-normal group-hover:text-wald-500">
                · luca@creatare.de
              </span>
            </span>
          </a>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45 md:flex-row md:items-center">
          <span>&copy; {new Date().getFullYear()} {config.name}. Alle Rechte vorbehalten.</span>
          <span className="flex gap-3">
            <a href="/impressum" className="transition-colors hover:text-ink">Impressum</a>
            <span>&middot;</span>
            <a href="/datenschutz" className="transition-colors hover:text-ink">Datenschutz</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
