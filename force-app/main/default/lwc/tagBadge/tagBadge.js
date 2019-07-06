import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { isNullOrWhiteSpace } from 'c/utils';

import NAME_FIELD from '@salesforce/schema/Tag_Anything__c.Name';
import ICON_FIELD from '@salesforce/schema/Tag_Anything__c.Icon__c';
import IS_ACTIVE_FIELD from '@salesforce/schema/Tag_Anything__c.Is_Active__c';
import LABEL_COLOR_FIELD from '@salesforce/schema/Tag_Anything__c.Label_Color__c';
import TAG_COLOR_FIELD from '@salesforce/schema/Tag_Anything__c.Tag_Color__c';
import INTERNAL_VALUE from '@salesforce/schema/Tag_Anything__c.Internal_Value__c';

const fields = [ NAME_FIELD, ICON_FIELD, IS_ACTIVE_FIELD, LABEL_COLOR_FIELD, TAG_COLOR_FIELD, INTERNAL_VALUE ];

export default class TagBadge extends LightningElement {
    @api recordId;
    @api disableClick = false;
    @api inboundLabel = 'No Name';
    @api inboundIcon = 'utility:refresh';
    @api inboundIsActive = false;
    @api inboundLabelColor = '#FFF';
    @api inboundTagColor = '#EAEAEA';
    @api inboundInternalValue = '';
    @api displayDelete = false;

    @wire(getRecord, { recordId: '$recordId', fields })
    wiredRecord;

    get label() {
        if (!isNullOrWhiteSpace(this.recordId)) {
            return getFieldValue(this.wiredRecord.data, NAME_FIELD);
        }
        return this.inboundLabel;
    }

    get icon() {
        if (!isNullOrWhiteSpace(this.recordId)) {
            return getFieldValue(this.wiredRecord.data, ICON_FIELD);
        }
        return this.inboundIcon;
    }

    get isActive() {
        if (!isNullOrWhiteSpace(this.recordId)) {
            return getFieldValue(this.wiredRecord.data, IS_ACTIVE_FIELD);
        }
        return this.inboundIsActive;
    }

    get labelColor() {
        if (!isNullOrWhiteSpace(this.recordId)) {
            return 'color: ' + getFieldValue(this.wiredRecord.data, LABEL_COLOR_FIELD);
        }
        return 'color: ' + this.inboundLabelColor;
    }

    get tagColor() {
        if (!isNullOrWhiteSpace(this.recordId)) {
            return 'background-color: ' + getFieldValue(this.wiredRecord.data, TAG_COLOR_FIELD);
        }
        return 'background-color: ' + this.inboundTagColor;
    }

    handleBadgeClick() {
        if (!this.disableClick) {
            if (!isNullOrWhiteSpace(this.recordId)) {
                this.dispatchEvent(new CustomEvent('selected', { detail: this.wiredRecord.data }));
            }
            else {
                this.dispatchEvent(new CustomEvent('selected', { detail: this.inboundInternalValue }));
            }
        }
    }

    deleteHandler(){
        this.dispatchEvent(new CustomEvent('delete', { detail: this.inboundInternalValue }));
    }
}
