/**
 * We set the buffer size artificially small in order to force multiple
 * data events to be emitted. Since the buffer is so small it will
 * cause an event when every closing tag is written and we don't rely
 * on end-of-document (depth == 0) checking.
 */
test("test write elements and attributes using emitter", function() {
	var writer = new XmlWriter();
	writer.useEmitter = true;
	writer.chunksize = 2;
	var output = "";
	var chars = [];
	writer.on( 'data', function( data ) { 
		console.log( 'emitted chars: ' + data.length );
		chars.push( data.length );
		output += data; 
	});
	writer.writeElement( 'test', {foo:'bar',foo2:'bar2'} );
	writer.writeElement( 'test2' );
	writer.writeElement( 'test3', {foo:'bar',foo2:'bar2'} );
	writer.writeElementClose( 'test3' );
	writer.writeElementClose( 'test2' );
	writer.writeElementClose( 'test' );

	console.log( output );

	var expected = 
	'<test foo="bar" foo2="bar2">\n' +
	'	<test2>\n' +
	'		<test3 foo="bar" foo2="bar2">\n' +
	'		</test3>\n' +
	'	</test2>\n' +
	'</test>\n'

	ok( expected == output, "xml output as expected" );
	deepEqual( chars, [81,10,8], "emitted character count as expected" );
});

/**
 * In this test the chunk size is left to the default of 1k chars. The test
 * xml document is much smaller, so it relies on the checks for the end of
 * the document in order to emit the data event at the end.
 */
test("test write elements and attributes using emitter - default chunk size", function() {
	var writer = new XmlWriter();
	writer.useEmitter = true;
	var output = "";
	var chars = [];
	writer.on( 'data', function( data ) { 
		console.log( 'emitted chars: ' + data.length );
		chars.push( data.length );
		output += data; 
	});
	writer.writeElement( 'test', {foo:'bar',foo2:'bar2'} );
	writer.writeElement( 'test2' );
	writer.writeElement( 'test3', {foo:'bar',foo2:'bar2'} );
	writer.writeElementClose( 'test3' );
	writer.writeElementClose( 'test2' );
	writer.writeElementClose( 'test' );

	console.log( output );

	var expected = 
	'<test foo="bar" foo2="bar2">\n' +
	'	<test2>\n' +
	'		<test3 foo="bar" foo2="bar2">\n' +
	'		</test3>\n' +
	'	</test2>\n' +
	'</test>\n'

	ok( expected == output, "xml output as expected" );
	deepEqual( chars, [99], "emitted character count as expected" );
});

