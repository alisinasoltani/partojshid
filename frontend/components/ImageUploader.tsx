import { useState } from 'react';
import Cookies from 'js-cookie';
import api from '@/lib/api'; // Note: Using Next.js API route, not direct Go api

interface Props {
  projectId: string;
  onUploadSuccess: () => void;
}

export default function ImageUploader({ projectId, onUploadSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [sortOrder, setSortOrder] = useState(999);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const token = Cookies.get('jeyshid');
    if (!token) {
      setError('Unauthorized');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('alt_text', altText);
    formData.append('sort_order', sortOrder.toString());

    try {
      const res = await fetch(`/api/projects/${projectId}/images`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Upload failed');
      onUploadSuccess();
      // reset form
    } catch (err) {
      setError('Upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <input type="text" placeholder="Alt Text" value={altText} onChange={(e) => setAltText(e.target.value)} />
      <input type="number" placeholder="Sort Order" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value))} />
      <button type="submit">Upload Image</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}