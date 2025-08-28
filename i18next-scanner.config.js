
const path = require('path');

module.exports = {
    input: ['src/app/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}', 'src/common/**/*.{ts,tsx}'],
    output: './',
    options: {
        func: {
            list: ['t'],
            extensions: ['.ts', '.tsx'],
        },

        lngs: ['en', 'de', 'es', 'fr'],
        defaultLng: 'en',
        defaultValue: '__STRING_NOT_TRANSLATED__',

        resource: {
            loadPath: path.resolve('./src/locales/{{lng}}/translation.json'),
            savePath: path.resolve('./src/locales/{{lng}}/translation.json'),
        },
    },

    customTransform: function customTransform(file, enc, done) {
        const parser = this.parser;
        const content = file.contents.toString('utf8');

        parser.parseFuncFromString(content, { list: ['t'] }, (key) => {
            parser.set(key, '__STRING_NOT_TRANSLATED__');
        });

        done();
    },

}


