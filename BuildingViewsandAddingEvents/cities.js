var CityModel = Backbone.Model.extend({
    defaults: {
        city: null,
        nickName: null,
        founded: null
    }
});
var StudentCollection = Backbone.Collection.extend({
    Model: CityModel
});
// This outputs the data when there is a click event
var HistoryView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    tagName: 'li',
    template: _.template("<h2><%= city %> <%= nickName %> <%= founded %></h2>"),
    render: function(){
        // empty clears the class History in html
        $('.History').empty();
        // Had to console.log this because there are different formats.
        // because in CityView.function I am retriving data and that data is different to the
        // data being displayed using CityListView
        // Check out how each view is different when comparing the
        // this.$el.html(this.template(this.model.toJSON())) and
        // this.$el.html(this.template(this.model[0].attributes))
        console.log(this.model[0].attributes);
        this.$el.html(this.template(this.model[0].attributes));
        $('.History').append(this.$el);
        return this;
    }
});
// Just test code used to compare data format
// var ex = new CityModel({city: "balls", nickName: "what", founded: "who cares"});
// console.log(ex);
// var exCol = new  HistoryView({model: ex});
// console.log(exCol);

var myCityTemplate = '<h1 class= "displayInfo" name= "showCity"><%= city %></h1>';
var CityView = Backbone.View.extend({
    tagName: "li",
    template: _.template(myCityTemplate),
    initialize: function(){
        this.listenTo(this.model, 'change', this.render);
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events:{
        'click .displayInfo':'displayFunction'
    },
    displayFunction: function(){
        // This is to find where city lives, check out the console.log without the innerHTML
        // console.log(this.$el.find('h1[name= "showCity"]')[0].innerHTML);
        CityName = this.$el.find('h1[name= "showCity"]')[0].innerHTML;
        console.log(Cities.where({city: CityName}));
        var myCity = Cities.where({city: CityName});
        var myCityHistory = new HistoryView({model: myCity})
        console.log(myCityHistory);
    }
});

var CityListView = Backbone.View.extend({
    el: ".cities",
    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.empty();
        this.collection.each(function(places){
            // each model will be placed in the CityView using 'li' within the "Cities" class
            var MetropolisViewModel = new CityView({model: places});
            this.$el.append(MetropolisViewModel.render().$el);
        }, this);
    }
})
var city1 = new CityModel({city: "Anaheim", nickName: "Disney", founded: "1840"});
var city2 = new CityModel({city: "Las Vegas", nickName: "Sinners", founded: "1889"});
var city3 = new CityModel({city: "New York", nickName: "City of hope", founded: "1750"});
var city4 = new CityModel({city: "Palm Springs", nickName: "Very hot", founded: "1849"});
var Cities = new StudentCollection([city1, city2, city3, city4]);
var myCityList = new CityListView({collection: Cities});