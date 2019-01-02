module.exports = {
	parseMsg(action, payload = {}, metadata = {}) {
		const meta = Object.assign({}, {
			timestamp: Date.now(),
		}, metadata);

		return {
			meta,
			data: {
				action,
				payload,
			},
		};
	},
	randomNum(randomFlag, max, min) {
		var str = "",
			range = min,
			arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
				'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
			];
		// 随机产生
		if (randomFlag) {
			range = Math.round(Math.random() * (max - min)) + min;
		}
		for (var i = 0; i < range; i++) {
			pos = Math.round(Math.random() * (arr.length - 1));
			str += arr[pos];
		}
		return str;
	}
};

