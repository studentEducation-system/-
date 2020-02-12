export default {
    getCookie(key){
        let getCookie = document.cookie.replace(/[ ]/g, "");
		let arrCookie = getCookie.split(";");
		let tips;
		for (let i = 0; i != arrCookie.length; i++) {
			let arr = arrCookie[i].split('=');
			if (key == arr[0]) {
				tips = arr[1];
				break;
			}
		}
		return tips;

    },
    setCookie(key,value,time){
		var exp = new Date();
        exp.setTime(exp.getTime() + time*24*60*60*1000);
		document.cookie = key + '=' + value + ";expires=" + exp.toGMTString();
    },
    deleteCookie(key){
        let date = new Date();
		date.setTime(date.getTime()-10000000);
		document.cookie = key + '=' + 'null' + ";expires="+date.toGMTString();
    }
}