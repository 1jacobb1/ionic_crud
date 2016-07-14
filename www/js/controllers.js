angular.module('starter.controllers', [])
// login controller
.controller('LoginCtrl', function($scope, $state, $timeout){
  $scope.myToken = "";
  $scope.loginMessage = "";
  $scope.login = function(user){
    if (validateLogin(user)){
      localStorage.setItem("token", "cde3bgt5");
      console.log(localStorage.getItem("token"));
      $state.go('tab.feeds');
    } else {
      // show error message
      $scope.loginMessage = "Username or Password is incorrect";
      $timeout(function(){ $scope.loginMessage = ""; }, 1500);
    }
  };
  // validate user
  function validateLogin(user){
    var valid = false;
    if (user.username && user.password &&
     user.username == "jacobb" && user.password == "admin123"){
      valid = true;
    }
    return valid;
  };

})
// dashboard controller
.controller('DashCtrl', function($scope) {})
// feeds controller
.controller('FeedsCtrl', function($scope, Feeds){
  $scope.hasNext = null;
  $scope.feeds = [];

  function getData(){
    Feeds.getFeeds($scope.hasNext, function(data){
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
  $scope.newStories = function(){
    console.log("new stories");
  };

  $scope.$on('$ionicView.enter', function(e) {
    console.log("ionic view enter");
    getData();
  });

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
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
