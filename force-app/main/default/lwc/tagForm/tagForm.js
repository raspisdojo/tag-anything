import { LightningElement, api, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";

import NAME_FIELD from "@salesforce/schema/Tag_Anything__c.Name";
import IS_ACTIVE_FIELD from "@salesforce/schema/Tag_Anything__c.Is_Active__c";
import INTERNAL_VALUE_FIELD from "@salesforce/schema/Tag_Anything__c.Internal_Value__c";
import ICON_FIELD from "@salesforce/schema/Tag_Anything__c.Icon__c";
import LABEL_COLOR_FIELD from "@salesforce/schema/Tag_Anything__c.Label_Color__c";
import TAG_COLOR_FIELD from "@salesforce/schema/Tag_Anything__c.Tag_Color__c";
import ICON_VARIANT_FIELD from "@salesforce/schema/Tag_Anything__c.Icon_Variant__c";

export default class TagForm extends NavigationMixin(LightningElement) {
    // Exposing fields to make them available in the template
    nameField = NAME_FIELD;
    isActiveField = IS_ACTIVE_FIELD;
    internalValueField = INTERNAL_VALUE_FIELD;
    iconField = ICON_FIELD;
    labelColorField = LABEL_COLOR_FIELD;
    tagColorField = TAG_COLOR_FIELD;
    iconVariantField = ICON_VARIANT_FIELD;
    objectApiName = "Tag_Anything__c";

    @api recordId;

    @track tagLabel;
    @track tagIcon;
    @track tagIsActive;
    @track tagLabelColor;
    @track tagTagColor;
    @track tagIconVariant;

    applyDefaultsToTag() {
        let input_elements = this.template.querySelectorAll("lightning-input-field");
        for (let item of input_elements) {
            if (item.id.includes("tag-name")) {
                this.tagLabel = item.value;
            } else if (item.id.includes("tag-is-active")) {
                this.tagIsActive = item.value;
            } else if (item.id.includes("tag-icon")) {
                this.tagIcon = item.value;
            } else if (item.id.includes("tag-label-color")) {
                this.tagLabelColor = item.value;
            } else if (item.id.includes("tag-color")) {
                this.tagTagColor = item.value;
            } else if (item.id.includes("variant")) {
                this.tagIconVariant = item.value;
            }
        }
    }

    handleSuccess(event) {
        const payload = event.detail;
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                recordId: payload.id,
                objectApiName: payload.apiName,
                actionName: "view"
            }
        });
    }

    handleCancel() {
        window.history.back();
        return false;
    }

    handleNameChange(evt) {
        this.tagLabel = evt.detail.value;
    }

    handleIconChange(evt) {
        this.tagIcon = evt.detail.value;
    }

    handleIsActiveChange(evt) {
        this.tagIsActive = evt.detail.value;
    }

    handleLabelColorChange(evt) {
        this.tagLabelColor = evt.detail.value;
    }

    handleTagColorChange(evt) {
        this.tagTagColor = evt.detail.value;
    }

    handleInputLabelColorChange(evt) {
        this.tagLabelColor = evt.detail.value;
    }

    handleInputTagColorChange(evt) {
        this.tagTagColor = evt.detail.value;
    }

    handleInputTagIconVariant(evt) {
        this.tagIconVariant = evt.detail.value;
    }

    submitMyForm() {
        let my_form = this.template.querySelector('[data-id="my-form"]');
        my_form.submit();
    }
}
