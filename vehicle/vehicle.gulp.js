const gulp = require( 'gulp' );
const runSeq = require( 'run-sequence' );
const deployConfig = require( 'deploy.config.json' );

gulp.task( 'copy', () =>{
    // scp here
} );

gulp.task( 'run', () => {
    // run code here & create a node debugger session if possible
} );

gulp.task( 'default', () => {
    return runSeq( 'copy', 'run' );
} );
