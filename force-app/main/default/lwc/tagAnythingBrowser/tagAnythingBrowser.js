/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement, track, api, wire } from "lwc";
import { getListUi } from "lightning/uiListApi";
import { isNullOrWhiteSpace } from "c/utils";
import TAG_ANYTHING_OBJECT from "@salesforce/schema/Tag_Anything__c";

const PLACEHOLDER_DEFAULT = "Search Tag by Label";
const LISTVIEWAPINAME_DEFAULT = "All";
const DELAY = 300;
const PAGESIZE = 2000;
const FIELDS_REQUIRED = [
    "Name",
    "Is_Active__c",
    "Label_Color__c",
    "Tag_Color__c",
    "Icon__c",
    "Internal_Value__c",
    "Icon_Variant__c"
];

export default class TagAnythingBrowser extends LightningElement {
    @api placeholder = PLACEHOLDER_DEFAULT;
    @api listView = LISTVIEWAPINAME_DEFAULT;

    @track tagsToDisplay;
    @track queryTerm;
    @track error;

    _tagRecords;
    _tagRecordsMap = {};

    @wire(getListUi, {
        objectApiName: TAG_ANYTHING_OBJECT,
        listViewApiName: "$listView",
        pageSize: PAGESIZE,
        fields: FIELDS_REQUIRED
    })
    wiredRecord({ error, data }) {
        if (error) {
            this.error = "Unknown error";
            if (Array.isArray(error.body)) {
                this.error = error.body.map((e) => e.message).join(", ");
            } else if (typeof error.body.message === "string") {
                this.error = error.body.message;
            }
            this._tagRecords = undefined;
        } else if (data) {
            this._tagRecords = data.records.records;
            this.prepareMapOfRecords(this._tagRecords, "Internal_Value__c");
        }
    }

    handleBadgeSelected(evt) {
        this.dispatchEvent(new CustomEvent("badgeselected", { detail: this._tagRecordsMap[evt.detail] }));
    }

    handleKeyUp(evt) {
        window.clearTimeout(this.delayTimeout);
        const query_term = evt.target.value;
        this.delayTimeout = setTimeout(() => {
            if (isNullOrWhiteSpace(query_term)) {
                this.tagsToDisplay = [];
            } else {
                this.tagsToDisplay = this.filterTags(query_term.toLowerCase());
            }
        }, DELAY);
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

    prepareMapOfRecords(records, key_field) {
        for (let item of records) {
            this._tagRecordsMap[item.fields[key_field].value] = item;
        }
    }
}
