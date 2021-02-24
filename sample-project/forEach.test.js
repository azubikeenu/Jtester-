const { forEach } = require( "./index" );
const assert = require( 'assert' );

let numbers;
beforeEach( () => {

    numbers = [1, 2, 3];

} )

it( "sum of the numbers should be 6 ", () => {

    let sum = 0;

    forEach( numbers, ( el ) => {
        sum += el;

    } )

    assert.strictEqual( sum, 6 );
    numbers.push( 1 );
    numbers.push( 1 );
    numbers.push( 1 );
    numbers.push( 1 );

} )


it( "Length of the array should be 3", () => {

    assert.strictEqual( numbers.length, 4 )
        ;
} )
