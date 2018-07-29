var User = require('../models/user');

exports.showSignup = function(req, res) {
	res.render('signup', {
		title: '注册页面'
	})
}

exports.showSignin = function(req, res) {
	res.render('signin', {
		title: '登录页面'
	})
}

//signup
exports.signup = function(req, res){
	var _user = req.body.user;
	// 判断创建用户是否重复
	User.findOne({name: _user.name}, function(err, user){
		if(err){
			console.log(err);
		}

		if(user){
			return res.redirect('/signin');
		}else{
			var user = new User(_user);

			user.save(function(err, user){
				if(err){
					console.log(err);
				}
				res.redirect('/');
			})
		}
	})
}

//signin
exports.signin = function(req, res) {
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;

	User.findOne({name: name}, function(err, user) {
		if (err) {
			console.log(err);
		}
		if (!user) {
			return res.redirect('/signup');
		}

		user.comparePassword(password, function(err, isMatch) {
			if (err) {
				console.log(err);
			}
			if (isMatch) {
				req.session.user = user;
				console.log('password is matched');
				return res.redirect('/');
			} else {
				console.log('password is not matched');
				return res.redirect('/signin');
			}
		})
	})
}

// logout
exports.logout = function(req, res) {
	delete req.session.user;
	//delete app.locals.user;

	res.redirect('/');
}

// userlist page
exports.list = function(req, res) {
	User.fetch(function(err, users) {
		if (err) {
			console.log(err);
		}

		res.render('userlist', {
			title: 'imooc 用户列表页',
			users: users
		})
	})
}

// midware for user
exports.signinRequired = function(req, res, next) {
	 var user = req.session.user;
	 if (!user) {
	 	return res.redirect('/signin');
	 }
	 next();
}

exports.adminRequired = function(req, res, next) {
	var user = req.session.user;
	if (user.role <= 10) {
		return res.redirect('/signin');
	}
	next();
}

// list delete user
exports.del = function(req, res) {
	var id = req.query.id;

	if (id) {
		User.remove({_id: id}, function(err, user) {
			if (err) {
				console.log(err);
				res.json({success: 0});
			} else {
				res.json({success: 1});
			}
		})
	}
}