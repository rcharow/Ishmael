app.controller('HomeController', function($scope, $http) {

		$scope.filteredData;
		$scope.currentWords;
		$scope.rating = {};
		$scope.done = false;
		$scope.$watch('rating.selected', function (newValue, oldValue) {
			if (!newValue || !$scope.filteredData) return;
			if (newValue === 1) {
				$scope.createWords(newValue)
			} else {
				$scope.createWords(newValue/2);
			}
		})

		$scope.getReviews = function () {
			$http.get('/api/reviews', $scope.API)
			.then(function(response) {
				return JSON.parse(response.data);
			})
			.then(function (data) {
				$scope.filteredData = translateData(data);
				$scope.done = true;
				console.log('Data has arrived!');
			})
			.catch(function (err) {
				console.error(err);
			})
		}

	function translateData(data) {
		var filteredData = {};
		for (var rating in data) {
			if (rating && !isNaN(rating)) {

				filteredData[rating] = {};
				data[rating]
					.filter(function(taggedWord) {
						return taggedWord[1] === 'JJ' && taggedWord[0][0] !== "'";
					})
					.forEach(function(taggedAdjectives) {
						filteredData[rating][taggedAdjectives[0]] = ++filteredData[rating][taggedAdjectives[0]] || 1;
					})

				filteredData[rating] = Object.keys(filteredData[rating]).sort(function(a, b) {
					return filteredData[rating][a] - filteredData[rating][b]
				}).reverse().splice(0, 20);
			}
		};
		return filteredData;
	}

	$scope.createWords = function(stars) {
		$scope.currentWords = $scope.filteredData[stars]
		d3.select("#wordCloud").remove();
		var fill = d3.scale.category20();
		var layout = d3.layout.cloud()
			.size([500, 500])
			.words($scope.currentWords.map(function(d) {
				return {
					text: d,
					size: 10 + Math.random() * 90,
					test: "haha"
				};
			}))
			.padding(5)
			.rotate(function() {
				var negRandom = Math.random() < 0.5 ? -1 : 1;
				return ~~(Math.random() * 2) * 60 * negRandom;
			})
			.font("Helvetica Neue")
			.fontSize(function(d) {
				return d.size;
			})
			.on("end", draw);
		layout.start();

		function draw(words) {
			d3.select("#demo").append("svg")
				.attr("id","wordCloud")
				.attr("width", layout.size()[0])
				.attr("height", layout.size()[1])
				.append("g")
				.attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
				.selectAll("text")
				.data(words)
				.enter().append("text")
				.style("font-size", function(d) {
					return d.size + "px";
				})
				.style("font-family", "Helvetica Neue")
				.style("fill", function(d, i) {
					return fill(i);
				})
				.attr("text-anchor", "middle")
				.attr("transform", function(d) {
					return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
				})
				.text(function(d) {
					return d.text;
				});
		}
	}

});