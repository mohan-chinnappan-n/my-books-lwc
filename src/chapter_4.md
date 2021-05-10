# 4. Decorators

- A decorator is simply a way of wrapping a function with another function to extend its existing capabilities
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

## @api
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

```html


```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>51.0</apiVersion>
    <isExposed>false</isExposed>
    <targets>
        <target>lightning__RecordPage</target>
        <target>lightning__HomePage</target>
    </targets>
</LightningComponentBundle>
```

```
$ sfdx force:project:create --projectname kovai  --defaultpackagedir lwc
```

```
$ sfdx force:source:deploy -u mohan.chinnappan.n_ea2@gmail.com  -p lwc/

```


## @track


## References
- [JavaScript Decorators From Scratch](https://blog.bitsrc.io/javascript-decorators-from-scratch-c4cfd6c33d70)
- [LWC Fundamentals - Understanding Decorators | Developer Quick Takes](https://www.youtube.com/watch?v=WbDoaZ1gi3E)
- [LWC Fundamentals - The @api Decorator | Developer Quick Takes](https://www.youtube.com/watch?v=F7J5yn3MIXw)