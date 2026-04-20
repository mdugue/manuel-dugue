// TODO: Remove
import type { Locale } from './config'

export const selfVariants: Record<Locale, readonly string[]> = {
  en: [
    "Hello. I'm Manuel — a freelance technologist who has been quietly shipping software, products and opinions since approximately the release of the iPod Mini. I work across engineering, product and strategy; I enjoy the unglamorous middle where those three argue with each other, and I tend to be the one in the room who asks what the actual problem is.",
    'Manuel is a product-minded engineer based in Dresden. He prefers working on small teams solving real problems over large teams solving imaginary ones. He writes TypeScript for a living and serif fonts for pleasure, and considers refactoring a form of meditation.',
    'By training an engineer, by habit a designer, by accident a consultant: twenty years in, Manuel Dugué still maintains that most software problems are actually organisational problems wearing a technical costume. He charges by the day and thinks in sentences.',
    "Claude's honest summary: Manuel is the person you call when you need someone to say the quiet part out loud, in a PDF, with citations. He is excellent at shipping and allergic to meetings that could have been documents.",
  ],
  de: [
    'Hallo. Ich bin Manuel — freier Techniker, der seit etwa der Veröffentlichung des iPod Mini still und leise Software, Produkte und Meinungen liefert. Ich arbeite an der Schnittstelle von Engineering, Produkt und Strategie; ich mag den unglamourösen Bereich, in dem diese drei miteinander streiten.',
    'Manuel ist ein produktnaher Ingenieur in Dresden. Er bevorzugt kleine Teams, die reale Probleme lösen, gegenüber großen Teams, die imaginäre lösen. TypeScript schreibt er zum Broterwerb, Serifenschriften zum Vergnügen.',
    'Von Ausbildung her Ingenieur, aus Gewohnheit Designer, durch Zufall Berater: Zwanzig Jahre weit hält Manuel die meisten Softwareprobleme noch immer für Organisationsprobleme in technischem Kostüm.',
    'Ehrliche Zusammenfassung: Manuel ist die Person, die du anrufst, wenn jemand den unausgesprochenen Teil aussprechen soll — in einem PDF, mit Quellenangaben.',
  ],
  fr: [
    "Bonjour. Je suis Manuel — technologue indépendant, je livre discrètement des logiciels, des produits et des opinions depuis à peu près la sortie de l'iPod Mini. Je travaille à la couture entre ingénierie, produit et stratégie ; j'aime le milieu peu glamour où les trois se disputent.",
    "Manuel est un ingénieur à sensibilité produit basé à Dresde. Il préfère les petites équipes qui résolvent de vrais problèmes aux grandes qui en résolvent d'imaginaires. TypeScript pour vivre, caractères à empattements pour le plaisir.",
    'Ingénieur par formation, designer par habitude, consultant par accident : vingt ans plus tard, Manuel maintient que la plupart des problèmes logiciels sont en réalité des problèmes organisationnels déguisés.',
    "Résumé honnête : Manuel est la personne qu'on appelle pour dire à voix haute ce que tout le monde pense tout bas — dans un PDF, avec des sources.",
  ],
  es: [
    'Hola. Soy Manuel — tecnólogo independiente, llevo entregando software, productos y opiniones en silencio desde, más o menos, la salida del iPod Mini. Trabajo en la costura entre ingeniería, producto y estrategia; me gusta el medio poco glamuroso donde los tres discuten.',
    'Manuel es un ingeniero con mentalidad de producto, con base en Dresde. Prefiere equipos pequeños que resuelven problemas reales a equipos grandes que resuelven imaginarios. TypeScript para vivir, tipografías con serifa por placer.',
    'Ingeniero de formación, diseñador por costumbre, consultor por accidente: veinte años después, Manuel sigue sosteniendo que la mayoría de los problemas de software son problemas organizacionales disfrazados.',
    'Resumen honesto: Manuel es a quien llamas cuando hace falta alguien que diga en voz alta lo que todos callan — en un PDF, con referencias.',
  ],
}

export type Testimonial = { q: string; name: string; role: string }

export const testimonials: Record<Locale, readonly Testimonial[]> = {
  en: [
    {
      q: 'We hired Manuel to fix a three-month-old problem. He was done in six weeks and spent the rest writing the documentation we pretended to have. Unreasonably competent.',
      name: 'Fictional Client A',
      role: 'Head of Product, plausibly-named SaaS',
    },
    {
      q: 'Manuel walked in on a Monday, asked three uncomfortable questions on Tuesday, and by Thursday we had a roadmap that actually fit. I still mildly suspect it was real.',
      name: 'Entirely Invented Client B',
      role: 'CTO, believable-sounding scale-up',
    },
    {
      q: 'Hiring Manuel was the second-best decision of the quarter. The first was listening to him.',
      name: 'Probably Fake Client C',
      role: 'Founder, statistically-likely industry',
    },
  ],
  de: [
    {
      q: 'Wir haben Manuel für ein drei Monate altes Problem geholt. Nach sechs Wochen war es gelöst, den Rest der Zeit schrieb er die Dokumentation, die wir angeblich hatten. Unverhältnismäßig kompetent.',
      name: 'Fiktiver Kunde A',
      role: 'Head of Product, plausibel benanntes SaaS',
    },
    {
      q: 'Manuel kam am Montag, stellte am Dienstag drei unbequeme Fragen, und bis Donnerstag hatten wir eine Roadmap, die tatsächlich passte. Ich verdächtige es noch immer, echt gewesen zu sein.',
      name: 'Frei Erfundener Kunde B',
      role: 'CTO, glaubwürdig klingende Scale-up',
    },
    {
      q: 'Manuel einzustellen war die zweitbeste Entscheidung des Quartals. Die beste war, ihm zuzuhören.',
      name: 'Wahrscheinlich Gefälschter Kunde C',
      role: 'Gründer, statistisch wahrscheinliche Branche',
    },
  ],
  fr: [
    {
      q: "On a engagé Manuel pour régler un problème qui traînait depuis trois mois. Il a terminé en six semaines et a passé le reste du temps à écrire la documentation que nous faisions semblant d'avoir.",
      name: 'Client Fictif A',
      role: 'Head of Product, SaaS au nom crédible',
    },
    {
      q: 'Manuel est arrivé un lundi, a posé trois questions inconfortables le mardi, et dès le jeudi nous avions une roadmap qui tenait debout.',
      name: 'Client Totalement Inventé B',
      role: 'CTO, scale-up plutôt convaincant',
    },
    {
      q: "Recruter Manuel a été la deuxième meilleure décision du trimestre. La première a été de l'écouter.",
      name: 'Client Probablement Faux C',
      role: 'Fondateur, secteur statistiquement vraisemblable',
    },
  ],
  es: [
    {
      q: 'Contratamos a Manuel para arreglar un problema de tres meses. Terminó en seis semanas y dedicó el resto a escribir la documentación que fingíamos tener.',
      name: 'Cliente Ficticio A',
      role: 'Head of Product, SaaS con nombre plausible',
    },
    {
      q: 'Manuel llegó un lunes, hizo tres preguntas incómodas el martes, y para el jueves teníamos una hoja de ruta con sentido.',
      name: 'Cliente Totalmente Inventado B',
      role: 'CTO, scale-up razonablemente convincente',
    },
    {
      q: 'Contratar a Manuel fue la segunda mejor decisión del trimestre. La primera fue hacerle caso.',
      name: 'Cliente Probablemente Falso C',
      role: 'Fundador, sector estadísticamente probable',
    },
  ],
}
