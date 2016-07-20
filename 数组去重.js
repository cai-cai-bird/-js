var arr=[1,2,34,5,43,3,2,34,5,5,6,12,3,4,3,3,2];
var new_arr=[];
var obj={};

for (var i=0;i<arr.length;i++) {
	if(!obj[arr[i]]){
		obj[arr[i]]=arr[i];
		new_arr.push(arr[i]);
	}
}

console.log(new_arr);