import * as React from 'react';
import {
    fabric
} from 'fabric';
import $ from 'jquery';

class FabricCanvas extends React.Component {

    canvas = null;
    canvaswidth = 590;
    canvasheight = 300;
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
        self.delete();

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
      text.center();

      var textsub = new fabric.Textbox('Tagline text', {
        fontFamily: 'Open Sans',
        editable: true,
        left: 220,
        top: 200,
        fontSize: 18,
        width: 200,
      });
      canvas.add(textsub);
      canvas.renderAll();
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
                lthis.delete();
            },
            'object:added': (e) => {
                lthis.updateState(e);
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
                lthis.updateState(e);
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
                lthis.updateState();
            },
            'selection:added': (e) => {
                console.log("selection:added");
            },
        });
    }

      updateCanvas(colorval) {
       console.log("updateCanvas");
       console.log(colorval);
      }


    render() {
        return ( 
          <div id="parent" className="border rounded-sm border-blue-700 px-3 py-4 my-2 text-center h-80 flex items-center flex-col justify-content-center">
            <canvas id='canvas0' style={{ padding: "0px 0px 10px 0px" }} className='canvas0'></canvas>
          </div>
        );
    }
}

export default FabricCanvas;