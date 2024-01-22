module.exports = {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'jest'
        },
        binary: {
            version: '4.0.3', //version of mongodb
            skipMD5: true
        },
        autoStart: false
    }
}