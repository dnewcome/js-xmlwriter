function XmlWriter() {
	this.depth = 0;
	this.xml = "";
}

/**
* Write an element
*/
XmlWriter.prototype.writeElement = function( name, attrs ) {
	this.xml += this.createIndent( this.depth ) + '<' + name;
	this.writeAttributes( attrs );
	this.xml += '>\n';
	this.depth++;
};
XmlWriter.prototype.writeElementClose = function( name ) {
	this.depth--;
	this.xml += this.createIndent( this.depth ) + '</' + name + '>\n';
};
XmlWriter.prototype.createIndent = function( num ) {
	num = num || this.depth;
	var retval = ''; 
	for( var i=0; i < num; i++ ) {
		// TODO: configurable indent char?
		retval += '\t';	
	}
	return retval;
}


/**
* Write attributes
*/
XmlWriter.prototype.writeAttribute = function( name, val ) {
	// always write whitespace preceding
	this.xml += ' ' + name + '="' + val + '"';
};
XmlWriter.prototype.writeAttributes = function( attrs ) {
	for( var attr in attrs ) {
		this.writeAttribute( attr, attrs[attr] );
	}
};


/**
* Write content 
*/
XmlWriter.prototype.writeContent= function( text ) {
	// TODO: handle escaping
	this.xml += this.createIndent() + text + '\n';
};

XmlWriter.prototype.writeCData = function( text ) {
	this.xml += this.createIndent() + 
		'<![CDATA[' + text + ']]>\n';
};

XmlWriter.prototype.writeProcessingInstruction = function() {
	this.xml += '<?xml version="1.0" encoding="utf-8"?>\n';
};

// todo: not sure if we really need to abstract whitespace
// currently not using this
XmlWriter.prototype.writeWhitespace = function() {
	this.xml += ' ';
};

