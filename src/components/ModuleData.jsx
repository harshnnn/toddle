import React, { useState, useRef, useEffect } from 'react';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoMdArrowDropdownCircle } from "react-icons/io";


const ModuleData = ({ modules, setEditModule, deleteModule, setShowAddModule }) => {
    const [showOptions, setShowOptions] = useState(null);
    const optionsRef = useRef(null);

    const handleEdit = (module) => {
        setEditModule(module);
        setShowAddModule(true);
        setShowOptions(null);
    };

    const handleClickOutside = (event) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setShowOptions(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full mt-8">
            {modules.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {modules.map((module) => (
                        <div key={module.id} className="p-4 bg-white rounded-md shadow-md flex justify-between items-center relative">

                            <div className='flex items-center'>
                                <IoMdArrowDropdownCircle className="text-4xl mr-4 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-bold">{module.name}</h3>
                                </div>

                            </div>
                            <div className="relative" ref={optionsRef}>
                                <button className="flex items-center space-x-2" onClick={() => setShowOptions(showOptions === module.id ? null : module.id)}>
                                    <HiOutlineDotsVertical />
                                </button>

                                {showOptions === module.id && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                        <button onClick={() => handleEdit(module)} className="flex items-center space-x-2 px-4 py-2 text-blue-500 hover:bg-gray-100 w-full text-left">
                                            <VscEdit className="mr-2" /> Edit
                                        </button>
                                        <button onClick={() => deleteModule(module.id)} className="flex items-center space-x-2 px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left">
                                            <VscTrash className="mr-2" /> Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default ModuleData;
