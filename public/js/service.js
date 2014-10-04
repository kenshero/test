angular.module('grade',[])
.factory('Grades',[function() {
	var grades = [
		{
			subject:"Network Programming",
			grade:"A",
			credit:3
		},
		{
			subject:"C#",
			grade:"C",
			credit:3
		},
		{
			subject:"C++",
			grade:"B",
			credit:3
		}
	];

	return{
		
		addGrade : function(inputSubject,inputCredit,inputGrade){
			tmp = {
				subject:inputSubject,
				credit:inputCredit,
				grade:inputGrade
			};
			$scope.grade.push(tmp);
		},

		delete : function(index){
				$scope.grades.splice(index, 1);
		},
		gradeCal : function(){
			 var sumCredit = 0;
		      var sumGrades = 0;

		      for(var i = 0; i< $scope.grades.length; i++) {
		        var grade = $scope.grades[i];
		        sumCredit += grade.credit*1;
		        sumGrades += ($scope.gradeConvert(grade.grade) * grade.credit );
		      }

		      console.log(sumCredit + " : " + sumGrades);

		      return (sumGrades/sumCredit).toFixed(2);

		},

		gradeConvert : function(grade){
			switch(grade) {
		        case "A":
		          return 4;
		        case "B+":
		          return 3.5;
		        case "B":
		          return 3;
		        case "C+":
		          return 2.5;
		        case "C":
		          return 2;
		        case "D+":
		          return 1.5;
		        case "D":
		          return 1;
		        case "F":
		          return 0;
		        default :
		          return 0;
		      }
		}

	}

}]);
