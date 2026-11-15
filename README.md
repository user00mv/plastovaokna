# Plastová okna Dvořák – redesign (pracovní verze)

Statický web (HTML + CSS + JS). Nepotřebuje žádný build ani server, stačí ho nahrát na GitHub Pages.

## Nasazení na GitHub Pages

1. Na GitHubu založte nový repozitář, např. `plastova-okna-dvorak` (může být veřejný i soukromý s placeným plánem).
2. Nahrajte do kořene repozitáře **celý obsah této složky** (včetně skrytého souboru `.nojekyll`):
   `index.html`, `assets/`, `.nojekyll`, `README.md`.
   – přes web: *Add file → Upload files*, nebo
   – přes git:
     ```bash
     git init
     git add .
     git commit -m "Redesign v1"
     git branch -M main
     git remote add origin https://github.com/<ucet>/plastova-okna-dvorak.git
     git push -u origin main
     ```
3. V repozitáři otevřete **Settings → Pages**, v části *Build and deployment* zvolte
   *Source: Deploy from a branch*, *Branch: `main`*, složka *`/ (root)`* a uložte.
4. Za 1–2 minuty bude web na adrese `https://<ucet>.github.io/plastova-okna-dvorak/`.

Vlastní doménu lze později nastavit v *Settings → Pages → Custom domain*.

## Důležité

- **Web je skrytý před vyhledávači** (`<meta name="robots" content="noindex, nofollow">` v `index.html`), aby ukázka nekonkurovala ostrému webu klienta. Při spuštění ostré verze tento řádek smažte.
- **Formulář je ukázkový** – data nikam neodesílá. Pro ostrý provoz napojit např. na Formspree, Netlify Forms nebo vlastní backend.
- **Fotky jsou ilustrační** – hero jsou AI vizualizace (nevydávat za skutečné realizace), ostatní z Unsplash (licence Unsplash – volné i pro komerční použití) a načítají se přímo z `images.unsplash.com`. Pro ostrý web je nejlepší nahradit je fotkami vlastních realizací.
- Fonty (Montserrat, licence OFL) jsou přibalené v `assets/fonts`.

## Kde měnit obsah

- Texty: `index.html`
- Produkty v mřížce, kraje na mapě, formulář: `assets/js/app.js` (sekce `PRODUCTS`, `selectKraj`)
- Hero: fotky v `assets/img/` (každá ve 2 velikostech – 1536 a 800 px), popisky u fotek v `index.html` (bloky `hcap`), rychlost střídání v `assets/js/app.js` (`DUR = 6500` ms)
- Ostatní fotky: v `index.html` (adresy `images.unsplash.com/photo-…`) a v `assets/js/app.js` (objekt `PH` na začátku – použité v produktech a ve formuláři)
- Barvy a vzhled: `assets/css/style.css` (proměnné na začátku souboru)

## Zdroj textů

Všechny údaje o firmě jsou převzaté z webu plastova-okna.org (stránka ceník a hliníková okna):
slevy 40–55 %, dodací lhůta 4–6 týdnů od zaplacení zálohy, doprava – montáž po celé ČR včetně Prahy a okolí,
cenové nabídky zdarma a nezávazně, nejlepší ceny v regionu, akce trojsklo, akce Aluplast, profily, SVJ, zákaznická infolinka 606 212 000.
Orientační datum dodání na webu je dopočítané (dnešní datum + 4–6 týdnů).

## Použité fotky (Unsplash) a jejich kontrola

Kontrola proběhla podle popisu, štítků a lokace uvedených na stránce fotky na Unsplash.

| Místo na webu | Fotka (odkaz) | Autor | Co uvádí Unsplash | Lokace |
|---|---|---|---|---|
| Hero – 3 fotky v prolínání | `assets/img/hero-1…3-*.webp` | AI vizualizace (vygenerované pro tento návrh) | 1) okno s trojsklem a zasněženou vesnicí, 2) rodinný dům s novými okny, 3) detail oken na fasádě | – (ilustrační, nejde o reálné realizace) |
| Plastová okna (karta) | [Okno s klikou](https://unsplash.com/photos/a-window-with-a-glass-pane-and-a-door-handle-fGm25gZt6Uo) | Okna Milano (firma s okny) | okno s klikou, štítek „pvc window“ | Milán, Itálie |
| Plastová okna (sekce) | [Klika okna – detail](https://unsplash.com/photos/a-close-up-of-a-door-handle-on-a-window-cCSw683LV1E) | Okna Milano | detail kliky okna, štítek „pvc window“ | Milán, Itálie |
| Hliníková okna | [Skládací prosklené dveře v černém rámu](https://unsplash.com/photos/modern-black-framed-folding-glass-doors-installed-MwRS-3OxOl4) | MBOR MC (výrobce dveří, Čína) | skládací prosklené dveře; materiál v popisu neuveden | neuvedena – **doporučuji nahradit** |
| Eurookna | [Otevřené okno v dřevěném rámu](https://unsplash.com/photos/opened-brown-wooden-framed-glass-window-2EJB_8BuS-I) | – | otevřené okno s dřevěným rámem | neuvedena |
| Vchodové dveře | [Klika dveří – detail](https://unsplash.com/photos/a-close-up-of-a-door-handle-on-a-door-6DGwEmDLZ-Y) | Okna Milano | detail kliky dveří | Milán, Itálie |
| Balkónové dveře | [Pokoj s posuvnými prosklenými dveřmi](https://unsplash.com/photos/a-living-room-with-a-couch-and-a-sliding-glass-door-tg-Ggdg-Vps) | Okna Milano | obývací pokoj s posuvnými prosklenými dveřmi | Milán, Itálie |
| Zimní zahrady (karta) | [Dům s prosklenou zimní zahradou](https://unsplash.com/photos/white-house-with-solar-panels-and-glass-conservatory-fA6yu7rD4FY) | Annie Spratt | dům se zimní zahradou, cihlová zeď, solární panely | neuvedena |
| Zimní zahrady (sekce hliník) | [Zimní zahrada s citrusy](https://unsplash.com/de/fotos/wintergarten-mit-zitrusfruchten-und-pampasgras-U5Xhhvte4xo) | JIWON KANG | „Wintergarten“, venku sníh | neuvedena |
| Garážová vrata | [Fasáda novostavby s garáží](https://unsplash.com/de/fotos/moderne-hausfassade-mit-warmepumpen-einheit-kblddocwPa0) | alpha innotec (německý výrobce tepelných čerpadel) | novostavba RD, štítky Garagentor, Einfamilienhaus, Neubau | neuvedena (německá firma) |
| Střešní světlíky | [Prosklený strop s bílými rámy](https://unsplash.com/de/fotos/tagsuber-weiss-gerahmte-glasdecke-mit-holzrahmen-mr0ApucZQL4) | – | prosklený strop; **není to klasické střešní okno** | neuvedena – **doporučuji nahradit** |
| SVJ / panelové domy | [Betonový bytový dům](https://unsplash.com/de/fotos/betonwohnhaus-in-berlin-8ogRs2objcI) | Marcus Lenk | bytový dům s balkony, štítky Osteuropa, sozialer Wohnungsbau | Berlín, Německo |
| Závěrečná výzva (pozadí) | sluneční světlo oknem (`photo-1774430161190`) | – | „Sunlight streams through a window onto a desk“ | neuvedena |
