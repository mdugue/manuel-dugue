import Head from "next/head";

import Sheet from "../src/components/Sheet";
import Home from "./[[...index]]";

export default function Legal() {
  return (
    <>
      <Home />
      <Head>
        <title>legal notice – Manuel Dugué</title>
      </Head>
      <Sheet title="Impressum">
        <div>
          <h2>Hinweis nach § 5 TMG</h2>

          <p>
            Die nachstehenden Informationen enthalten die gesetzlich
            vorgesehenen Pflichtangaben zur Anbieterkennzeichnung auf der
            Internet-Präsenz von&nbsp;Manuel Dugué.
          </p>

          <h2>Anbieter</h2>

          <p>Manuel Fridolin Dugué</p>

          <p>Görlitzer Str. 23, 01099 Dresden</p>

          <p>51.066050&nbsp;13.754475</p>

          <p>
            <a href="mailto:post@manueldugue.de">post@manueldugue.de</a>
          </p>

          <p>USt-IdNr:&nbsp;DE272030502</p>

          <p>&nbsp;</p>

          <h2>Copyright</h2>

          <p>
            Texte, Bilder, Grafiken sowie Gestaltung und Layout dieser Seiten
            unterliegen weltweitem Urheberrecht. Unerlaubte Verwendung,
            Reproduktion oder Weitergabe einzelner Inhalte oder kompletter
            Seiten werden sowohl straf- als auch zivilrechtlich verfolgt. Dabei
            sind allein nach deutschem Zivilrecht Unterlassung und
            Schadenersatz, Überlassung oder Vernichtung der
            Vervielfältigungsvorrichtungen sowie die öffentliche Bekanntmachung
            des Urteils möglich.
            <br />
            Alle Rechte vorbehalten. All rights reserved.
          </p>

          <p>
            Diese Website benutzt Google Analytics, einen Webanalysedienst der
            Google Inc. („Google“). Google Analytics verwendet sog. „Cookies“,
            Textdateien, die auf Ihrem Computer gespeichert werden und die eine
            Analyse der Benutzung der Website durch Sie ermöglichen. Die durch
            den Cookie erzeugten Informationen über Ihre Benutzung dieser
            Website werden in der Regel an einen Server von Google in den USA
            übertragen und dort gespeichert. Im Falle der Aktivierung der
            IP-Anonymisierung auf dieser Webseite, wird Ihre IP-Adresse von
            Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union
            oder in anderen Vertragsstaaten des Abkommens über den Europäischen
            Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle
            IP-Adresse an einen Server von Google in den USA übertragen und dort
            gekürzt. Im Auftrag des Betreibers dieser Website wird Google diese
            Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um
            Reports über die Websiteaktivitäten zusammenzustellen und um weitere
            mit der Websitenutzung und der Internetnutzung verbundene
            Dienstleistungen gegenüber dem Websitebetreiber zu erbringen. Die im
            Rahmen von Google Analytics von Ihrem Browser übermittelte
            IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt.
            Sie können die Speicherung der Cookies durch eine entsprechende
            Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch
            darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche
            Funktionen dieser Website vollumfänglich werden nutzen können. Sie
            können darüber hinaus die Erfassung der durch das Cookie erzeugten
            und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer
            IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch
            Google verhindern, indem sie das unter dem folgenden Link
            (http://tools.google.com/dlpage/gaoptout?hl=de) verfügbare
            Browser-Plugin herunterladen und installieren.
          </p>

          <p>
            Nähere Informationen hierzu finden Sie unter
            http://tools.google.com/dlpage/gaoptout?hl=de bzw. unter
            http://www.google.com/intl/de/analytics/privacyoverview.html
            (allgemeine Informationen zu Google Analytics und Datenschutz). Wir
            weisen Sie darauf hin, dass auf dieser Webseite Google Analytics um
            den Code „gat._anonymizeIp();“ erweitert wurde, um eine
            anonymisierte Erfassung von IP-Adressen (sog. IP-Masking) zu
            gewährleisten.
          </p>

          <p>
            Auf unseren Seiten sind Plugins des sozialen Netzwerks Facebook,
            1601 South California Avenue, Palo Alto, CA 94304, USA integriert.
            Die Facebook-Plugins erkennen Sie an dem Facebook-Logo oder dem
            "Like-Button" ("Gefällt mir“) auf unserer Seite. Eine Übersicht über
            die Facebook-Plugins finden Sie hier:
            http://developers.facebook.com/docs/plugins/ Wenn Sie unsere Seiten
            besuchen, wird über das Plugin eine direkte Verbindung zwischen
            Ihrem Browser und dem Facebook-Server hergestellt. Facebook erhält
            dadurch die Information, dass Sie mit Ihrer IP-Adresse unsere Seite
            besucht haben. Wenn Sie den Facebook „Like-Button“ anklicken während
            Sie in Ihrem Facebook-Account eingeloggt sind, können Sie die
            Inhalte unserer Seiten auf Ihrem Facebook-Profil verlinken. Dadurch
            kann Facebook den Besuch unserer Seiten Ihrem Benutzerkonto
            zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten
            keine Kenntnis vom Inhalt der übermittelten Daten sowie deren
            Nutzung durch Facebook erhalten. Weitere Informationen hierzu finden
            Sie in der Datenschutzerklärung von facebook unter&nbsp;
            <a href="http://de-de.facebook.com/policy.php">
              http://de-de.facebook.com/policy.php
            </a>
          </p>

          <p>
            Wenn Sie nicht wünschen, dass Facebook den Besuch unserer Seiten
            Ihrem Facebook-Nutzerkonto zuordnen kann, loggen Sie sich bitte aus
            Ihrem Facebook-Benutzerkonto aus.
          </p>
        </div>
      </Sheet>
    </>
  );
}
