//快速排序是冒泡排序的升级，第一趟排序时将数据分成两部分，一部分比另一部分的所有数据都要小。然后递归调用，在两边都实行快速排序。
function quickSort(data){
	if(data.length<=1){
		return data;
	}	
	var middle = Math.floor(data.length/2);
	var middleData = data.splice(middle,1)[0];
	
	var left=[];
	var right=[];
	
	for(var i=0;i<data.length;i++){
		if(data[i]<middleData){
			left.push(data[i])
		}else{
			right.push(data[i]);
		}
	}
	console.log(left+"--------"+right)
	return quickSort(left).concat([middleData],quickSort(right))
	
}



var elements=[5,6,2,1,3,8,7,1.2,5.5,4.5,100];
console.log(quickSort(elements));