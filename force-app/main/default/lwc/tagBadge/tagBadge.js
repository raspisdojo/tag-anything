import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/Tag_Anything__c.Name';
import ICON_FIELD from '@salesforce/schema/Tag_Anything__c.Icon__c';
import IS_ACTIVE_FIELD from '@salesforce/schema/Tag_Anything__c.Is_Active__c';
import LABEL_COLOR_FIELD from '@salesforce/schema/Tag_Anything__c.Label_Color__c';
import TAG_COLOR_FIELD from '@salesforce/schema/Tag_Anything__c.Tag_Color__c';

const fields = [ NAME_FIELD, ICON_FIELD, IS_ACTIVE_FIELD, LABEL_COLOR_FIELD, TAG_COLOR_FIELD ];

export default class TagBadge extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields })
    wiredRecord;

    get label() {
        return getFieldValue(this.wiredRecord.data, NAME_FIELD);
    }

    get icon() {
        return getFieldValue(this.wiredRecord.data, ICON_FIELD);
    }

    get isActive() {
        return getFieldValue(this.wiredRecord.data, IS_ACTIVE_FIELD);
    }

    get labelColor() {
        return 'color: ' + getFieldValue(this.wiredRecord.data, LABEL_COLOR_FIELD);
    }

    get tagColor() {
        return 'background-color: ' + getFieldValue(this.wiredRecord.data, TAG_COLOR_FIELD);
    }

    handleBadgeClick() {
        this.dispatchEvent(new CustomEvent('selected', { detail: this.wiredRecord.data }));
    }
}
