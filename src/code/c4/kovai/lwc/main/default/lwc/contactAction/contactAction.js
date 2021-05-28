import { LightningElement, api } from 'lwc';

export default class ContactAction extends LightningElement {
    @api invoke() {
        console.log("Hi, I'm an action.");
    }

}