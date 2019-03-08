public without sharing class TagAnythingDisplayerController {

    @AuraEnabled(cacheable=true)
    public static List<Tag_Anything__c> requireCurrentTags(String current_tags) {
        List<Tag_Anything__c> tags_to_return = new List<Tag_Anything__c>();
        if (String.isNotBlank(current_tags)) {
            current_tags = current_tags.deleteWhitespace();
            List<String> current_tags_to_check = current_tags.split(',');
            tags_to_return = [SELECT Id, Name, Icon__c, Internal_Value__c, Label_Color__c, Tag_Color__c
                                FROM Tag_Anything__c
                                WHERE Internal_Value__c IN :current_tags_to_check
                                ORDER BY Name DESC];
        }
        return tags_to_return;
    }
}