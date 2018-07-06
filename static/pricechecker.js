/*odoo.define('pricechecker.my_javascript', function (require) {

    "use strict";

     var core = require('web.core');
     var QWeb = core.qweb;
     var Widget = require('web.Widget');

    console.log("test============1");

      var MyClass = core.Class.extend({
        init: function(name) {
          this.name = name;
        },
        say_hello: function() {
            console.log("hello");
        },
      });
    console.log("test============2");
      var my_object = new MyClass("reynol");
      my_object.name = "Bob";
      my_object.say_hello();

//esta clase no esta funcionando
    var HomePageTemplate = Widget.extend({
        template: "HomePageTemplate",
      //  className: 'un-div',
          init: function(parent) {
              this._super(parent);
              this.name = "Mordecai";
              console.log("--init--");
                  console.log(this.$el);
              //this.$el.append("<div>Hello dear Odoo user!</div>");
          },
          start: function() {
            console.log(this.$el);
            console.log(this.$el.text() );
            console.log("-started--");
          }
      });

      var jeje = new HomePageTemplate(this);
      jeje.start();
      jeje.appendTo(".un-div");

  return {HomePageTemplate:HomePageTemplate};
});
*/
var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
    $scope.isNewProduct = false;

    $scope.product = {
                    "params": {
                        "barcode":"",
                        "price":"",
                        "standard_price":"",
                        "name":""
                    }
                };

    $scope.current_product = angular.copy($scope.product);

odoo.define('custom_module.my_javascript', function (require) {

  "use strict";

  var core = require('web.core');
  var Widget = require('web.Widget');
  var ajax = require('web.ajax');
  var prices={};

   var MyClass = core.Class.extend({
     
     init: function() {
       this.initUi();
       this.getPrices();
     },
     __on_barcode_scanned : function (barcode, param2) {
           console.log(barcode);
           console.log(prices);
           console.log(prices[barcode]);
           console.log($scope);
           //$("#name").text(prices[String(barcode)].display_name);
           //$("#price").text(prices[String(barcode)].price);
           if(prices[String(barcode)]){
               $scope.isNewProduct = false;
               $("#barcode").prop('disabled', true);
               $scope.product.params.barcode = barcode;
               $scope.product.params.name = prices[String(barcode)].display_name;
               $scope.product.params.price = prices[String(barcode)].price;
               $scope.product.params.standard_price = prices[String(barcode)].standard_price;
               $scope.current_product = angular.copy($scope.product);
               $scope.$apply();
               $('#bigtext').bigtext({
                  maxfontsize: 150 
                });
               $('#bigtext_name').bigtext({
                  maxfontsize: 40
                });
            }else{
                $scope.isNewProduct = true;
                $("#barcode").prop('disabled', false);
                $scope.current_product = {
                    "params": {
                        "barcode": barcode,
                        "price":"",
                        "standard_price":"",
                        "name":""
                    }
                };
                $scope.$apply();
                $('#myModal').modal('show');
            }
    },

     initUi: function() {

       core.bus.on('barcode_scanned', this, this.__on_barcode_scanned);

       $('#bigtext').bigtext({
          maxfontsize: 150 
        });
       $('#bigtext_name').bigtext({
          maxfontsize: 40
        });
       $(window).keypress(function(event) {
         //  var code = 
         var keycode =(event.keyCode ? event.keyCode : event.which);
         if(keycode == '13') {
             alert('You pressed a "enter" key in somewhere');
         }
         console.log("Tecla: "+ keycode);
       });
       console.log("se actualizo================================2");


       $("#save-product").click(function(event) {
         console.log("save-product");

                if($scope.isNewProduct){
                    ajax.jsonRpc("/create/products", 'call', $scope.current_product ).then(function(response){
                     response = JSON.parse(response);
                     console.log(response);
                     console.log("no debe haber params");
                     console.log(response[String($scope.current_product.params.barcode)]);

                     prices[String($scope.current_product.params.barcode)] =  response[String($scope.current_product.params.barcode)];

                     console.log(prices[String($scope.current_product.params.barcode)] );

                     $scope.product = angular.copy($scope.current_product);
                     $scope.$apply();
                   });
                }else{
                  ajax.jsonRpc("/update/products", 'call', $scope.current_product ).then(function(response){
                       response = JSON.parse(response);
                       console.log(response);
                       prices[String($scope.current_product.params.barcode)].display_name = response[String($scope.current_product.params.barcode)].display_name;
                       prices[String($scope.current_product.params.barcode)].price = response[String($scope.current_product.params.barcode)].price;
                       prices[String($scope.current_product.params.barcode)].standard_price = response[String($scope.current_product.params.barcode)].standard_price;
                       $scope.product = angular.copy($scope.current_product);
                       $scope.$apply();
                    });
                }
              
       });
     },
     getPrices: function() {
       console.log("SUCCESSFUL 2");
	   $scope.product.params.name = "CARGANDO LISTA DE PRODUCTOS ...";
        ajax.jsonRpc("/get/products", 'call').then(function(response){
               prices = JSON.parse(response);
               console.log(prices);
			   $scope.product.params.name = "<<Listo para escanear>>";
       });
     },
   });
//(123.5743937894738457398457348574398).toFixed(2);
   $(function() {
     $scope.my_object = new MyClass();
   });

});

});
