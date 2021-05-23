

import { LightningElement,  wire } from 'lwc';
import getOpportunityList from '@salesforce/apex/OpportunityController.getOpportunityList';


export default class ApexWireGetRecordsOpportunity extends LightningElement {

    columns = [{  label: 'Id', fieldName: 'Id' },
{  label: 'Name', fieldName: 'Name' },
];
    // Let’s use the apex wire service to get record data and display some field names.
    @wire(getOpportunityList)
    opportunitys;

}
