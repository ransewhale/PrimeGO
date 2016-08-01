opt = [0,0,0,0,0,0,0];
got = 0;
missed = 0;
onGame = false;

function is_prime(num){
	var s = 0;
	var e = 78497;
	while(e>s){
		var mid = Math.floor((s+e)/2);
		if(num === pns[mid]){
			return true;
		}else if(num > pns[mid]){
			s = mid + 1;
		}else if(num < pns[mid]){
			e = mid - 1;
		}
	}
	return false;
}

function init(){
	onGame = true;
	problemSet();
	setTimeout("prepEnd()",30000);
}

function prepEnd(){
	onGame = false;
	setTimeout("gameEnd()",1000);
}

function setNumber(){
	for(var i=0; i<7; i++){
		var flag=true;
		while(flag){
			flag=false;
			opt[i] = Math.floor( Math.random() * 1000000 );
			if(is_prime(opt[i])){
				flag = true;
			}
			for(var j=0; j<i; j++){
				if(opt[i]==opt[j]){
					flag=true;
				}
			}
		}
	}
	ans = Math.floor( Math.random() * 7 );
	var rand = Math.floor( Math.random() * 78498 );
	opt[ans] = pns[rand];
}

function displaySet(){
	var content = "<div class=\"box1\"><p>素数はどれ!?</p>";
	for(i=0; i<7; i++){
		content += "<a href=\"JavaScript:void(0);\" class=\"button1\" onClick=\"checkAnswer("+i+");\">"+opt[i]+"</a>";
	}
	content += "</div>";
	document.getElementById("main").innerHTML = content;
}

function checkAnswer(num){
	if(!onGame){return;}
	if(num===ans){
		gotPrime();
		got++;
	}else{
		missedPrime();
		missed++;
	}
	if(onGame){
		setTimeout("problemSet()",750);
	}
}

function gotPrime(){
	var content = "<div class=\"box1 alert\"><p>やった〜(⋈◍＞◡＜◍)。✧♡</p><p>素数"+opt[ans]+"を捕まえたぞ〜!!!!</p></div>";
	if(onGame){
		document.getElementById("main").innerHTML = content;
	}
}

function missedPrime(){
	var content = "<div class=\"box1 alert\"><p>イヒ〜└(՞ةڼ◔)」</p><p>素数"+opt[ans]+"を逃したぞ〜wwwww</p></div>";
	if(onGame){
		document.getElementById("main").innerHTML = content;
	}
}

function gameEnd(){
	var content;
	onGame = false;
	var i = got*got;
	var j = missed;
	if(i>78497){
		j -= (i - 78497);
		i = 78497;
	}
	var pnt = pns[i] - j;
	if(pnt<0 || i === 0){
		pnt = 0;
	}
	document.getElementById("main").innerHTML = "";
	alert("終了!!");
	content = "<div class=\"box1 alert\"><p>結果発表!!</p>";
	content += "<p>捕まえた素数の個数: "+got+"個</p>";
	content += "<p>逃した素数の個数: "+missed+"個</p>";
	content += "<p>得点: <span style=\"font-size:40px; line-height:40px;\">"+pnt+"</span>点</p>";
	content += "<a href=\"JavaScript:void(0);\" class=\"button1\" onClick=\"init();\">Play again</a>";
	content += "<a href=\"https://twitter.com/intent/tweet?hashtags=PrimeGO&original_referer=https%3A%2F%2Fabout.twitter.com%2Fja%2Fresources%2Fbuttons&ref_src=twsrc%5Etfw&text=PrimeGO!+で素数を"+got+"個捕まえて"+pnt+"点獲得したよ!&tw_p=tweetbutton&url=http%3A%2F%2Fir.tomate.uno%2F\" class=\"button1\" target=\"_blank\">Twitterで結果を共有</a>";
	content += "</div>";
	got = 0;
	missed = 0;
	document.getElementById("main").innerHTML = content;
}

function problemSet(){
	setNumber();
	displaySet();
}