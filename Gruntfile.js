module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            js: {
                files: [{
                    expand: true,
                    cwd: 'js/src/',  // Directorio base de los archivos fuente
                    src: ['**/*.js'],   // Patrón de archivos fuente
                    dest: 'js/min/', // Directorio de destino
                    ext: '.min.js',   // Extensión del archivo de destino
                }]
            }
        }
    })
}