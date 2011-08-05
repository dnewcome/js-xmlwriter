test("test write attribute", function() {
	var writer = new XmlWriter();
	writer.writeElement( 'test', {foo:'bar',foo2:'bar2'} );
	writer.writeElement( 'test2' );
	writer.writeElement( 'test3', {foo:'bar',foo2:'bar2'} );
	writer.writeElementClose( 'test3' );
	writer.writeElementClose( 'test2' );
	writer.writeElementClose( 'test' );

	console.log( writer.xml );

	var expected = 
	'<test foo="bar" foo2="bar2">\n' +
	'	<test2>\n' +
	'		<test3 foo="bar" foo2="bar2">\n' +
	'		</test3>\n' +
	'	</test2>\n' +
	'</test>\n'

	ok( expected == writer.xml, "xml output as expected" );
});

test("test write content", function() {
	var writer = new XmlWriter();
	writer.writeElement( 'test' );
	writer.writeContent( 'element contents' );
	writer.writeElementClose( 'test' );

	console.log( writer.xml );

	var expected = 
	'<test>\n' +
	'	element contents\n' +
	'</test>\n'

	ok( expected == writer.xml, "xml output as expected" );
});

test("test write cdata", function() {
	var writer = new XmlWriter();
	writer.writeElement( 'test' );
	writer.writeCData( 'cdata contents' );
	writer.writeElementClose( 'test' );

	console.log( writer.xml );

	var expected = 
	'<test>\n' +
	'	<![CDATA[cdata contents]]>\n' +
	'</test>\n'

	ok( expected == writer.xml, "xml output as expected" );
});

test("test write namespace", function() {
	var writer = new XmlWriter();
	writer.writeElement( 'test', {foo:'bar','xmlns:ns1':'http://example.com#ns1'} );
	writer.writeElementClose( 'test' );

	console.log( writer.xml );

	var expected = 
	'<test foo="bar" xmlns:ns1="http://example.com#ns1">\n' +
	'</test>\n'

	ok( expected == writer.xml, "xml output as expected" );
});

test("test write processing instruction", function() {
	var writer = new XmlWriter();
	writer.writeProcessingInstruction();
	writer.writeElement( 'test' );
	writer.writeElementClose( 'test' );

	console.log( writer.xml );

	var expected = 
	'<?xml version="1.0" encoding="utf-8"?>\n' +
	'<test>\n' +
	'</test>\n'

	ok( expected == writer.xml, "xml output as expected" );
});
