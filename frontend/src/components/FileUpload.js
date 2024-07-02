import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUploadedFile(res.data);
            setFilename(file.name);
        } catch (err) {
            console.error('Error uploading file:', err);
        }
    };

    return (
        <div>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload File</button>
            </form>
            {uploadedFile && (
                <div>
                    <h3>{filename}</h3>
                    <a href={`/uploads/${uploadedFile}`} target="_blank" rel="noopener noreferrer">View File</a>
                </div>
            )}
        </div>
    );
}

export default FileUpload;
