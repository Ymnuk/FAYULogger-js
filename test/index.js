const vows = require('vows');
const assert = require('assert');

const FAYULogger = require('../index.js');
const Module = require('../Module');

const Transport = require('../Transport');//Для тестирования

let logger = null;

vows
	.describe('Testing FAYULogger')
		.addBatch({
			'Create logger': {
				topic: function() {
					logger = new FAYULogger();
					return logger;
				},
				'Should be "Logger"': function(topic) {
					assert.ok(topic instanceof FAYULogger);
				}
			}
		})
		.addBatch({
			'Add module': {
				topic: function() {
					logger.addModule('test');//Добавление в логгер
					return logger.getModule('test');
				},
				'Should be "Module"': function(topic) {
					assert.ok(topic instanceof Module);
				}
			},
			'Add transport': {
				topic: function() {
					logger.addTransport(new Transport('simple'));
					return logger.getTransport('simple');
				},
				'Should be "Transport"': function(topic) {
					assert.ok(topic instanceof Transport);
				}
			}
		})
		.addBatch({
			'Binding transport and module': {
				topic: function() {
					logger.bind({
						module: 'test',
						transport: 'simple',
						level: 'debug'
					});
					return logger.getModule('test').transports;
				},
				'Should be transport array with 1 item "simple"': function(topic) {
					assert.ok(topic && topic instanceof Array && topic[0] == 'simple');
				}
			}
		})
		.addBatch({
			'Testing levels': {
				topic: function() {
					return {
						transport: logger.getTransport('simple'),
						module: logger.getModule('test')
					}
				},
				'Testing debug': {
					topic: function(log) {
						log.transport.on('debug', (message) => {
							this.callback(message);
						})
						log.module.debug('DEBUG');
					},
					'Should return "test: DEBUG"': function(t1, t2) {
						assert.equal(t1, 'test: DEBUG');
					}
				},
				'Testing info': {
					topic: function(log) {
						log.transport.on('info', (message) => {
							this.callback(message);
						})
						log.module.info('INFO');
					},
					'Should return "test: INFO"': function(msg, a1) {
						assert.equal(msg, 'test: INFO');
					}
				},
				'Testing warn': {
					topic: function(log) {
						log.transport.on('warn', (message) => {
							this.callback(message);
						})
						log.module.warn('WARN');
					},
					'Should return "test: WARN"': function(msg, a1) {
						assert.equal(msg, 'test: WARN');
					}
				},
				'Testing SEVERE': {
					topic: function(log) {
						log.transport.on('severe', (message) => {
							this.callback(message);
						})
						log.module.severe('SEVERE');
					},
					'Should return "test: SEVERE"': function(msg, a1) {
						assert.equal(msg, 'test: SEVERE');
					}
				},
				'Testing error': {
					topic: function(log) {
						log.transport.on('error', (message) => {
							this.callback(message);
						})
						log.module.error('ERROR');
					},
					'Should return "test: ERROR"': function(msg, a1) {
						assert.equal(msg, 'test: ERROR');
					}
				},
				'Testing fatal': {
					topic: function(log) {
						log.transport.on('fatal', (message) => {
							this.callback(message);
						})
						log.module.fatal('FATAL');
					},
					'Should return "test: FATAL"': function(msg, a1) {
						assert.equal(msg, 'test: FATAL');
					}
				}
			}
		})
		.addBatch({
			'Testing custom levels': {
				topic: function() {
					logger.addModule('test2');
					logger.bind({
						module: 'test2',
						transport: 'simple',
						level: ['debug', 'severe', 'fatal']
					});
					return {
						transport: logger.getTransport('simple'),
						module: logger.getModule('test2')
					};
				},
				'Testing debug': {
					topic: function(log) {
						log.transport.on('debug', (message) => {
							this.callback(message);
						})
						log.module.debug('DEBUG');
					},
					'Should return "test2: DEBUG"': function(msg, a1) {
						assert.equal(msg, 'test2: DEBUG');
					}
				},
				'Testing SEVERE': {
					topic: function(log) {
						log.transport.on('severe', (message) => {
							this.callback(message);
						})
						log.module.severe('SEVERE');
					},
					'Should return "test2: SEVERE"': function(msg, a1) {
						assert.equal(msg, 'test2: SEVERE');
					}
				},
				'Testing fatal': {
					topic: function(log) {
						log.transport.on('fatal', (message) => {
							this.callback(message);
						})
						log.module.fatal('FATAL');
					},
					'Should return "test2: FATAL"': function(msg, a1) {
						assert.equal(msg, 'test2: FATAL');
					}
				}
			}
		})
		.addBatch({
			'Close logger': {
				topic: function() {
					return logger.free();
				},
				'Should return "TRUE"': function(topic) {
					assert.equal(topic, true);
				}
			}
		})
	.export(module);