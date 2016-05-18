# Gulp Workflow v0.1.0

[![Built with Gulp](https://raw.githubusercontent.com/cyparu/artwork/master/builtwith.png)](http://gulpjs.com/)

## About Gulp Workflow

Gulp Workflow is a framework for front-end development using the Gulp task manager. The goal is to speed up development and automate repetitive tasks.

## Using Gulp as a taskrunner

- Dependencies: node, sass, gulp, bower
- To install run npm install
- run bower install to use any bower dependencies (optional)
- Type gulp watch in your terminal to build the site and watch files

The directory structure is as follows:

- app/
- dist/

**app:** contains all the files for developing the app/website

**dist:** contains the output production files once ready for release

## Gulp Tasks

The following commands are currently used for this workflow.

**gulp** - default task creates files in the dist/ directory to mimick a production environment.

**gulp watch** - starts browser sync and is used for development

### Changelog

Releases follow [Semantic Versioning](http://semver.org) MMP (Major, Minor, Patch). Date is in YYYY-MM-DD format.

- 2016-03-30 : v0.1.0  : initial commit

