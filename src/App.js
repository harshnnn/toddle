import './App.css';
import { IoAddOutline } from "react-icons/io5";
import { IoMdArrowDropup, IoMdArrowDropdown, IoIosLink } from "react-icons/io";
import { LiaDatabaseSolid } from "react-icons/lia";
import { TfiUpload } from "react-icons/tfi";
import { VscClose } from "react-icons/vsc";

import { ReactComponent as NothingAdded } from './resources/Group 4606.svg'


import { useState } from 'react';


function App() {

    const [addBtnActive, setAddBtnActive] = useState(false);
    const [courseEmpty, setCourseEmpty] = useState(true);
    const [addModule, setAddModule] = useState(false);
    return (
        <div className="flex flex-col items-center justify-center  text-center w-full">
            <nav className="flex items-center justify-between p-4  text-black w-3/4  rounded-md">
                <h1 className="text-xl font-bold">Course Builder</h1>
                <button
                    className="flex items-center gap-1 bg-custom-red hover:bg-custom-red-hover text-white font-bold py-2 px-4 rounded"
                    onClick={() => setAddBtnActive(!addBtnActive)}
                >
                    <IoAddOutline />
                    Add
                    {addBtnActive ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>
            </nav>
            <div className='w-3/4'>
                {addBtnActive && (
                    <div className="mt-4 ml-auto mr-4 p-4 bg-gray-100 rounded-md shadow-lg w-1/4 flex flex-col">
                        <button className=" flex items-center space-x-2 p-2 hover:bg-gray-200 rounded transition duration-200" onClick={() => setAddModule(!addModule)}>
                            <LiaDatabaseSolid /> <span>Create Module</span>
                        </button>
                        <button className="flex items-center space-x-2 mt-2 p-2 hover:bg-gray-200 rounded transition duration-200">
                            <IoIosLink /> <span>Add Link</span>
                        </button>
                        <button className="flex items-center space-x-2 mt-2 p-2 hover:bg-gray-200 rounded transition duration-200">
                            <TfiUpload /> <span>Upload</span>
                        </button>
                    </div>
                )}
            </div>

            {courseEmpty && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8  text-center">
                    <NothingAdded className="h-32 w-32 mx-auto" />
                    <h2 className="font-bold mt-4">Nothing added here yet</h2>
                    <p className="text-gray-600">Click on the [+] Add button to add items to this course</p>
                </div>

            )}

            {addModule && (
                <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-900 bg-opacity-50">

                    <div className="bg-white p-8 rounded-md shadow-lg text-center">
                        <div className='flex'>
                            <span className='font-bold'>Create New Module</span>
                            <button onClick={() => setAddModule(!addModule)} className='ml-auto'><VscClose/></button>
                        </div>

                        <h2 className="font-bold mt-4">Module Name</h2>
                        <input type="text" name="Moudle Name" id="" />
                        <div>
                            <button>Cancel</button>
                            <button>Create</button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}

export default App;
