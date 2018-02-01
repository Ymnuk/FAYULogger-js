class Transport {
	constructor(name) {
		if(name == null || typeof(name) != 'string') {
			throw new Error('Name transport should be type "string"');
		}
		this.__name = name;
		this.__levelCallback = {
			debug: null,
			info: null,
			warn: null,
			severe: null,
			error: null,
			fatal: null
		}
	}

	on(level, callback) {
		if(level != null && typeof(level) == 'string') {
			switch(level) {
				case 'debug':
					this.__levelCallback.debug = callback;
					break;
				case 'info':
					this.__levelCallback.info = callback;
					break;
				case 'warn':
					this.__levelCallback.warn = callback;
					break;
				case 'severe':
					this.__levelCallback.severe = callback;
					break;
				case 'error':
					this.__levelCallback.error = callback;
					break;
				case 'fatal':
					this.__levelCallback.fatal = callback;
					break;
				default:
					throw new Error('Unknow log level');
			}
		}
	}

	debug(msg) {
		if(this.__levelCallback.debug != null && typeof(this.__levelCallback.debug) == 'function') {
			this.__levelCallback.debug(`${msg.name}: ${msg.message}`);
		}
	}

	info(msg) {
		if(this.__levelCallback.info != null && typeof(this.__levelCallback.info) == 'function') {
			this.__levelCallback.info(`${msg.name}: ${msg.message}`);
		}
	}

	warn(msg) {
		if(this.__levelCallback.warn != null && typeof(this.__levelCallback.warn) == 'function') {
			this.__levelCallback.warn(`${msg.name}: ${msg.message}`);
		}
	}

	severe(msg) {
		if(this.__levelCallback.severe != null && typeof(this.__levelCallback.severe) == 'function') {
			this.__levelCallback.severe(`${msg.name}: ${msg.message}`);
		}
	}

	error(msg) {
		if(this.__levelCallback.error != null && typeof(this.__levelCallback.error) == 'function') {
			this.__levelCallback.error(`${msg.name}: ${msg.message}`);
		}
	}

	fatal(msg) {
		if(this.__levelCallback.fatal != null && typeof(this.__levelCallback.fatal) == 'function') {
			this.__levelCallback.fatal(`${msg.name}: ${msg.message}`);
		}
	}

	get name() {
		return this.__name;
	}

	set name(name) {
		this.__name = name;
	}
	
	/**
	 * Закрыте транспорта и освобождение ресурсов, свзанных с ним
	 */
	close() {
		this.__levelCallback = {
			debug: null,
			info: null,
			warn: null,
			severe: null,
			error: null,
			fatal: null
		}
	}
}

module.exports = Transport;