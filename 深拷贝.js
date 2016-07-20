function clone(obj){
	if(typeof (obj) != "object" || obj === null){
		return obj;
	}else if(obj instanceof Array && obj.constructor===Array){
		return obj.concat();
		// 或者  return obj.slice(0);
	}else{
		var new_obj={};
		for(var i in obj){
			new_obj[i] = obj[i];
		}
		return new_obj;
	}
}
//基本数据类型
var a=10;
var b=clone(a);

console.log("基本数据类型的拷贝 "+ a+" - "+ b);

//数组
var arr=[1,2,3];
var new_arr=clone(arr);
new_arr[3]=4;

console.log("数组的深度拷贝 "+ arr + " - "+ new_arr);

//对象的拷贝
var obj={
	"name":"lisa",
	"age":20
};
var new_obj=clone(obj);
new_obj["name"]="alex";
console.log("对象的拷贝" + JSON.stringify(obj) + " - "+ JSON.stringify(new_obj));
