import React, {
    useState,
    useEffect,
    useCallback,
    Component
} from 'react';
import {
    Dropdown,
    Select
} from "flowbite-react";
import FontPicker from 'font-picker-react';
import {
    ArrowUpIcon,
    ArrowDownIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    PlusIcon,
    MinusIcon,
} from '@heroicons/react/20/solid';
import {
    fabric
} from 'fabric';
import $ from 'jquery';
export const SERVER_PHP_URL = 'https://diybuilder.in/ReactWhitephps/';

var FontFaceObserver = require('fontfaceobserver');
var WebFont = require('webfontloader');

class App extends React.Component {

    canvas = null;
    canvaswidth = 600;
    canvasheight = 600;
    jsonCanvasArray = [];
    loadedtemplateid = '';
    state = {
        canvaspages: [],
        opacityval: '20',
        strokeval: '1',
        displaybgColorPicker: false,
        subtarget: null,
        templateImages: [],
        activeFontFamily: "Open Sans",
        strokecolor: '#883636',
        background: '#883636',
        fontbackground: '#883636',
    };

    constructor(props, context) {
        super(props);
    }

    updateState(e) {
        var stateoptions = {};
        if (e) {
            if (e.target.type == "group") {
                console.log("group");
            } else {
                stateoptions = {
                    fontBoldValue: e.target.fontWeight,
                    fontItalicValue: e.target.fontStyle,
                    fontUnderlineValue: e.target.underline
                }
            }
        }
    }

    componentDidMount() {
        var self = this;
        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.cornerColor = 'rgba(0,153,255,1)';
        fabric.Object.prototype.borderColor = 'rgba(0,153,255,1)';
        fabric.Object.prototype.cornerSize = 10;
        fabric.Object.prototype.cornerStyle = 'circle';
        self.canvas = new fabric.Canvas('canvas0', {
            preserveObjectStacking: true,
            width: self.canvaswidth,
            height: self.canvasheight,
        });
        self.canvas.canvasid = 0;
        self.canvas.state = [];
        self.canvas.index = 0;
        self.canvas.stateaction = true;
        self.initCanvasEvents();
        self.canvas.backgroundColor = 'white';
        self.setState({
            displaybgColorPicker: false
        });
        self.getTemplates();
    }

    getTemplates = () => {
        fetch(SERVER_PHP_URL + "displayTemplates.php")
            .then(res => res.json())
            .then(data => {
                this.loadTemplate(data[0].id, data[0].template_json);
                this.setState({
                    templates: data
                }, () => {});
                this.setState({
                    templateImages: data
                }, () => {});
            })
            .catch(err => {
                console.log('Error!', err);
            });
    }

