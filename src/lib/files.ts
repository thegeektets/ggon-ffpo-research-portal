import type { AttachmentFileType } from '@/types';

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function fileTypeFromName(name: string): AttachmentFileType {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  const map: Record<string, AttachmentFileType> = {
    pdf: 'pdf',
    xlsx: 'xlsx',
    xls: 'xlsx',
    csv: 'csv',
    zip: 'zip',
    png: 'image',
    jpg: 'image',
    jpeg: 'image',
    webp: 'image',
    docx: 'docx',
    doc: 'docx',
  };
  return map[ext] ?? 'pdf';
}

export function readFileAsDataUrl(file: File, maxMb = 5): Promise<string> {
  if (file.size > maxMb * 1024 * 1024) {
    return Promise.reject(new Error(`File is too large (max ${maxMb} MB): ${file.name}`));
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error(`Could not read file: ${file.name}`));
    reader.readAsDataURL(file);
  });
}
