public with sharing class TagAnythingBrowserController {

    @AuraEnabled(Cacheable=true)
    public static List<Tag_Anything__c> requireTags(String search_key){
        List<list<SObject>> search_tags = new List<list<SObject>>();
        search_tags = [FIND :search_key IN ALL FIELDS 
                       RETURNING Tag_Anything__c(Name, Icon__c, Internal_Value__c, Label_Color__c, Tag_Color__c WHERE Is_Active__c = true ORDER BY Name DESC) 
                       LIMIT 20];
        return new List<Tag_Anything__c>((List<Tag_Anything__c>)search_tags[0]); 
    }
}
