# 6. Events


```html
<!-- paginator.html -->
<template>
    <lightning-layout>
        <lightning-layout-item>
            <lightning-button label="Previous" icon-name="utility:chevronleft" onclick={previousHandler}></lightning-button>
        </lightning-layout-item>
        <lightning-layout-item flexibility="grow"></lightning-layout-item>
        <lightning-layout-item>
            <lightning-button label="Next" icon-name="utility:chevronright" icon-position="right" onclick={nextHandler}></lightning-button>
        </lightning-layout-item>
    </lightning-layout>
</template>
```


```js

// paginator.js
import { LightningElement } from 'lwc';

export default class Paginator extends LightningElement {

    // These events are simple “something happened” events
    previousHandler() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    nextHandler() {
        this.dispatchEvent(new CustomEvent('next'));
    }
}

```

### Using paginator


```html
<template>
    <lightning-card title="EventSimple" icon-name="standard:logging">
        <div class="slds-var-m-around_medium">
            <p
                class="slds-text-align_center slds-var-m-vertical_medium content"
            >
                Page {page}
            </p>
            <c-paginator
                class="slds-show slds-is-relative"
                onprevious={handlePrevious}
                onnext={handleNext}
            ></c-paginator>
        </div>
    </lightning-card>

```

```js

// EventSimple.js 
import { LightningElement } from 'lwc';

export default class EventSimple extends LightningElement {
    page = 1;

    handlePrevious() {
        if (this.page > 1) {
            this.page = this.page - 1;
        }
    }

    handleNext() {
        this.page = this.page + 1;
    }
}
```

### Pass Data in an Event
```js

   // Creates the event with the contact ID data.
   const selectedEvent = new CustomEvent('selected', { detail: this.contact.Id });


```
