import './App.css';
import { IoAddOutline } from "react-icons/io5";
import { IoMdArrowDropup, IoMdArrowDropdown, IoIosLink } from "react-icons/io";
import { LiaDatabaseSolid } from "react-icons/lia";
import { TfiUpload } from "react-icons/tfi";
import { ReactComponent as NothingAdded } from './resources/Group 4606.svg';

import { useState, useEffect, useRef } from 'react';
import AddModule from './components/AddModule';
import AddLink from './components/AddLink';
import Upload from './components/Upload';
import ModuleData from './components/ModuleData';
import LinkData from './components/LinkData';
import UploadData from './components/UploadData';

function App() {
    const [addBtnActive, setAddBtnActive] = useState(false);
    const [courseEmpty, setCourseEmpty] = useState(true);
    const [showAddModule, setShowAddModule] = useState(false);
    const [showAddLink, setShowAddLink] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [modules, setModules] = useState([]);
    const [links, setLinks] = useState([]);
    const [uploads, setUploads] = useState([]);
    const [editModule, setEditModule] = useState(null);
    const [editLink, setEditLink] = useState(null);
    const [editUpload, setEditUpload] = useState(null);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setAddBtnActive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const addModule = (module) => {
        setModules([...modules, module]);
        setCourseEmpty(false);
    };

    const updateModule = (updatedModule) => {
        setModules(modules.map(module => (module.id === updatedModule.id ? updatedModule : module)));
        setEditModule(null);
    };

    const deleteModule = (id) => {
        setModules(modules.filter(module => module.id !== id));
        if (modules.length === 1 && links.length === 0 && uploads.length === 0) setCourseEmpty(true);
    };

    const addLink = (link) => {
        setLinks([...links, link]);
        setCourseEmpty(false);
    };

    const updateLink = (updatedLink) => {
        setLinks(links.map(link => (link.id === updatedLink.id ? updatedLink : link)));
        setEditLink(null);
    };

    const deleteLink = (id) => {
        setLinks(links.filter(link => link.id !== id));
        if (links.length === 1 && modules.length === 0 && uploads.length === 0) setCourseEmpty(true);
    };

    const addUpload = (upload) => {
        setUploads([...uploads, upload]);
        setCourseEmpty(false);
    };

    const updateUpload = (updatedUpload) => {
        setUploads(uploads.map(upload => (upload.id === updatedUpload.id ? updatedUpload : upload)));
        setEditUpload(null);
    };

    const deleteUpload = (id) => {
        setUploads(uploads.filter(upload => upload.id !== id));
        if (uploads.length === 1 && modules.length === 0 && links.length === 0) setCourseEmpty(true);
    };

    return (
        <div className="flex flex-col items-center justify-center text-center w-full">
            <nav className="flex items-center justify-between p-4 text-black w-3/4 rounded-md">
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
           
            <div className='w-3/4' ref={dropdownRef}>
                {addBtnActive && (
                    <div className="absolute z-10 right-48 mt-4 ml-auto mr-4 p-4 bg-gray-100 rounded-md shadow-lg w-1/4 flex flex-col">
                        <button className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded transition duration-200" onClick={() => setShowAddModule(true)}>
                            <LiaDatabaseSolid /> <span>Create Module</span>
                        </button>
                        <button className="flex items-center space-x-2 mt-2 p-2 hover:bg-gray-200 rounded transition duration-200" onClick={() => setShowAddLink(true)}>
                            <IoIosLink /> <span>Add Link</span>
                        </button>
                        <button className="flex items-center space-x-2 mt-2 p-2 hover:bg-gray-200 rounded transition duration-200" onClick={() => setShowUpload(true)}>
                            <TfiUpload /> <span>Upload</span>
                        </button>
                    </div>
                )}
            </div>

            {courseEmpty && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 text-center">
                    <NothingAdded className="h-32 w-32 mx-auto" />
                    <h2 className="font-bold mt-4">Nothing added here yet</h2>
                    <p className="text-gray-600">Click on the [+] Add button to add items to this course</p>
                </div>
            )}

            {!courseEmpty && (
                <div className="w-3/4 mt-8">
                    <ModuleData
                        modules={modules}
                        setEditModule={setEditModule}
                        deleteModule={deleteModule}
                        setShowAddModule={setShowAddModule}
                    />
                    <LinkData
                        links={links}
                        setEditLink={setEditLink}
                        deleteLink={deleteLink}
                        setShowAddLink={setShowAddLink}
                    />
                    <UploadData
                        uploads={uploads}
                        setEditUpload={setEditUpload}
                        deleteUpload={deleteUpload}
                        setShowUpload={setShowUpload}
                    />
                </div>
            )}

            {showAddModule && (
                <AddModule
                    setShowAddModule={setShowAddModule}
                    addModule={addModule}
                    updateModule={updateModule}
                    editModule={editModule}
                />
            )}

            {showAddLink && (
                <AddLink
                    setShowAddLink={setShowAddLink}
                    addLink={addLink}
                    updateLink={updateLink}
                    editLink={editLink}
                />
            )}

            {showUpload && (
                <Upload
                    setShowUpload={setShowUpload}
                    addUpload={addUpload}
                    updateUpload={updateUpload}
                    editUpload={editUpload}
                />
            )}
        </div>
    );
}

export default App;
