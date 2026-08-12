import config from "@/config/restaurant";
import { LegalLayout } from "@/components/LegalLayout";

export default function ImpressumPage() {
  return (
    <LegalLayout label="Impressum" title="Impressum">
      <Section title="Angaben gemäß § 5 TMG">
        <p>{config.name}</p>
        <p>{config.address.street}</p>
        <p>{config.address.city}</p>
        <p>{config.address.country}</p>
      </Section>

      <Section title="Kontakt">
        <p>Telefon: {config.contact.phone}</p>
        {config.contact.email && <p>E-Mail: {config.contact.email}</p>}
      </Section>

      <Section title="Technische Umsetzung">
        <p>
          Konzept, Design &amp; Entwicklung:{" "}
          <a
            href="mailto:luca@creatare.de"
            className="text-wald-500 underline decoration-wald-500/30 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            Luca Christ
          </a>{" "}
          · luca@creatare.de
        </p>
      </Section>

      <Section title="Vertreten durch">
        <p>{config.legal.ownerName || config.name}</p>
      </Section>

      {config.legal.vatId && (
        <Section title="Umsatzsteuer-ID">
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
            <br />
            {config.legal.vatId}
          </p>
        </Section>
      )}

      <Section title="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV">
        <p>{config.legal.responsiblePerson || config.legal.ownerName || config.name}</p>
        <p>{config.address.street}</p>
        <p>{config.address.city}</p>
      </Section>

      <Section title="Haftungsausschluss">
        <h4>Haftung für Inhalte</h4>
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
          die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
          jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
          Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
          gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
          forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>

        <h4>Haftung für Links</h4>
        <p>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich.
        </p>
      </Section>

      <Section title="Urheberrecht">
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers.
        </p>
      </Section>
    </LegalLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-[22px] tracking-tight text-ink md:text-[26px]">
        {title}
      </h3>
      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink/70 [&>h4]:mt-6 [&>h4]:font-mono [&>h4]:text-[11px] [&>h4]:uppercase [&>h4]:tracking-[0.22em] [&>h4]:text-ink/55">
        {children}
      </div>
    </div>
  );
}
