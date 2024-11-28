import { Attachment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { FileIcon, Download, Trash2 } from 'lucide-react';
import { formatFileSize } from '@/lib/utils/format';

interface AttachmentsListProps {
  attachments: Attachment[];
  onDelete?: (attachmentId: string) => void;
  showDelete?: boolean;
}

export function AttachmentsList({
  attachments,
  onDelete,
  showDelete = false,
}: AttachmentsListProps) {
  return (
    <div className="space-y-2">
      {attachments.map((attachment) => (
        <div
          key={attachment.id}
          className="flex items-center justify-between p-2 border rounded-md"
        >
          <div className="flex items-center space-x-3">
            <FileIcon className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{attachment.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(attachment.size)} • Uploaded{' '}
                {new Date(attachment.uploadedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <a href={attachment.url} download>
                <Download className="h-4 w-4" />
              </a>
            </Button>
            {showDelete && onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(attachment.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}