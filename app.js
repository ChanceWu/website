var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3003;
var app = express();

app.set('views','./views/pages')
app.set('view engine','jade')
app.use(bodyParser())
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('website started on port '+port)

app.get('/',function(req, res){
	res.render('index',{
		title: '首页',
		movies: [{
			title: '机械战警1',
			_id: 1,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title: '机械战警2',
			_id: 2,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title: '机械战警3',
			_id: 3,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title: '机械战警4',
			_id: 4,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title: '机械战警5',
			_id: 5,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title: '机械战警6',
			_id: 6,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		}]
	})
})
app.get('/movie/:id',function(req, res){
	res.render('detail',{
		title: '详情页',
		movie: {
			doctor: '何塞帕迪利亚',
			country: '美国',
			title: '机械战警',
			year: '2014',
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language: '英语',
			flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary: '十多块上课说道好就开始你 和考生等级考试结合看山顶上几十块的数据库倒计时的看法和你上课交水电费看数据库电脑卡时间飞逝'
		}
	})
})
app.get('/admin/movie',function(req, res){
	res.render('admin',{
		title: '后台录入页',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	})
})
app.get('/admin/list',function(req, res){
	res.render('list',{
		title: '列表页',
		movies: [{
			title: '机械战警',
			_id: 1,
			doctor: '何塞帕迪利亚',
			country: '美国',
			year: '2014',
			language: '英语',
			flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf'
		}]
	})
})