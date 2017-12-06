var app = angular.module('myApp', []);
app.controller('MathController', function ($scope, $document) {

    $scope.num = [8, 2, 3, 4];
    $scope.sign = ['+', '=', '='];
    var answer, quesPos,questionStr;
    $scope.questions =[];
    var curcnt =0;
    $scope.curpage='select.html';
    var chosemax,chosetype,choserand;
    var lastlv=0;

    var getNumber = function (minNumber, maxNumber) {
        var randomnumber = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber); // Generates random number
        return randomnumber;
    };

    var getTwoNumber = function (min, max) { // get two numbers in an array : [bigger, smaller]
        var num1 = getNumber(min, max);
        var num2 = getNumber(min, max);
        if (num1 > num2) return [num1, num2];
        else return [num2, num1];
    };

    var getQuesType = function getQuesType(type) { // question type, 0001 = plus, 0010 = minus, 0100 = mulpuly, 1000 = divide
        if(type === 1) return 1;
        if(type === 2) return 2;
        if(type === 4) return 3;
        if(type === 8) return 4;
        if(type === 3) return getNumber(1, 2);
        if(type === 3) return getNumber(3, 4);//return type 1=+ 2=- 3=X 4=/
    };

    var getQuesPos = function (rand) { // question position
        if(!rand) return 2;
        else return getNumber(0, 2);
    };
    $scope.start = function(lv){
        // lv===lastlv?lastlv=0:lastlv=lv;        
        switch (lv) {
            case 1:
                startNewQuestion(10,1,false);
                $scope.showtext = 'Addition within 10';
                break;
            case 2:
                startNewQuestion(20,1,false)
                $scope.showtext = 'Addition within 20';
                break;
            case 3:
                startNewQuestion(10,2,false)
                $scope.showtext = 'Subtraction within 10';
                break;
            case 4:
                startNewQuestion(20,2,false)
                $scope.showtext = 'Subtraction within 20';
                break;
            case 5:
                startNewQuestion(10,3,true)
                $scope.showtext = 'Addition & subtraction within 10 random';
                break;
            case 6:
                startNewQuestion(20,3,true)
                $scope.showtext = 'Addition & subtraction within 20 random';
                break;
            case 7:
                startNewQuestion(50,3,false)
                $scope.showtext = 'Addition & subtraction within 50';
                break;
            case 8:
                startNewQuestion(50,3,true)
                $scope.showtext = 'Addition & subtraction within 50 random';
                break;
            case 9:
                startNewQuestion(100,3,true)
                $scope.showtext = 'Addition & subtraction within 100 random';
                break;
            case 10:
                startNewQuestion(9,4,false)
                $scope.showtext = 'Multiplication';
                break;
            case 11:
                startNewQuestion(9,8,false)
                $scope.showtext = 'Division';
                break;
            case 12:
                startNewQuestion(9,12,true)
                $scope.showtext = 'Multiplication & Division';
                break;
        
            default:
                break;
        }
    };
    var startNewQuestion = function(max,type,rand) {
        chosemax=max;chosetype=type;choserand=rand;
        $scope.curpage = 'question.html';
        curcnt++;
        var quesType = getQuesType(type);
        quesPos = getQuesPos(rand);
        $scope.pos = quesPos;
        var t12max = max;
        if (quesType == 1) {
            var tnum = getTwoNumber(1, t12max);
            var onum = tnum[0] - tnum[1];
            $scope.num[0] = tnum[1];
            $scope.sign[0] = '+';
            $scope.num[1] = onum;
            $scope.sign[1] = '=';
            $scope.num[2] = tnum[0];
        } else if (quesType == 2) {
            var tnum = getTwoNumber(1, t12max);
            var onum = tnum[0] - tnum[1];
            $scope.num[0] = tnum[0];
            $scope.sign[0] = '-';
            $scope.num[1] = onum;
            $scope.sign[1] = '=';
            $scope.num[2] = tnum[1];
        } else if (quesType == 3) {
            var tnum = getTwoNumber(1, 9);
            var onum = tnum[0] * tnum[1];
            $scope.num[0] = tnum[0];
            $scope.sign[0] = '×';
            $scope.num[1] = tnum[1];
            $scope.sign[1] = '=';
            $scope.num[2] = onum;
        } else if (quesType == 4) {
            var tnum = getTwoNumber(1, 9);
            var onum = tnum[0] * tnum[1];
            $scope.num[0] = onum;
            $scope.sign[0] = '÷';
            $scope.num[1] = tnum[0];
            $scope.sign[1] = '=';
            $scope.num[2] = tnum[1];
        }
        questionStr = ''+$scope.num[0]+$scope.sign[0]+$scope.num[1]+$scope.sign[1]+$scope.num[2];
        answer = $scope.num[quesPos];
        $scope.num[quesPos] = null;
        // console.log(questionStr);
        // console.log(answer);
    };


    $scope.check = function(){
        var isright = false;
        var str;
        if($scope.num[quesPos] == answer){
            isright = true;
            str=questionStr;
            $scope.questions.unshift({id:curcnt,str:str,isright:isright});
            startNewQuestion(chosemax,chosetype,choserand);
        }else{
            str = ''+$scope.num[0]+$scope.sign[0]+$scope.num[1]+$scope.sign[1]+$scope.num[2];
            $scope.questions.unshift({id:curcnt,str:str,isright:isright});
            $scope.num[quesPos] = null;
        }
    }

    $scope.back = function(){
        $scope.curpage = 'select.html';
        $scope.questions =[];
        curcnt =0;
    }
});