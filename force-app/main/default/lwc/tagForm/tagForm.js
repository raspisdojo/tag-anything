import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import NAME_FIELD from '@salesforce/schema/Tag_Anything__c.Name';
import IS_ACTIVE_FIELD from '@salesforce/schema/Tag_Anything__c.Is_Active__c';
import INTERNAL_VALUE_FIELD from '@salesforce/schema/Tag_Anything__c.Internal_Value__c';
import ICON_FIELD from '@salesforce/schema/Tag_Anything__c.Icon__c';
import LABEL_COLOR_FIELD from '@salesforce/schema/Tag_Anything__c.Label_Color__c';
import TAG_COLOR_FIELD from '@salesforce/schema/Tag_Anything__c.Tag_Color__c';

export default class TagForm extends NavigationMixin(LightningElement) {
    // Exposing fields to make them available in the template
    nameField = NAME_FIELD;
    isActiveField = IS_ACTIVE_FIELD;
    internalValueField = INTERNAL_VALUE_FIELD;
    iconField = ICON_FIELD;
    labelColorField = LABEL_COLOR_FIELD;
    tagColorField = TAG_COLOR_FIELD;
    objectApiName = 'Tag_Anything__c';

    @api recordId;

    handleSuccess(event) {
        const payload = event.detail;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: payload.id,
                objectApiName: payload.apiName,
                actionName: 'view'
            }
        });
    }
}
