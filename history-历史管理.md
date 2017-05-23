# HTML5 历史管理

> - hashchange
    1.每次写入hash值
    2.通过监听 onhashchange: 事件；当hash值有变化的时候，就触发 
> - pushstate 

    pushstate 添加历史数据 三个参数：数据  标题(都没实现) 地址(可选） 
    popstate 读取数据  event.state
    
```

<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>无标题文档</title>
<script type="text/javascript">
//第一种实现 :onhashchange: 事件；当hash值有变化的时候，就触发 
window.onload=function()
{
   var oInput=document.getElementById("input1");
   var oDiv=document.getElementById("div1");
   //var obj={};
   oInput.onclick=function()
   {
       var number=randomNum(35,7);
       oDiv.innerHTML=number;
       var oRD=Math.random();
       obj[oRD]=number;
       window.location.hash=oRD;
   }
    window.onhashchange=function()
    {
       var number=obj[window.location.hash.substring(1)] || '';
       oDiv.innerHTML=number;
    }
    
   function randomNum(alls,now)
   {
      var arr=[];
      var newArr=[];
      for(var i=1;i<=alls;i++)
      {
         arr.push(i);
      }
      for(var i=0;i<now;i++)
      {
         var a=Math.floor(Math.random()*arr.length);
         newArr.push(arr.splice(a,1));
      }
      return newArr;
   }
  //第二种实现: histroy
   //pushState:三个参数：数据  标题(都没实现) 地址(可选）
   //popstate事件： 读取数据  event.state
   oInput.onclick=function()
   {
       var number=randomNum(35,7);
       oDiv.innerHTML=number;
       history.pushState(number,'');
   }
    window.onpopstate=function(ev)
    {
        var number=ev.state || '';
        oDiv.innerHTML=number;
    }
    
}
</script>
</head>
 
<body>
<input type="button" id="input1" value="35选7" />
<div id="div1"></div>
</body>
</html>
```
