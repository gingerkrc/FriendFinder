var friends = require("../data/friends.js");

module.exports = function(app){

	app.get("/api/friends", function(req, res){
		res.json(friends);
	});

	app.post("/api/friends", function(req, res){

		var bestMatch = {
			name: "",
			pic: "",
			friendDifference: 1000
		};

		var userData 	= req.body;
		var userName 	= userData.name;
		var userPic 	= userData.pic;
		var userScores 	= userData.scores;

		var totalDifference = 0;

		for  (var i=0; i< friends.length; i++) {

			console.log(friends[i].name);
			totalDifference = 0;

			for (var j=0; j< friends[i].scores[j]; j++){

				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				if (totalDifference <= bestMatch.friendDifference){
 
					bestMatch.name = friends[i].name;
					bestMatch.pic = friends[i].pic;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}
		friends.push(userData);
		res.json(bestMatch);
	});

}