/*
 *   Copyright (c) 2020 BitsAmericas S.A.S
 *   All rights reserved.
 */

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-phantomjs-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-junit-reporter'),
        ],
        client: {
            jasmine: {
                random: false
            },
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, './coverage/ba-conjuntos-residenciales'),
            reports: ['json'],// ['html', 'lcovonly', 'text-summary'],
            fixWebpackSourcePaths: true
        },
        reporters: ['progress', 'kjhtml', 'junit'],
        sonarqubeReporter: {
            basePath: 'src/app', // test files folder
            filePattern: '**/*spec.ts', // test files glob pattern
            encoding: 'utf-8', // test files encoding
            outputFolder: 'reports', // report destination
            legacyMode: false, // report for Sonarqube < 6.2 (disabled)
            reportName: (metadata) => { // report name callback
                /**
                 * Report metadata array:
                 * - metadata[0] = browser name
                 * - metadata[1] = browser version
                 * - metadata[2] = plataform name
                 * - metadata[3] = plataform version
                 */
                metadata[4] = 'project';
                return metadata.concat('xml').join('.');
            }
        },
        junitReporter: {
            outputDir: 'reports', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'project.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '', // suite will become the package name attribute in xml testsuite element
            useBrowserName: true, // add browser name to report and classes names
            nameFormatter: (browser, result) => {
                return result.suite.join(' ') + ' ' + result.description + 'yes'
            }, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
            properties: {} // key value pair of properties to add to the <properties> section of the report
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        browserDisconnectTimeout: 1000000,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 600000,
        flags: [
            '--disable-web-security',
            '--disable-gpu',
            '--no-sandbox'
        ],
        singleRun: true,
        restartOnFileChange: true,
        files: [
            "src/assets/js/libraries/retract.js"
        ]
    });
};
