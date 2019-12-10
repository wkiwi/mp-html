/* Parser 富文本插件 https://github.com/jin-yufeng/Parser */
"use strict";function _classCallCheck(t,s){if(!(t instanceof s))throw new TypeError("Cannot call a class as a function")}function isBlankChar(t){return" "==t||"\t"==t||"\r"==t||"\n"==t||"\v"==t||"\f"==t}var _createClass=function(){function t(t,s){for(var i=0;i<s.length;i++){var e=s[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(s,i,e){return i&&t(s.prototype,i),e&&t(s,e),s}}(),config=require("./config.js"),CssHandler=function(){function t(s){_classCallCheck(this,t),this.parseCss=function(t){return new CssParser(t,{},!0).parse()},this.styles=s}return _createClass(t,[{key:"getStyle",value:function(t){var s="";return t=t.replace(/<style[\s\S]*?>([\s\S]*?)<\/style[\s\S]*?>/g,function(){return s+=arguments[1],""}),this.styles=new CssParser(s,this.styles).parse(),t}},{key:"match",value:function(t,s){var i=(this.styles[t]||"")+";";if(s.class)for(var e=s.class.split(" "),a=0;a<e.length;a++)i+=(this.styles["."+e[a]]||"")+";";return s.id&&(i+=(this.styles["#"+s.id]||"")+";"),";"==i?"":i}}]),t}();module.exports=CssHandler;var CssParser=function(){function t(s){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=arguments[2];_classCallCheck(this,t),this.data=s,this.res=e?i:this.merge(i),this._floor=0,this._i=0,this._list=[],this._comma=!1,this._sectionStart=0,this._stateHandler=this.SpaceHandler}return _createClass(t,[{key:"merge",value:function(t){var s=JSON.parse(JSON.stringify(config.userAgentStyles));for(var i in t)s[i]=(s[i]||"")+t[i];return s}},{key:"parse",value:function(){for(;this._i<this.data.length;this._i++)this._stateHandler(this.data[this._i]);return this.res}},{key:"SpaceHandler",value:function(t){"."==t||"#"==t||t>="a"&&t<="z"||t>="A"&&t<="Z"?(this._sectionStart=this._i,this._stateHandler=this.StyleNameHandler):"/"==t&&"*"==this.data[this._i+1]?this.CommentHandler():isBlankChar(t)||";"==t||(this._stateHandler=this.IgnoreHandler)}},{key:"CommentHandler",value:function(){this._i=this.data.indexOf("*/",this._i),-1==this._i&&(this._i=this.data.length),this._i++,this._stateHandler=this.SpaceHandler}},{key:"IgnoreHandler",value:function(t){"{"==t?this._floor++:"}"==t&&--this._floor<=0&&(this._list=[],this._stateHandler=this.SpaceHandler)}},{key:"StyleNameHandler",value:function(t){isBlankChar(t)?(this._list.push(this.data.substring(this._sectionStart,this._i)),this._stateHandler=this.NameSpaceHandler):"{"==t?(this._list.push(this.data.substring(this._sectionStart,this._i)),this._floor=1,this._sectionStart=this._i+1,this.ContentHandler()):","==t?(this._list.push(this.data.substring(this._sectionStart,this._i)),this._sectionStart=this._i+1,this._comma=!0):t>="a"&&t<="z"||t>="A"&&t<="Z"||t>="0"&&t<="9"||"."==t||"#"==t||"-"==t||"_"==t||(this._stateHandler=this.IgnoreHandler)}},{key:"NameSpaceHandler",value:function(t){"{"==t?(this._floor=1,this._sectionStart=this._i+1,this.ContentHandler()):","==t?(this._comma=!0,this._sectionStart=this._i+1,this._stateHandler=this.StyleNameHandler):isBlankChar(t)||(this._comma?(this._stateHandler=this.StyleNameHandler,this._sectionStart=this._i,this._i--,this._comma=!1):this._stateHandler=this.IgnoreHandler)}},{key:"ContentHandler",value:function(){this._i=this.data.indexOf("}",this._i),-1==this._i&&(this._i=this.data.length);for(var t,s=!1,i=this.data.substring(this._sectionStart,this._i),e=0;e<i.length;e++)isBlankChar(i[e])?s||(t=e,s=!0):s&&(0==t?i=i.substring(e):e-t>1&&(i=i.substring(0,t)+" "+i.substring(e)),e=t,s=!1);s&&(i=i.substring(0,t));for(var e=0;e<this._list.length;e++)this.res[this._list[e]]=(this.res[this._list[e]]||"")+i;this._list=[],this._stateHandler=this.SpaceHandler}}]),t}();