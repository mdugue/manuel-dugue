import type { Locale } from './config'

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
