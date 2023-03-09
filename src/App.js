import React, { useState, useEffect, useCallback, Component } from 'react';
import { Dropdown } from "flowbite-react";
import FabricCanvas from './Canvas';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/20/solid'

function App() {

  return (
    <div className="App">
	  <div className="max-w-screen-xl mx-auto md:flex px-2">
		<div className="leftSide md:w-1/2 px-2 w-full">
		  	<FabricCanvas  />		  
		  <div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2">
			<BoxHeading>Layouts</BoxHeading>
			<p className="font-sans antialiased font-semibold"><input type="checkbox" /> Drag texts combined</p>
			<div className="btns">
			  <Button2Style>layout0l</Button2Style>
			  <Button2Style>layout02</Button2Style>
			  <Button2Style>layout03</Button2Style>
			</div>
		  </div>
		  <div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2">
			<BoxHeading>General</BoxHeading>
			<p className="font-sans antialiased font-semibold mb-2">Background color:</p>
			<div className="btns">
			  <InputColor></InputColor>
			</div>
		  </div>
		</div>
		<div className="rightSide md:w-1/2 px-2 w-full">
		  <div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2">
			<BoxHeading>Brand Name</BoxHeading>
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
			  <InputTextColor></InputTextColor>
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
function ButtonStyle(props){
  return (
	<button className="bg-blue-700 text-white px-1.5 py-1.5 rounded-full mx-0.5 my-1">{props.children}</button>
  )
}
function Button2Style(props){
  return (
	<button className="bg-grey-700 text-black px-2.5 py-1.5 rounded mx-1 my-3 shadow shadow-black">{props.children}</button>
  )
}
function BoxHeading(props){
  return (
	<h2 className="font-sans text-2xl antialiased font-semibold">{props.children}</h2>
  )
}
function InputColor(props){
  return (
	<input type="color" className="font-sans text-2xl antialiased font-semibold w-8 h-8 rounded-full"/>
  )
}

function InputTextColor(props){
  return (
	<input type="color" className="font-sans text-2xl antialiased font-semibold w-8 h-8 rounded-full" onChange={e => setColor(e.target.value)} />
  )
}
 
function setColor(color){
	var self = this;
	console.log(color);
	self.updateCanvas = color;
}
export default App;