import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

function loadTranslationMessages() {
    const translations = require.context('./', true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const messages = {};
    translations.keys().forEach(function(key) {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = translations(key);
        }
    });
    return messages;
}

export default new VueI18n({
    locale: 'ko',
    fallbackLocale: 'ko',
    messages: loadTranslationMessages(),
});