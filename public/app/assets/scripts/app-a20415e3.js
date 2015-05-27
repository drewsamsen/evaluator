"use strict";angular.module("valueMash",["ngMaterial","ngAnimate","ngCookies","ngTouch","ngSanitize","ui.router","ngStorage","toaster","angular-cache"]).config(["$httpProvider",function(t){"#%21"===window.location.hash.substr(0,4)&&window.location.replace(window.location.href.split("#%21").join("#!")),t.defaults.transformRequest=function(t){return angular.isObject(t)&&"[object File]"!==String(t)?$.param(t):t},t.defaults.withCredentials=!0}]),angular.module("valueMash").controller("LayoutGuestCtrl",["$scope","$rootScope","$state",function(t,o,a){t.$state=a,t.layoutModel={}}]),angular.module("valueMash").controller("LayoutAppCtrl",["$scope","$rootScope","$state",function(t,o,a){t.$state=a,t.layoutModel={}}]),angular.module("valueMash").controller("LoginCtrl",["$scope","$rootScope","$window","$state","CacheFactory","Notifier","API",function(t,o,a,e,l,n,r){t.model={login:"",password:"",inProgress:!1},t.showNotice=function(){n.show("Test please")},t.attemptAuth=function(t){t&&t.username&&t.password?(n.show("Attempting auth..."),r.login(t)):n.show("Invalid username or password")}}]),angular.module("valueMash").controller("DashboardCtrl",["$scope",function(){}]),angular.module("valueMash").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(t,o,a){a.html5Mode(!1),a.hashPrefix("!"),o.otherwise("/dashboard"),t.state("layout_guest",{"abstract":!0,views:{root:{templateUrl:"modules/layout/layout_guest.html",controller:"LayoutGuestCtrl"}}}).state("layout_guest.login",{url:"/login",templateUrl:"modules/guest/login.html",controller:"LoginCtrl",isPublic:!0,guestOnly:!0}).state("layout_app",{"abstract":!0,views:{root:{templateUrl:"modules/layout/layout_app.html",controller:"LayoutAppCtrl"},"sidebar@layout_app":{templateUrl:"modules/layout/_layout_app_sidebar.html",controller:"LayoutAppCtrl"}}}).state("layout_app.dashboard",{url:"/dashboard",templateUrl:"modules/dashboard/dashboard.html",controller:"DashboardCtrl"})}]),angular.module("valueMash").service("Notifier",["$mdToast",function(t){var o={show:function(o){t.show(t.simple().content(o).position("top left").hideDelay(1e3))}};return o}]),angular.module("valueMash").service("API",["$http",function(t){var o=function(o){o=angular.extend({auth:!0,method:"",url:""},o);var a={method:o.method,url:"/"+o.url,data:o.data||null};return t(a)},a={login:function(t){return o({auth:!1,method:"POST",url:"sessions.json",data:t})}};return a}]),angular.module("valueMash").run(["$templateCache",function(t){t.put("modules/dashboard/dashboard.html",'<h2>Dashboard!</h2><md-button class="contact" ui-sref="layout_guest.login" aria-label="Log in"><md-tooltip>Contact Bob</md-tooltip>Log in</md-button>'),t.put("modules/layout/_layout_app_sidebar.html","<md-toolbar class=\"md-whiteframe-z1\"><h1>Sidebar</h1></md-toolbar><md-list><md-list-item ng-repeat=\"it in ['1','2','3']\"><md-button>Thing {{ it }}</md-button></md-list-item></md-list>"),t.put("modules/layout/layout_app.html",'<md-sidenav ui-view="sidebar" class="site-sidenav md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia(\'gt-sm\')"></md-sidenav><div flex="" layout="column" tabindex="-1" role="main" class="md-whiteframe-z2"><md-toolbar layout="row" class="md-whiteframe-z1"><md-button class="menu" hide-gt-sm="" ng-click="ul.toggleList()" aria-label="Show User List">Menu</md-button><h1>Layout_app.html <i class="fa fa-user"></i></h1></md-toolbar><md-content flex="" id="content" ui-view=""><p>ui-view</p></md-content></div>'),t.put("modules/layout/layout_guest.html",'<div flex="" layout="column" tabindex="-1" role="main" class="md-whiteframe-z2"><md-toolbar layout="row" class="md-whiteframe-z1" layout-padding=""><h1>Layout guest</h1></md-toolbar><md-content id="content" ui-view="" layout-padding=""></md-content><md-content layout="row" id="footer" layout-padding=""><p>Footer.</p></md-content></div>'),t.put("modules/guest/login.html",'<h3>Login!</h3><md-content layout="row"><md-button ui-sref="layout_app.dashboard" aria-label="Log in" class="contact"><md-tooltip>Dashboard</md-tooltip>Dashboard</md-button><md-button ng-click="showNotice()">Show notice test</md-button></md-content><md-content layout="row"><md-input-container><label>Username</label> <input ng-model="credentials.username"></md-input-container><md-input-container><label>Password</label> <input ng-model="credentials.password" type="password"></md-input-container></md-content><md-button ng-click="attemptAuth(credentials)" class="md-raised md-primary">Log In</md-button><pre>{{ credentials | json }}</pre>')}]);