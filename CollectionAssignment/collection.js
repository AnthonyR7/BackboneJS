var TravelTimeModel = Backbone.Model.extend({
    defaults:{
        
    }
});
var TravelTimeCollection = Backbone.Collection.extend({
    model: TravelTimeModel,
    url: "http://wsdot.com/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson?AccessCode=f2a807e4-5e5f-43c4-90b4-153e13047121",
    parse: function(data){
        return data;
    }
})
var travelTimes = new TravelTimeCollection();
travelTimes.fetch().then(function() {
    // For the length
    console.log(travelTimes.length);
    // To get a model from a Colletion
    console.log(travelTimes.at(30));
    // To get the currentime of the first model
    console.log(travelTimes.at(0).attributes.CurrentTime);
    // where is used to get all the models with currentime of 10
    console.log(travelTimes.where({CurrentTime: 10}));
    // findWhere is used to get the first thing that matches the parameter.
    console.log(travelTimes.findWhere({Name: "Bellevue-Seattle via 520 (WB PM)"}))
    console.log(travelTimes);
})
// Use Chrome extention COR for these files