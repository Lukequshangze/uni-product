module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        proxy: {
            '/app/api/main/init': {    //1
                target: 'http://123.60.213.208:31009',    //2
                changOrigin: true,
                pathRewrite: {    //3
                    '^/abc': ''
                }
            }
        }
    }
}