var btn = document.querySelector('.resultBtn');
var list = document.querySelector('.list');
var data = JSON.parse(localStorage.getItem('listData')) || [];

btn.addEventListener('click',operation,false);
upData(data);

function operation(e){
	e.preventDefault();
	var heightData = parseInt(document.querySelector('.height').value);
	var weightData = parseInt(document.querySelector('.weight').value);
	var totalBMI = weightData / (heightData * heightData*0.0001);
	var todo = {
		height: (heightData),
		weight: weightData,
		BMI: formatFloat(totalBMI, 2),
		range: rangeBMI(formatFloat(totalBMI, 2)), 
		nowTime: getDataTime()
	};
	data.push(todo);
	upData(data);
	upStyle(data);
	localStorage.setItem('listData',JSON.stringify(data));
//改CLASS
}
function upData(Item){
	str =''
	var len = Item.length;
	for (var i=0; i<len ;i++){
		str += '<li><em class="' +switchRangeColor(data[i].range)+ '"> '+data[i].range +' </em><span> BMI ' + data[i].BMI +'</span><span>weight ' + data[i].weight + ' Kg</span><span> height ' + data[i].height + ' cm</span><span>' + data[i].nowTime; + '</span></li>';
		list.innerHTML = str;
	}
}
function rangeBMI(e){
	if(0<e, e<=18.5){
		return "過輕";
	}else if(18.5<=e , e<24){
		return "理想";
	}else if(24<=e,e<28){
		return "過重";
	}else if(28<=e , e<30){
		return "輕度肥胖";
	}else if(30<=e , e <35){
		return "中度肥胖";
	}else if(35<=e){
		return "重度肥胖";
	}
}
function getDataTime() {

     var date = new Date();

     var year = date.getFullYear();

     var month = date.getMonth() + 1;
     month = (month < 10 ? "0" : "") + month;

     var day  = date.getDate();
     day = (day < 10 ? "0" : "") + day;

     return month + "-" + day + "-" + year;
 }
 function formatFloat(num, pos)
{
  var size = Math.pow(10, pos);
  return Math.round(num * size) / size;
}
function switchRangeColor(text){
	switch (text){
		case "過輕" :
			return "blue"
		break;
		case "理想" :
			return "green"
		break;
		case "過重" :
			return "orange"
		break;
		case "輕度肥胖" :
			return "easyRed"
		break;
		case "中度肥胖" :
			return "normalRed"
		break;
		case "重度肥胖" :
				return "varyRed"
		break;
	}
}
function upStyle(Item){
	var len = Item.length;
	var changeStyle = document.getElementById('changeClass');
	var loopStyle = document.getElementById('loop');
	var resultStage = document.getElementById('fontStage');
	changeStyle.className = switchRangeColor(data[(len-1)].range) + 'Class';
	loopStyle.className = switchRangeColor(data[(len-1)].range) + 'Loop';
	changeStyle.innerHTML = data[len-1].BMI + '<br><em class="sizeBMI">BMI</em>';
	resultStage.innerHTML = '<p class="'+ switchRangeColor(data[len-1].range)+'Font">' + data[(len-1)].range + '</p>';
}
