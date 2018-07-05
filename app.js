var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var _ = require('underscore');
var port = process.env.PORT || 3003;
var app = express();

mongoose.connect('mongodb://localhost/imooc')

app.set('views','./views/pages')
app.set('view engine','jade')
app.use(bodyParser())
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)

console.log('website started on port '+port)

app.get('/', function(req, res) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err)
		}
		res.render('index', {
			title: 'imooc 首页',
			movies: movies
		})
	})
})
app.get('/movie/:id', function(req, res) {
	var id = req.params.id;
	Movie.findById(id, function(err, movie) {
		res.render('detail', {
			title: 'imooc ' + movie.title,
			movie: movie
		})
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
//admin update movie
app.get('/admin/update/:id', function(req, res) {
	var id = req.params.id;
	if (id) {
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err)
			}
			res.render('admin', {
				title: 'imooc 后台更新页',
				movie: movie
			})
		})
	}
})
//admin post movie
app.post('/admin/movie/new', function(req, res) {
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;

	if (id !== 'undefined') {
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err)
			}

			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie) {
				if (err) {
					console.log(err)
				}

				res.redirect('/movie/' + movie._id)
			})
		})
	} else {
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		})

		_movie.save(function(err, movie) {
			if (err) {
				console.log(err)
			}

			res.redirect('/movie/' + movie._id)
		})
	}
})

app.get('/admin/list', function(req, res) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err)
		}

		res.render('list', {
			title: 'imooc 列表页',
			movies: movies
		})
	})
})

// list delete movie
app.delete('/admin/list', function(req, res) {
	var id = req.query.id;

	if (id) {
		Movie.remove({_id: id}, function(err, movie) {
			if (err) {
				console.log(err);
			} else {
				res.json({success: 1})
			}
		})
	}
})

/***
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
***/