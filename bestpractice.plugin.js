/*
|--------------------------------------------------------------------------
| Was ist das hier?
|--------------------------------------------------------------------------
|
| Oft kommt es vor, wenn man ein eigenes CMS Element baut, brauchen 
| wir ein JS Plugin um funktionalität rein zu bringen. Hier hast
| du einmal ein paar tipps wie man ein JS Plugin aufbaut
|
*/
import Plugin from 'src/plugin-system/plugin.class';

// helper von Shopware der den Umgang mit dem HTML Dom vereinfacht!!!
import DomAccess from 'src/helper/dom-access.helper';


/*
|--------------------------------------------------------------------------
| Plugin Infos
|--------------------------------------------------------------------------
| filePath:
| /src/Resources/views/storefront/page/content/index.html.twig
| 
| Code Snippet:
|   {% block base_main_inner %}
|       {{ parent() }}
|
|       <div data-best-practice>
|           Content für das Plugin
|       </div>
|   {% endblock %}
|
*/
export default class BestPractice extends Plugin {

    /*
    |--------------------------------------------------------------------------
    | Options
    |--------------------------------------------------------------------------
    |
    | Hier schreiben wir einmal Props oder "Variablen" die wir innerhalb 
    | des Plugin HTML verwenden um eine schnelle Anpassungsfähigkeit
    | zu haben und Klassen schnell austauschen zu können.
    |
    */
    static options = {
        /**
         * @type string
         */
        testSelector: '.pluginclassButton',

        /**
         * @type string
         */
        testInputSelector: 'input[type="text"]',

        /**
         * @type string
         */
        testDataSelector: 'data-test',
    };

    /*
    |--------------------------------------------------------------------------
    | Init Funktion
    |--------------------------------------------------------------------------
    |
    | Das ist die erste Funktion die immer aufgerufen wird, sobald das Plugin 
    | geladen wird. Hier machen wir nix als globale Variablen setzen
    | und diese auf ihren rückgabewerte überprüfen.
    |
    */
    init() {

        /*
        |--------------------------------------------------------------------------
        | events veröffentlichen
        |--------------------------------------------------------------------------
        |
        | In jeder Funktion innerhalb des Plugins arbeiten wir mit dem SW6 Event 
        | Emitter. Dadurch können wir Events erstellen auf die man an anderer
        | Stelle reagieren und den Code etwas manipulieren kann.
        |
        */
        this.$emitter.publish('onInitBefore');

        /*
        |--------------------------------------------------------------------------
        | Variablen deklarieren
        |--------------------------------------------------------------------------
        |
        | Im nächsten Schritt deklarieren wir dann unsere globalen Variablen, die wir 
        | im ganzen Plugin verwenden können. Hier verwenden wir den DomAccess
        | Helper. Wir laden hier die Selectoren aus den options rein.
        |
        */
        this.testSelector = DomAccess.querySelector(this.el, this.options.testSelector);
        this.testInputSelector = DomAccess.querySelector(this.el, this.options.testInputSelector);
        this.testDataSelector = DomAccess.getAttribute(this.el, this.options.testDataSelector);
        

        /*
        |--------------------------------------------------------------------------
        | Variablen Abfragen
        |--------------------------------------------------------------------------
        |
        | Hier fragen wir ab ob wir die richtigen Elemente zurückbekommen die wir 
        | benötigen um Sie im Plugin weiter zu benutzen. Wenn da etwas fehlt 
        | soll es einen Fehler geben.
        |
        */
        if (!this.testSelector) {
            return console.error("test Selector ist leer");
        }

        if (!this.testInputSelector) {
            return console.error("test Input Selector ist leer");
        }

        if (!this.testDataSelector) {
            return console.error("test Data Selector ist leer");
        }
        
        /*
        |--------------------------------------------------------------------------
        | Register Events Funktion
        |--------------------------------------------------------------------------
        |
        | Um immer nur einen Sinn hinter einer funktion zu haben wechseln wir jetzt
        | auf die Funktion wo wir alle unsere Event Listener registrieren. Wir
        | übergeben hier nichts sondern rufen einfach die funktion auf.
        |
        */
        this.registerEvents();

        // Wir erstellen Events am Anfang und Ende von Funktionen
        this.$emitter.publish('onInitAfter');
    }


    /*
    |--------------------------------------------------------------------------
    | Register Events Funktion
    |--------------------------------------------------------------------------
    |
    | Hier registrieren wir alle Events die wir benötigen
    | Der Vorteil ist, dass wir alles auf einem fleck
    | haben und schnell das finden was wir brauchen
    |
    */
    registerEvents() {
        this.$emitter.publish('onRegisterEventsBefore');

        /*
        |--------------------------------------------------------------------------
        | Event Listeners
        |--------------------------------------------------------------------------
        |
        | Event Listeners werden zwischen den zwei Emitter Events erstellt. Hier 
        | benutzen wir die public Variables die wir in der Init funktion 
        | deklariert haben.
        |
        */
        this.testSelector.addEventListener('click', this.clickHere.bind(this));

        this.$emitter.publish('onRegisterEventsAfter');
    }

    /*
    |--------------------------------------------------------------------------
    | Methods
    |--------------------------------------------------------------------------
    |
    | Jetzt kommen alle funktionen die aus den Event Listener resultieren.
    | Die funktionen varieren jetzt von Plugin zu Plugin.
    | 
    |
    */
    clickHere() {
        this.$emitter.publish('onClickHereBefore');

        console.log("Es geht alles");

        this.$emitter.publish('onClickHereAfter');
    }
}