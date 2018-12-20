var ShipModel = Backbone.Model.extend({
    defaults: {
        name: null,
        manufacturer: null,
        crew: null,
        cost_in_credits: null
    }
})

var ShipCollection = Backbone.Collection.extend({
    model: ShipModel,
    url: 'https://swapi.co/api/starships/?format=json',
    parse: function (data){
        return data.results;
    },
    // falconchecker is a method of checking for the name and to set priceless in cost_in_credits
    falconChecker: function(){
        // checks each model and ship represents the data of each model
        _.each(this.models, function(ship){
          if (ship.get('name') === 'Millennium Falcon'){
            ship.set('cost_in_credits','priceless');
          }
        });
    }
})

var starShips = new ShipCollection();
starShips.fetch().then(function() {
    starShips.falconChecker();
    // changed or modified object in whatever findwhere finds
    console.log(starShips.findWhere({name: "Millennium Falcon"}).changed);
    console.log(starShips);
})