document.addEventListener('DOMContentLoaded', function () {
    const languageSelector = document.getElementById('language-selector');

    languageSelector.addEventListener('change', function () {
        const selectedPage = languageSelector.value;
        window.location.href = selectedPage;
    });
});