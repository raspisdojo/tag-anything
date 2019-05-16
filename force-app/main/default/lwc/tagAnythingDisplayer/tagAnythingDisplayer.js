import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { getListUi } from 'lightning/uiListApi';
import TAG_OBJECT from '@salesforce/schema/Tag_Anything__c';

export default class TagAnythingDisplayer extends LightningElement {
    @api recordId;
    @api recordApiName;
    @api fieldApiName;
    @track tags_list_view;
    @track error;

    _myValues = [];
    _count = 0;

    // THIS IS THE DO INIT IN LWC
    connectedCallback() {
        this._myValues = [this.recordApiName + '.' + this.fieldApiName];
    }

    @wire(getRecord, { recordId: '$recordId', fields: '$_myValues' })
    record;

    @wire(getListUi, { objectApiName: TAG_OBJECT, listViewApiName: 'All' })
    wired_tags_list_view({ error, data }) {
        if (data) {
            this.tags_list_view = getRecordTags(data.records.records, getFieldValue(this.record.data, this.recordApiName + '.' + this.fieldApiName));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.tags_list_view = undefined;
        }
    }
    
    get recordFieldValue() {
        return this.record.data ? getFieldValue(this.record.data, this.recordApiName + '.' + this.fieldApiName) : '';
    }

    get addPadding() {
        return ++this._count % 2 !== 0 ? 'horizontal-small' : '';
    }

}

function getRecordTags(tags_lv, record_value){
    let final_list = [];
    if(record_value != null){
        let tags = record_value.split(";");
        for(let tag of tags){
            final_list.push(tags_lv.find(element => element.fields.Internal_Value__c.value === tag));
        }
    }
    return final_list;
}