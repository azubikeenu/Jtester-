const fs = require( 'fs' );
const path = require( 'path' );
const { lstat } = fs.promises;
const chalk = require( "chalk" );

const forbiddenDirs = ['node_modules'];
class Runner {

    constructor() {
        this.testFiles = []
    }

    async collectFiles ( targetPath ) {

        const files = await fs.promises.readdir( targetPath );

        for ( let file of files ) {
            const filePath = path.join( targetPath, file );
            const stats = await lstat( filePath );
            if ( stats.isFile() && file.includes( ".test.js" ) ) {
                this.testFiles.push( { name: filePath, shortName: file } );
            } else if ( stats.isDirectory() && !forbiddenDirs.includes( file ) ) {
                const childFiles = await fs.promises.readdir( filePath );

                files.push( ...childFiles.map( f => path.join( file, f ) ) );
            }

        }



    }


    async runTest () {
        for ( const file of this.testFiles ) {
            console.log( chalk.grey( `testing ${file.shortName}` ) )

            const beforeEaches = [];

            global.beforeEach = ( fn ) => {
                beforeEaches.push( fn )
            }

            global.it = ( desc, fn ) => {
                beforeEaches.forEach( fn => fn() );
                try {
                    fn();

                    console.log( chalk.green( `\tOK ------ > ${desc}` ) )
                } catch ( err ) {

                    const message = err.message.replace( /\n/g, '\n\t\t' )
                    console.log( chalk.red( `\tXXX - ${desc}` ) );
                    console.log( chalk.red( '\t', message ) );
                }


            }

            try {

                require( file.name );

            } catch ( err ) {
                console.log( chalk.red( err ) );
            }


        }


    }






}



module.exports = new Runner();