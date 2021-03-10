/*
 *   Copyright (c) 2020 BitsAmericas S.A.S
 *   All rights reserved.
 */

const createReporter = require('istanbul-api').createReporter;
const istanbulCoverage = require('istanbul-lib-coverage');
const coverageCommon = require('./coverage/ba-conjuntos-residenciales/coverage-final.json');


const map = istanbulCoverage.createCoverageMap();
Object.keys(coverageCommon).forEach(filename => {
    map.addFileCoverage(coverageCommon[filename])
});

const reporter = createReporter();
reporter.addAll(['html', 'lcovonly', 'cobertura']);
reporter.write(map);