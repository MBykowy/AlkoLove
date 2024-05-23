document.addEventListener('DOMContentLoaded', function () {
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
            rozwinientyTekst: "Choosing alkohol easier thanks to" +
                "Alkolove",
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
            rozwinientyTekst: "Wybór alkoholu prostszy dzięki" +
                "Alkolove",
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

        }
    };

    function updateLanguage(language) {
        title.textContent = translations[language].title;
        content.textContent = translations[language].content;
    }

    languageSelector.addEventListener('change', function () {
        const selectedLanguage = languageSelector.value;
        updateLanguage(selectedLanguage);
    });

    // Initialize with default language
    updateLanguage(languageSelector.value);
});