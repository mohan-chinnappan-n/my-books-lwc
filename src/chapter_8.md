# 8. Security with Lightning Locker

- Lightning Locker provides:
    - component isolation and security that allows code from many sources to execute and interact using safe, standard APIs and event mechanisms. 
    
    - Lightning Locker is enabled for all custom Lightning web components.


## strict mode ```"use strict"```
- Lightning Locker implicitly enables JavaScript strict mode everywhere
- JavaScript strict mode makes code more secure, robust, and supportable.



## DOM Access Containment
- A component **can only traverse the DOM and access elements that it created**. 
    - This behavior prevents the anti-pattern of reaching into DOM elements owned by other components.
- Lightning web components can’t use the ```window``` or ```document`` global properties to query for DOM elements. 
- For example, use ```this.template.querySelector()``` instead of ```document.querySelector()```.

## Secure Wrappers
- For security, Lightning Locker restricts **the use of global objects by hiding an object or by wrapping it in a secure version of the object**. 
    - For example, the secure version of window is ```SecureWindow``. 
    - Locker intercepts calls to window and uses SecureWindow instead.

## Third-Party Web Components
- To prevent security risks, you can’t use third-party web components on the Salesforce platform.
- Web components are custom elements. To define a custom element, you must use the customElements.define API. However, this API is global, and allows you to globally register a component name. 
- Registering a name globally is a security risk because an attacker could register any name and take over the page. 
- Lightning Locker’s SecureWindow wrapper blocks the **customElements** methods that create custom web components.





