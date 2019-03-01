public with sharing class TagAnythingBrowserController {

    @AuraEnabled(Cacheable=true)
    public static List<Tag__c> requireTags(String search_key){
        List<Tag__c> search_tags = new List<Tag__c>();
        search_tags = [FIND :search_key IN ALL FIELDS 
                       RETURNING Tag__c(Name, Icon__c, Internal_Value__c, Label_Color__c, Tag_Color__c WHERE Is_Active__c = true ORDER BY Name DESC) LIMIT 20];
        return search_tags;
    }
}
