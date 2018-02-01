# RCP-Server and RCP-Client under amqplib for Node.JS

# Getting started

## Requirements

[Node.js >= 8.9.4](nodejs.org)

## Installation

	npm install fayulogger

## Levels

A logger has 6 different levels of logging in a specific order:

```javascript
	['fatal', 'error', 'severe' 'warn', 'info', 'debug']
```

## Usage

```javascript

const FAYULogger = require('fayulogger');

let logger = new FAYULogger();

logger.addModule('simple');
logger.addTransport(new Transport('simple'));
logger.bind({
	module: 'simple',
	transport: 'simple',
	level: 'debug'
});

log.transport.on('debug', function(message) {
	//Do something
});

log.transport.on('info', function(message) {
	//Do something
});

log.transport.on('warn', function(message) {
	//Do something
});

log.transport.on('severe', function(message) {
	//Do something
});

log.transport.on('error', function(message) {
	//Do something
});

log.transport.on('fatal', function(message) {
	//Do something
});

```
You can selectively set the reaction only to the events that you require

```javascript

logger.bind({
	module: 'simple',
	transport: 'simple',
	level: ['debug', 'severe', 'fatal']
});

log.transport.on('debug', function(message) {
	//Do something
});

log.transport.on('severe', function(message) {
	//Do something
});

log.transport.on('fatal', function(message) {
	//Do something
});

```

# Warning

The module is develop