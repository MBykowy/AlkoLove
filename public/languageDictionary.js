document.addEventListener('DOMContentLoaded', function () {
    console.log("Script loaded");

    const languageSelector = document.getElementById('language-selector');
    const napisStronaGlowna  = document.getElementById("menu-item-11577");
    const napisKontakt  = document.getElementById("menu-item-11581");
    const napisSprawdz  = document.getElementById("menu-item-11723");
    const napisWyszukiwarka  = document.getElementById("menu-item-11724");
    const napisOceny  = document.getElementById("menu-item-11725");
    const napisPorownaj  = document.getElementById("menu-item-11726");
    const napisFiltrowanie  = document.getElementById("menu-item-11727");
    const napisSklepyWOkolicy  = document.getElementById("menu-item-11728");
    const napisLogowanie  = document.getElementById("menu-item-11789");
    const napisRejestracja  = document.getElementById("menu-item-11790");
    const przyciskSzukaj = document.getElementById("search-button");
    const rozwinientyTekst = document.getElementById("rozwijanyTekst");
    const tekstZMilosciDoPrzyjemnosci = document.getElementById("tekstZMilosci");
    const tekstRozpocznij = document.getElementById("tekstRozpocznij");
    const napisOceniaj = document.getElementById("napisOceniaj");
    const napisSklepyWTwojej = document.getElementById("sklepyWTwojej")
    const napisWyszukaj = document.getElementById("napisWyszukaj")
    const napisSwojZamierzonyProdukt = document.getElementById("swojZamierzonyProdukt")
    const napisPorownanie = document.getElementById("porownanie")
    const napisSwojeUlubioneMarki = document.getElementById("swojeUlubioneMarki")
    const napisFiltruj = document.getElementById("filtr")
    const napisWgSwoichPreferencji = document.getElementById("wedlugSwoichPreferencji")
    const napisZnajdz = document.getElementById("znajdz")
    const napisNajlepszeMiejsce = document.getElementById("najMiejsce")
    const napisOdkryjNowe = document.getElementById("odkryjNowe")
    const napisZnajdzSwoje = document.getElementById("znajdzSwoje")
    const napisTwojeOpinie = document.getElementById("twojeOpinie")
    const napisNieCzekaj = document.getElementById("nieCzekaj")
    const napisNaszKontakt = document.getElementById("naszKontakt")

    const translations = {
        en: {
            napisStronaGlowna: "Main Page",
            napisKontakt: "About us",
            napisSprawdz: "Check",
            napisWyszukiwarka: "Browser",
            napisOceny: "Ratings",
            napisPorownaj: "Compare",
            napisFiltrowanie: "Filter",
            napisSklepyWOkolicy: "Shops in the area",
            napisLogowanie: "Login",
            napisRejestracja: "Register",
            przyciskSzukaj: "search",
            rozwinientyTekst: "Choosing alkohol easier thanks to<br>Alkolove",
            tekstZMilosciDoPrzyjemnosci: "From love to pleasure",
            tekstRozpocznij: "BEGIN",
            napisOceniaj: "Rate",
            napisSklepyWTwojej: "Shops in your area",
            napisWyszukaj: "Search",
            napisSwojZamierzonyProdukt: "Your intended item",
            napisPorownanie: "Compare",
            napisSwojeUlubioneMarki: "Your favourite brands",
            napisFiltruj: "Filter",
            napisWgSwoichPreferencji: "According to your preferences",
            napisOdkryjNowe: "DISCOVER NEW FLAVOURS WITH ALKOLOVE!<br>FIND YOUR FAVOURITE BEVERAGES<br>FROM A WIDE ASSORTMENT<br>OF PRODUCTS ON<br>OUR PLATFORM",
            napisZnajdzSwoje: "Find your favourite beverages in shops in<br>your area! Use the shop localization<br>function.",
            napisTwojeOpinie: "YOUR OPINION MATTERS!<br>RATE YOUR FAVOURITE BEVERAGES<br>AND HELP US IMPROVE<br>ALKOLOVE.",
            napisNieCzekaj: "DON'T WAIT LONGER! JOIN THE ALKOLOVE<br>COMMUNITY TODAY AND ENJOY THE SPECIAL<br>EXPERIENCE OF BROWSING ALCOHOL ONLINE.<br>UNFORGETTABLE FLAVOURS ARE WAITING FOR YOU. START<br>EXPLORING OUR OFFER TODAY!",
            napisNaszKontakt: "Contact:<br>" +
                "Phone: 123-456-7890<br>" +
                "Email: goscieodstronwww@gmail.com<br>" +
                "Office: Republika Kuby, Leoncio Vidal, Santa Clara 112"

        },
        pl: {
            napisStronaGlowna: "Strona Główna",
            napisKontakt: "O nas",
            napisSprawdz: "Sprawdź",
            napisWyszukiwarka: "Wyszukiwarka",
            napisOceny: "Oceny",
            napisPorownaj: "Porównaj",
            napisFiltrowanie: "Filtruj",
            napisSklepyWOkolicy: "Sklepy w okolicy",
            napisLogowanie: "Logowanie",
            napisRejestracja: "Rejestracja",
            przyciskSzukaj: "szukaj",
            rozwinientyTekst: "Wybór alkoholu prostszy dzięki<br>Alkolove",
            tekstZMilosciDoPrzyjemnosci: "Z miłości do przyjemności",
            tekstRozpocznij: "ROZPOCZNIJ",
            napisOceniaj: "Oceniaj",
            napisSklepyWTwojej: "Sklepy w twojej okolicy",
            napisWyszukaj: "Wyszukaj",
            napisSwojZamierzonyProdukt: "Swój zamierzony produkt",
            napisPorownanie: "Porównaj",
            napisSwojeUlubioneMarki: "Swoje ulubione marki",
            napisFiltruj: "Filtruj",
            napisWgSwoichPreferencji: "Według swoich preferencji",
            napisOdkryjNowe: "ODKRYJ NOWE SMAKI Z ALKOLOVE!<br>ZNAJDŹ SWOJE ULUBIONE TRUNKI<br>W SZEROKIM WYBORZE<br>PRODUKTÓW DOSTĘPNYCH NA<br>NASZEJ PLATFORMIE",
            napisZnajdzSwoje: "Znajdź swoje ulubione trunki w sklepach w<br>swojej okolicy! Użyj funkcji lokalizacji<br>sklepów.",
            napisTwojeOpinie: "TWOJE OPINIE MAJĄ ZNACZENIE!<br>OCENIAJ SWOJE ULUBIONE TRUNKI<br>I POMÓŻ NAM ULEPSZAĆ OFERTĘ<br>ALKOLOVE.",
            napisNieCzekaj: "NIE CZEKAJ DŁUŻEJ! DOŁĄCZ DO SPOŁECZNOŚCI<br>ALKOLOVE JUŻ TERAZ I CIESZ SIĘ WYJĄTKOWYMI<br>DOŚWIADCZENIAMI Z PRZEGLĄDANIEM ALKOHOLI ONLINE.<br>NIEZAPOMNIANE SMAKI CZEKAJĄ NA CIEBIE. ZACZNIJ<br>EKSPLOROWAĆ NASZĄ OFERTĘ JUŻ DZIŚ!",
            napisNaszKontakt: "Kontakt:<br>" +
                "Telefon: 123-456-7890<br>" +
                "Email: goscieodstronwww@gmail.com<br>" +
                "Biuro: Republika Kuby, Leoncio Vidal, Santa Clara 112"
        }
    };

    function updateLanguage(language) {
        console.log("Updating language to:", language);
        napisStronaGlowna.innerHTML = translations[language].napisStronaGlowna;
        content.innerHTML = translations[language].content;
    }

    languageSelector.addEventListener('change', function () {
        const selectedLanguage = languageSelector.value;
        console.log("Selected language:", selectedLanguage);
        updateLanguage(selectedLanguage);
    });

    // Initialize with default language
    updateLanguage(languageSelector.value);
});