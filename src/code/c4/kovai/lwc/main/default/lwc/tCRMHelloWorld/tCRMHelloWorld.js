import { LightningElement, api } from 'lwc';

export default class TCRMHelloWorld extends LightningElement {

    @api title = "LWC Rocks!";
    @api results;

    get output () {
        return JSON.stringify(this.results, null, 4);
    }
}