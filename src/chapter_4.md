# 4. Decorators

- A decorator is simply a way of wrapping a function/object with another function/object to extend its existing capabilities 
- It can be used to enhance the behavior of an object without requiring the author to reopen its class.
- Provides a flexible alternative to sub-classing for extending functionality.
- Decorators allow you to write cleaner code and achieve composition. 

## Function Decorators
- Receive a function as an argument and return another function that enhances and extends the function argument.
- The new function does not modify the function argument, but rather uses the function argument in its body.

```js

//decorator function
const allArgsValid = function(fn) {
  return function(...args) {
  if (args.length != fn.length) {
      throw new Error('Only submit required number of params');
    }
    const validArgs = args.filter(arg => Number.isInteger(arg));
    if (validArgs.length < fn.length) {
      throw new TypeError('Argument cannot be a non-integer');
    }
    return fn(...args);
  }
}

//ordinary multiply function
let multiply = function(a,b){
	return a*b;
}

//decorated multiply function that only accepts the required number of params and only integers
multiply = allArgsValid(multiply);

multiply(6, 8);
//48

multiply(6, 8, 7);
//Error: Only submit required number of params

multiply(3, null);
//TypeError: Argument cannot be a non-integer

multiply('',4);
//TypeError: Argument cannot be a non-integer

```

### The Lightning Web Components  programming model has *three* decorators that add functionality to a property or function.



## @api

To expose a public property, decorate a field with @api. Public properties define the API for a component.


```
 @something prop;
 ----------
 decorator
            -----
            Property
```

```
 @something doSomething(){};
 ----------
 decorator
            -----
            Method
```

- exposes a property as public
- exposes a method as public

```js
import {LightningElement, api} from 'lwc';

export default class KovaiContact extends LightningElement {
    @api recordId;
}

```




## @track
- Fields are reactive. If a field’s value changes, and the field is used in a template or in a getter of a property that’s used in a template, the component **rerenders** and displays the new value.
- When a field contains **an object or an array** say ``` names = ['Einestein', 'Ramanujan']```
 there’s a **limit to the depth of changes that are tracked**. 
    - To tell the framework to **observe changes** to the properties of an object or to the elements of an array, decorate the field with ```@track```.

## @wire
- To read Salesforce data, LWCs use a **reactive wire service**.
    - When the wire service provisions data, the component rerenders.
      


### Wire Service
- The wire service provisions **an immutable stream of data** to the component. Each value in the stream is a newer version of the value that precedes it.
- To mutate the data, a component should make a shallow copy of the objects it wants to mutate
- The wire service delegates control flow to the Lightning Web Components engine.
    - Great for read operations, but it isn’t great for create, update, and delete operations. 

```java
public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [
            SELECT Id, Name, Title, Phone, Email, Picture__c
            FROM Contact
            WHERE Picture__c != NULL
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
    }
}

//  WITH SECURITY_ENFORCED:  https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_with_security_enforced.htm

```

```html
<template>

 <div class="slds-var-m-around_medium">
            <template if:true={contacts}>
                <template for:each={contacts} for:item="contact">
                    <p key={contact.Id}>{contact.Name}</p>
                </template>
            </template>
 </div>
</template>

```
```js
import { LightningElement, wire } from 'lwc';

// import { adapterId } from 'adapterModule';
// adapterModule format:  namespace/moduleName

// To import a reference to an object:
//     import ACCOUNT_OBJECT from '@salesforce/schema/Account';

// To import a reference to a field: 
//     import FIELD_NAME from '@salesforce/schema/object.field';

// To import a reference to a field via a relationship:
//      import SPANNING_FIELD_NAME from '@salesforce/schema/object.relationship.field';


import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class ContactsMgr extends LightningElement {

    contacts;
    error;

    //@wire(adapterId, adapterConfig)
    // propertyOrFunction;
    @wire(getContactList)
     wiredContacts ({ error, data}) {
         // the results are returned to the property’s data property or error property. 
         if (data) {
            this.contacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }

     }
}

```

### Another example for @wire
```js
import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';

export default class Record extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD] })
    record;
}
```

#### What is that $ in recordId above?

- In the wire adapter’s configuration object, prefix a value with $ to **reference a property of the component instance**. The $ prefix tells the wire service to treat it as a property of the class and evaluate it as this.propertyName. 
- The property is reactive. If the property’s value changes, new data is provisioned and the component rerenders.
    



## References
- [JavaScript Decorators From Scratch](https://blog.bitsrc.io/javascript-decorators-from-scratch-c4cfd6c33d70)
- [LWC Fundamentals - Understanding Decorators | Developer Quick Takes](https://www.youtube.com/watch?v=WbDoaZ1gi3E)
- [LWC Fundamentals - The @api Decorator | Developer Quick Takes](https://www.youtube.com/watch?v=F7J5yn3MIXw)