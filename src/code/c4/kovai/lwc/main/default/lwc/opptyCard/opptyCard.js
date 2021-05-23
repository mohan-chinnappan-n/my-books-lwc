import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [ 'Opportunity.Id','Opportunity.Name', ];

export default class WireGetRecordOpportunity extends LightningElement {
    @api recordId;

    // Let’s use the wire service to get record data and display some field names.

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    opportunity;


    get id() {
        return this.opportunity.data.fields.Id.value;
    }

    get name() {
        return this.opportunity.data.fields.Name.value;
    }


}