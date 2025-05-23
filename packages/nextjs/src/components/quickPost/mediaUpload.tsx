import { useState } from 'react';
import { Paperclip } from 'lucide-react';
import Image from 'next/image';

interface MediaUploadProps {
  onUpload: (files: File[]) => void;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ onUpload }) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));

    setPreviews(imagePreviews);
    onUpload(files);
  };

  return (
    <div className="relative">
      <label className="cursor-pointer flex items-center text-gray-500 hover:text-gray-700">
        <Paperclip className="w-5 h-5" />
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      {previews.length > 0 && (
        <div className="mt-2 flex gap-2">
          {previews.map((src, index) => (
            <div key={index} className="relative w-10 h-10">
              <Image
                src={src}
                alt={`preview-${index}`}
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
