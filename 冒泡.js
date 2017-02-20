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
function maopao(arr) {
    for (var i =0;i<arr.length;i++){
        for (var j=i+1;j<arr.length;j++){
            if(arr[i]>arr[j]){
                var temp =arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
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
