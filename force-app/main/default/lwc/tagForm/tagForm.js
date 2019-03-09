import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class TagForm extends NavigationMixin(LightningElement) {
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
