//二分查找法

//二分查找法，也为折半查找，首先要找到一个中间值，通过与中间值比较，大的放右，小的放左，再在两边寻找中间值，持续以上操作，直到找到所在位置为止


var arr = [100,1,2,10,98,22,343,345,64,23];

function erfen(arr,num,start,end){
	var start = start || 0;
	var end = end || arr.length-1;
	var middle = Math.ceil((start+end)/2);
	console.log(arr+"-------"+num+"-------"+ middle);
	if(num==arr[middle]){
		console.log("******************")
		return middle;
	}else if(num<arr[middle]){
		return erfen(arr,num,0,middle-1);
	}else{
		return erfen(arr,num,middle+1,false);
	}
}
/*
var newArr = arr.sort(function(a,b){
	return a-b;
});
*/

var ele = erfen(arr,64);

console.log("二分的值"+ ele)