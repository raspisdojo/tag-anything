@isTest
public with sharing class TagAnythingBrowserControllerTest {

    @TestSetup
    static void makeData(){
        List<Tag_Anything__c> tags_insert = new List<Tag_Anything__c>();
        Tag_Anything__c new_tag = new Tag_Anything__c(
            Name = 'New',
            Internal_Value__c = 'New'
        );
        tags_insert.add(new_tag);

        Tag_Anything__c bug_tag = new Tag_Anything__c(
            Name = 'Bug',
            Internal_Value__c = 'Bug',
            Tag_Color__c = '#FF0000'
        );
        tags_insert.add(bug_tag);

        insert tags_insert;
    }

    @isTest
    public static void requireNewTag() {
        List<Tag_Anything__c> new_test = TagAnythingBrowserController.requireTags('New');
        System.assertEquals('New', new_test[0].Internal_Value__c);
    }

    @isTest
    public static void requireBugTag(){
        List<Tag_Anything__c> bug_test = TagAnythingBrowserController.requireTags('Bug');
        System.assertEquals('#FF0000', bug_test[0].Tag_Color__c);
    }
}
