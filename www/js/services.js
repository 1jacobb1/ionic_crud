angular.module('starter.services', [])

/*.factory('Feeds', function(){
  var feeds = [];
  var url = "https://nativecamp.net/api/teachers/search";
  return $http({
    url: url,
    method: "POST",
    data: JSON.stringify({"users_api_token": "581883db89f901621a96e098b69a2ccd"})
  })
  .then(function(response){
    console.log(response);
    feeds = response;
  })
  .catch(function(err){
    console.log(err);
  })
})*/

.factory('Feeds', function($http){
  var func = {};
  func.getFeeds = function(page, cb){
    var page = page === null || page === "" ? "" : "/"+page;
    $http({
      url: "http://infinigag.k3min.eu/hot"+page,
      method: "GET",
      data: {}
    })
    .then(function(res){
      cb(res);
    })
    .catch(function(err){
      console.log(err);
    });
  };
  return func;
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});