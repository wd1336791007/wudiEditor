(function(win){
    win.UE = UE = {};
    UE.Select = function(){};
    UE.getId = function(){
        return ('editor-'+Math.random()+new Date().getTime()).replace(/\./,'');
    };
    UE.getElement = function(selector,context){
        if(/\#/.test(selector)){
            return context.getElementById(selector.replace(/\#/,''));
        }else if(/\./.test(selector)){
            return document.getElementById(context).getElementsByClassName(selector.replace(/\./,''));
        }else{
            return document.getElementById(context).getElementsByTagName(selector);
        }
    };
    UE.createElement = function(element){
        return document.createElement(element);
    };
    UE.Editor = function(el){
        this.el = document.getElementById(el);
        this.id = UE.getId();
        this.init();
    };
    UE.Editor.prototype = {
        constructor:UE.Editor,
        init:function(){
            this.create();
            this.setFont();
            this.fontName();
            this.fontSize();
            this.setColor();
        },
        create:function(){
            var editorBox = UE.createElement('div');
            editorBox.className = 'editor-box';
            editorBox.id = this.id;
            this.el.parentNode.appendChild(editorBox);
            this.el.style.display = 'none';
            var editorTitle = UE.createElement('div');
            editorTitle.className = 'editor-title';
            editorBox.appendChild(editorTitle);
            editorBox.appendChild(this.createDialog());
            var titleJson = [{
                name:'editor-bold',
                title:'加粗',
                type:'Bold'
            },{
                name:'editor-italic',
                title:'斜体',
                type:'Italic'
            },{
                name:'editor-underline',
                title:'下划线',
                type:'Underline'
            },{
                name:'editor-strikethrough',
                title:'删除线',
                type:'StrikeThrough'
            },{
                name:'editor-superscript',
                title:'上标',
                type:'SuperScript'
            },{
                name:'editor-subscript',
                title:'下标',
                type:'SubScript'
            },{
                name:'editor-forecolor',
                title:'字体颜色',
                type:'ForeColor'
            },{
                name:'editor-backcolor',
                title:'背景颜色',
                type:'BackColor'
            },{
                name:'editor-removeformat',
                title:'清除格式',
                type:'RemoveFormat'
            }/*,{
                name:'editor-default',
                title:'首行缩进',
                type:'Indent'
            }*/,{
                name:'editor-justifyleft',
                title:'左对齐',
                type:'JustifyLeft'
            },{
                name:'editor-justifycenter',
                title:'居中',
                type:'JustifyCenter'
            },{
                name:'editor-justifyright',
                title:'右对齐',
                type:'JustifyRight'
            },{
                name:'editor-addLink',
                title:'超链接',
                type:'CreateLink'
            },{
                name:'editor-deletLink',
                title:'取消链接',
                type:'Unlink'
            }];
            for(var i= 0,len=titleJson.length;i<len;i++){
                var titleParents = UE.createElement('div');
                titleParents.className = 'parent-box';
                var titleList = UE.createElement('input');
                titleList.type = 'button';
                titleList.className = 'editor-btn editor-icons '+titleJson[i].name+'';
                titleList.setAttribute('title',titleJson[i].title);
                titleList.setAttribute('data-type',titleJson[i].type);
                titleParents.appendChild(titleList);
                editorTitle.appendChild(titleParents);
            }
            var titleSelect = {
                fontName:['sans-serif','宋体','微软雅黑','楷体','黑体'],
                fontSize:['12','14','16','18','20','22','24','26','28','30','32','34']
            };
            for(var i=0;i<2;i++){
                var editorSelectBox = UE.createElement('div');
                editorSelectBox.className = 'editor-select-box';
                var editorSelect = UE.createElement('select');
                editorSelect.className = 'editor-select';
                editorSelectBox.appendChild(editorSelect);
                editorTitle.appendChild(editorSelectBox);
            }
            var select = UE.getElement('.editor-select',this.id);
            var name=titleSelect.fontName,size=titleSelect.fontSize;
            for(var i=0,len=name.length;i<len;i++){
                var selectName = UE.createElement('option');
                selectName.value = name[i];
                selectName.innerHTML = name[i];
                select[0].appendChild(selectName);
            }
            for(var i=0,len=size.length;i<len;i++){
                var selectSize = UE.createElement('option');
                selectSize.value = size[i]+'px';
                selectSize.innerHTML = size[i];
                select[1].appendChild(selectSize);
            }
            editorBox.appendChild(this.createContent());
            var foreColor = UE.getElement('.editor-forecolor',this.id)[0].parentNode;
            var backColor = UE.getElement('.editor-backcolor',this.id)[0].parentNode;
            foreColor.appendChild(this.createColor(this.fontColor()));
            backColor.appendChild(this.createColor(this.bgColor()));
            var editorBody = UE.getElement('.editor-body',this.id)[0];
            editorBody.style.height = '245px';
        },
        createContent:function(){
            var editorContent = UE.createElement('div');
            editorContent.className = 'editor-content';
            var editorBody = UE.createElement('div');
            editorBody.className = 'editor-body';
            editorBody.setAttribute('contenteditable',true);
            editorContent.appendChild(editorBody);
            return editorContent;
        },
        createDialog:function(){
            var dialogBox = UE.createElement('div');
            dialogBox.className = 'editor-link';
            var html = '';
            html += '<span>请输入链接：</span>';
            html += '<input type="text" class="editor-link-text" placeholder="请输入链接">';
            html += '<span>请输入标题：</span>';
            html += '<input type="text" class="editor-link-text" placeholder="请输入标题">';
            html += '<div class="editor-link-btn">';
            html += '<input type="button" class="btn2" value="取消"/><input type="button" class="btn1" value="确定"/>';
            html += '</div>';
            dialogBox.innerHTML = html;
            return dialogBox;
        },
        createColor:function(color){
            var colorBox = UE.createElement('div');
            colorBox.className = 'fontColor';
            for(var i=0;i<color.length;i++){
                colorBox.innerHTML += '<input class="setColor" data-type="'+color[i].type+'" type="button" style="background:'+color[i].color+'" data-color="'+color[i].color+'" title="'+color[i].title+'">'
            }
            return colorBox;
        },
        fontColor:function(){
            return fontColorJson = [{
                type:'ForeColor',
                color:'#f00',
                title:'红色'
            },{
                type:'ForeColor',
                color:'#000',
                title:'黑色'
            },{
                type:'ForeColor',
                color:'#999',
                title:'灰色'
            }];
        },
        bgColor:function(){
            return bgColor = [{
                type:'BackColor',
                color:'#f00',
                title:'红色'
            },{
                type:'BackColor',
                color:'#000',
                title:'黑色'
            },{
                type:'BackColor',
                color:'#999',
                title:'灰色'
            }];
        },
        setFont:function(){
            var _this = this;
            var Element = UE.getElement('.editor-btn',this.id);
            for(var i=0,len=Element.length;i<len;i++){
                Element[i].onclick = (function(k){
                    return function(){
                        var dataType = Element[k].getAttribute('data-type');
                        var type,bool=false,value;
                        switch (dataType){
                            case 'ForeColor':
                                break;
                            case 'BackColor':
                                break;
                            case 'CreateLink':
                                _this.showLink('CreateLink',false,'testLink');
                                break;
                            case 'Unlink':
                                document.execCommand('Unlink',false,false);
                                break;
                            default:
                                type=dataType;
                                document.execCommand(type,bool,value);
                                break;
                        }
                    }
                })(i);
            }
        },
        setColor:function(){
            var colorBtn = UE.getElement('.setColor',this.id);
            for(var i=0,len=colorBtn.length;i<len;i++){
                colorBtn[i].onclick = (function(k){
                    return function(){
                        var type = colorBtn[k].getAttribute('data-type');
                        var color = colorBtn[k].getAttribute('data-color');
                        switch (type){
                            case 'BackColor':
                                document.execCommand('BackColor',false,color);
                                break;
                            case 'ForeColor':
                                document.execCommand('ForeColor',false,color);
                                break;
                            default:
                                break;
                        }
                    }
                })(i);
            }
        },
        showLink:function(type,bool,value){
            var linkBox = UE.getElement('.editor-link',this.id)[0];
            linkBox.style.cssText = 'opacity:1;filter:alpha(opacity=100);z-index:999;';
            document.execCommand(type,bool,value);
            this.createLink(type,bool,value);
            this.cancel();
        },
        hideLink:function(){
            var linkBox = UE.getElement('.editor-link',this.id)[0];
            linkBox.style.cssText = 'opacity:0;filter:alpha(opacity=0);z-index:-2;';
            var link = UE.getElement('.editor-link-text',this.id)[0];
            var title = UE.getElement('.editor-link-text',this.id)[1];
            link.value = '';title.value = '';
            document.execCommand('undo',false,false);
        },
        createLink:function(){
            var btn1=UE.getElement('.btn1',this.id)[0],_this=this;
            btn1.onclick = function(){
                var link = UE.getElement('.editor-link-text',_this.id)[0];
                var title = UE.getElement('.editor-link-text',_this.id)[1];
                if(link.value==='') return alert('输入链接哦');
                if(title.value==='') return alert('输入标题哦');
                var nodeName = UE.getElement('a',_this.id);
                for(var i=0,len=nodeName.length;i<len;i++){
                    if(nodeName[i].getAttribute('href')==='testLink'){
                        nodeName[i].setAttribute('href',link.value);
                        nodeName[i].setAttribute('title',title.value);
                        nodeName[i].setAttribute('target','_blank');
                    }
                }
                _this.hideLink();
            }
        },
        cancel:function(){
            var btn2=UE.getElement('.btn2',this.id)[0],_this=this;
            btn2.onclick = function(){
                _this.hideLink();
            };
        },
        fontName:function(){
            var name = UE.getElement('.editor-select',this.id)[0];
            name.onchange = function(){
                var val = this.value;
                document.execCommand('FontName',false,val);
            }
        },
        fontSize:function(){
            var size=UE.getElement('.editor-select',this.id)[1],_this=this;
            size.onchange = function(){
                var val = this.value;
                document.execCommand('fontSize',false,val);
                var font = UE.getElement('font',_this.id);
                var selectedRange = _this.saveSelection();  // 保存获取到的Range对象
                var nodeType = selectedRange.commonAncestorContainer.nodeType;
                var element = selectedRange.commonAncestorContainer.parentNode;
                if(nodeType===3){
                    element.removeAttribute('size');
                    element.style.fontSize = val;
                }
            };
        },
        config:function(Json){
            var width = Json.width<520?520:Json.width,
                height = Json.height<245?245:Json.height||245,
                fontSize = Json.fontSize,
                fontFamily = Json.fontFamily,
                fontBold = Json.fontBold?'fontBold':null,
                fontItalic = Json.fontItalic?'fontItalic':null,
                innerHTML = Json.innerHTML||'';
            var editorBody = UE.getElement('.editor-body',this.id)[0];
            var editor = UE.getElement('#'+this.id,document);
            editor.style.cssText = 'width:'+width+'px;';
            editorBody.style.cssText = 'height:'+height+'px;';
            if(innerHTML) editorBody.innerHTML = innerHTML;
            if(fontBold) editorBody.style.cssText += 'font-weight:bold';
            if(fontItalic) editorBody.style.cssText += 'font-style:italic';
/*            document.execCommand(fontBold,false,null);
            document.execCommand(fontItalic,false,null);
            document.execCommand('FontName',false,fontFamily);
            document.execCommand('fontSize',false,4);
            var font = UE.getElement('font',this.id);*/
        },
        saveSelection:function(){
            if(window.getSelection){
                var sel = window.getSelection();
                if(sel.rangeCount > 0){
                    return sel.getRangeAt(0);
                }
            }else if(document.selection){
                return document.selection.createRange();
            }
            return null;
        },
        getContent:function(){
            var content = UE.getElement('.editor-body',this.id)[0];
            return content.innerHTML;
        },
        getContentTxt:function(){
            var content = UE.getElement('.editor-body',this.id)[0];
            return content.innerText;
        }
    };
})(window);