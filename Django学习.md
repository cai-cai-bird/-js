# Django 学习
## django 基本命令

```
1.新建一个django project
django-admin.py startproject project-name //project-name项目名称
2.新建app (模块)
python manage.py startapp app-name //一般一个项目有多个app, 当然通用的app也可以在多个项目中使用。

把 app-name 加入到 settings.INSTALLED_APPS中

django就会默认去寻找该模块下面的templates文件夹，可以通过render(request,'templates里的html')直接返回
```
## django 模板

```
from django.shortcuts import render //返回模板render()
{% block title%} {% endblock %}

{% extends 'base.html'%}

{% include "header.html" %}

{% url "add2" 4 5 %} //add2 为路由指定的name 4 5 为参数

模板上得到视图的网址 {% url 'add2' 4 5 %}
<br>
获取当前的地址 {{ request.path }}
<br>
获取当前的GET参数 {{ request.GET.urlencode }}
<br>
获取当前的用户 {{ request.user }}

```
## django models

```
python manage.py startapp modelStudy //创建一个模块modelStudy
然后在该模块下面编辑models.py添加一个Peopele类

class People(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()
    def __unicode__(self):
        return self.name

同步一下数据库（我们使用默认的数据库 SQLite3，无需配置）
python manage.py syncdb # 进入 manage.py 所在的那个文件夹下输入这个命令
注意：Django 1.7 及以上的版本需要用以下命令
python manage.py makemigrations
python manage.py migrate

上面命令Django生成了一系列的表，也生成了我们新建的modelStudy_people这个表

Django提供了丰富的API, 下面演示如何使用它。
$ python manage.py shell
>>> from people.models import Person
>>> Person.objects.create(name="WeizhongTu", age=24)
<Person: Person object>

新建一个对象的方法有以下几种：

1.People.objects.create(name=name,age=age)
2.p = People(name="WZ", age=23)
  p.save()
3.p = People(name="TWZ")
  p.age = 23
  p.save()
4.People.objects.get_or_create(name="WZT", age=23)

这种方法是防止重复很好的方法，但是速度要相对慢些，返回一个元组，第一个为People对象，第二个为True或False, 新建时返回的是True, 已经存在时返回False.

### 获取对象有以下方法：

Person.objects.all()

Person.objects.all()[:10] 切片操作，获取10个人，不支持负索引，切片可以节约内存

Person.objects.get(name=name)


get是用来获取一个对象的，如果需要获取满足条件的一些人，就要用到filter

Person.objects.filter(name="abc") # 等于Person.objects.filter(name__exact="abc") 名称严格等于 "abc" 的人

Person.objects.filter(name__iexact="abc") # 名称为 abc 但是不区分大小写，可以找到 ABC, Abc, aBC，这些都符合条件



Person.objects.filter(name__contains="abc") # 名称中包含 "abc"的人

Person.objects.filter(name__icontains="abc") #名称中包含 "abc"，且abc不区分大小写



Person.objects.filter(name__regex="^abc") # 正则表达式查询

Person.objects.filter(name__iregex="^abc")# 正则表达式不区分大小写

filter是找出满足条件的，当然也有排除符合某条件的

Person.objects.exclude(name__contains="WZ") # 排除包含 WZ 的Person对象

Person.objects.filter(name__contains="abc").exclude(age=23) # 找出名称含有abc, 但是排除年龄是23岁的



```
