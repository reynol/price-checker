odoo.define('addon_name.service', function (require) {
    var utils = require('web.utils');
    var Model = require('web.Model');


    var MyWidget = Widget.extend({

        // QWeb template to use when rendering the object
        template: "MyQWebTemplate",
        events: {
            // events binding example
            'click .my-button': 'handle_click',
        },

        init: function(parent) {
            this._super(parent);

                  console.log("init");
            // insert code to execute before rendering, for object
            // initialization
        },
        start: function() {
            var sup = this._super();
            console.log("start");
            // post-rendering initialization code, at this point

            // allows multiplexing deferred objects
            return $.when(
                // propagate asynchronous signal from parent class
                sup,
                // return own's asynchronous signal
                this.rpc(/* … */))
        },
    renderElement: function() {
        var self = this;
        this._super();
        this.$('#rey').click(function(){
        console.log("click");
        });
    }
    });
    console.log("creando obj");
    var my_widget = new MyWidget(this);
    console.log("llamando start");
    my_widget.start();

    // do things with utils and Model
    var something_useful = 15;
    return  {
        something_useful: something_useful,
        my_widget: my_widget
    };
});
