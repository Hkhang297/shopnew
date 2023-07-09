CKEDITOR.editorConfig = function( config ) {
    config.language = 'en'
	config.skin = 'moono-dark';
	config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		'/',
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];

	config.removeButtons = 'Source,NewPage,ExportPdf,Preview,Print,Save,Templates,Cut,Paste,PasteFromWord,PasteText,Undo,Copy,Redo,Replace,SelectAll,Find,Scayt,Form,Checkbox,TextField,Radio,Textarea,Select,ImageButton,Button,HiddenField,Blockquote,RemoveFormat,CopyFormatting,SpecialChar,Table,Image,HorizontalRule,PageBreak,Iframe,About,Maximize,ShowBlocks,Link,Unlink,Anchor,BidiLtr,BidiRtl,Language';
};