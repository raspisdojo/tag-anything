import { NavigationMixin } from 'lightning/navigation';

const isNullOrWhiteSpace = (string_value) => {
    return !string_value || string_value.length === 0 || /^\s*$/.test(string_value);
};

const deleteWhiteSpaces = (string_value) => {
    return string_value.replace(/ /g, '');
};

const navigateTo = (type, objectApiName, actionName) => {
    console.log("navigateTo");
    console.log("type " + type);
    console.log("objectApiName " + objectApiName);
    console.log("actionName " + actionName);
    //type: standard__objectPage | objectApiName: Tag_Anything__c | actionName: new
    return this[NavigationMixin.Navigate]({
        type: type,
        attributes: {
            objectApiName: objectApiName,
            actionName: actionName
        }
    });
};

export { isNullOrWhiteSpace, deleteWhiteSpaces, navigateTo };
