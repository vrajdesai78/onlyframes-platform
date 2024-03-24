'use client';
import {TrashIcon, UploadIcon} from '@/icons';
import {useRef, useState} from 'react';

const Customize = (props: any) => {
  const {formData, setFormData} = props;
  const [currDrop, setCurrDrop] = useState<string | undefined>();
  let fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [contentCid, setContentCid] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    console.log(value);
    setFormData({...formData, [name]: value});
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      console.log(name + '...' + selectedFile);
    }
  };

  const uploadFile = async (fileToUpload: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', fileToUpload);
      const res = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });
      const ipfsHash = await res.text();
      setCid(ipfsHash);
      console.log(ipfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert('Trouble uploading file');
    }
  };

  const uploadContent = async (fileToUpload: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', fileToUpload);
      const res = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });
      const ipfsHash = await res.text();
      setContentCid(ipfsHash);
      console.log(ipfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert('Trouble uploading file');
    }
  };

  const uploadJSON = async (json: any) => {
    try {
      const res = await fetch('/api/json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      });

      if (!res.ok) {
        throw new Error(`Failed to upload JSON: ${res.statusText}`);
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      uploadFile(e.target.files[0]);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      uploadContent(e.target.files[0]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-8 font-primary">
      <div className="w-full h-fit flex flex-col gap-3">
        <h2 className="text-xl text-teal-400 font-semibold">Brief Description</h2>
        <div className="relative w-full">
          <textarea
            rows={5}
            name="description"
            placeholder="Descriptive Insights on the Product"
            className="w-full bg-transparent text-gray-200 py-3 px-5 rounded-lg flex flex-col items-start justify-start gap-y-2 border border-neutral-300 hover:border-neutral-200  min-h-min"
            required
            defaultValue={formData.description}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="w-full h-fit flex flex-col gap-3">
        <h2 className="text-xl text-teal-400 font-semibold">Thumbnail</h2>
        <div className="relative w-full">
          <div className="w-[300px] aspect-square bg-transparent rounded-lg flex flex-col items-start justify-start gap-y-2 border border-cardGray-700 hover:border-gray-700 relative divide-y-2 divide-dashed">
            <label className="flex flex-col justify-center items-center w-full h-full px-4 transition border-2 border-cardGray-700 hover:border-gray-700 border-dashed rounded-md appearance-none cursor-pointer focus:outline-none">
              <div className="w-full h-full flex flex-row justify-center items-center gap-2 text-neutral-400 text-base hover:text-white">
                <UploadIcon className="w-6 h-6" />
                {!formData.cover! ? (
                  <span className="font-medium ">
                    Drop files, or <span className="text-blue-600 underline">browse</span>
                  </span>
                ) : (
                  <span>
                    Drop/<span className="text-blue-600 underline">Browse</span> to Replace
                  </span>
                )}
              </div>
              <input
                type="file"
                name="thumbnail"
                className="h-0 w-0"
                accept="image/*"
                required
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
      </div>

      {/* TODO: Description Editor Widget */}

      <div className="w-full h-fit flex flex-col gap-3">
        <h2 className="text-xl text-teal-400 font-semibold">Upload Content</h2>
        <div className="w-full bg-transparent rounded-lg gap-y-2 border border-cardGray-700 hover:border-gray-700  min-h-min group flex justify-center items-center relative divide-y-2 divide-dashed divide-cardGray-700 hover:divide-gray-700">
          <label className="flex flex-col justify-center items-center w-full h-40 px-4 transition border-2 border-cardGray-700 hover:border-gray-700 border-dashed rounded-md appearance-none cursor-pointer focus:outline-none">
            <div className="w-full h-full flex flex-row justify-center items-center gap-2 text-neutral-400 text-base hover:text-white">
              <UploadIcon className="w-6 h-6" />
              <span className="font-medium">
                Drop files to Attach, or <span className="text-blue-600 underline">browse</span>
              </span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              name="file_upload"
              className="h-0 w-0"
              required
              defaultValue={formData.file_upload}
              onChange={handleContentChange}
            />
          </label>
          {currDrop && (
            <div
              className="w-full absolute bottom-0 px-4 py-2 flex flex-row justify-center items-center gap-2 text-neutral-400 text-base hover:text-red-500"
              onClick={() => {
                setCurrDrop(undefined);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            >
              <TrashIcon className="h-6 w-6" />
              <span className="font-medium truncate">{currDrop}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customize;
