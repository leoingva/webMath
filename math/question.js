var num = [8, 2, 3, 4];
var sign = ['+', '=', '='];
var answer, quesPos,questionStr;
var questions =[];
var curcnt =0;
var curlv = 0 ;
var chosemax,chosetype,choserand;


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
    if(type === 12) return getNumber(3, 4);//return type 1=+ 2=- 3=X 4=/
    if(type === 15) return getNumber(1, 4);
};

var getQuesPos = function (rand) { // question position
    if(!rand) return 2;
    else return getNumber(0, 2);
};
var start = function(lv){
    lv=parseInt(lv);
    curlv = lv;
    switch (lv) {
        case 1:
            startNewQuestion(10,1,false);
            // showtext = 'Addition within 10';
            break;
        case 2:
            startNewQuestion(20,1,false)
            // showtext = 'Addition within 20';
            break;
        case 3:
            startNewQuestion(10,2,false)
            // showtext = 'Subtraction within 10';
            break;
        case 4:
            startNewQuestion(20,2,false)
            // showtext = 'Subtraction within 20';
            break;
        case 5:
            startNewQuestion(10,3,true)
            // showtext = 'Addition & subtraction within 10 random';
            break;
        case 6:
            startNewQuestion(20,3,true)
            // showtext = 'Addition & subtraction within 20 random';
            break;
        case 7:
            startNewQuestion(50,3,false)
            // showtext = 'Addition & subtraction within 50';
            break;
        case 8:
            startNewQuestion(50,3,true)
            // showtext = 'Addition & subtraction within 50 random';
            break;
        case 9:
            startNewQuestion(100,3,true)
            // showtext = 'Addition & subtraction within 100 random';
            break;
        case 10:
            startNewQuestion(9,4,false)
            // showtext = 'Multiplication';
            break;
        case 11:
            startNewQuestion(9,8,false)
            // showtext = 'Division';
            break;
        case 12:
            startNewQuestion(9,12,true)
            // showtext = 'Multiplication & Division';
            break;
        case 13:
            startNewQuestion(100,15,true)
            // showtext = 'Multiplication & Division';
            break;
    
        default:
            break;
    }
};
var startNewQuestion = function(max,type,rand) {
    chosemax=max;chosetype=type;choserand=rand;
    curcnt++;
    var quesType = getQuesType(type);
    quesPos = getQuesPos(rand);
    var t12max = max;
    if (quesType == 1) {
        var tnum = getTwoNumber(1, t12max);
        var onum = tnum[0] - tnum[1];
        num[0] = tnum[1];
        sign[0] = '+';
        num[1] = onum;
        sign[1] = '=';
        num[2] = tnum[0];
    } else if (quesType == 2) {
        var tnum = getTwoNumber(1, t12max);
        var onum = tnum[0] - tnum[1];
        num[0] = tnum[0];
        sign[0] = '-';
        num[1] = onum;
        sign[1] = '=';
        num[2] = tnum[1];
    } else if (quesType == 3) {
        var tnum = getTwoNumber(1, 9);
        var onum = tnum[0] * tnum[1];
        num[0] = tnum[0];
        sign[0] = '×';
        num[1] = tnum[1];
        sign[1] = '=';
        num[2] = onum;
    } else if (quesType == 4) {
        var tnum = getTwoNumber(1, 9);
        var onum = tnum[0] * tnum[1];
        num[0] = onum;
        sign[0] = '÷';
        num[1] = tnum[0];
        sign[1] = '=';
        num[2] = tnum[1];
    }
    questionStr = ''+num[0]+sign[0]+num[1]+sign[1]+num[2];
    answer = num[quesPos];
    // num[quesPos] = null;
    // console.log('questionStr: ',questionStr);
    // console.log('Lv: ',curlv,', max: ', chosemax, ', type:  ',chosetype, ', pos: ',quesPos, ', answer: ',answer);
    setupPage();
};
var setupPage = function(){
    $("#sign0").attr({"class":"qtext","value":sign[0],"disabled":true});
    $("#sign1").attr({"class":"qtext","value":sign[1],"disabled":true});
    for(var i =0; i<3; i++){
        $("#num"+ i).attr({"class":"qtext","disabled":true});
        $("#num"+ i).val(num[i]);
    }
    $("#num"+quesPos).val('');
    $("#num"+quesPos).removeAttr("class value disabled");
    $("#num"+quesPos).attr({"class":"qtext2"});
    $("#num"+quesPos).focus();

};

var writeList = function(){
    var len = questions.length;
    // console.log(len);
    if(!len) return;
    var content = "<table>";
    for(var i = 0;i<len;i++){
        content+="<tr class=";
        content+=questions[i].isright?"right":"wrong";
        content+="><td width=10% align=center>";
        content+=questions[i].id;
        content+="</td><td width=80% align=center>";
        content+=questions[i].str;
        content+="</td><td width=10% align=center>";
        content+=questions[i].isright?'✓':'✗';
        content+="</td></tr>";
    }
    content+="</table>"
    // console.log(content);
    $("#list").html(content);
}

var check = function(){
    var myans = $("#num"+quesPos).val();
    if(!myans || myans == '') return;
    var isright = false;
    var str;
    if(myans == answer){
        isright = true;
        str=questionStr;
        questions.unshift({id:curcnt,str:str,isright:isright});
        startNewQuestion(chosemax,chosetype,choserand);
    }else{
        str = ''+$("#num0").val()+sign[0]+$("#num1").val()+sign[1]+$("#num2").val();
        questions.unshift({id:curcnt,str:str,isright:isright});
        $("#num"+quesPos).val('');
    }
    writeList();
}
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
var lv = getUrlParameter('lv');
start(lv);

var pressEnter = function(event){
    if(event.keyCode == 13){
        $("#check").click();
    }
}
$("#num0").keyup(function(e){
    pressEnter(e);
});
$("#num1").keyup(function(e){
    pressEnter(e);
});
$("#num2").keyup(function(e){
    pressEnter(e);
});