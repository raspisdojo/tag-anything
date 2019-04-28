import { LightningElement, track, api, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import TAG_ANYTHING_OBJECT from '@salesforce/schema/Tag_Anything__c';

const PLACEHOLDER_DEFAULT = 'Search Tag by Label';
const LISTVIEWAPINAME_DEFAULT = 'All';

export default class TagAnythingBrowser extends LightningElement {
    @api placeholder = PLACEHOLDER_DEFAULT;
    @api listView = LISTVIEWAPINAME_DEFAULT;

    @track tagsToDisplay;
    @track queryTerm;
    @track error;

    _tagRecords;

    @wire(getListUi, { objectApiName: TAG_ANYTHING_OBJECT, listViewApiName: '$listView' })
    wiredRecord({ error, data }) {
        if (error) {
            this.error = 'Unknown error';
            if (Array.isArray(error.body)) {
                this.error = error.body.map((e) => e.message).join(', ');
            }
            else if (typeof error.body.message === 'string') {
                this.error = error.body.message;
            }
            this._tagRecords = undefined;
        }
        else if (data) {
            this._tagRecords = data.records.records;
        }
    }

    handleKeyUp(evt) {
        let query_term = evt.target.value;
        if (this.isNullOrWhiteSpace(query_term)) {
            this.tagsToDisplay = [];
        }
        else {
            this.tagsToDisplay = this.filterTags(query_term.toLowerCase());
        }
    }

    filterTags(query_term) {
        let items_to_return = [];
        for (let item of this._tagRecords) {
            if (item.fields.Name.value.toLowerCase().includes(query_term)) {
                items_to_return.push(item);
            }
        }
        return items_to_return;
    }

    // Probably this method could be inside a Utitlities.js
    isNullOrWhiteSpace(string_value) {
        return !string_value || string_value.length === 0 || /^\s*$/.test(string_value);
    }
}
