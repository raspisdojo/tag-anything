import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
//import NAME_FIELD from '@salesforce/schema/Opportunity.Description';

export default class TagAnythingDisplayer extends LightningElement {
    @api recordId;
    @api recordApiName;
    @api fieldApiName;
    @api SObjectAndFieldApiNames; // USE THIS

    //@track test01 = ['$SObjectAndFieldApiNames'];

    _myValues = [];

    // THIS IS THE DO INIT IN LWC
    connectedCallback() {
        this._myValues = [this.recordApiName + '.' + this.fieldApiName];
    }

    /*@wire(getRecord, { recordId: '$recordId', fields: ['Opportunity.Description'] })
    record;*/
    //_fields = '$recordApiName.$fieldApiName';
    //_fieldsX = ['$recordApiName' + '.' + '$fieldApiName']; // MAYBE

    @wire(getRecord, { recordId: '$recordId', fields: '$_myValues' })
    record;

    get recordFieldValue() {
        //console.log(JSON.stringify(this.record.data));
        //console.log(JSON.stringify(this.record.data.fields[this.fieldApiName].value));
        return this.record.data ? getFieldValue(this.record.data, 'Opportunity.Description') : '';
        //return this.record.data.fields[this.fieldApiName];
    }
}