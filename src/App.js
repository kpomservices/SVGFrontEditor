import React, { useState, useEffect, useCallback, Component } from 'react';
import { Dropdown } from "flowbite-react";
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

class App extends React.Component {

    canvas = null;
    canvaswidth = 590;
    canvasheight = 300;
    background: '#883636';
    jsonCanvasArray = [];
    state = {
        canvaspages: [],
        displaybgColorPicker: false,
        subtarget: null
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
        self.addHeadingtxt();
    }

    addHeadingtxt = () => {
      var canvas = this.canvas;
      var text = new fabric.Textbox('Brand Name', {
        fontFamily: 'Open Sans',
        editable: true,
        left: 100,
        top: -300,
        fontSize: 36,
        width: 250,
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      
      text.center();
      }

    initCanvasEvents() {
        var lthis = this;
        $(".main-area").mousedown(function(e) {
            e.stopImmediatePropagation();
        });

        fabric.util.addListener(lthis.canvas.upperCanvasEl, 'dblclick', function(e) {
            if (lthis.state.subtarget) {
                lthis.setState({
                    subtarget: null
                })
            }
        });

        lthis.canvas.on({
            'mouse:down': (e) => {
                if (e.subTargets && e.subTargets[0]) {
                    lthis.setState({
                        subtarget: e.subTargets[0]
                    })
                }
            },
            'object:moving': (e) => {
                if (e.subTargets && e.subTargets[0]) {
                    lthis.setState({
                        subtarget: e.subTargets[0]
                    })
                }
               
            },
            'object:added': (e) => {
                //this.updateState(e);
                //saveCanvasState(lthis.canvas);
            },
            'object:modified': (e) => {
                if (e.subTargets && e.subTargets[0]) {
                    lthis.setState({
                        subtarget: e.subTargets[0]
                    })
                }
            },
            'object:selected': (e) => {
                //lthis.updateState(e);
            },
            'object:scaling': (e) => {
                //selectObject(lthis.canvas);
            },
            'selection:created': (e) => {
                if (e.subTargets) {
                    //selectObject(lthis.canvas, e.subTargets[0]);
                    console.log("create");
                } else
                    //selectObject(lthis.canvas);
                    console.log("else");
            },
            'selection:updated': () => {
                //selectObject(lthis.canvas);
            },
            'selection:cleared': () => {
                //lthis.updateState();
            },
            'selection:added': (e) => {
                console.log("selection:added");
            },
        });
    }


      setColor = (color) => {
       this.changeObjectproperty('fill', event.target.value);
      }

      
     changeObjectproperty(style, hex) {
        var lthis = this;
        var canvas = lthis.canvas;
        let obj = canvas.selectedObject;
        if(!obj) 
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
          }
          else lthis.setActiveStyle(style, hex, obj);
        } else {
          let grpobjs = canvas.getActiveObjects();
          if (grpobjs) {
            grpobjs.forEach(function(object) {
              if (object.paths) {
                for (let i = 0; i < object.paths.length; i++) {
                  lthis.setActiveStyle(style, hex, obj.paths[i]);
                }
              }
              else lthis.setActiveStyle(style, hex, obj);
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


    render() {
        return ( 
          <div className="App">
      <div className="max-w-screen-xl mx-auto md:flex px-2">
        <div className="leftSide md:w-1/2 px-2 w-full">
            <div id="parent" className="border rounded-sm border-blue-700 px-3 py-4 my-2 text-center h-80 flex items-center flex-col justify-content-center">
            <canvas id='canvas0' style={{ padding: "0px 0px 10px 0px" }} className='canvas0'></canvas>
          </div> 
          <div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2">
            <h2 className="font-sans text-2xl antialiased font-semibold">Layouts</h2>
            
            <p className="font-sans antialiased font-semibold"><input type="checkbox" /> Drag texts combined</p>
            <div className="btns">
            <button className="bg-grey-700 text-black px-2.5 py-1.5 rounded mx-1 my-3 shadow shadow-black">layout0l</button>
            <button className="bg-grey-700 text-black px-2.5 py-1.5 rounded mx-1 my-3 shadow shadow-black">layout02</button>
            <button className="bg-grey-700 text-black px-2.5 py-1.5 rounded mx-1 my-3 shadow shadow-black">layout03</button>
              
            </div>
          </div>
          <div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2">
           <h2 className="font-sans text-2xl antialiased font-semibold">General</h2>
            <p className="font-sans antialiased font-semibold mb-2">Background color:</p>
            <div className="btns">
              <input type="color" className="font-sans text-2xl antialiased font-semibold w-8 h-8 rounded-full"/>
            </div>
          </div>
        </div>
        <div className="rightSide md:w-1/2 px-2 w-full">
          <div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2">
            <h2 className="font-sans text-2xl antialiased font-semibold">Brand Name</h2>
            {/*<div className="flex pt-3">
            <input type="text" placeholder="Brand Name" className="w-full pt-1.5 pb-2 px-3 font-sans antialiased border border-black rounded-l-md focus:outline-none border-r-0" />
            <button className="bg-blue-700 text-white px-4 py-1.5 rounded-r-md">Update</button>
            </div>*/}
            <hr className="my-2.5" />
            <div className="sm:flex">
              <div className="sm:w-1/2 sm:px-2 w-full">
              <p className="font-sans antialiased font-semibold mb-2">Brand Font</p>
              <button id="brandFont" data-dropdown-toggle="dropdown" className="bg-grey-700 text-black px-2.5 py-1.5 rounded shadow shadow-black mb-2" type="button">Cairo 500 </button>
              <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm shadow-black w-64 dark:bg-gray-700">
                <ul className="list-inside px-4 py-2 font-sans antialiased" aria-labelledby="brandFont">
                  <li>Arial (sans-serif)</li>
                  <li>Verdana (sans-serif)</li>
                  <li>Tahoma (sans-serif)</li>
                  <li>Trebuchet MS (sans-serif)</li>
                  <li>Times New Roman (serif)</li>
                  <li>Georgia (serif)</li>
                  <li>Garamond (serif)</li>
                  <li>Courier New (monospace)</li>
                  <li>Brush Script MT (cursive)</li>
                </ul>
              </div>
            </div>
            <div className="sm:w-1/2 sm:px-2 w-full">
              <p className="font-sans antialiased font-semibold mb-2">Brandname Font color:</p>
              <input type="color" className="font-sans text-2xl antialiased font-semibold w-8 h-8 rounded-full" color={ this.state.background }  onChange={this.setColor} />
            </div>
            </div>
            <hr className="my-2.5" />
            <div className="sm:flex">
              <div className="sm:w-1/2 sm:px-2 w-full">
              <p className="font-sans antialiased font-semibold">Brandname Font size:</p>
              
              <div className="flex pt-3 pr-3 pb-3">
              <span>10</span>
              <input min="10" max="120" step="5" type="range" className="mt-5 mx-2 w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
              <span>120</span>
              </div>
            </div>
            {/*<div className="sm:w-1/2 sm:px-2 w-full pt-3 sm:pt-0">
              <p className="font-sans antialiased font-semibold">Brandname move:</p>
              <p>You can also drag items</p>
              <ButtonStyle><ArrowUpIcon className="h-5 w-5" /></ButtonStyle>
              <ButtonStyle><ArrowDownIcon className="h-5 w-5" /></ButtonStyle>
              <ButtonStyle><ArrowLeftIcon className="h-5 w-5" /></ButtonStyle>
              <ButtonStyle><ArrowRightIcon className="h-5 w-5" /></ButtonStyle>
            </div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
        );
    }
}

export default App;