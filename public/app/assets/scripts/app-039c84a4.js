"use strict";angular.module("valueMash",["ngAnimate","ngTouch","ngSanitize","ui.router","ngStorage","angular-cache","ng-token-auth","cfp.hotkeys"]).config(["$httpProvider","$authProvider","$locationProvider","API_URL",function(e,t,a,s){a.html5Mode(!1),a.hashPrefix("!"),"#%21"===window.location.hash.substr(0,4)&&window.location.replace(window.location.href.split("#%21").join("#!")),e.defaults.withCredentials=!0,t.configure({apiUrl:s})}]).run(["$rootScope","Notifier","$state","ENV","API_URL","Value",function(e,t,a,s,l,o){e.ENV=s,e.API_URL=l,e.Value=o,e.$on("$stateChangeError",function(){t.show("Please log in"),a.go("layout_guest.login")})}]),angular.module("valueMash").controller("ValueShowCtrl",["$scope","API","$stateParams","Notifier",function(e,t,a,s){e.value={},t.values.get(a.valueId).then(function(t){console.log("resp",t),e.value=t.data.value}),e.updateValue=function(a){t.values.update(a.id,a).then(function(t){200===t.status&&(s.show("Success: Value updated"),e.value=t.data.value)})}}]),angular.module("valueMash").controller("ValueScoreCtrl",["$scope","API","Value","hotkeys",function(e,t,a,s){s.bindTo(e).add({combo:"right",description:"Select value on the right",callback:function(){e.score(e.right,e.left)}}).add({combo:"left",description:"Select value on the left",callback:function(){e.score(e.left,e.right)}}).add({combo:"down",description:"Skip value matchup",callback:function(){e.skipMatch()}});var l=[],o=function(){e.left=l.shift(),e.right=l.shift(),e.left.id===e.right.id&&(l.push(e.right),e.right=l.shift()),console.log("stack size: "+l.length)},i=function(){l.length<2&&(console.log("getting more values!"),r())},r=function(){return t.values.getPlayers().then(function(e){200===e.status&&(l=l.concat(e.data.values),console.info("refreshed stack. size: "+l.length))})};r().then(o),e.left={},e.right={},e.score=function(e,s){o(),i(),t.values.score(e,s).then(function(e){200===e.status&&(a.updateScore(e.data.winnerId,e.data.winnerScore),a.updateScore(e.data.loserId,e.data.loserScore),a.sortValues())})},e.skipMatch=function(){o(),i()}}]),angular.module("valueMash").controller("ValueCtrl",["$scope","API","Notifier","Value",function(e,t,a,s){e.newValue={},e.sortDir=1,s.getValues(),e.createValue=function(l){t.values.create(l).then(function(t){200===t.status&&(a.show("Success: Added new value"),e.newValue={},s.values.push(t.data.value))})},e.resetForm=function(e){e&&(e.$setPristine(),e.$setUntouched())},e.sortScore=function(){e.sortDir=-1*e.sortDir,s.values.sort(function(t,a){return e.sortDir*(a.score-t.score)})},e.sortAverageDiff=function(){var t,a;e.sortDir=-1*e.sortDir,s.values.sort(function(s,l){return t=s.score-s.average+1e3,a=l.score-l.average+1e3,e.sortDir*(a-t)})}}]),angular.module("valueMash").controller("UserCtrl",["$scope","API",function(e,t){e.users={},t.users.all().then(function(t){console.log("resp",t),e.users=t.data.users})}]),angular.module("valueMash").controller("MatchResultCtrl",["$scope","API",function(e,t){e.results={},t.match_results.all().then(function(t){console.log("resp",t),e.results=t.data.results})}]),angular.module("valueMash").controller("LayoutGuestCtrl",["$scope","$rootScope","$state",function(e,t,a){e.$state=a,e.layoutModel={}}]),angular.module("valueMash").controller("LayoutAppCtrl",["$scope","$rootScope","$state",function(e,t,a){e.$state=a,e.layoutModel={}}]),angular.module("valueMash").controller("LoginCtrl",["$scope","API","Notifier",function(e,t,a){e.modalTest=function(){$("#change-pw-modal").openModal()},e.testNotices=function(e){a.show(e)},e.forgotPassword=function(){$("#forgot-pw-modal").openModal()}}]),angular.module("valueMash").controller("DashboardCtrl",["$scope",function(){}]),angular.module("valueMash").service("Value",["API",function(e){var t={values:[],getValues:function(){return t.values.length>0?!1:void e.values.all().then(function(e){t.values=e.data.values})},updateScore:function(e,a){console.log("update valueId "+e+" to "+a);for(var s=0;s<t.values.length;s++)if(t.values[s].id===e){t.values[s].score=a;break}},sortValues:function(){t.values.sort(function(e,t){return t.score-e.score})}};return t}]),angular.module("valueMash").service("User",function(){var e={};return e}),angular.module("valueMash").service("Notifier",function(){var e={show:function(e){Materialize.toast(e,1800)}};return e}),angular.module("valueMash").service("API",["$http","$auth","Notifier","API_URL",function(e,t,a,s){var l=function(t){t=angular.extend({auth:!0,method:"",url:""},t);var a={method:t.method,url:s+"/"+t.url,data:t.data||null};return e(a)},o={users:{all:function(){return l({method:"GET",url:"users.json"})}},values:{all:function(){return l({method:"GET",url:"values.json"})},create:function(e){return l({method:"POST",url:"values.json",data:e})},get:function(e){return l({method:"GET",url:"values/"+e+".json"})},update:function(e,t){return l({method:"PUT",url:"values/"+e+".json",data:t})},getPlayers:function(){return l({method:"GET",url:"values/players.json"})},score:function(e,t){return l({method:"POST",url:"values/score.json",data:{winner:e,loser:t}})}},match_results:{all:function(){return l({method:"GET",url:"match_results.json"})}}};return o}]),angular.module("valueMash").config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/login"),e.state("layout_guest",{"abstract":!0,views:{root:{templateUrl:"modules/layout/layout_guest.html",controller:"LayoutGuestCtrl"},sidebar:{templateUrl:"modules/layout/_layout_app_sidebar.html",controller:"LayoutAppCtrl"},header:{templateUrl:"modules/layout/_layout_app_header.html",controller:"LayoutAppCtrl"}}}).state("layout_guest.login",{url:"/login",templateUrl:"modules/guest/login.html",controller:"LoginCtrl"}).state("layout_app",{"abstract":!0,views:{root:{templateUrl:"modules/layout/layout_app.html",controller:"LayoutAppCtrl"},sidebar:{templateUrl:"modules/layout/_layout_app_sidebar.html",controller:"LayoutAppCtrl"},header:{templateUrl:"modules/layout/_layout_app_header.html",controller:"LayoutAppCtrl"},footer:{templateUrl:"modules/layout/_layout_app_footer.html",controller:"LayoutAppCtrl"}},resolve:{auth:["$auth",function(e){return e.validateUser()}]}}).state("layout_app.dashboard",{url:"/dashboard",templateUrl:"modules/dashboard/dashboard.html",controller:"DashboardCtrl"}).state("layout_app.users",{url:"/users",templateUrl:"modules/user/user.html",controller:"UserCtrl"}).state("layout_app.values",{url:"/values",templateUrl:"modules/value/value.html",controller:"ValueCtrl"}).state("layout_app.values.show",{url:"/{valueId:[0-9]+}",templateUrl:"modules/value/value.show.html",controller:"ValueShowCtrl"}).state("layout_app.values.score",{url:"/score",templateUrl:"modules/value/value.score.html",controller:"ValueScoreCtrl"}).state("layout_app.match_results",{url:"/match_results",templateUrl:"modules/match_result/match_result.html",controller:"MatchResultCtrl"})}]),angular.module("valueMash").constant("ENV","production").constant("API_URL",""),angular.module("valueMash").run(["$rootScope","$state","Notifier",function(e,t,a){e.$on("auth:registration-email-success",function(){console.log("auth:registration-email-success")}),e.$on("auth:registration-email-error",function(){console.log("auth:registration-email-error")}),e.$on("auth:email-confirmation-success",function(e,t){console.log("auth:email-confirmation-success"),a.show("Welcome, "+t.email+". Your account has been verified.")}),e.$on("auth:email-confirmation-error",function(){console.log("auth:email-confirmation-error"),a.show("There was an error with your registration.")}),e.$on("auth:password-reset-request-success",function(e,t){console.log("auth:password-reset-request-success"),a.show("Password reset instructions were sent to "+t.email)}),e.$on("auth:password-reset-request-error",function(e,t){console.log("auth:password-reset-request-error"),a.show("Password reset request failed: "+t.errors[0])}),e.$on("auth:password-reset-confirm-error",function(){console.log("auth:password-reset-confirm-error"),a.show("Unable to verify your account. Please try again.")}),e.$on("auth:password-reset-confirm-success",function(){console.log("auth:password-reset-confirm-success"),$("change-pw-modal").openModal()}),e.$on("auth:password-change-success",function(){console.log("auth:password-change-success"),a.show("Your password has been successfully updated!")}),e.$on("auth:password-change-error",function(e,t){console.log("auth:password-change-error"),a.show("Registration failed: "+t.errors[0])}),e.$on("auth:logout-success",function(){console.log("auth:logout-success"),a.show("Goodbye"),t.go("layout_guest.login")}),e.$on("auth:logout-error",function(e,t){console.warn("auth:logout-error"),a.show("Logout failed: "+t.errors[0])}),e.$on("auth:account-update-success",function(){console.log("auth:account-update-success"),a.show("Your account has been successfully updated.")}),e.$on("auth:account-update-error",function(e,t){console.log("auth:account-update-error"),a.show("Update error: "+t.errors[0])}),e.$on("auth:account-destroy-success",function(){console.log("auth:account-destroy-success")}),e.$on("auth:account-destroy-error",function(){console.log("auth:account-destroy-error"),a.show("Your account has been destroyed.")}),e.$on("auth:session-expired",function(){console.log("auth:session-expired"),a.show("Session has expired")}),e.$on("auth:validation-success",function(){console.log("auth:validation-success")}),e.$on("auth:validation-error",function(){console.warn("auth:validation-error")}),e.$on("auth:invalid",function(){console.warn("auth:invalid")}),e.$on("auth:validation-expired",function(){console.log("auth:validation-expired")}),e.$on("auth:login-success",function(e,s){console.log("auth:login-success"),a.show("Welcome "+s.email),t.go("layout_app.dashboard")}),e.$on("auth:login-error",function(e,t){console.log("auth:login-error"),a.show("Authentication failed: "+t.errors[0])}),e.$on("auth:registration-email-success",function(e,t){console.log("auth:registration-email-success"),a.show("A registration email was sent to "+t.email)}),e.$on("auth:registration-email-error",function(e,t){console.log("auth:registration-email-error"),a.show("Registration failed: "+t.errors[0])})}]),angular.module("valueMash").run(["$templateCache",function(e){e.put("modules/dashboard/dashboard.html",'<section><h5 class="grey-text text-darken-1">Welcome!</h5><p>Ready to get started?</p><a ui-sref="layout_app.values.score" class="waves-effect waves-light btn amber lighten-3 grey-text text-darken-1">Get started scoring values</a></section><div ng-style="{\'margin-bottom\': \'25px\',\'margin-top\': \'30px\'}" class="divider"></div><section><h5 class="grey-text text-darken-1">What is this?</h5><p>An experiment. I\'m curious about values. My own and others.</p><p><i class="fa fa-quote-left grey-text">&nbsp;</i>How do I value freedom compared with stability or safety?&nbsp;<i class="fa fa-quote-right grey-text"></i></p><p>What we value guides our lives. What we prioritize. How we set goals. And ultimately what makes us happy.</p></section>'),e.put("modules/guest/_change_password.modal.html",'<div id="modal1" class="modal modal-fixed-footer"><div class="modal-content"><h4>Set new password</h4><div class="row"><form name="resetPasswordForm" ng-submit="updatePassword(newPass)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s12"><input ng-model="newPass.password" type="password" required="required"> <label>Password</label></div></div><div class="row"><div class="input-field col s12"><input ng-model="newPass.password_confirmation" type="password" required="required"> <label>Password Confirmation</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: resetPasswordForm.$invalid}" class="waves-effect waves-light btn">Submit</button></div></div></form></div></div><div class="modal-footer"><div href="#!" class="modal-action modal-close waves-effect waves-green btn-flata">Cancel</div></div></div>'),e.put("modules/guest/_change_password2.modal.html",'<div id="modal1" class="modal modal-fixed-footer"><div class="modal-content"><h4>Modal Header</h4><p>A bunch of text</p></div><div class="modal-footer"><div href="#!" class="modal-action modal-close waves-effect waves-green btn-flata">Agree</div></div></div>'),e.put("modules/guest/_change_password_modal.html",'<div id="change-pw-modal" class="modal"><div class="modal-content"><h5>Set new password</h5><div class="row"><form name="resetPasswordForm" ng-submit="updatePassword(newPass)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="newPass.password" type="password" required="required"> <label>Password</label></div><div class="input-field col s6"><input ng-model="newPass.password_confirmation" type="password" required="required"> <label>Password Confirmation</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: resetPasswordForm.$invalid}" class="waves-effect waves-light btn">Submit</button></div></div></form></div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a></div></div>'),e.put("modules/guest/_forgot_password_modal.html",'<div id="forgot-pw-modal" class="modal"><div class="modal-content"><h5>Request password change</h5><p>You will be emailed instructions to change your password.</p><div class="row"><form name="resetPassForm" ng-submit="requestPasswordReset(reset)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="reset.email" type="email" required="required"> <label>Email</label></div></div><div class="row"><div class="input-field col s6"><button type="submit" ng-class="{disabled: resetPassForm.$invalid}" class="waves-effect waves-light btn">Request password reset email</button></div></div></form></div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a></div></div>'),e.put("modules/guest/login.html",'<section><h5 class="grey-text text-darken-1">What is this?</h5><p>An experiment. I\'m curious about values. My own and others.</p><p><i class="fa fa-quote-left grey-text">&nbsp;</i>How do I value freedom compared with stability or safety?&nbsp;<i class="fa fa-quote-right grey-text"></i></p><p>What we value guides our lives. What we prioritize. How we set goals. And ultimately what makes us happy.</p></section><div ng-style="{\'margin-bottom\': \'15px\'}" class="divider"></div><section><div class="row"><div class="col s6"><div class="card amber lighten-5"><div class="card-content"><h5>Log in</h5><form name="loginForm" ng-submit="submitLogin(credentials)" novalidate="novalidate"><div class="row"><div class="input-field col s12"><input ng-model="credentials.email" type="email" required="required" ng-minlength="8"> <label>Email</label></div></div><div class="row"><div class="input-field col s12"><input ng-model="credentials.password" type="password" required="required"> <label>Password</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: loginForm.$invalid}" class="waves-effect waves-light btn">Log In</button>&nbsp;&nbsp;&nbsp;<a href="" ng-click="forgotPassword()" class="blue-text text-lighten-3">Forgot your password?</a></div></div></form></div></div></div><div class="col s6"><div class="card amber lighten-5"><div class="card-content"><h5>Sign up</h5><form name="signupForm" ng-submit="submitRegistration(signup)" novalidate="novalidate"><div class="row"><div class="input-field col s12"><input ng-model="signup.email" type="email" required="required"> <label>Email</label></div></div><div class="row"><div class="input-field col s6"><input ng-model="signup.password" type="password" required="required"> <label>Password</label></div><div class="input-field col s6"><input ng-model="signup.password_confirmation" type="password" required="required"> <label>Confirmation</label></div></div><div class="row"><div class="input-field col s6"><button type="submit" ng-class="{disabled: signupForm.$invalid}" class="waves-effect waves-light btn">Sign up</button></div></div></form></div></div></div></div></section><div class="divider"></div><section><p class="grey-text"><i class="fa fa-code">&nbsp;</i>Want to help? drewsamsen@gmail.com</p></section><section class="white-text"><h6>Current User</h6><pre>User: {{ user | json }}</pre></section><section><p><a ng-click="modalTest($event)" class="white-text">Password change modal</a></p></section><div id="change-pw-modal" class="modal"><div class="modal-content"><h5>Set new password</h5><div class="row"><form name="resetPasswordForm" ng-submit="updatePassword(newPass)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="newPass.password" type="password" required="required"> <label>Password</label></div><div class="input-field col s6"><input ng-model="newPass.password_confirmation" type="password" required="required"> <label>Password Confirmation</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: resetPasswordForm.$invalid}" class="waves-effect waves-light btn">Submit</button></div></div></form></div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a></div></div><div id="forgot-pw-modal" class="modal"><div class="modal-content"><h5>Request password change</h5><p>You will be emailed instructions to change your password.</p><div class="row"><form name="resetPassForm" ng-submit="requestPasswordReset(reset)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="reset.email" type="email" required="required"> <label>Email</label></div></div><div class="row"><div class="input-field col s6"><button type="submit" ng-class="{disabled: resetPassForm.$invalid}" class="waves-effect waves-light btn">Request password reset email</button></div></div></form></div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a></div></div>'),e.put("modules/layout/_layout_app_footer.html",'<div class="container"><div class="row"><div class="col l6 s12"><h5 class="white-text">Footer Content</h5><p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p></div><div class="col l4 offset-l2 s12"><h5 class="white-text">Links</h5><ul><li><a href="#!" class="grey-text text-lighten-3">Link 1</a></li><li><a href="#!" class="grey-text text-lighten-3">Link 2</a></li><li><a href="#!" class="grey-text text-lighten-3">Link 3</a></li><li><a href="#!" class="grey-text text-lighten-3">Link 4</a></li></ul></div></div></div><div class="footer-copyright"><div class="container">&copy; 2015 Copyright Text<a href="#!" class="grey-text text-lighten-4 right">More Links</a></div></div>'),e.put("modules/layout/_layout_app_header.html",'<div class="nav-wrapper"><ul class="right hide-on-med-and-down"><li ng-show="user.signedIn"><a href="#"><i class="fa fa-user right"></i> Hello, {{ user.email }}</a></li><li ng-hide="user.signedIn"><a href="#" ui-sref="layout_guest.login"><i class="fa fa-user right"></i> Login / Sign up</a></li><li ng-show="user.signedIn"><a href="#" ng-click="signOut()"><i class="fa fa-chain-broken right"></i> Sign out</a></li></ul></div>'),e.put("modules/layout/_layout_app_sidebar.html",'<li class="logo blue lighten-1"><a href="" ui-sref="layout_app.dashboard"></a></li><li ui-sref-active-eq="blue lighten-5"><a ui-sref="layout_app.dashboard"><i class="fa fa-gears blue-text text-lighten-3"></i>Dashboard</a></li><li ui-sref-active-eq="blue lighten-5"><a ui-sref="layout_guest.login"><i class="fa fa-unlock-alt blue-text text-lighten-3"></i>Authentication</a></li><li ui-sref-active-eq="blue lighten-5"><a ui-sref="layout_app.users"><i class="fa fa-users blue-text text-lighten-3"></i>Users</a></li><li ui-sref-active-eq="blue lighten-5"><a ui-sref="layout_app.values"><i class="fa fa-diamond blue-text text-lighten-3"></i>Values</a></li><li ui-sref-active-eq="blue lighten-5"><a ui-sref="layout_app.values.score"><i class="fa fa-gamepad blue-text text-lighten-3"></i>Play</a></li><li ui-sref-active-eq="blue lighten-5"><a ui-sref="layout_app.match_results"><i class="fa fa-th-list blue-text text-lighten-3"></i>Match results</a></li>'),e.put("modules/layout/_layout_app_sidenav.html",""),e.put("modules/layout/layout_app.html",'<div ui-view="" class="col s12"></div>'),e.put("modules/layout/layout_guest.html",'<div class="row"><div ui-view="" class="col s12"></div></div>'),e.put("modules/match_result/match_result.html",'<h4 class="grey-text text-darken-1">Users</h4><table class="hoverable"><thead><tr><th>ID</th><th>User Id</th><th>Winner Id</th><th>Loser Id</th><th>Match Time</th></tr></thead><tbody><tr ng-repeat="result in results"><td>{{ result.id }}</td><th>{{ result.user_id }}</th><td>{{ result.winner_id }}</td><td>{{ result.loser_id }}</td><td>{{ result.created_at }}</td></tr></tbody></table>'),e.put("modules/user/user.html",'<h4 class="grey-text text-darken-1">Users</h4><table class="hoverable"><thead><tr><th>ID</th><th></th><th>Email</th><th>Created</th></tr></thead><tbody><tr ng-repeat="user in users"><td>{{ user.id }}</td><th><i ng-if="user.admin" class="fa fa-star"></i></th><td>{{ user.email }}</td><td>{{ user.created_at }}</td></tr></tbody></table>'),e.put("modules/value/value.html",'<div ui-view=""><section><h4 class="grey-text text-darken-1">Values</h4><table class="hoverable bordered"><tr class="header grey-text text-lighten-1"><th>Value</th><th><a href="" ng-click="sortScore()" class="grey-text text-lighten-1"><span ng-style="{padding: \'4px 16px\'}" class="blue-text text-lighten-2 blue lighten-5">Score&nbsp;&nbsp;<i class="fa fa-sort"></i></span></a></th><th><a href="" ng-click="sortAverageDiff()" class="grey-text text-lighten-1"><span ng-style="{padding: \'4px 16px\'}" class="blue-text text-lighten-2 blue lighten-5">Versus site average&nbsp;&nbsp;<i class="fa fa-sort"></i></span></a></th><th>Description</th><th>ID</th></tr><tr ng-repeat="value in Value.values" ng-init="diff = value.score - value.average" class="body"><td><a href="" ui-sref="layout_app.values.show({valueId: value.id})">{{ value.name }}</a></td><td>{{ value.score }}</td><td><span ng-if="diff != 0" ng-class="{\'red-text\': diff &lt; 0, \'green-text\': diff &gt; 0}"><span ng-if="diff &gt; 0">+</span>{{ diff }}</span></td><td>{{ value.description }}</td><td>{{ value.id }}</td></tr></table></section><a href="" ng-click="addingNew = !addingNew" ng-style="{\'margin-top\': \'25px\'}" class="btn blue lighten-5 blue-text text-lighten-4">&nbsp;Add value&nbsp;<i class="fa fa-plus-circle right"></i></a><section ng-if="user.admin" ng-show="addingNew"><div class="row"><div class="col s12"><div class="card blue lighten-5"><div class="card-content"><span class="card-title blue-text">Create new value</span><form name="newValueForm" ng-submit="createValue(newValue);resetForm(newValueForm)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="newValue.name" type="text" required="required"> <label>Name</label></div><div class="input-field col s6"><input ng-model="newValue.description" type="text" required="required"> <label>Description</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: newValueForm.$invalid}" class="waves-effect waves-light blue lighten-4 blue-text btn">Create new Value</button></div></div></form></div></div></div></div></section></div>'),e.put("modules/value/value.score.html",'<section><h4 class="grey-text text-darken-1">What do you value?</h4><p class="grey-text">Go faster with keyboard shortcuts: Press \'?\' for keymap.</p></section><div ng-style="{\'margin-bottom\': \'20px\'}" class="divider"></div><section><div class="row"><div class="col s6"><div class="card amber lighten-5"><div class="card-content"><h4>{{ left.name }}</h4><h6>{{ left.description }}</h6></div><div ng-click="score(left,right)" ng-class="{\'lighten-3\': hoverLeft}" ng-mouseenter="hoverLeft = true" ng-mouseleave="hoverLeft = false" class="card-action amber lighten-4 show-clickable right-align"><a class="blue-text">Select&nbsp;<i class="fa fa-check"></i></a></div></div></div><div class="col s6"><div class="card amber lighten-5"><div class="card-content"><h4>{{ right.name }}</h4><h6>{{ right.description }}</h6></div><div ng-click="score(right,left)" ng-class="{\'lighten-3\': hoverRight}" ng-mouseenter="hoverRight = true" ng-mouseleave="hoverRight = false" class="card-action amber lighten-4 show-clickable right-align"><a class="blue-text">Select&nbsp;<i class="fa fa-check"></i></a></div></div></div></div></section><div class="divider"></div><section class="grey-text"><p>Too close to call?&nbsp;&nbsp;&nbsp;<a ng-click="skipMatch()" class="waves-effect waves-teal btn-flat grey lighten-3">Skip both</a></p></section>'),e.put("modules/value/value.show.html",'<h4><a href="" ui-sref="layout_app.values">Values</a>- {{ value.name }}</h4><div class="row"><form ng-if="user.admin" name="updateValueForm" ng-submit="updateValue(value)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="value.name" type="text" required="required"> <label ng-class="{active: value.name}">Name</label></div><div class="input-field col s6"><input ng-model="value.description" type="text" required="required"> <label ng-class="{active: value.description}">Description</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: updateValueForm.$invalid}" class="waves-effect waves-light red btn">Update Value</button></div></div></form></div>')}]);