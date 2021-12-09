(function () {
    var debugMode, touchMode, locale, localeParameter, extjsVersion, proj4jsVersion, olVersion, i, language, languages, languageDefault;

    function addStyleFile(file) {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', file);
        document.head.appendChild(link);
    }

    function addScriptFile(file) {
        var script = document.createElement('script');
        script.setAttribute('src', file);
        script.async = false;
        document.head.appendChild(script);
    }

    function addSvgFile(file, id) {
        var svg = document.createElement('object');
        svg.setAttribute('id', id);
        svg.setAttribute('data', file);
        svg.setAttribute('type', 'image/svg+xml');
        svg.setAttribute('style', 'visibility:hidden;position:absolute;left:-100px;');
        document.body.appendChild(svg);
    }

    debugMode = document.getElementById('loadScript').getAttribute('mode') === 'debug';
    touchMode = 'ontouchstart' in window || navigator.maxTouchPoints;

    window.updateNotificationToken = function (token) {
        Traccar.app.updateNotificationToken(token);
    };

    locale = {};
    window.Locale = locale;

    locale.languages = {
        'af': { name: 'Afrikaans', code: 'af' },
        'ar': { name: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©', code: 'en' },
        'az': { name: 'AzÉ™rbaycanca', code: 'en' },
        'bg': { name: 'Ð‘ÑŠÐ»Ð³Ð°Ñ€ÑÐºÐ¸', code: 'bg' },
        'bn': { name: 'à¦¬à¦¾à¦‚à¦²à¦¾', code: 'en' },
        'cs': { name: 'ÄŒeÅ¡tina', code: 'cs' },
        'de': { name: 'Deutsch', code: 'de' },
        'da': { name: 'Dansk', code: 'da' },
        'el': { name: 'Î•Î»Î»Î·Î½Î¹ÎºÎ¬', code: 'el' },
        'en': { name: 'English', code: 'en' },
        'es': { name: 'EspaÃ±ol', code: 'es' },
        'fa': { name: 'ÙØ§Ø±Ø³ÛŒ', code: 'fa' },
        'fi': { name: 'Suomi', code: 'fi' },
        'fr': { name: 'FranÃ§ais', code: 'fr' },
        'he': { name: '×¢×‘×¨×™×ª', code: 'he' },
        'hi': { name: 'à¤¹à¤¿à¤¨à¥à¤¦à¥€', code: 'en' },
        'hr': { name: 'Hrvatski', code: 'hr' },
        'hu': { name: 'Magyar', code: 'hu' },
        'id': { name: 'Bahasa Indonesia', code: 'id' },
        'it': { name: 'Italiano', code: 'it' },
        'ja': { name: 'æ—¥æœ¬èªž', code: 'ja' },
        'ka': { name: 'áƒ¥áƒáƒ áƒ—áƒ£áƒšáƒ˜', code: 'en' },
        'kk': { name: 'ÒšÐ°Ð·Ð°Ò›ÑˆÐ°', code: 'en' },
        'ko': { name: 'í•œêµ­ì–´', code: 'ko' },
        'km': { name: 'áž—áž¶ážŸáž¶ážáŸ’áž˜áŸ‚ážš', code: 'en' },
        'lo': { name: 'àº¥àº²àº§', code: 'en' },
        'lt': { name: 'LietuviÅ³', code: 'lt' },
        'lv': { name: 'LatvieÅ¡u', code: 'lv' },
        'ml': { name: 'à´®à´²à´¯à´¾à´³à´‚', code: 'en' },
        'mn': { name: 'ÐœÐ¾Ð½Ð³Ð¾Ð» Ñ…ÑÐ»', code: 'en' },
        'ms': { name: 'Ø¨Ù‡Ø§Ø³ Ù…Ù„Ø§ÙŠÙˆ', code: 'en' },
        'nb': { name: 'Norsk bokmÃ¥l', code: 'no_NB' },
        'ne': { name: 'à¤¨à¥‡à¤ªà¤¾à¤²à¥€', code: 'en' },
        'nl': { name: 'Nederlands', code: 'nl' },
        'nn': { name: 'Norsk nynorsk', code: 'no_NN' },
        'pl': { name: 'Polski', code: 'pl' },
        'pt': { name: 'PortuguÃªs', code: 'pt' },
        'pt_BR': { name: 'PortuguÃªs (Brasil)', code: 'pt_BR' },
        'ro': { name: 'RomÃ¢nÄƒ', code: 'ro' },
        'ru': { name: 'Ð ÑƒÑÑÐºÐ¸Ð¹', code: 'ru' },
        'si': { name: 'à·ƒà·’à¶‚à·„à¶½', code: 'en' },
        'sk': { name: 'SlovenÄina', code: 'sk' },
        'sl': { name: 'SlovenÅ¡Äina', code: 'sl' },
        'sq': { name: 'ShqipÃ«ria', code: 'en' },
        'sr': { name: 'Srpski', code: 'sr' },
        'sv': { name: 'Svenska', code: 'sv' },
        'ta': { name: 'à®¤à®®à®¿à®´à¯', code: 'en' },
        'th': { name: 'à¹„à¸—à¸¢', code: 'th' },
        'tr': { name: 'TÃ¼rkÃ§e', code: 'tr' },
        'uk': { name: 'Ð£ÐºÑ€Ð°Ñ—Ð½ÑÑŒÐºÐ°', code: 'ukr' },
        'uz': { name: 'OÊ»zbekcha', code: 'en' },
        'vi': { name: 'Tiáº¿ng Viá»‡t', code: 'en' },
        'zh': { name: 'ä¸­æ–‡', code: 'zh_CN' },
        'zh_TW': { name: 'ä¸­æ–‡ (Taiwan)', code: 'zh_TW' }
    };

    languageDefault = 'en';
    localeParameter = window.location.search.match(/locale=([^&#]+)/);
    locale.language = localeParameter && localeParameter[1];
    if (!(locale.language in locale.languages)) {
        languages = window.navigator.languages !== undefined ? window.navigator.languages.slice() : [];
        language = window.navigator.userLanguage || window.navigator.language;
        languages.push(language);
        languages.push(language.substring(0, 2));
        languages.push(languageDefault);
        for (i = 0; i < languages.length; i++) {
            language = languages[i].replace('-', '_');
            if (language in locale.languages) {
                locale.language = language;
                break;
            }
            if (language.length > 2) {
                language = languages[i].substring(0, 2);
                if (language in locale.languages) {
                    locale.language = language;
                    break;
                }
            }
        }
    }

    window.addEventListener('load', function (event) {

        if (debugMode) {
            Ext.Loader.setConfig({
                disableCaching: false
            });
        }

        Ext.Ajax.request({
            url: 'l10n/' + languageDefault + '.json',
            callback: function (options, success, response) {
                window.Strings = Ext.decode(response.responseText);
                if (Locale.language !== languageDefault) {
                    Ext.Ajax.request({
                        url: 'l10n/' + Locale.language + '.json',
                        callback: function (options, success, response) {
                            var key, data = Ext.decode(response.responseText);
                            for (key in data) {
                                if (data.hasOwnProperty(key)) {
                                    window.Strings[key] = data[key];
                                }
                            }
                            addScriptFile(debugMode ? 'app.js' : 'app.min.js');
                        }
                    });
                } else {
                    addScriptFile(debugMode ? 'app.js' : 'app.min.js');
                }
            }
        });

    });

    // Hack for new versions of Android
    if (navigator.userAgent.indexOf('Android') !== -1 && navigator.userAgent.indexOf('OPR') !== -1) {
        var __originalUserAgent = navigator.userAgent;
        navigator.__defineGetter__('userAgent', function () { return __originalUserAgent.replace(/\/OPR[^)]*/g, ''); });
    }

    extjsVersion = '6.2.0';
    olVersion = '6.1.1';
    olLayerSwitcherVersion = '3.8.3';
    proj4jsVersion = '2.6.0';

    if (debugMode) {
        addScriptFile('https://cdn.traccar.com/js/extjs/' + extjsVersion + '/ext-all-debug.js');
        addScriptFile('https://cdn.traccar.com/js/extjs/' + extjsVersion + '/packages/charts/classic/charts-debug.js');
    } else {
        addScriptFile('https://cdn.traccar.com/js/extjs/' + extjsVersion + '/ext-all.js');
        addScriptFile('https://cdn.traccar.com/js/extjs/' + extjsVersion + '/packages/charts/classic/charts.js');
    }
    addScriptFile('https://cdn.traccar.com/js/extjs/' + extjsVersion + '/classic/locale/locale-' + locale.languages[locale.language].code + '.js');

    addStyleFile('https://cdn.traccar.com/js/extjs/' + extjsVersion + '/classic/theme-triton/resources/theme-triton-all.css');
    addScriptFile('https://cdn.traccar.com/js/extjs/' + extjsVersion + '/classic/theme-triton/theme-triton.js');

    addStyleFile('https://cdn.traccar.com/js/extjs/' + extjsVersion + '/packages/charts/classic/triton/resources/charts-all.css');

    addStyleFile('https://cdn.traccar.com/js/ol/' + olVersion + '/ol.css');
    addScriptFile('https://cdn.traccar.com/js/ol/' + olVersion + '/ol.js');

    addStyleFile('https://cdn.traccar.com/js/ol-layerswitcher/' + olLayerSwitcherVersion + '/ol-layerswitcher.css');
    addScriptFile('https://cdn.traccar.com/js/ol-layerswitcher/' + olLayerSwitcherVersion + '/ol-layerswitcher.js');

    if (debugMode) {
        addScriptFile('https://cdn.traccar.com/js/proj4js/' + proj4jsVersion + '/proj4-src.js');
    } else {
        addScriptFile('https://cdn.traccar.com/js/proj4js/' + proj4jsVersion + '/proj4.js');
    }

    window.Images = ['arrow', 'default', 'animal', 'bicycle', 'boat', 'bus', 'car', 'crane', 'helicopter', 'motorcycle',
        'offroad', 'person', 'pickup', 'plane', 'ship', 'tractor', 'train', 'tram', 'trolleybus', 'truck', 'van', 'scooter'];

    for (i = 0; i < window.Images.length; i++) {
        addSvgFile('images/' + window.Images[i] + '.svg', window.Images[i] + 'Svg');
    }
})();