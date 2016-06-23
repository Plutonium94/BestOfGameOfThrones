
var episodeIds = [];


var episodesApp = angular.module('episodesApp',[]);

episodesApp.controller('episodesController', function($http, $scope) {

	

	$http.get('/episodes').success(function(response) {
		var res = response;
		res.forEach(function(elt, index, tab) {
			var s = +elt.duration;
			elt.durationMsg = Math.round(s/60) + "min " + (s%60) + " sec";
			elt.liked = false;
			episodeIds.push(elt.id);
			
		});
		$scope.episodes = res;
		$scope.recharger();
	});
	$scope.augmenter = function(ep) {
		if(!ep.liked) {
			ep.like = (+ep.like)+1;
			ep.liked=true;
			console.log(ep);
			window.localStorage['got_episode_' + ep.id +'_like'] = ep.like;
		}
	};

	$scope.recharger = function() {
		console.log("recharger called " + $scope.episodes.length + ' mit ' + window.localStorage.getItem('gotTabNum'));
		$scope.episodes.forEach(function(elt, index, tab) {
			var like = window.localStorage['got_episode_' + elt.id + '_like' ];
			if(like) {
				elt.like = like;
			}
		});	
	};


	


});


/* Augmenter le compteur d'onglets au chargmeent */
window.addEventListener('load',function(e) {
	if(!localStorage.getItem('gotTabNum') || localStorage.getItem('gotTabNum') < 0) {
		//console.log('a novueau');
		localStorage.setItem('gotTabNum', 1);
		//alert('a nouveau ' + localStorage.getItem('gotTabNum'));
	} else {
		var n = +localStorage.getItem('gotTabNum');
		//window.alert('me window ' + n);
		localStorage.setItem('gotTabNum', (n+1) );
	}
});		




/* Si le nombre d'onglets <= 0, effacer localStorage : le compteur et les likes */
$(window).unload(function() {
	//console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
	//console.log(+window.localStorage.getItem('gotTabNum'));			
	window.localStorage.setItem('gotTabNum', +window.localStorage.getItem('gotTabNum') - 1);
	//console.log(+window.localStorage.getItem('gotTabNum'));			
	//console.log('over');
	if(+window.localStorage.getItem('gotTabNum') <= 0) {
		
		localStorage.clear();
	}
});
