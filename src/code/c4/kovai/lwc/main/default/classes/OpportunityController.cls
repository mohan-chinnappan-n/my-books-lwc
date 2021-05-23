// OpportunityController.cls
public with sharing class OpportunityController {    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunityList() {
        return [
          SELECT Id,Name FROM Opportunity LIMIT 10
        ];
    }
}