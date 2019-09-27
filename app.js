

    // The main view of the application
    var App = Backbone.View.extend({

        // Base the view on an existing element
        el: $('#main'),

        //template: _.template("Welcome to <%= name %>"),
        mytemplate: function(){
            var source   = document.getElementById("entry-template").innerHTML;
            var template = Handlebars.compile(source);
            var context = {title: "My New Post", body: "This is my first post!"};
            var html    = template(context);
            return html;
        },

        initialize: function(){
            this.render();
        },

        render: function(){
            //this.$el.html(this.template({name: 'Tutorialspoint...!'}));
            this.$el.html(this.mytemplate());
        }

    });

    new App();
    var datesCollection = "";
    var dashboard = Backbone.View.extend({
        // Base the view on an existing element
        el: $('#main-content'),

        //template: _.template("Welcome to <%= name %>"),
        dashboardHtml: function(data){
            var source   = document.getElementById("dashboard").innerHTML;
            var template = Handlebars.compile(source);
            var html    = template(data);
            return html;
        },

        initialize: function(){
            var _this = this;
            services.getAllDates(function(res){
                console.log(res);
                datesCollection = new DatesCollection(res.data);
                console.log(datesCollection);
                _this.render(res);
            })
            
        },

        render: function(data){
            this.$el.html(this.dashboardHtml(data));
        }
    });

    var upcomingDates = Backbone.View.extend({
        // Base the view on an existing element
        el: $('#main-content'),

        //template: _.template("Welcome to <%= name %>"),
        upcomingDatesHtml: function(){
            var source   = document.getElementById("upcoming-dates").innerHTML;
            var template = Handlebars.compile(source);
            var context = {title: "My New Post", body: "This is my first post!"};
            var html    = template(context);
            return html;
        },

        initialize: function(){
            this.render();
        },

        render: function(){
            this.$el.html(this.upcomingDatesHtml());
        }
    });

    var myProfile = Backbone.View.extend({
        // Base the view on an existing element
        el: $('#main-content'),

        //template: _.template("Welcome to <%= name %>"),
        myProfileHtml: function(){
            var source   = document.getElementById("my-profile").innerHTML;
            var template = Handlebars.compile(source);
            var context = {title: "My New Post", body: "This is my first post!"};
            var html    = template(context);
            return html;
        },

        initialize: function(){
            this.render();
        },

        render: function(){
            this.$el.html(this.myProfileHtml());
        }
    });

    var historicalDates = Backbone.View.extend({
        // Base the view on an existing element
        el: $('#main-content'),

        //template: _.template("Welcome to <%= name %>"),
        historicalDatesHtml: function(){
            var source   = document.getElementById("historical-dates").innerHTML;
            var template = Handlebars.compile(source);
            var context = {title: "My New Post", body: "This is my first post!"};
            var html    = template(context);
            return html;
        },

        initialize: function(){
            this.render();
        },

        render: function(){
            this.$el.html(this.historicalDatesHtml());
        }
    });

    
    var TodoRouter = Backbone.Router.extend({
        /* define the route and function maps for this router */
        routes: {
          "" : "dashboard",
          "dashboard" : "dashboard",
          "upcoming-dates" : "upcomingDates",
          "my-profile" :"myProfile",
          "historical-dates":"historicalDates"
        },
      
        dashboard: function(){
            console.log('dashboard');
            new dashboard();
        },

        upcomingDates: function(){
            console.log('upcomingDates');
            new upcomingDates();
        },
        myProfile: function(){
            console.log('myprofile');
            new myProfile();
        },

        historicalDates: function(){
            console.log('Historical Dates');
            new historicalDates();
        },
      
        
    });

    
      
    var myTodoRouter = new TodoRouter();

    var DateModel = Backbone.Model.extend({
        url: 'http://event-reminder-app.herokuapp.com/eventDetails',
        defaults: {
            "_id": "",
            "eventType": "",
            "eventName": "",
            "eventDate": "",
            "emailId": "",
            "mobileNo": "",
            "isRepeatAnnually": "",
        }
    });

    //var dateInd = new DateModel();

    // dateInd.fetch({
    //     data: $.param({ _id: "5d7aa8811a55c93024ab91f9"}),
    //     success: function (dates) {
    //         console.log(dates.toJSON());
    //     }
    // });

    var DatesCollection = Backbone.Collection.extend({
        url: 'http://event-reminder-app.herokuapp.com/allEvents',
        //model: DateModel
    });

    var services = {
        "getAllDates": function(done){
            //var datesCollection = new DatesCollection();

            // datesCollection.fetch({
            //     success: function(dates){
            //         done(dates)
            //     },
            //     error: function(err){
            //         done(err);
            //     }
            // });
            $.ajax({
                url: "http://event-reminder-app.herokuapp.com/allEvents",
                type: 'GET',
                dataType: 'json', // added data type
                success: function(res) {
                    done(res);
                }
            });
        }
    }

    
    
    Backbone.history.start();

    

