import React, { useState, useEffect } from 'react';
import { VscClose } from 'react-icons/vsc';

const AddModule = ({ setShowAddModule, addModule, updateModule, editModule }) => {
    const [moduleName, setModuleName] = useState('');

    useEffect(() => {
        if (editModule) {
            setModuleName(editModule.name);
        }
    }, [editModule]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (moduleName.trim()) {
            if (editModule) {
                updateModule({ ...editModule, name: moduleName });
            } else {
                addModule({ id: Date.now(), name: moduleName });
            }
            setShowAddModule(false);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-md shadow-lg text-center">
                <div className='flex'>
                    <span className='font-bold'>{editModule ? 'Edit Module' : 'Create New Module'}</span>
                    <button onClick={() => setShowAddModule(false)} className='ml-auto'><VscClose /></button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col text-start'>
                    <label htmlFor="moduleName">Module name</label>
                    <input
                        type="text"
                        name="moduleName"
                        id="moduleName"
                        value={moduleName}
                        onChange={(e) => setModuleName(e.target.value)}
                        className='rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                    <div className='flex justify-end mt-4'>
                        <button type="button" onClick={() => setShowAddModule(false)} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2">Cancel</button>
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">{editModule ? 'Update' : 'Create'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddModule;
