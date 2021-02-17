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
          <section key={section.sectionTitle} className="py-4">
            <h1 className="text-lg font-inline text-gradient bg-gradient-to-tr from-yellow-400 to-yellow-200">
              {section.sectionTitle}
            </h1>
            {section.entries.map((entry, index) => (
              <div
                className="mb-4 print:mb-2 grid grid-cols-4 gap-4"
                key={index}
                style={{ pageBreakInside: "avoid" }}
              >
                <h2 className="text-right font-bold text-gray-700 text-gradient bg-gradient-to-tr from-green-800 to-teal-600 justify-self-end">
                  {entry.title}
                </h2>
                <div
                  className="col-span-3 flex items-start flex-col"
                  style={{ pageBreakInside: "avoid" }}
                >
                  {entry.subtitle && (
                    <h4 className="font-bold text-gray-700 text-gradient bg-gradient-to-tr from-teal-600 to-yellow-600 justify-self-end">
                      {entry.subtitle}
                    </h4>
                  )}
                  {entry.description.split("\n").map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                  {entry.links?.map((link) => (
                    <a
                      key={link}
                      href={link}
                      target="_blank"
                      className="text-gray-500 text-sm print:text-xs line-clamp-1 print:line-clamp-none"
                      rel="noopener noreferrer"
                    >
                      {link.replace("https://", "").replace("www.", "")}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </Sheet>
    </>
  );
}
