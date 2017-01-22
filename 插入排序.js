/*

插入排序：1.默认取出数组的第一个元素，且认为这个元素排过序,
		  2.取出数组的下一个元素，然后跟已经排序的数组进行比较
		  3.如果该元素（已经排序的数组）大于新元素，则将该元素移动到下一个位置
		  4.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
		  5.将新元素插入到下一位置中
		  6.重复步骤2


function sort(elements){
  //假设第0个元素是一个有序的数列，第1个以后的是无序的序列，
  //所以从第1个元素开始将无序数列的元素插入到有序数列中
  for(var i = 1; i < elements.length; i++){
    //升序
    if(elements[i] < elements[i-1]){
      //取出无序数列中的第i个作为被插入元素
      var guard = elements[i];
      //记住有序数列的最后一个位置，并且将有序数列位置扩大一个
      var j = i - 1;
      elements[i] = elements[j];
      
	  console.log(i,j,elements)
      //比大小，找到被插入元素所在的位置
      while(j >= 0 && guard < elements[j]){
        elements[j+1] = elements[j];
        j--;
      }
 console.log(elements+"-----------------------------")
      //插入
      elements[j+1] = guard;
    }
  }
}
*/

//插入排序：1
function sort(arr){
	
	for(var i=1;i<arr.length;i++){
		var tmp = arr[i];
		var inner = i;
		while(inner>=0&&arr[inner-1]>tmp){
			arr[inner] =arr[inner-1];
			--inner;
		}
		arr[inner] = tmp;
	}
	/*
	for (var out = 1; out < a.length; out++) {
		var tmp = a[out];
		var inner = out;
		while (a[inner - 1] > tmp) {
			a[inner] = a[inner - 1];
			--inner;
		}
		console.log(a)
		a[inner] = tmp;
	}*/
}


var elements = [10, 9 ,1,28,89,222,888,5,45];
console.log('before: ' + elements);
sort(elements);
console.log(' after: ' + elements);