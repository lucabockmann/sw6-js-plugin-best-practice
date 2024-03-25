import Plugin from 'src/plugin-system/plugin.class';
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

    init() {
        this.$emitter.publish('onInitBefore');

        this.testSelector = DomAccess.querySelector(this.el, this.options.testSelector);
        this.testInputSelector = DomAccess.querySelector(this.el, this.options.testInputSelector);
        this.testDataSelector = DomAccess.getAttribute(this.el, this.options.testDataSelector);
        
        if (!this.testSelector) {
            return console.error("test Selector ist leer");
        }

        if (!this.testInputSelector) {
            return console.error("test Input Selector ist leer");
        }

        if (!this.testDataSelector) {
            return console.error("test Data Selector ist leer");
        }
        
        this.registerEvents();

        this.$emitter.publish('onInitAfter');
    }

    registerEvents() {
        this.$emitter.publish('onRegisterEventsBefore');

        this.testSelector.addEventListener('click', this.clickHere.bind(this));

        this.$emitter.publish('onRegisterEventsAfter');
    }

    clickHere() {
        this.$emitter.publish('onClickHereBefore');

        console.log("Es geht alles");

        this.$emitter.publish('onClickHereAfter');
    }
}