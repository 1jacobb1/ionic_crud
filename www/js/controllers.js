angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('FeedsCtrl', function($scope, Feeds){
  $scope.hasNext = null;
  $scope.feeds = [];

  $scope.loadMore = function(){
    Feeds.getFeeds($scope.hasNext, function(data){
      $scope.hasNext = data.data.paging.next;
      if ($scope.hasNext !== null){
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.feeds = $scope.feeds.concat(data.data.data);
      }
    });
  };
  $scope.newStories = function(){
    console.log("new stories");
  };
})

.controller('FeedDetailCtrl', function($scope){

})

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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  console.log($stateParams);
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
