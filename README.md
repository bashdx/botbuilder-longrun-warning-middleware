# botbuilder-timeoutwarning-middleware

## Purpose

This package provides a middleware for the Microsoft Botbuilder v4 JavaScript SDK.
The purpose of this middleware is to indicate long-running activities. The means of indication can be customized by the client application.

## Installation

- install by executing `npm install botbuilder-timeoutwarning-middleware` in your working directory.

## Usage

- import using `require` statement:

`const timeoutwarning = require('botbuilder-timeoutwarning-middleware');`

- call `bot.use()` and provide a _callback_ and (optionally) a time-out _threshold_ in milli-seconds:

`bot.use((context) => { //your callback goes here }, 10000);`

**HINT:** in order to have most accurate measuring, you should include this middleware first via `bot.use()` before any other middleware.

## Changelog

2018/02/22 v0.0.1

- Initial release

## Repo on github.com

[https://github.com/bashdx/botbuilder-longrun-warning-middleware](https://github.com/bashdx/botbuilder-longrun-warning-middleware)
