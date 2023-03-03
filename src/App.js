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
		  <div className="border rounded-sm border-blue-700 px-3 py-4 my-2 text-center h-80 flex items-center flex-col justify-content-center;"> <img src="" alt="" />
			<BoxHeading>Brand Name</BoxHeading>
			<p>Tagline text</p>
		  </div>
		  <div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2">
			<BoxHeading>Layouts</BoxHeading>
			<p className="font-sans antialiased font-semibold"><input type="checkbox" /> Drag texts combined</p>
			<div className="btns">
			  <Button2Style>layout0l</Button2Style>
			  <Button2Style>layout02</Button2Style>
			  <Button2Style>layout03</Button2Style>
			</div>
		  </div>
		  {/*<div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2">
			<BoxHeading>Delete parts inside SVG</BoxHeading>
			<p className="font-sans antialiased font-semibold text-red-700"><input type="checkbox" /> Delete mode</p>
			<div className="btns">
			  <button className="bg-gray-400 text-white px-4 pt-1.5 pb-2 rounded mx-1 my-3">Delete selected logo parts</button>
			</div>
		  </div>*/}
		  <div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2">
			<BoxHeading>General</BoxHeading>
			<p className="font-sans antialiased font-semibold">Background color:</p>
			<div className="btns">
			  <InputColor>#ffffff</InputColor>
			</div>
		  </div>
		</div>
		<div className="rightSide md:w-1/2 px-2 w-full">
		  {/*<div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2">
			<BoxHeading>Logo settings</BoxHeading>
			<div className="sm:flex">
			  <div className="sm:w-1/2 sm:px-2 w-full pt-3 sm:pt-0">
				<p className="font-sans antialiased font-semibold">Logo size</p>
				<ButtonStyle><PlusIcon className="h-5 w-5" /></ButtonStyle>
				<ButtonStyle><MinusIcon className="h-5 w-5" /></ButtonStyle>
			  </div>
			  <div className="sm:w-1/2 sm:px-2 w-full pt-3 sm:pt-0">
				<p className="font-sans antialiased font-semibold">Logo move:</p>
				<p>You can also drag items</p>
				<ButtonStyle><ArrowUpIcon className="h-5 w-5" /></ButtonStyle>
			  <ButtonStyle><ArrowDownIcon className="h-5 w-5" /></ButtonStyle>
			  <ButtonStyle><ArrowLeftIcon className="h-5 w-5" /></ButtonStyle>
			  <ButtonStyle><ArrowRightIcon className="h-5 w-5" /></ButtonStyle>
			  </div>
			</div>
		  </div>*/}
		  <div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2">
			<BoxHeading>Brand Name</BoxHeading>
			{/*<div className="flex pt-3">
			<input type="text" placeholder="Brand Name" className="w-full pt-1.5 pb-2 px-3 font-sans antialiased border border-black rounded-l-md focus:outline-none border-r-0" />
			<button className="bg-blue-700 text-white px-4 py-1.5 rounded-r-md">Update</button>
			</div>*/}
			<hr className="my-2.5" />
			<div className="sm:flex">
			  <div className="sm:w-1/2 sm:px-2 w-full">
			  <p className="font-sans antialiased font-semibold">Brand Font</p>
			  <Button2Style>Cairo 500</Button2Style>
			</div>
			<div className="sm:w-1/2 sm:px-2 w-full">
			  <p className="font-sans antialiased font-semibold">Brandname Font color:</p>
			  <InputColor>#abcd98</InputColor>
			</div>
			</div>
			<hr className="my-2.5" />
			<div className="sm:flex">
			  <div className="sm:w-1/2 sm:px-2 w-full">
			  <p className="font-sans antialiased font-semibold">Brandname Font size:</p>
			  <div className="flex pt-5 pr-3">
			  <span>10</span>
			  <input min="10" max="120" step="5" value="30" type="range" className="w-full mt-4 mx-2" />
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
		  <div className="border rounded-sm border-blue-700 px-3 pt-2 pb-3 my-2">
			<BoxHeading>Tagline</BoxHeading>
			{/*<p className="font-sans antialiased font-semibold"><input type="checkbox" /> Show tagline</p>
			<hr className="my-2.5" />
			<div className="flex">
			<input type="text" placeholder="Tagline text" className="w-full pt-1.5 pb-2 px-3 font-sans antialiased border border-black rounded-l-md focus:outline-none border-r-0" />
			<button className="bg-blue-700 text-white px-4 py-1.5 rounded-r-md">Update</button>
			</div>*/}
			<hr className="my-2.5" />
			<div className="sm:flex">
			  <div className="sm:w-1/2 sm:px-2 w-full">
			  <p className="font-sans antialiased font-semibold">Tagline Font</p>
			  <Button2Style>Cairo 500</Button2Style>
			</div>
			<div className="sm:w-1/2 sm:px-2 w-full">
			  <p className="font-sans antialiased font-semibold">Tagline Font color:</p>
			  {/*<Button2Style>#000000</Button2Style>*/}
			  <InputColor>#abcd98</InputColor>
			</div>
			</div>
			<hr className="my-2.5" />
			<div className="sm:flex">
			  <div className="sm:w-1/2 sm:px-2 w-full">
			  <p className="font-sans antialiased font-semibold">Tagline Font Size:</p>
			  <div className="flex pt-5 pr-3">
			  <span>10</span>
			  <input min="1" max="40" step="1" value="20" type="range" className="w-full mt-4 mx-2" />
			  <span>40</span>
			  </div>
			</div>
			{/*<div className="sm:w-1/2 sm:px-2 w-full pt-3 sm:pt-0">
			  <p className="font-sans antialiased font-semibold">Tagline move:</p>
			  <p className="font-sans text-sm antialiased">You can also drag items</p>
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
	<input type="color" className="font-sans text-2xl antialiased font-semibold" value={props.children}/>
  )
}

export default App;
