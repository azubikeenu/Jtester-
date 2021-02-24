#!/usr/bin/env node

const { testFiles } = require( './runner' );
const runner = require( './runner' );


const collectFiles = async () => {
    await runner.collectFiles( process.cwd() );
    await runner.runTest()

}




collectFiles()