var HelloWorld = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
  },

  _getStream: function(file_name) {
    Components.utils.import("resource://gre/modules/FileUtils.jsm");  
  
    // get the "data.txt" file in the profile directory  
    var file = FileUtils.getFile("ProfD", [file_name]);

    if (!file.exists()) {
      file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 0666);
    }

    var ostream = FileUtils.openFileOutputStream(file,
                                                 FileUtils.MODE_WRONLY |
                                                 FileUtils.MODE_CREATE |
                                                 FileUtils.MODE_APPEND);

    return ostream;
  },

  _textToStream: function(text) {
    var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].  
                    createInstance(Components.interfaces.nsIScriptableUnicodeConverter);  
    converter.charset = "UTF-8";  

    var istream = converter.convertToInputStream(text);
    return istream;
  },

  onItem1Command: function() {
    var text = content.getSelection().toString();
    text = JSON.stringify(text);
    var url = window.top.getBrowser().selectedBrowser.contentWindow.location.href;

    var ostream = HelloWorld._getStream("tags.txt");
    var istream = HelloWorld._textToStream(url + " " + text + "\n");

    NetUtil.asyncCopy(istream, ostream);
  },

};

window.addEventListener("load", function(e) { HelloWorld.onLoad(e); }, false); 
