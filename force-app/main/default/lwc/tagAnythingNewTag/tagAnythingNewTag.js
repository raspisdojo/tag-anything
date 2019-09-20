import { LightningElement, track } from "lwc";
import { NavigationMixin } from 'lightning/navigation';
import { navigateTo } from "c/utils";

export default class TagAnythingNewTag extends NavigationMixin(LightningElement) {
    @track
    url;
    navigateToNewRecordPage() {
        console.log("navigateToNewRecordPage");
        navigateTo("standard__objectPage", "Tag_Anything__c", "new");
        /*console.log("navigateToNewRecordPage");
        // Opens the new Account record modal
        // to create an Account.
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Tag_Anything__c',
                actionName: 'new'
            }
        });*/

        /*this.accountHomePageRef = {
            type: "standard__objectPage",
            attributes: {
                "objectApiName": "Tag_Anything__c",
                "actionName": "new"
            }
        };
        console.log(url);
        this[NavigationMixin.GenerateUrl](this.accountHomePageRef)
            .then(url => this.url = url);*/
    }
}