    loadTemplate = (templateid: number, jsons: any) => {
        var self = this;
        var filePath = '';
        self.loadedtemplateid = "";
        self.loadedtemplateid = templateid;

        if (self.loadedtemplateid == "") {
            $(".buttonsave").css("display", "block");
            $(".buttonupdate").css("display", "none");
        }
        if (self.loadedtemplateid != "") {
            $(".buttonsave").css("display", "none");
            $(".buttonupdate").css("display", "block");
        }

        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                var jsondata = request.response;
                var ffs = self.getFFs(JSON.parse(jsondata), 'fontFamily');
                ffs = self.removeDuplicates(ffs);
                if (ffs.length === 0) {
                    self.openTemplate(templateid, jsondata);
                } else {
                    WebFont.load({
                        google: {
                            families: ffs
                        },
                        active: function() {
                            self.openTemplate(templateid, jsondata);
                        }
                    });
                }
            }
        }

        filePath = SERVER_PHP_URL + 'getTemplate.php';
        request.open('GET', filePath + "?path=" + jsons);
        request.send();
    }

    openTemplate = (templateid, json) => {
        var canvas = this.canvas;
        var json = JSON.parse(json);
        var jsonContent = json[1];
        if (jsonContent) {
            canvas.loadFromJSON(jsonContent, canvas.renderAll.bind(canvas), function(o, object) {});
            canvas.setZoom(0.75);
            canvas.renderAll();
        }
    }


    getFFs(obj, key) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(this.getFFs(obj[i], key));
            } else if (i === key) {
                objects.push(obj[i]);
            }
        }
        return objects;
    }

    removeDuplicates(arr) {
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            obj[arr[i]] = true;
        }
        arr = [];
        for (var key in obj) {
            arr.push(key);
        }
        return arr;
    }

    initCanvasEvents() {

        $(".main-area").mousedown(function(e) {
            e.stopImmediatePropagation();
        });

        this.canvas.on({

            'mouse:down': (e) => {

                if (e.subTargets && e.subTargets[0]) {
                    this.setState({
                        subtarget: e.subTargets[0]
                    })
                }

                if (e.subTargets) {
                    this.selectObject(this.canvas, e.subTargets[0]);
                } else
                    this.selectObject(this.canvas);

            },
            'object:moving': (e) => {},
            'object:added': (e) => {},
            'object:modified': (e) => {},
            'object:selected': (e) => {},
            'object:scaling': (e) => {},
            'selection:created': (e) => {},
            'selection:updated': () => {},
            'selection:cleared': () => {},
            'selection:added': (e) => {},
        });
    }

    selectObject = (canvas, activeObject) => {

        //console.log(canvas);

        $(".background").val(canvas.fill);

        if (canvas) {

            if (!activeObject)
                activeObject = canvas.getActiveObject();


            if (!activeObject) {
                return false;
            }

            canvas.selectedObject = activeObject;

            if (activeObject.type == 'activeSelection') {}

            /*console.log(activeObject.type);
            console.log(activeObject.fontSize);
            console.log(activeObject.fill);
            console.log(activeObject.fontFamily);
            console.log(activeObject.opacity);
            console.log(activeObject.stroke);
            console.log(activeObject.strokeWidth);
            console.log(activeObject.strokeWidth);*/

            this.setState({
                opacityval: activeObject.fontSize
            });
            this.setState({
                activeFontFamily: activeObject.fontFamily
            });

            $(".fontbackground").val(activeObject.fill);

            this.setState({
                fontbackground: activeObject.fill
            });

            $(".strokecolor").val(activeObject.stroke);

            this.setState({
                strokeval: activeObject.strokeWidth
            });

            if (activeObject.type === 'path') {

                var colorarray = [];
                var colorString = activeObject.fill;

                if (colorString && (typeof colorString === 'string')) {

                    var rgb = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/);

                    if (rgb && rgb != "") {

                        var red = parseInt(rgb[0]);

                        var green = parseInt(rgb[1]);

                        var blue = parseInt(rgb[2]);

                        var hexCode = this.rgbToHex(red, green, blue);

                        activeObject.fill = hexCode;

                        colorarray.push(hexCode);

                    } else

                        colorarray.push(activeObject.fill);

                }

                $("#colorSelector").hide();

                var colorpickerhtml = "";

                for (var i = 0; i < colorarray.length; i++) {
                    colorpickerhtml += "<input type='color' class='dynamiccolorpicker' data-initvalue='" + colorarray[i] + "' value='" + colorarray[i] + "' />";
                }

                $("#dynamiccolorpickers").html(colorpickerhtml);

                $(".dynamiccolorpicker").on("input", function() {
                    var newcolorVal = $(this).val();
                    var objinitcolor = $(this).data("initvalue");

                    if (activeObject.fill && objinitcolor.toLowerCase() == activeObject.fill.toString().toLowerCase()) {
                        var option = {};
                        option['fill'] = newcolorVal;
                        activeObject.set(option);
                        $(this).data("initvalue", newcolorVal);
                    }
                    canvas.renderAll();
                });
            }

            if (activeObject.type === 'group') {

                var colorarray = [];

                var objects = activeObject.getObjects();

                for (var i = 0; i < objects.length; i++) {

                    var colorString = objects[i].fill;

                    if (colorString && (typeof colorString === 'string')) {

                        var rgb = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/);

                        if (rgb && rgb != "") {

                            var red = parseInt(rgb[0]);

                            var green = parseInt(rgb[1]);

                            var blue = parseInt(rgb[2]);

                            var hexCode = this.rgbToHex(red, green, blue);

                            objects[i].fill = hexCode;

                            colorarray.push(hexCode);

                        } else

                            colorarray.push(objects[i].fill);

                    }

                }

                colorarray = colorarray.filter(this.onlyUnique);

                $("#colorSelector").hide();

                if (colorarray.length <= 20) {

                    var colorpickerhtml = "";

                    for (var i = 0; i < colorarray.length; i++) {
                        colorpickerhtml += "<input type='color' class='dynamiccolorpicker' data-initvalue='" + colorarray[i] + "' value='" + colorarray[i] + "' />";
                    }

                    $("#dynamiccolorpickers").html(colorpickerhtml);

                    $(".dynamiccolorpicker").on("input", function() {
                        var newcolorVal = $(this).val();
                        var objinitcolor = $(this).data("initvalue");

                        var objects = activeObject.getObjects();

                        for (var i = 0; i < objects.length; i++) {

                            if (objects[i].fill && objinitcolor.toLowerCase() == objects[i].fill.toString().toLowerCase()) {
                                var option = {};
                                option['fill'] = newcolorVal;
                                objects[i].set(option);
                                $(this).data("initvalue", newcolorVal);
                            }
                        }
                        canvas.renderAll();
                    });

                } else {
                    alert("Info: SVG has more than 20 different colors.")
                    $("#dynamiccolorpickers").html("");
                }

                activeObject.subTargetCheck = true;

            }

            canvas.setActiveObject(activeObject);
            canvas.renderAll();
        }

    }

    rgbToHex = (r, g, b) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    setFontColor = (event) => {
        this.changeObjectproperty('fill', event.target.value);
    }

    setStroke = (event) => {
        this.changeObjectproperty('stroke', event.target.value);
    };

    setFontFamily = (fontfamily) => {
        var self = this;
        var observers = [];
        var myfont = new FontFaceObserver(fontfamily);
        myfont.load().then(function() {
            self.setActiveStyle('fontFamily', fontfamily);
        }).catch(function(e) {
            console.log(e);
        });
        self.setState({
            activeFontFamily: fontfamily
        })
    }

    setBGColor = (color) => {
        var lthis = this;
        var canvas = lthis.canvas;
        canvas.backgroundColor = '';
        canvas.bgcolor = '';
        canvas.bgcolor = event.target.value;
        canvas.backgroundColor = event.target.value;
        canvas.renderAll();
    }

    resetBGColor = (color) => {
        var lthis = this;
        var canvas = lthis.canvas;
        canvas.backgroundColor = '';
        canvas.bgcolor = '';
        canvas.renderAll();
    }

    downloadSVG = () => {
        var lthis = this;
        var currentTime = new Date();
        var currentTime = new Date();
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        var origfileName = month + '' + day + '' + year + '' + hours + '' + minutes + '' + seconds;
        var fileName = '';


        /* let svgfontlist = JSON.parse(( < any > data)._body);
         var svgfontArr = [];
         $.each(svgfontlist, function(i, font) {
             svgfontArr[font.name] = "https://strapi.graphicsfactory.com" + font.fonts.url;
         });
         fabric.fontPaths = svgfontArr; */

        /*

        var observers = [];

        Object.keys(exampleFontData).forEach(function(family) {
          var data = exampleFontData[family];
          var obs = new FontFaceObserver(family, data);
          observers.push(obs.load());
        });

        console.log(observers);*/

        var svgfontArr = [];

        $('.font-list-item').each(function() {

            svgfontArr[$(this).text()] = "https://fonts.googleapis.com/css2?family=" + $(this).text();

            console.log($(this).text());

            console.log("https://fonts.googleapis.com/css2?family=" + $(this).text());

        });

        fabric.fontPaths = svgfontArr; 
        
        
        let canvasDataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(lthis.canvas.toSVG()),
            link = document.createElement('a');
        fileName = origfileName + ".svg";

        link.setAttribute('href', canvasDataUrl);
        link.setAttribute('target', '_blank');
        link.setAttribute('download', fileName);
        $(".se-pre-con").fadeOut("slow");
        if (document.createEvent) {
            var evtObj = document.createEvent('MouseEvents');
            evtObj.initEvent('click', true, true);
            link.dispatchEvent(evtObj);
        } else if (link.click) {
            link.click();
        } 

    }

    toSVG = () => {
        window.open(
            'data:image/svg+xml;utf8,' +
            encodeURIComponent(this.canvas.toSVG()));
    }

    handleChange = (event) => {
        this.setState({
            opacityval: event.target.value
        });

        this.setActiveStyle('fontSize', event.target.value);
    }

    setStrokeval = (event) => {
        this.setState({
            strokeval: event.target.value
        });

        this.changeObjectproperty('strokeWidth', event.target.value * 1);
    }

    changeObjectproperty(style, hex) {
        var lthis = this;
        var canvas = lthis.canvas;
        let obj = canvas.selectedObject;
        if (!obj)
            obj = canvas.getActiveObject();

        if (obj) {
            if (obj.paths) {
                for (let i = 0; i < obj.paths.length; i++) {
                    lthis.setActiveStyle(style, hex, obj.paths[i]);
                }
            } else if (obj.type === "group") {
                let objects = obj.getObjects();
                for (let i = 0; i < objects.length; i++) {
                    lthis.setActiveStyle(style, hex, objects[i]);
                }
            } else lthis.setActiveStyle(style, hex, obj);
        } else {
            let grpobjs = canvas.getActiveObjects();
            if (grpobjs) {
                grpobjs.forEach(function(object) {
                    if (object.paths) {
                        for (let i = 0; i < object.paths.length; i++) {
                            lthis.setActiveStyle(style, hex, obj.paths[i]);
                        }
                    } else lthis.setActiveStyle(style, hex, obj);
                });
            }
        }
        canvas.renderAll();
    }

    setActiveStyle = (styleName, value, object) => {
        var canvas = this.canvas
        object = object || canvas.getActiveObject();

        if (!object) return;
        if (object.setSelectionStyles && object.isEditing) {
            var style = {};
            style[styleName] = value;
            object.setSelectionStyles(style);
            object.setCoords();
        } else {
            object.set(styleName, value);
        }
        object.setCoords();
        canvas.renderAll();
    }

    showIconsPopup = (e) => {
        this.fileIconsInput.click();
    }

    uploadIcon = (e) => {
        var self = this;
        const fileTypes = ['svg'];

        if (e.target.files && e.target.files[0]) {
            const extension = e.target.files[0].name.split('.').pop().toLowerCase(),
                isSuccess = fileTypes.indexOf(extension) > -1;

            if (isSuccess) {
                const iconsreader = new FileReader();
                iconsreader.onload = function(e) {

                    var imgObj = new Image();
                    imgObj.src = e.target.result;
                    imgObj.onload = function() {
                        var image = new fabric.Image(imgObj);
                        image.set({
                            left: 50,
                            top: 50,
                            angle: 0,
                            padding: 10,
                            cornersize: 10
                        });
                    }
                    self.addSVG(imgObj.src);
                };

                iconsreader.readAsDataURL(e.target.files[0]);
            } else {
                console.log('Please upload svg images only.');
            }
        }
    }

    addBNText() {
        var text = new fabric.Textbox('Brand Name', {
            fontFamily: 'Abel',
            editable: true,
            left: 100,
            top: 100,
            fontSize: 36,
            width: 250,
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        selectObject(canvas);
        canvas.renderAll();
    }

    addTLText() {
        var text = new fabric.Textbox('Tagline Text', {
            fontFamily: 'Abel',
            editable: true,
            left: 100,
            top: 100,
            fontSize: 20,
            width: 250,
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        selectObject(canvas);
        canvas.renderAll();
    }

    addSVG = (result) => {
        var canvas = this.canvas;
        var svg = result.default ? result.default : result;
        fabric.loadSVGFromURL(svg, (objects) => {
            var loadedObject = fabric.util.groupSVGElements(objects);
            loadedObject.set({
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
                subTargetCheck: true
            });
            loadedObject.src = svg;
            canvas.add(loadedObject);
            canvas.setActiveObject(loadedObject);
            loadedObject.scaleToWidth(100);
            loadedObject.setCoords();
            loadedObject.hasRotatingPoint = true;
            loadedObject.center();
            canvas.renderAll();
        });
    }

    render() {
        return ( 
          <div className="App">
              <div className="max-w-screen-xl mx-auto md:flex px-2">
                <div className="leftSide md:w-1/2 px-2 w-full">
                  <div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2">
                  <canvas id='canvas0' className='canvas0'></canvas>
                  </div>
                  <div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2">
                    <h2 className="font-sans text-2xl antialiased font-semibold">Layouts</h2>
                    <hr className="my-2.5" />
                    <div className="btns">                    
                        <Button2Style>layout0l</Button2Style>
                        <Button2Style>layout02</Button2Style>
                        <Button2Style>layout03</Button2Style> 
                    </div>
                  </div>                  
                </div>
                <div className="rightSide md:w-1/2 px-2 w-full">
                  <div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2" style={{ height: "320px" }}>
                    <h2 className="font-sans text-2xl antialiased font-semibold">Styles</h2>
                    <hr className="my-2.5" />
                    <div className="sm:flex">
                      <div className="sm:w-1/2 sm:px-2 w-full">
                        <p className="font-sans antialiased font-semibold mb-2">Font</p>
                        <div title="Font Family" className="font-familiy-container">
                          <FontPicker ref={c=> this.pickerRef = c} apiKey="AIzaSyCOyeDUsAnL-jnWudXBKNNma9cXmXsT4tM" activeFontFamily={this.state.activeFontFamily} limit="150" onChange={nextFont => this.setFontFamily(nextFont.family)} />
                        </div>
                      </div>
                      <div className="sm:w-1/2 sm:px-2 w-full">
                        <p className="font-sans antialiased font-semibold mb-2">Font color:</p>
                        <input type="color" className="font-sans text-2xl antialiased font-semibold w-8 h-8 rounded-full fontbackground" color={ this.state.fontbackground } onChange={this.setFontColor} />
                      </div>
                    </div>
                    <hr className="my-2.5" />
                    <div className="sm:flex">
                      <div className="sm:w-1/2 sm:px-2 w-full">
                        <p className="font-sans antialiased font-semibold">Font size:</p>
                        <div className="flex pt-3 pr-3 pb-3">
                          <span>20</span>
                          <input min="10" max="120" step="5" type="range" value={this.state.opacityval} onChange={this.handleChange} className="mt-5 mx-2 w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                          <span>{this.state.opacityval}%</span>
                        </div>
                      </div>
                    </div>
                    <hr className="my-2.5" />
                    <div className="sm:flex">
                      <div className="sm:w-1/2 sm:px-2 w-full">
                        <p className="font-sans antialiased font-semibold">Stroke Width:</p>
                        <div className="flex pt-3 pr-3 pb-3">
                          <span>1</span>
                          <input min="1" max="10" step="1" type="range" value={this.state.strokeval} onChange={this.setStrokeval} className="mt-5 mx-2 w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                          <span>{this.state.strokeval}%</span>
                        </div>
                      </div>
                      <div className="sm:w-1/2 sm:px-2 w-full">
                        <p className="font-sans antialiased font-semibold mb-2">Stroke color:</p>
                        <input type="color" className="font-sans text-2xl antialiased font-semibold w-8 h-8 rounded-full strokecolor" color={ this.state.strokecolor } onChange={this.setStroke} />
                      </div>
                      <div>                    
                        <span id='dynamiccolorpickers'>
                        </span>
                      </div>
                    </div>
                  </div>
                    <div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2" style={{ height: "178px" }}>
                    <h2 className="font-sans text-2xl antialiased font-semibold">General</h2>
                    <hr className="my-2.5" />
                    <div className="sm:flex">
                      <div className="sm:w-1/1 sm:px-1 w-full">
                        <p className="font-sans antialiased font-semibold mb-2">Background color:</p>
                        <div className="btns">
                          <input type="color" className="font-sans text-2xl antialiased font-semibold w-8 h-8 rounded-full background" color={ this.state.background } onChange={this.setBGColor} />
                        </div>
                      </div>
                      <div className="sm:w-1/2 sm:px-2 w-full" style={{ width: "320px" }}>
                        <p className="font-sans antialiased font-semibold mb-2">Background Reset:</p>
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={this.resetBGColor}>Reset</button>
                      </div>
                      <hr className="my-2.5" />
                      <div className="sm:w-1/2 sm:px-2 w-full">
                        <p className="font-sans antialiased font-semibold mb-2">Download:</p>
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={this.downloadSVG}>SVG</button>
                      </div>
                      <div>                 
                        <input style={{display:'none'}} onChange={this.uploadIcon} ref={(input) => { this.fileIconsInput = input; }} type="file" accept="image/svg+xml" />
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"  onClick={this.showIconsPopup}>Upload Icon</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
function Button2Style(props){
  return (
	<button className="bg-grey-700 text-black px-2.5 py-1.5 rounded mx-1 my-3 shadow shadow-black">{props.children}</button>
  )
}

export default App;