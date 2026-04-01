---
name: "UI/UX Pro Max Guidelines"
description: "High-End Design, Animation und Styling Guidelines für Premium Web-Erlebnisse. Wendet Best-Practices für beeindruckendes Frontend-Design an."
---

# UI/UX Pro Max Guidelines

Diese Guidelines beschreiben den Standard für alle visuellen und interaktiven Entwicklungen innerhalb dieses Projekts. Du (der KI-Agent) musst diese Regeln befolgen, um sicherzustellen, dass das generierte Interface "wow"-Faktor hat und nicht wie ein einfaches MVP aussieht.

## 1. Design Ästhetik & "Premium Feel"
- **Farbpaletten:** Verwende keine langweiligen Standardfarben (wie einfaches "red", "blue"). Nutze kuratierte Paletten (Tailwind-Farben wie Slate, Indigo, Violett) oder HSL-Werte für fein abgestimmte Verläufe.
- **Glassmorphism:** Nutze Blur-Effekte, halbtransparente Hintergründe (`backdrop-blur-md`, `bg-white/10`) und feine Ränder (`border-white/20`), um Tiefe zu erzeugen.
- **Typografie:** Verwende moderne, gut lesbare Schriften (z.B. Inter, Roboto, Outfit). Achte stark auf Kontrast, Laufweite (Tracking) und Zeilenhöhe (Leading).
- **Gradients (Verläufe):** Setze subtile oder lebendige Background-Gradients als stilistisches Mittel ein (z.B. text-gradient für Überschriften, sanfte Glow-Effekte hinter Karten).

## 2. Dynamic Design & Animationen
Das Interface muss sich "lebendig" anfühlen. Kein starres HTML!
- **Micro-Interaktionen:** Jeder Button und jede Card muss auf Hover reagieren (z.B. leichtes Anheben `hover:-translate-y-1`, weicher Glow `hover:shadow-lg`, Farbwechsel).
- **Framer Motion:** Für komplexere State-Wechsel, Page-Transitions oder Scroll-Effekte ist `framer-motion` der Standard in React/Next.js Projekten (falls installiert).
- **Transitions:** Verwende `transition-all duration-300 ease-in-out` für geschmeidige Hover-Zustände bei elementaren UI-Komponenten.

## 3. Layout & Whitespace
- **Atmung / Spacing:** Gib den Elementen Platz zum Atmen. Nutze großzügige Margins und Paddings.
- **Mobile First, aber Desktop Awesome:** Das Layout muss responsiv sein, aber auf großen Screens sollen Split-Screen-Layouts, große Typografie und Hero-Sektionen voll zur Geltung kommen.

## 4. Workflows & Umsetzung
Wenn du (die KI) aufgefordert wirst, ein UI zu bauen oder zu verbessern:
1. Denke "Pro Max" – wie würde es Apple oder ein High-End SaaS-Startup machen?
2. Implementiere nicht nur die Funktion, sondern strukturiere direkt die CSS/Tailwind-Klassen für maximale visuelle Qualität.
3. Füge "Glows", fließende Übergänge und runde Ecken (`rounded-2xl` oder `rounded-3xl` für Karten) standardmäßig hinzu.
4. Vermeide Platzhalter, wo möglich. Nutze echte visuelle Hierarchien.

**Wichtig:** Wenn der Nutzer eine "einfache Skizze" verlangt, liefere trotzdem eine visuell ansprechende Basis, die diesen "Pro Max"-Ansatz in den Grundzügen respektiert.
