var replace = require('replace-in-file');
var package = require("./package.json");
var buildVersion = package.version;
const options = {
    files: 'src/environments/environment.prod.ts',
    from: /appVersion: '(.*)'/g,
    to: "appVersion:'"+ buildVersion + "'",
    allowEmptyPaths: false,
};

try {
    let changedFiles = replace.sync(options);
    if (changedFiles == 0) {
        throw "Please make sure that file '" + options.files + "' has \"appVersion: ''\"";
    }
    console.log('Build appVersion set: ' + buildVersion);
}
catch (error) {
    console.error('Error occurred:', error);
    throw error
}