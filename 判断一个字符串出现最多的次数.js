var str="aa12212aasdfsaaaddsaaa";
var obj={};
var max=0;
for(var i=0;i<str.length;i++){
	if(!obj[str[i]]){
		obj[str[i]]=1;
	}else{
		obj[str[i]]++;
	}
}
for(var j in obj){
	if(obj[j]>max){
		max=j;
	}
}

console.log("出现最多的数是"+max+"最多出现了"+obj[max]+"次")