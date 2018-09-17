const counterElement = document.querySelector('counter-element');

if (counterElement === null) {
    const counterNode = document.createElement('counter-element');
    document.currentScript.after(counterNode);
} else {
    console.dir(counterElement.nodeName);
}

// We define an ES6 class that extends HTMLElement
class CounterElement extends HTMLElement {
    constructor() {
        super();

        this.greeting = 'Greetings from Hamburg';

        // Initialise the counter value
        this.counter = 0;

        // We attach an open shadow root to the custom element
        const shadowRoot = this.attachShadow({mode: 'open'});

        // We define some inline styles using a template string
        this.styles = `
            :host {
                position: relative;
                font-family: Arial, sans-serif;
                color: green;
            }

            #counter-increment,
            #counter-decrement {
                width: 60px;
                height: 30px;
                margin: 20px;
                background: none;
                border: 1px solid black;
            }

            #counter-value {
                font-weight: bold;
            }
        `;

        // We provide the shadow root with some HTML
        shadowRoot.innerHTML = `
            <template>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
                <script id="polyfill" src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js"></script>
                <!--
                    const innerTemplate = document.querySelector('template');
                    const innerTemplateContent = innerTemplate.content;
                    const clone = innerTemplateContent.cloneNode(true);
                    const script = clone.querySelector('#polyfill');
                    document.head.appendChild(script.cloneNode(true));
                -->
            </template>
            <style>
                ${this.styles}
            </style>
            <h2 id="counter-greeting">${this.greeting}</h2>
            <h3>Counter</h3>
            <slot name='counter-content'> Button </slot>
            <button id='counter-increment'> - </button>
            <span id='counter-value'> 0 </span>
            <button id='counter-decrement'> + </button>
        `;

        // We can query the shadow root for internal elements
        // in this case the button
        this.counterGreeting = this.shadowRoot.querySelector('#counter-greeting');
        this.incrementButton = this.shadowRoot.querySelector('#counter-increment');
        this.decrementButton = this.shadowRoot.querySelector('#counter-decrement');
        this.counterValue = this.shadowRoot.querySelector('#counter-value');

        // We can bind an event which references one of the class methods
        this.incrementButton.addEventListener("click", this._decrement.bind(this));
        this.decrementButton.addEventListener("click", this._increment.bind(this));
    }

    static get observedAttributes() {
        return ['greeting'];
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (attributeName === "greeting") {
            this.oldGreeting = oldValue;
            this.greeting = newValue;
        } else {
            console.log(attributeName, oldValue, newValue);
        }

        this._invalidate();
    }

    // connection to the DOM
    connectedCallback() {
        console.log('connectedCallback');
    }

    //disconnection from the DOM
    disconnectedCallback() {
        console.log('disconnectedCallback');
    }

    // movements across documents
    adoptedCallback() {
        console.log('adoptedCallback');
    }

    get greetingAttribute() {
        return this.getAttribute("greeting");
    }
    set greetingAttribute(value) {
        this.setAttribute("greeting", value);
    }

    get greeting() {
        return this._greeting;
    }
    set greeting(value) {
        this._greeting = value;
    }

    get oldGreeting() {
        return this._oldGreeting;
    }
    set oldGreeting(value) {
        this._oldGreeting = value;
    }

    _increment() {
        this.counter++;
        this._invalidate();
    }

    _decrement() {
        this.counter--;
        this._invalidate();
    }

    // Call when something changes value
    _invalidate() {
        this.counterValue.innerHTML = this.counter;
        this.counterGreeting.innerHTML = this.greeting;
    }
}

// This is where the actual element is defined for use in the DOM
customElements.define('counter-element', CounterElement);
