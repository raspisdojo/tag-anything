import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { getListUi } from 'lightning/uiListApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import TAG_OBJECT from '@salesforce/schema/Tag_Anything__c';

export default class TagAnythingDisplayer extends LightningElement {
    @api recordId;
    @api recordApiName;
    @api fieldApiName;
    @api editMode = false;
    @track tags_list_view;
    @track record_tags;
    @track field_value;
    @track error;

    _myValues = [];
    _idField = "";
    _recordField = "";
    _record_tags_aux = [];
    _field_value_aux = "";
    _count = 0;

    // THIS IS THE DO INIT IN LWC
    connectedCallback() {
        this._recordField = this.recordApiName + '.' + this.fieldApiName;
        this._myValues = [this._recordField];
        this._idField = this.recordApiName + '.Id';
    }

    @wire(getRecord, { recordId: '$recordId', fields: '$_myValues' })
    record;

    @wire(getListUi, { objectApiName: TAG_OBJECT, listViewApiName: 'All' })
    wired_record_tags({ error, data }) {
        if (data) {
            this.tags_list_view = data.records.records;
            this.record_tags = this.getRecordTags(data.records.records, getFieldValue(this.record.data, this.recordApiName + '.' + this.fieldApiName));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.record_tags = undefined;
        }
    }
    
    getRecordTags(tags_lv, record_value){
        this.field_value = record_value;
        let final_list = [];
        if(record_value != null){
            let tags = record_value.split(";");
            for(let tag of tags){
                final_list.push(tags_lv.find(element => element.fields.Internal_Value__c.value === tag));
            }
        }
        return final_list;
    }

    get recordFieldValue() {
        return this.record.data ? getFieldValue(this.record.data, this.recordApiName + '.' + this.fieldApiName) : '';
    }

    get addPadding() {
        return ++this._count % 2 !== 0 ? 'horizontal-small' : '';
    }
    
    changeEditMode() {
        this.editMode = !this.editMode;
        if(this.editMode){
            this._record_tags_aux = [];
            for(var t of this.record_tags){
                this._record_tags_aux.push(t);
            }
            this._field_value_aux = this.field_value;
        } else {
            this.record_tags = this._record_tags_aux;
            this.field_value = this._field_value_aux;
            this._field_value_aux = "";
        }
    }

    selectedHandler(e) {
        console.log("selectedHandler " + e.detail.fields.Internal_Value__c.value);
        let index = this.record_tags.findIndex(element => element.fields.Internal_Value__c.value === e.detail.fields.Internal_Value__c.value);
        console.log(index);
        //let tag = this.tags_list_view.find(element => element.fields.Internal_Value__c.value === e.detail);
        //console.log(tag);
        if(index == -1){
            this.record_tags.push(e.detail);
            let tags = this.field_value.split(";");
            tags.push(e.detail.fields.Internal_Value__c.value);
            this.field_value = tags.join(';');
        }
    }

    deleteHandler(e) {
        let tags = this.field_value.split(";");
        let index = this.record_tags.findIndex(element => element.fields.Internal_Value__c.value === e.detail);
        this.record_tags.splice(index, 1);
        tags.splice(tags.indexOf(e.detail), 1);
        this.field_value = tags.join(';');
    }

    handleSave() {
        this._record_tags_aux = this.record_tags;
        this._field_value_aux = this.field_value;
        // Create the recordInput object
        const fields = {};
        fields['Id'] = this.recordId;
        fields[this.fieldApiName] = this.field_value;

        const recordInput = { fields };

        updateRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record updated',
                        variant: 'success'
                    })
                );
                this.changeEditMode();
                // Display fresh data in the form
                return refreshApex(this.recordId);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
            
    }

}
