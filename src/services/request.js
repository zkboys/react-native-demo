import config from '../configs';


const urlPrefix = config.domain + config.apiPath;
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;


function filterJSON(res) {
	return res.json();
}


function filterStatus(res) {
	if (res.status >= 200 && res.status < 300) {
		return res;
	}
	else {
		let error = new Error(res.statusText);
		error.res = res;
		error.type = 'http';
		throw error;
	}
}


export function get(url, params) {
	url = urlPrefix + url;
	if (params) {
		let qs = [];
		for(let p of Object.keys(params)){
			qs.push(`${p}=${params[p]}`);
		}
		qs.join('@');
		url += `?${qs}`;
	}

	if (isDebuggingInChrome) {
		console.info(`GET: `, url);
		console.info(`Params: `, params)
	}

	return fetch(url)
		.then(filterStatus)
		.then(filterJSON);
}


export function post(url, body) {
	url = urlPrefix + url;

	if (isDebuggingInChrome) {
		console.info(`POST: `, url);
		console.info(`Body: `, body);
	}

	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
		.then(filterStatus)
		.then(filterJSON);
}


