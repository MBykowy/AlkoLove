document.addEventListener('DOMContentLoaded', function () {
    const languageSelector = document.getElementById('language-selector');
    const title = document.getElementById('title');
    const content = document.getElementById('content');

    const translations = {
        en: {
            title: "Hello, World!",
            content: "This is an example of a multilingual website."
        },
        pl: {
            title: "Witaj, Świecie!",
            content: "To jest przykład wielojęzycznej strony internetowej."
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