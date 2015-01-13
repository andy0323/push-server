var gulp = require('gulp')
  , q = require('q')
  , apn = require('apn')
  , mongoose = require('mongoose');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost:7000/my_database');

var BlogPost = new Schema({
    author    : ObjectId
  , title     : String
  , body      : String
  , date      : Date
});

var BlogModel = mongoose.model('BlogModel', BlogPost);

var instance = new BlogModel();

/**  测试mongoose **/

/**
 * 添加数据
 */
gulp.task('insert', function(){
	instance.title = 'andy';
	instance.body = 'he is a ios coder';
	instance.date = new Date();
	instance.save(function(err){
		if (err) {
			console.log('添加失败');
		}else {
			console.log('添加成功');
		};
	});
});

/**
 * 移除数据
 */
gulp.task('delete', function(){
	// 查询
	BlogModel.find(function(err, data){         
		// 获取元素
		var model = data[0];
		
		model.title = 'andy_update';
		model.body = 'update';

		model.remove(function(err){
			if (err) {
				console.log('删除失败');
			}else {
				console.log('删除成功');
			};
		});
	});
});

/**
 * 修改数据
 */
gulp.task('update_', function(){
	// 查询
	BlogModel.find(function(err, data){         
		// 获取元素
		var model = data[0];
		
		model.title = 'andy_update';
		model.body = 'update';

		model.save(function(err){
			if (err) {
				console.log('更新失败');
			}else {
				console.log('更新成功');
			};
		});
	});
});

/**
 * 查询数据
 */
gulp.task('find', function(){
	BlogModel.find(function(err, data){         
		console.log(data);
	});
});


/**  测试apns **/
gulp.task('apns', function() {
	push();
});
var myDevice = new apn.Device("12071A346691C3A9BBCB15589AE63D293E7B42C78B971B62931EEAE7E16D71B1");
var options = {};
var apnConnection = new apn.Connection(options);
/**
 *	推送
 */
function push() {
	var note = new apn.Notification();
	
	note.expiry = Math.floor(Date.now() / 1000);
	// note.badge = 3;
	note.sound = "ping.aiff";
	note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
	note.payload = {'bt_public': {"id":'1', "icon":"icon", "title":"标题"}};

	apnConnection.pushNotification(note, myDevice);
}