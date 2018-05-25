const Module = require('./Module');
const Transport = require('./Transport');

class FAYULogger {
	constructor() {
		this.__modules = {};
		this.__transports = {};
		this.__binds = [];
	}

	/**
	 * Добавление модуля
	 * @param {String} name Название модуля
	 */
	addModule(name) {
		if(name == null || typeof(name) != 'string') {
			throw new Error('Name module should be type "string"');
		}
		this.__modules[name] = new Module(name);
	}

	/**
	 * Получить модуль
	 * @param {String} name Имя модуля
	 * @returns Экземпляр транспорта (если существует по имени)
	 */
	getModule(name) {
		if(name == null || typeof(name) != 'string') {
			throw new Error('Name transport should be type "string"');
		}
		if(this.__modules.hasOwnProperty(name)) {
			return this.__modules[name];
		}
		return null;
	}

	/**
	 * Список модулей как есть
	 */
	get modules() {
		let res = [];
		for(let i in this.__modules) {
			res.push(this.__modules[i]);
		}
		return res;
	}

	/**
	 * Добавление транспорта
	 * @param {String} name Название транспорта
	 * @param {Transport} transport Экземпляр транспорта
	 */
	addTransport(transport) {
		/*if(name == null || typeof(name) != 'string') {
			throw new Error('Name transport should be type "string"');
		}*/
		if(!(transport instanceof Transport)) {
			throw new Error('Transport should be type "Transport" or extends from class "Transport"');
		}
		this.__transports[transport.name] = transport;
	}

	/**
	 * Получить транспорт
	 * @param {String} name Название транспорта
	 * @returns Экземпляр транспорта (если присутствует по имени)
	 */
	getTransport(name) {
		if(name == null || typeof(name) != 'string') {
			throw new Error('Name transport should be type "string"');
		}
		if(this.__transports.hasOwnProperty(name)) {
			return this.__transports[name];
		}
		return null;
	}

	/**
	 * Привязка транспорта к модулю
	 * @param {Object} options Параметры установки связи  между модулем и транспортом
	 */
	bind(options) {
		if(options) {
			if(!options.module == null || typeof(options.module) != 'string') {
				throw new Error('Name module should be type "string"');
			}
			if(!options.transport == null || typeof(options.transport) != 'string') {
				throw new Error('Name transport should be type "string"');
			}
			if(options.level != null && (typeof(options.level) == 'string' || options.level instanceof Array)) {
				let levels = {
					debug: false,
					info: false,
					warn: false,
					severe: false,
					error: false,
					fatal: false
				};
				if(typeof(options.level) == 'string') {
					switch(options.level) {
						case 'debug':
							levels.debug = true;
							levels.info = true;
							levels.warn = true;
							levels.severe = true;
							levels.error = true;
							levels.fatal = true;
							break;
						case 'info':
							levels.info = true;
							levels.warn = true;
							levels.severe = true;
							levels.error = true;
							levels.fatal = true;
							break;
						case 'warn':
							levels.warn = true;
							levels.severe = true;
							levels.error = true;
							levels.fatal = true;
							break;
						case 'severe':
							levels.severe = true;
							levels.error = true;
							levels.fatal = true;
							break;
						case 'error':
							levels.error = true;
							levels.fatal = true;
							break;
						case 'fatal':
							levels.fatal = true;
							break;
					}
				} else if(options.level instanceof Array) {
					for(let i of options.level) {
						switch(i) {
							case 'debug':
							levels.debug = true;
							break;
						case 'info':
							levels.info = true;
							break;
						case 'warn':
							levels.warn = true;
							break;
						case 'severe':
							levels.severe = true;
							break;
						case 'error':
							levels.error = true;
							break;
						case 'fatal':
							levels.fatal = true;
							break;
						}
					}
				}
				this.__modules[options.module].level = levels;
			}
			this.__modules[options.module].bind(this.__transports[options.transport]);
		}
	}

	/**
	 * Освобождение ресорсов модулей и транспортов
	 */
	free() {
		for(let i of Object.keys(this.__modules)) {
			this.__modules[i].close();
		}
		this.__modules = {};
		for(let i of Object.keys(this.__transports)) {
			this.__transports[i].close();
		}
		this.__transports = {};
		return true;
	}
}

module.exports = FAYULogger;