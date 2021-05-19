import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    'Contact.Name',
    'Contact.Title',
    'Contact.Phone',
    'Contact.Email',
];

export default class WireGetRecordDynamicContact extends LightningElement {
    @api recordId;

    // Let’s use the wire service to get record data and display some field names.

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    contact;

    get name() {
        return this.contact.data.fields.Name.value;
    }

    get title() {
        return this.contact.data.fields.Title.value;
    }

    get phone() {
        return this.contact.data.fields.Phone.value;
    }

    get email() {
        return this.contact.data.fields.Email.value;
    }
}