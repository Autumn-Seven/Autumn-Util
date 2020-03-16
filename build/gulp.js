/**
 * Created by Seven on 2020/3/16.
 * project: Autumn-util
 * email: fighting20xx@126.com
 */
const path = require('path')
let build = require('./build');
const  watch = require('gulp-watch');

const pathJoin = function (p) {
	return path.resolve(__dirname, p);
};


watch([pathJoin('../src/**/*.js')], function() {

	console.log(new Date())
	build();
});
