# Deployment auf Vercel

Deine Next.js Anwendung ist nun optimiert und bereit für das Deployment auf Vercel.

## Schritte zum Deployment

1.  **Account erstellen**
    *   Gehe auf [https://vercel.com/](https://vercel.com/) und erstelle einen kostenlosen Account (am besten mit GitHub/GitLab verbinden, falls vorhanden).

2.  **Vercel CLI installieren (Optional, aber empfohlen)**
    *   Öffne dein Terminal (PowerShell) und führe aus:
        ```bash
        npm i -g vercel
        ```

3.  **Deployment starten**
    *   Führe im Projektordner `c:\Users\Morawetz\_Antigravity\ki-stammtisch-koeln` folgenden Befehl aus:
        ```bash
        vercel
        ```
    *   Folge den Anweisungen im Terminal:
        *   *Set up and deploy?* -> `Y`
        *   *Which scope?* -> (Wähle deinen Account)
        *   *Link to existing project?* -> `N`
        *   *Project name?* -> `ki-stammtisch-koeln` (oder Enter drücken)
        *   *In which directory?* -> `./` (Einfach Enter drücken)
        *   *Want to modify these settings?* -> `N` (Next.js wird automatisch erkannt)

4.  **Umgebungsvariablen (Environment Variables)**
    *   Damit die Datenbank und der Login funktionieren, musst du deine Geheimnisse bei Vercel hinterlegen.
    *   Gehe im Vercel Dashboard auf dein Projekt -> **Settings** -> **Environment Variables**.
    *   Füge folgende Variablen hinzu (kopiere sie aus deiner `.env.local`):
        *   `MONGODB_URI`: (Deine MongoDB Verbindungszeichenfolge)
        *   `NEXTAUTH_SECRET`: (Dein geheimer Schlüssel)
        *   `NEXTAUTH_URL`: `https://dein-projekt-name.vercel.app` (Erst nach dem ersten Deployment bekannt, oder lass es vorerst weg, Vercel setzt oft `VERCEL_URL` automatisch).

5.  **Fertig!**
    *   Vercel gibt dir eine `Production`-URL. Deine Seite ist nun online.

## Optimierungen die durchgeführt wurden

*   **Schriftarten**: Google Fonts (Open Sans, Poppins) werden nun über `next/font` geladen. Das verhindert Layout-Verschiebungen und lädt Schriften schneller direkt vom Server.
*   **Bilder**: Alle Bilder nutzen nun `next/image` für automatische Komprimierung, Lazy Loading und korrekte Größenanpassung.
*   **Performance**: Der Build wurde erfolgreich getestet (`npm run build`).
