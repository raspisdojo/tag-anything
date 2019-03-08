@isTest
private with sharing class TagAnythingDisplayerControllerTest {

    @TestSetup
    static void makeData() {
        List<Tag_Anything__c> tags = new List<Tag_Anything__c>();
        tags.add(new Tag_Anything__c(
            Name = 'Tag 1',
            Internal_Value__c = 'Tag1'
        ));
        tags.add(new Tag_Anything__c(
            Name = 'Tag 2',
            Internal_Value__c = 'Tag2'
        ));

        insert tags;
    }

    @isTest
    static void testRequireCurrentTagsReturningOneTag() {
        List<Tag_Anything__c> tags = TagAnythingDisplayerController.requireCurrentTags('Tag1');
        System.assertEquals(1, tags.size(), 'Should return only 1 tag');
        System.assertEquals('Tag 1', tags.get(0).Name, 'Should return Tag 1');
    }

    @isTest
    static void testRequireCurrentTagsReturningTwoTags() {
        List<Tag_Anything__c> tags = TagAnythingDisplayerController.requireCurrentTags('Tag1,Tag2');
        System.assertEquals(2, tags.size(), 'Should return 2 tags');
        System.assertEquals('Tag 2', tags.get(0).Name, 'Should return Tag 2');
        System.assertEquals('Tag 1', tags.get(1).Name, 'Should return Tag 1');
    }

    @isTest
    static void testRequireCurrentTagsReturningNoMatchValues() {
        List<Tag_Anything__c> tags = TagAnythingDisplayerController.requireCurrentTags('Tag');
        System.assertEquals(0, tags.size(), 'Should return 0 tags');
    }

    @isTest
    static void testRequireCurrentTagsWithNullParam() {
        List<Tag_Anything__c> tags = TagAnythingDisplayerController.requireCurrentTags(null);
        System.assertEquals(0, tags.size(), 'Should return 0 tags');
    }

    @isTest
    static void testRequireCurrentTagsWithEmptyParam() {
        List<Tag_Anything__c> tags = TagAnythingDisplayerController.requireCurrentTags(' ');
        System.assertEquals(0, tags.size(), 'Should return 0 tags');
    }
}
