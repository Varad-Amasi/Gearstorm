import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Alert } from '@/components/common/Alert';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { useToast } from '@/hooks/useToast';
import { getErrorMessage } from '@/services/apiClient';
import { uploadGalleryImage } from '@/services/imageService';

const CATEGORY_OPTIONS = [
  { value: 'Builds', label: 'Builds' },
  { value: 'Course', label: 'Course' },
  { value: 'Teams', label: 'Teams' },
  { value: 'Awards', label: 'Awards' },
] as const;

export interface GalleryUploadFormProps {
  onUploaded: () => void;
}

/**
 * Organiser-only gallery upload. Requires the admin API key header.
 */
export const GalleryUploadForm = ({
  onUploaded,
}: GalleryUploadFormProps): JSX.Element => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [alt, setAlt] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('Builds');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [adminKey, setAdminKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    () => () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    },
    [preview]
  );

  const onFileChange = (next: File | null): void => {
    setFile(next);
    setPreview((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return next ? URL.createObjectURL(next) : null;
    });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setError(null);

    if (!file) {
      setError('Choose an image to upload');
      return;
    }
    if (!adminKey.trim()) {
      setError('Enter the admin API key');
      return;
    }

    setLoading(true);
    try {
      await uploadGalleryImage({
        file,
        alt: alt.trim(),
        category,
        year: Number(year),
        caption: caption.trim(),
        adminKey: adminKey.trim(),
      });
      toast.success('Image uploaded');
      onFileChange(null);
      setAlt('');
      setCaption('');
      onUploaded();
    } catch (uploadError) {
      const message = getErrorMessage(uploadError);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => void handleSubmit(e)}
    >
      <Alert variant="info" title="Organiser upload">
        Requires the server{' '}
        <code className="text-text-light">ADMIN_API_KEY</code> sent as{' '}
        <code className="text-text-light">x-admin-key</code>. Set it in{' '}
        <code className="text-text-light">backend/.env</code> — never commit the
        key.
      </Alert>

      {error ? (
        <Alert variant="error" title="Upload failed">
          {error}
        </Alert>
      ) : null}

      <Input
        id="gallery-file"
        label="Image (JPEG, PNG, WebP, or GIF)"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        required
        onChange={(event) => {
          onFileChange(event.target.files?.[0] ?? null);
        }}
      />

      {preview ? (
        <img
          src={preview}
          alt="Upload preview"
          className="max-h-48 w-full rounded-lg border border-border object-contain"
        />
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          id="gallery-caption"
          label="Caption"
          value={caption}
          onChange={(event) => {
            setCaption(event.target.value);
          }}
          helperText="At least 3 characters"
          required
        />
        <Input
          id="gallery-alt"
          label="Alt text"
          value={alt}
          onChange={(event) => {
            setAlt(event.target.value);
          }}
          helperText="At least 3 characters"
          required
        />
        <Select
          id="gallery-category"
          label="Category"
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        />
        <Input
          id="gallery-year"
          label="Year"
          type="number"
          min={2020}
          max={2100}
          value={year}
          onChange={(event) => {
            setYear(event.target.value);
          }}
          required
        />
      </div>

      <Input
        id="gallery-admin-key"
        label="Admin API key"
        type="password"
        autoComplete="off"
        value={adminKey}
        onChange={(event) => {
          setAdminKey(event.target.value);
        }}
        required
      />

      <div>
        <Button type="submit" loading={loading}>
          Upload image
        </Button>
      </div>
    </form>
  );
};
