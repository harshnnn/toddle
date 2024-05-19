import React, { useState, useRef, useEffect } from 'react';
import { VscEdit, VscTrash, VscCloudDownload } from 'react-icons/vsc';
import { BsFilePdf } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";

const UploadData = ({ uploads, setEditUpload, deleteUpload, setShowUpload }) => {
    const [showOptions, setShowOptions] = useState(null);
    const optionsRef = useRef(null);

    const handleEdit = (upload) => {
        setEditUpload(upload);
        setShowUpload(true);
        setShowOptions(null);
    };

    const handleDownload = (file) => {
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
            {uploads.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {uploads.map((upload) => (
                        <div key={upload.id} className="p-4 bg-white rounded-md shadow-md flex justify-between items-center relative">
                            <div className='flex items-center'>
                                <BsFilePdf className="text-4xl mr-4 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-bold">{upload.docName}</h3>
                                    <p className="text-gray-600">{upload.file.name}</p>
                                </div>
                            </div>
                            <div className="relative" ref={optionsRef}>
                                <button className="flex items-center space-x-2" onClick={() => setShowOptions(showOptions === upload.id ? null : upload.id)}>
                                    <HiOutlineDotsVertical />
                                </button>
                                {showOptions === upload.id && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                        <button onClick={() => handleDownload(upload.file)} className="flex items-center space-x-2 px-4 py-2 text-green-500 hover:bg-gray-100 w-full text-left">
                                            <VscCloudDownload className="mr-2" /> Download
                                        </button>
                                        <button onClick={() => handleEdit(upload)} className="flex items-center space-x-2 px-4 py-2 text-blue-500 hover:bg-gray-100 w-full text-left">
                                            <VscEdit className="mr-2" /> Edit
                                        </button>
                                        <button onClick={() => deleteUpload(upload.id)} className="flex items-center space-x-2 px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left">
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

export default UploadData;
