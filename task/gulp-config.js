module.exports = function() {
    //Origin
    var origin = {
            client: './../client/',                //Public Folder
            dev: './../development/'       //Development Folder
        },
    //Temp
        temp = origin.dev + 'temp/',
    //File Names
        filenames = {
            server: '../server/server.js'
        };
    //Config
    var config = {
    //Outputs
        outputClient: {
            client: origin.client,
            css: origin.client + 'styles/',             //CSS Files
            js: origin.client + 'scripts/'              //JavaScript Files
        },
    //Paths
        pathsDev: {
            development: origin.dev,
            temp: {
                temp: temp,
                css: temp + 'css/'
            },
            server: filenames.server,
            js: origin.dev + 'js/**/*.js',            //JavaScript Development Files
            scss: origin.dev + 'scss/**/*.scss'       //SASS Files
        },
    //Browser support
        browsers : [
            '> 5%',
            'ie 6-8',
            'last 3 ie versions',
            'last 3 Chrome versions',
            'last 3 Opera versions',
            'last 3 Safari versions',
            'last 3 ff versions',
            'last 3 iOS versions',
            'last 3 ie_mob versions',
            'last 3 Edge versions'
        ]
    }
    return config;
};