module.exports = {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'jest'
        },
        binary: {
            version: '4.0.3', //version of mongodb database
            skipMD5: true
        },
        autoStart: false
    }
}