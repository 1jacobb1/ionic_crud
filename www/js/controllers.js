angular.module('starter.controllers', [])
// login controller
.controller('LoginCtrl', function($scope, $state, $timeout, $rootScope){
  $scope.myToken = "";
  $scope.loginMessage = "";
  $scope.login = function(user){
    var validateLogins = validateLogin(user);
    if (validateLogins == true){
      localStorage.setItem("token", "cde3bgt5");
      $rootScope.user.token = localStorage.getItem("token");
      $state.go('tab.feeds', {});
      // clear form in login
      user.username = "";
      user.password = "";
    } else {
      // show error message
      $scope.loginMessage = validateLogins;
      $timeout(function(){ $scope.loginMessage = ""; }, 2000);
    }
  };

  // validate user
  function validateLogin(user){
    var valid = false;
    if (user === undefined) {
      valid = "Username and Password is required";
    } else if (user.username && user.password &&
     user.username == "jacobb" && user.password == "admin123"){
      valid = true;
    } else if (user.username == "" || user.password == "") {
      valid = "Username and Password is required";
    } else {
      valid = "Username or Password is incorrect";
    }
    return valid;
  };

})
// dashboard controller
.controller('DashCtrl', function($scope, $rootScope) {
  $scope.$on('$ionicView.enter', function(e) {
    $rootScope.checkSession();
  });
})

// feeds controller
.controller('FeedsCtrl', function($scope, $rootScope, $ionicPopup, Feeds){

  $scope.$on('$ionicView.enter', function(e) {
    // check session
    $rootScope.checkSession();
  });

  $scope.hasNext = null;
  $scope.feeds = [];
  $scope.hasInternetConnection = true;
  function getData(){
    $scope.hasInternetConnection = true;
    Feeds.getFeeds($scope.hasNext, function(data){
      if(data.errorContent == "no_internet") {
        $scope.showMe();
        $scope.hasInternetConnection = false;
        return;
      }
      $scope.hasNext = data.data.paging.next;
      if ($scope.hasNext !== null){
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.feeds = $scope.feeds.concat(data.data.data);
      }
    });
  }

  $scope.loadMore = function(){
    getData();
  };

  $scope.doRefresh = function(){
    Feeds.getFeeds("", function(data){
      if(data.errorContent == "no_internet") {
        $scope.hasInternetConnection = false;
        $scope.showMe();
        return; 
      }
      $scope.hasInternetConnection = true;
      $scope.$broadcast('scroll.refreshComplete');
      $scope.newFeeds = data.data.data;
      $scope.feeds = $scope.newFeeds;
    });
  };

  $scope.showMe = function(){
    var alertPopup = $ionicPopup.alert({
     title: 'Network Error!',
     template: 'Please check your internet connection'
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
  };

})
// feeds detail controller
.controller('FeedDetailCtrl', function($scope, $stateParams, Feeds){
  console.log($stateParams);
})
// chats controller
.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
// chat detail controller
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  console.log($stateParams);
  $scope.chat = Chats.get($stateParams.chatId);
})
// accounts controller
.controller('AccountCtrl', function($scope, $rootScope, $state) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.logout = function(){
    $rootScope.logout();
  };

});
