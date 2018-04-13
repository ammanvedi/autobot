const gulp = require( 'gulp' );
const runSeq = require( 'run-sequence' );
const deployConfig = require( './deploy.config.js' );
const scp = require( 'gulp-scp2' );
const ssh = require( 'gulp-ssh' );
const open = require( 'gulp-open' );

gulp.task( 'vehicle-copy', () =>{
    return gulp.src( deployConfig.localSource )
        .pipe( scp( {
            host: deployConfig.host.ip,
            username: deployConfig.host.hostname,
            password: deployConfig.host.password,
            dest: deployConfig.remoteSource
        } ) );
} );



gulp.task( 'vehicle-open', () => {
    var options = {
      uri: 'chrome://inspect/#devices',
      app: '/Applications/Google\ Chrome.app'
    };
    gulp.src( './' )
      .pipe( open( options ) );
} )

gulp.task( 'vehicle-run', () => {
    var sshClient = new ssh({
      ignoreErrors: false,
      sshConfig: {
          host: deployConfig.host.ip,
          username: deployConfig.host.hostname,
          password: deployConfig.host.password
      }
    } )
    return sshClient
      .shell( [ `cd ${ deployConfig.remoteSource }`, ...deployConfig.runCommand ], { filePath: deployConfig.logName } )
      .pipe( gulp.dest( deployConfig.logDir ) );
} );

gulp.task( 'vehicle-default', () => {
    return runSeq( 'vehicle-copy', 'vehicle-open', 'vehicle-run' );
} );
