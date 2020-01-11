import { LightningElement, track } from "lwc";
import { NavigationMixin } from 'lightning/navigation';
//import { navigateTo } from "c/utils";

export default class TagAnythingNewTag extends NavigationMixin(LightningElement) {
    
    @track open_modal = false;

    openModal() {
        this.open_modal = true;
    }

    addTag(event){
        event.detail.fields.Id = { value: event.detail.id };
        this.dispatchEvent(new CustomEvent("newtag", { detail: event.detail }));
        this.closeModal();
    }

    closeModal(){
        this.open_modal = false;
    }

}
