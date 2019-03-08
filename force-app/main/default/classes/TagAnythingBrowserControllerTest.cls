@isTest
public with sharing class TagAnythingBrowserControllerTest {

    @isTest
    public static void requireNewTag() {
        Tag_Anything__c new_tag = new Tag_Anything__c(
            Name = 'New',
            Internal_Value__c = 'New'
        );
        insert new_tag;
        Id [] fixed_search_results = new Id[]{new_tag.Id};
        Test.setFixedSearchResults(fixed_search_results);
        Test.startTest();
        List<Tag_Anything__c> new_test = TagAnythingBrowserController.requireTags('test');
        Test.stopTest();
        System.assertEquals('New', new_test[0].Internal_Value__c);
    }

    @isTest
    public static void requireBugTag(){
        Tag_Anything__c bug_tag = new Tag_Anything__c(
            Name = 'Bug',
            Internal_Value__c = 'Bug',
            Tag_Color__c = '#FF0000'
        );
        insert bug_tag;
        Id [] fixed_search_results = new Id[]{bug_tag.Id};
        Test.setFixedSearchResults(fixed_search_results);
        Test.startTest();
        List<Tag_Anything__c> bug_test = TagAnythingBrowserController.requireTags('Bug');
        Test.stopTest();
        System.assertEquals('#FF0000', bug_test[0].Tag_Color__c);
    }
    
}