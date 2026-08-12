import config from "@/config/restaurant";
import { LegalLayout } from "@/components/LegalLayout";

export default function DatenschutzPage() {
  return (
    <LegalLayout label="Datenschutz" title="Datenschutz">
      <Section title="1. Verantwortlicher">
        <p>
          {config.name}
          <br />
          {config.address.street}
          <br />
          {config.address.city}
          <br />
          E-Mail: {config.contact.email}
          <br />
          Telefon: {config.contact.phone}
        </p>
      </Section>

      <Section title="2. Erhebung und Speicherung personenbezogener Daten">
        <p>
          Beim Besuch unserer Website werden automatisch Informationen durch den
          Browser übermittelt und in Server-Logfiles gespeichert. Dies umfasst
          Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL,
          Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und
          IP-Adresse. Eine Zusammenführung dieser Daten mit anderen Datenquellen
          wird nicht vorgenommen.
        </p>
      </Section>

      <Section title="3. Reservierungsformular">
        <p>
          Wenn Sie über unser Reservierungsformular eine Anfrage stellen,
          erheben wir die von Ihnen angegebenen Daten (Name, E-Mail, Telefon,
          gewünschtes Datum und Uhrzeit, Personenanzahl sowie ggf. eine
          Nachricht). Diese Daten verwenden wir ausschließlich zur Bearbeitung
          Ihrer Reservierungsanfrage. Die Rechtsgrundlage ist Art. 6 Abs. 1
          lit. b DSGVO (Vertragsanbahnung). Ihre Daten werden nach Ablauf des
          Reservierungszeitraums gelöscht, sofern keine gesetzlichen
          Aufbewahrungspflichten bestehen.
        </p>
      </Section>

      <Section title="4. Kontaktaufnahme">
        <p>
          Bei der Kontaktaufnahme per E-Mail oder Telefon werden die von Ihnen
          mitgeteilten Daten (Name, Anfrage, ggf. Telefonnummer und
          E-Mail-Adresse) zur Bearbeitung Ihres Anliegens gespeichert. Diese
          Daten werden gelöscht, sobald sie für die Erreichung des Zweckes
          ihrer Erhebung nicht mehr erforderlich sind.
        </p>
      </Section>

      <Section title="5. Ihre Rechte">
        <p>Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
        <ul>
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Löschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
        </ul>
        <p>
          Zur Ausübung Ihrer Rechte wenden Sie sich bitte an{" "}
          {config.contact.email}.
        </p>
      </Section>

      <Section title="6. Beschwerderecht">
        <p>
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über
          die Verarbeitung Ihrer personenbezogenen Daten durch uns zu
          beschweren.
        </p>
      </Section>

      <Section title="7. Cookies">
        <p>
          Unsere Website verwendet keine Cookies und keine Tracking- oder
          Analyse-Tools.
        </p>
      </Section>

      <Section title="8. Änderungen">
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie
          stets den aktuellen rechtlichen Anforderungen entspricht oder um
          Änderungen unserer Leistungen umzusetzen.
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
      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink/70 [&>ul]:list-inside [&>ul]:list-disc [&>ul]:space-y-1">
        {children}
      </div>
    </div>
  );
}
