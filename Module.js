const FyLoggerEmmiter = require('./libs/FyLoggerEmmiter');
const clonedeep = require('lodash.clonedeep');

/**
 * Класс модуля логирования.
 * Предназначен для разделения логирования для каждого раздела приложения (контекста), если таковых присутствует несколько.
 */
class Module {
	/**
	 * Конструктор модуля логирования
	 * @param {String} name Название модуля логирования
	 */
	constructor(name) {
		if(name == null || typeof(name) != 'string') {
			throw new Error("Name should be set and has type \"string\"");
		}
		this.__name = name;
		this.__levels = {
			debug: false,
			info: false,
			warn: false,
			severe: false,
			error: false,
			fatal: false
		}
		this.__transports = [];//Транспорты, прикрепленные к данному модулю
		this.__ee = new FyLoggerEmmiter();
		this.__ee.on('debug', (message) => {
			if(this.__transports.length > 0) {
				for(let i of this.__transports) {
					i.debug(this.__prepareMessage(message)/*{
						name: this.__name,
						message: message
					}*/);
				}
			}
		});
		this.__ee.on('info', (message) => {
			if(this.__transports.length > 0) {
				for(let i of this.__transports) {
					i.info(this.__prepareMessage(message)/*{
						name: this.__name,
						message: message
					}*/);
				}
			}
		});
		this.__ee.on('warn', (message) => {
			if(this.__transports.length > 0) {
				for(let i of this.__transports) {
					i.warn(this.__prepareMessage(message)/*{
						name: this.__name,
						message: message
					}*/);
				}
			}
		});
		this.__ee.on('severe', (message) => {
			if(this.__transports.length > 0) {
				for(let i of this.__transports) {
					i.severe(this.__prepareMessage(message)/*{
						name: this.__name,
						message: message
					}*/);
				}
			}
		});
		this.__ee.on('error', (message) => {
			if(this.__transports.length > 0) {
				for(let i of this.__transports) {
					i.error(this.__prepareMessage(message)/*{
						name: this.__name,
						message: message
					}*/);
				}
			}
		});
		this.__ee.on('fatal', (message) => {
			if(this.__transports.length > 0) {
				for(let i of this.__transports) {
					i.fatal(this.__prepareMessage(message)/*{
						name: this.__name,
						message: message
					}*/);
				}
			}
		});
	}

	__prepareMessage(message) {
		if(message instanceof Array) {
			return {
				name: this.__name,
				message: message
			}
		}
		if(message instanceof String) {
			return {
				name: this.__name,
				message: message.toSting()
			}
		}
		if(message instanceof Number) {
			return {
				name: this.__name,
				message: message
			}
		}
		if(message instanceof Object) {
			let obj = clonedeep(message);
			obj.name = this.__name;
			return obj;
		}
		return {
			name: this.__name,
			message: message
		}
	}

	get name() {
		return this.__name;
	}

	debug(message) {
		if(this.__levels.debug) {
			this.__ee.emit('debug', message);
		}
	}

	info(message) {
		if(this.__levels.info) {
			this.__ee.emit('info', message);
		}
	}

	warn(message) {
		if(this.__levels.warn) {
			this.__ee.emit('warn', message);
		}
	}

	severe(message) {
		if(this.__levels.severe) {
			this.__ee.emit('severe', message);
		}
	}

	error(message) {
		if(this.__levels.error) {
			this.__ee.emit('error', message);
		}
	}

	fatal(message) {
		if(this.__levels.fatal) {
			this.__ee.emit('fatal', message);
		}
	}

	/**
	 * Добавление транспорта в список транспортов
	 * @param {Transport} transport Экземпляр транспорта
	 */
	bind(transport) {
		this.__transports.push(transport);
	}

	/**
	 * Установить уровни логирования
	 */
	set level(opts) {
		this.__levels = opts;
	}

	/**
	 * Получить уровни логирования
	 */
	get level() {
		return this.__levels;
	}

	get transports() {
		let arr = [];
		for(let i of this.__transports) {
			arr.push(i.name);
		}
		return arr;
	}

	/**
	 * Закрыте модуля и освобождение ресурсов, свзанных с ним
	 */
	close() {
		this.__levels = {
			debug: false,
			info: false,
			warn: false,
			severe: false,
			error: false,
			fatal: false
		}
		this.__transports = [];
	}
}

module.exports = Module;