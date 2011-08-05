# About

JS XmlWriter is a very simple forward-only XML writer API modeled loosely after the 
XmlWriter class in the .NET framework. 

# Usage

Create an instance of the writer and call methods sequentially to write out text to 
the writer's internal xml string variable. This variable may be read in chunks as 
the document is written to provide a streaming document.

    var writer = new XmlWriter();
    writer.writeElement( 'test', {foo:'bar',foo2:'bar2'} );
    writer.writeElement( 'test2' );
    writer.writeElement( 'test3', {foo:'baz',foo2:'baz2'} );
    writer.writeElementClose( 'test3' );
    writer.writeElementClose( 'test2' );
    writer.writeElementClose( 'test' );

	console.log( writer.xml );

The code yeields the following document:

    <test foo="bar" foo2="bar2">
    	<test2>
    		<test3 foo="baz" foo2="baz2">
    		</test3>
    	</test2>
    </test>

Note that the writer is mostly a dumb writer, performing no namespace or encoding
checks. For example, to add a namespace to an element, use the attribute support
like the following:


    writer.writeElement( 'test', {foo:'bar','xmlns:ns1':'http://example.com#ns1'} );
	writer.writeContent( 'contents' );
    writer.writeElementClose( 'test' );

Which produces the following document:

    <test foo="bar" xmlns:ns1="http://example.com#ns1">
    	contents
    </test>

XmlWriter also supports writing the xml processing instruction preamble
as well as CData sections. See: 

    XmlWriter.writeProcessingInstruction
    XmlWriter.writeCData

# Status

This is experimental/demo code. If you need robust XML support, use XML DOM or
possibly libxml2 under node.js. This code was written in support of a 
Javascript XML serializer, so it implements just what I needed for that
project and no more.

# Future work

Refactor the attribute writing functionality to support fully streaming 
writes. Currently all attributes are written at once and may not be written
until all attributes are available.

Write as EventEmitter for node.js.

Create options for disabling/configuring output formatting and whitespace.

See TODO for more potential features.

# License

This code is copyright 2011 Dan Newcome, provided under the MIT open source
license. See LICENSE for details.
