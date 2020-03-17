/**
 * Created by Seven on 2020/3/17.
 * project: Autumn-util
 * email: fighting20xx@126.com
 */
export default {

	/**
	 * 将字符串时间转换成时间对象。
	 *
	 * @param {String|Date|Number} sDateTime
	 *  字符串类型参数，支持格式如下：
	 *  UTC 标准时间
	 *
	 *  yyyy-MM-dd hh:mm:ss
	 *    yyyy-MM-dd
	 *
	 *  MM-dd hh:mm
	 *
	 *  hh:mm:ss
	 *
	 *  MM-dd
	 *  hh:mm
	 *
	 *  yy-MM-dd hh:mm:ss
	 *  yy-MM-dd
	 *
	 * @return {Date}
	 */
	parseDate: function(sDateTime) {
		var dDate = null,
			sDateType = this.typeOf(sDateTime)
		;

		// 检测参数类型。
		if (sDateType === 'date') {
			// 日期对象型。

			dDate = sDateTime;
		} else if (sDateType === 'number') {
			// 毫秒值类型。

			dDate = new Date(Number(sDateTime));
		} else if (sDateType === 'string') {
			// 字数串类型。
			sDateTime = sDateTime.replace(/-/g, '/');
			// 首先使用标准日期格式来实例化。
			dDate = new Date(sDateTime);

			/*
			 * 如果是无效的日期，则再进一步分析，否则可直接使用。
			 * 或者是非 yy-MM-dd 的三段日期，两段的也不行。
			 */
			if (dDate.toString() == 'Invalid Date' ||
				sDateTime.split('/').length < 3) {
				var asDate = [],
					asTime = []
				;

				// 分割日期与时间。
				var asDateTime = sDateTime.split(' ');
				var sSplitedDate = asDateTime[0];

				// 检测分割结果段数。
				if (asDateTime.length == 2) {
					// 有两段，则参数包括日期和时间。

					asDate = sSplitedDate.split('/');
					asTime = sDateTime[1].split(':');
				} else {
					// 不是两段，当作只有日期或时间来处理。

					// 检测分割后的日期里，是否有(-)符号，如果有则表示这段是日期的，否则为时间的。
					if (sSplitedDate.indexOf('/') > -1) {
						// 日期型。

						asDate = sSplitedDate.split('/');
					} else {
						// 时间型。

						asTime = sSplitedDate.split(':');
					}
				}

				var nNow = new Date(),

					// 日期段没传则使用当天。
					nYear = nNow.getFullYear(),
					nMonth = nNow.getMonth(),
					nDay = nNow.getDate(),

					// 时间段没传则使用零点。
					nHours = 0,
					nMinutes = 0,
					nSeconds = 0
				;

				// 检测分割后的日期段，是否有值。
				if (asDate.length) {
					if (asDate.length == 3) {
						// 三段式日期。

						nYear = asDate[0] >> 0;
						nMonth = asDate[1] >> 0;
						nDay = asDate[2] >> 0;
					} else {
						// 两段式日期。

						nMonth = asDate[0] >> 0;
						nDay = asDate[1] >> 0;
					}

					// 如果参数传的年是两位数，则换算成四位整年。
					if (nYear < 1900) {
						nYear += 1900;
					}

					// 月份要减一。
					nMonth--;
				}

				// 检测分割后的时间段，是否有值。
				if (asTime.length) {
					nHours = asTime[0] >> 0;
					nMinutes = asTime[1] >> 0;

					// 三段式的值，表示包括毫秒。
					if (asTime.length == 3) {
						nSeconds = asTime[2] >> 0;
					}
				}

				// 实例段日期对象。
				dDate = new Date(nYear, nMonth, nDay, nHours, nMinutes,
					nSeconds);
			}
		}

		return dDate;
	},

	/**
	 * 格式化日期时间。
	 * 如 yyyy-MM-dd、yyyy-MM-dd hh:mm:ss W
	 *
	 * @param {String|Date|Number} dDate 要格式化的日期对象。
	 * @param {String} sTemplate 要模式化的模板。
	 *  y 年
	 *  M 月
	 *  d 日
	 *  h 时
	 *  m 分
	 *  s 秒
	 *  S 毫秒
	 *  q 季
	 *  w  第多少周
	 *  W  星期几
	 * @return {String}
	 */
	formatDate: function (dDate, sTemplate = 'yyyy-MM-dd hh:mm:ss') {
		var _this = this;

		// 先解析一下日期参数。
		dDate = _this.parseDate(dDate);

		// 检测解析有效性。
		if (!dDate) {
			return '';
		}


		var
			nFullYear = dDate.getFullYear(),	// 四位整年。
			nYear = nFullYear.toString().substring(2), // 两位年。
			nMonth = dDate.getMonth() + 1,	// 月份。
			nDay = dDate.getDate(),	// 日。

			nHours = dDate.getHours(),	// 时。
			nMinutes = dDate.getMinutes(),	// 分。
			nSeconds = dDate.getSeconds(),	// 秒。

			nMilliseconds = dDate.getMilliseconds(),	// 毫秒。
			nQuarter = Math.floor((nMonth + 3) / 3),	// 季。
			nWeek = _iso8601Week(dDate), // 周
			nWeekDay = getWeekDay(dDate), // 星期几

			fix = _this.fix
		;



		var oFullFlags = {
			yyyy: nFullYear,	// 年。
			MM: fix(nMonth),	// 月。
			dd: fix(nDay),	// 日。
			hh: fix(nHours),	// 时。
			mm: fix(nMinutes),	// 分。
			ss: fix(nSeconds),	// 秒。
			S: nMilliseconds,	// 毫秒。
			q: nQuarter,	// 季。
			w: nWeek,
			W: nWeekDay    //星期几
		};


		var oFlags = {
			yy: nYear,	// 年。
			M: nMonth,	// 月。
			d: nDay,	// 日。
			h: nHours,	// 时。
			m: nMinutes,	// 分。
			s: nSeconds	// 秒。
		};


		// 逐一替换各属性。
		var sDate = sTemplate;
		var p;

		// 先替换多位的。
		for (p in oFullFlags) {
			sDate = sDate.replace(p, oFullFlags[p]);
		}

		// 再替换单位的。
		for (p in oFlags) {
			sDate = sDate.replace(p, oFlags[p]);
		}


		return sDate;


		/**
		 * 计算当前日期为当年的第几周
		 *
		 * @param {Date} date
		 * @return {Number}
		 */
		function _iso8601Week(date) {
			var time, checkDate = new Date(date.getTime());

			// Find Thursday of this week starting on Monday
			checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));

			time = checkDate.getTime();
			checkDate.setMonth(0); // Compare with Jan 1
			checkDate.setDate(1);
			return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
		}


		/**
		 * 计算当前日期为当年的第几周
		 *
		 * @param {Date} date
		 * @return {Number}
		 */
		function getWeekDay(date) {
			var time = new Date(date.getTime());

			var day = time.getDay();
			var str = '星期';
			switch (day) {
				case 0 :
					str += "日";
					break;
				case 1 :
					str += "一";
					break;
				case 2 :
					str += "二";
					break;
				case 3 :
					str += "三";
					break;
				case 4 :
					str += "四";
					break;
				case 5 :
					str += "五";
					break;
				case 6 :
					str += "六";
					break;
			}
			return  str;
		}
	},

	/**
	 * @param  {s} 秒数
	 * @return {String} 字符串
	 *
	 * @example formatHMS(3610) // -> 1h0m10s
	 */
	formatHMS(s) {
		var str = '';
		if (s > 3600) {
			str = Math.floor(s / 3600) + 'h' + Math.floor(s % 3600 / 60) +
				'm' + s % 60 + 's';
		} else if (s > 60) {
			str = Math.floor(s / 60) + 'm' + s % 60 + 's';
		} else {
			str = s % 60 + 's';
		}
		return str;
	},

	/*时间格式化*/
	formatTime(obj, format) {
		if (format) {
			var date;
			if (obj instanceof Date) {
				date = obj;
			} else {
				date = new Date(obj);
			}
			var dayNames = [
				'星期一',
				'星期二',
				'星期三',
				'星期四',
				'星期五',
				'星期六',
				'星期日',];

			var o = {
				'M+': date.getMonth() < 9
					? '0' + (date.getMonth() + 1)
					: (date.getMonth() + 1), // 月份
				'd+': date.getDate() < 10
					? '0' + date.getDate()
					: date.getDate(), // 日
				'h+': date.getHours(), // 小时
				'm+': date.getMinutes(), // 分
				's+': date.getSeconds() < 10
					? '0' + date.getSeconds()
					: date.getSeconds(), // 秒
				'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
				'S+': date.getMilliseconds(), // 毫秒
				'D+': dayNames[date.getDay()], //星期
			};

			if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
				(`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
			for (var k in o) {
				if (new RegExp(`(${k})`).test(format)) {
					format = format.replace(RegExp.$1,
						(RegExp.$1.length === 1)
							? (o[k])
							: ((`00${o[k]}`).substr((`${o[k]}`).length)));
				}
			}
			return format;
		} else {
			let date = new Date(obj);
			let _year = date.getFullYear(),
				_month = (date.getMonth() + 1) > 9
					? (date.getMonth() + 1)
					: '0' + (date.getMonth() + 1),
				_date = date.getDate(),
				_hour = date.getHours(),
				_minute = date.getMinutes(),
				_second = date.getSeconds();
			return _year + '-' + _month + '-' + _date + ' ' + _hour + ':' +
				_minute + ':' + _second;
		}
	},
	//根据月份获取起止时间戳
	getTimeFromMonth(year, month) {
		return [
			new Date(year, month - 1, 1).getTime() / 1000,
			new Date(year, month, 0).getTime() / 1000,
		];
	},
//根据日期获取一天起止时间戳
	getTimeFromDay(year, month, day) {
		return [
			new Date(year, month - 1, day).getTime() / 1000,
			new Date(year, month - 1, (day + 1)).getTime() / 1000,
		];
	},

	/**
	 * 计算目标时间与起始时间的时间差，反按指定模板格式返回。
	 *
	 * @param {Date} dTargetDate
	 * @param {Date|undefined} sBeginDate
	 * @param {String|undefined} sTemplate
	 * @return {String}
	 */
	dateOffset: function(
		dTargetDate, dBeginDate = new Date(),
		sTemplate = '剩余时间:{d}天{h}小时{m}分钟{s}秒') {
		var _this = this,
			t = _this.parseDate(dTargetDate).getTime() -
				_this.parseDate(dBeginDate).getTime(), //时间差的毫秒数
			d = 0,
			h = 0,
			m = 0,
			s = 0
		;

		if (t >= 0) {
			d = Math.floor(t / 1000 / 3600 / 24);
			h = Math.floor(t / 1000 / 60 / 60 % 24);
			m = Math.floor(t / 1000 / 60 % 60);
			s = Math.floor(t / 1000 % 60);
		}

		return _this.substitute(sTemplate, {
			d, h, m, s,
		});
	},

	/**
	 * 将秒时间格式化成上级单位的便于可读的时间串。
	 *
	 * @param {Number} nSeconds 秒值
	 * @param {String|undefine} sTemplate 输出模板
	 * @param {Object|undefined} oUnit 后缀单位
	 */
	formatSeconds: function(
		nSeconds, sTemplate = '{d} {h} {m} {s}', oUnit = {
			d: ' 天',
			h: ' 时',
			m: ' 分',
			s: ' 秒',
		}) {
		var t = nSeconds;
		var d, h, m, s;

		if (t >= 0) {
			d = Math.floor(t / 60 / 60 / 24);
			h = Math.floor(t / 60 / 60);
			m = Math.floor(t / 60);
			s = Math.floor(t % 60);
		}

		return this.substitute(sTemplate, {
			d: d > 0 ? d + oUnit.d : '',
			h: h > 0 ? h + oUnit.h : '',
			m: m > 0 ? m + oUnit.m : '',
			s: s + oUnit.s,
		});
	},

	/**
	 * 过去了的时间。
	 *
	 * @param {Date|Number|String} dDate
	 * @return {String}
	 */
	timeAgo: function(dDate) {
		//dateStr格式：2017-08-17 10:39:27
		//转换成时间戳
		var _this = this;
		dDate = _this.parseDate(dDate);

		var sDate = _this.formatDate(dDate);
		var dateTimeStamp = dDate.getTime();
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var month = day * 30;
		var now = new Date().getTime();
		var diffValue = now - dateTimeStamp;
		if (diffValue < 0) {
			return;
		}
		var monthC = diffValue / month;
		var dayC = diffValue / day;
		var hourC = diffValue / hour;
		var minC = diffValue / minute;
		var result;
		if (monthC >= 12) {
			result = sDate;
		}
		else if (monthC >= 1) {
			result = '' + parseInt(monthC) + '个月前';
		}
		else if (dayC >= 1) {
			result = '' + parseInt(dayC) + '天前';
		}
		else if (hourC >= 1) {
			result = '' + parseInt(hourC) + '小时前';
		}
		else if (minC >= 1) {
			result = '' + parseInt(minC) + '分钟前';
		} else if (minC < 1) {
			result = '刚刚';
		}
		return result;
	},

	/**
	 * 时间加减。
	 * @param {Date|Number|String} dDate
	 * @param2 {String}
	 * @param3 {String}    '+'加法，  其他默认为减法
	 * @return {String}
	 *
	 * 为什么要分为2步呢？   日时分秒，是直接可以计算加出来的， 换算成毫秒， 不用关心进位
	 *                      年月 就是不固定的了，一个月有  28，29，30，31天， 加月只能是数字 +1 不能按天算，
	 */
	timeAddOrSub: function(dDate, dDate2={y:0,M:0,d:0,h:0,m:0,s:0}, add = '+') {
		var deltData= Object.assign({
			y: 0,	// 年。
			M: 0,	// 月。
			d: 0,	// 日。
			h: 0,	// 时。
			m: 0,	// 分。
			s: 0	// 秒。
		},dDate2);

		var isAdd = add === '+';
		var _y = deltData.y;
		var _M = deltData.M;

		var date = this.parseDate(dDate);
		let _year ;
		let _month ;

		if(isAdd){
			_year = date.getFullYear() + _y;
			_month =  date.getMonth() + 1 + _M;
			while (_month > 12){
				_month -= 12;
				_year += 1;
			}
		}else {
			_year = date.getFullYear() - _y;
			_month =  date.getMonth() + 1 - _M;
			while (_month < 0 ){
				_month += 12;
				_year -= 1;
			}
		}
		let _date = date.getDate();
		let _hour = date.getHours();
		let _minute = date.getMinutes();
		let _second = date.getSeconds();

		let firstResult =  _year + '-' + _month + '-' + _date + ' ' + _hour + ':' +
			_minute + ':' + _second;


		let sDate = this.parseDate(firstResult);
		var dateTimeStamp = sDate.getTime();
		var _s = deltData.s * 1000 ;
		var _m = deltData.m * 1000 * 60;
		var _h = deltData.h * 1000 * 60 * 60;
		var _d = deltData.d * 1000 * 60 * 60 * 24;

		//dateStr格式：2017-08-17 10:39:27
		//转换成时间戳

		var dateTimeStampCount = _s + _m + _h + _d;
		var result = isAdd ? dateTimeStamp + dateTimeStampCount  : dateTimeStamp - dateTimeStampCount;

		return this.formatDate(result);
	},

};
