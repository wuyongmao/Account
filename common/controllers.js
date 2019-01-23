const websiteUrl = 'https://easy-mock.com/mock/5c3d320e64a6351551448774/Account/';

/**
 * 同步请求 
 * Method GET
 */
function getData(url, param) {
	url = websiteUrl + url;
	return new Promise((res) => {
		uni.request({
			url: url,
			data: param,
			success: (result) => {
				res(result);
			},
			fail: (e) => {
				res(e);
			}
		})
	});
};
/**
 * 同步请求 
 * Method POST 
 */
function getDataPost(url, param) {
	url = websiteUrl + url;
	return new Promise((res) => {
		uni.request({
			url: url,
			data: param,
			method: 'POST',
			success: (result) => {
				res(result);
			},
			fail: (e) => {
				res(e);
			}
		})
	});
};
 

module.exports = {
	getData: getData,
	getDataPost: getDataPost
}
