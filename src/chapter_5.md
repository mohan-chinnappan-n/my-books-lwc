# 5. Component Life Cycle
-  Lifecycle managed by the framework
- The framework:
    - creates components, 
    - inserts them into the DOM, renders them, and removes them from the DOM. 
    - monitors components for property changes

## ```constructor()```
-  Framework fires this method when a component instance is created.


## ```connectedCallback()```
- lifecycle hook fires when a component is **inserted** into the DOM.

## ```disconnectedCallback()```
- lifecycle hook fires when a component is **removed** from the DOM. 


## ```renderedCallback()``` - unique to LWC
- Use it to perform logic after a component has finished the **rendering phase**.


## ```errorCallback()``` - unique to LWC
-  Implement it to create an error boundary component that captures errors in all the descendent components in its tree

![Life cycle](https://resources.docs.salesforce.com/images/57e856aff4175f807fe0ccbf6ad98301.png)