function maopao(arr){
	for(var i=0;i<arr.length-1;i++){
		for(var j=0;j<arr.length-i-1;j++){
			if(arr[j]>arr[j+1]){
				var wap=arr[j];
				arr[j]=arr[j+1];
				arr[j+1] = wap;
			}
		}
	}
}


function sort(arr){
	var length= arr.length;
	while(length>0){
		for(var j=0;j<length-1;j++){
			if(arr[j]>arr[j+1]){
				var temp =arr[j];
				arr[j]=arr[j+1];
				arr[j+1] = temp;
			}
		}
		length--;
	}
}

var elements = [3, 1, 5, 7, 2, 4, 9, 6, 10, 8];
console.log('before: ' + elements);
sort(elements);
console.log(' after: ' + elements);