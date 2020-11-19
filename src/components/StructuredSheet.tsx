import { largeBreakpoint } from "../../pages/[[...index]]";
import Sheet from "./Sheet";

export type StructuredSheetProps = {
  title: string;
  document: {
    sections: {
      sectionTitle: string;
      entries: {
        title: string;
        subtitle?: string;
        description: string;
        links?: string[];
      }[];
    }[];
  };
};

export default function StructuredSheet(props: StructuredSheetProps) {
  const { document, title } = props;
  return (
    <>
      <Sheet title={title}>
        {document.sections.map((section) => (
          <section key={section.sectionTitle}>
            <h1 className="sectionTitle">{section.sectionTitle}</h1>
            {section.entries.map((entry, index) => (
              <div className="sectionEntry" key={index}>
                <h2>{entry.title}</h2>
                <div className="entryContent">
                  {entry.subtitle && <h4>{entry.subtitle}</h4>}
                  {entry.description.split("\n").map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                  {entry.links?.map((link) => (
                    <a
                      key={link}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      link
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </Sheet>
      <style jsx global>
        {`
          .sectionEntry {
            display: flex;
            margin-bottom: 1em;
            page-break-inside: avoid;
            flex-direction: column;
          }

          @media (min-width: ${largeBreakpoint}) {
            .sectionEntry {
              flex-direction: row;
            }
          }

          @media print {
            .sectionEntry {
              flex-direction: row;
              margin-bottom: 0.5em;
            }
          }

          .sectionEntry h2 {
            flex: 0 0 20%;
            margin: 0 2em 0 0;
            font-size: 1em;
            hyphens: auto;
          }

          @media (min-width: ${largeBreakpoint}) {
            .sectionEntry h2 {
              text-align: right;
            }
          }

          .entryContent {
            flex: 1 0 0;
            page-break-inside: avoid;
          }

          .entryContent p {
            margin: 0;
          }

          .entryContent a {
            color: #206c5f;
            font-family: "Bungee Hairline", "SF Mono", "Ubuntu Mono", Consolas,
              Menlo, monospace, cursive;
            font-weight: bold;
            float: right;
          }

          @media print {
            .entryContent a::after {
              content: ": " attr(href);
              font-family: Montserrat, sans-serif;
              font-weight: normal;
              font-size: 12px;
            }
          }
        `}
      </style>
    </>
  );
}
