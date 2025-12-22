import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical, Bolt } from 'lucide-react';
import api from '@/lib/api';
import { Image } from '@/types/Project';
import ImageUploader from '@/components/ImageUploader';

interface Props {
  projectName: string;
  projectId: string;
  images: Image[];
  onUpdate: () => void;
}

// We need projectId and onUpdate inside SortableImage for delete
interface SortableImageProps {
  image: Image;
  position: number;
  projectId: string;
  onUpdate: () => void;
}

function SortableImage({ image, position, projectId, onUpdate }: SortableImageProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center mb-3 p-3 border rounded-lg bg-white shadow-sm">
      <div {...attributes} {...listeners} className="cursor-grab mr-3">
        <GripVertical size={20} className="text-gray-500" />
      </div>
      <span className="w-10 text-center font-bold text-gray-600 irsans_med">
        {position}.
      </span>
      <img
        src={`/${image.image_url}`}
        alt={image.alt_text || 'تصویر پروژه'}
        className="w-20 h-20 object-cover rounded ml-4"
      />
      <div className="flex-1 mr-4">
        <p className="irsans_med text-sm">{image.alt_text || 'بدون توضیح'}</p>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={async () => {
          const token = Cookies.get('jeyshid');
          if (!token) {
            toast.error('Unauthorized');
            return;
          }

          try {
            const res = await fetch(`/api/projects/${projectId}/images/${image.id}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!res.ok) throw new Error();
            toast.success('عکس حذف شد');
            onUpdate();
          } catch {
            toast.error('خطا در حذف');
          }
        }}
      >
        حذف
      </Button>
    </div>
  );
}

export default function ImageManagementDialog({ projectName, projectId, images: initialImages = [], onUpdate }: Props) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState(initialImages ?? []);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((img) => img.id === active.id);
    const newIndex = images.findIndex((img) => img.id === over.id);
    if (oldIndex === -1 || newIndex === -1) {
      toast.error('خطا در شناسایی عکس');
      onUpdate();
      return;
    }

    const newImages = arrayMove(images, oldIndex, newIndex);
    setImages(newImages);

    const movedImage = newImages[newIndex];

    const prev = newIndex > 0 ? newImages[newIndex - 1] : null;
    const next = newIndex < newImages.length - 1 ? newImages[newIndex + 1] : null;

    let newOrder = 100;
    if (prev && next) {
      newOrder = Math.round((prev.sort_order + next.sort_order) / 2);
    } else if (prev) {
      newOrder = prev.sort_order + 100;
    } else if (next) {
      newOrder = next.sort_order - 100;
    }

    if (newOrder < 10) newOrder = 10;

    try {
      await fetch(`http://localhost:8080/api/projects/${projectId}/images/${movedImage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ sort_order: newOrder }),
      });

      toast.success('ترتیب عکس‌ها بروز شد');
    } catch (err: any) {
      toast.error('خطا در ذخیره ترتیب – داده‌ها دوباره بارگیری می‌شوند');
      console.error('Update failed:', {
        projectId,
        imageId: movedImage.id,
        imageInList: movedImage,
        newOrder,
        error: err.response?.data || err.message,
      });
      onUpdate(); // Force refetch to fix stale state
    }
  };

  const handleUploadSuccess = () => {
    onUpdate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative cursor-pointer group inline-block">
          <span className="irsans_med text-sm">مدیریت عکس‌ها ({images.length})</span>
          <div className="absolute inset-0 bg-gray-300 opacity-0 group-hover:opacity-40 rounded flex items-center justify-center transition">
            <Bolt size={18} className="text-gray-700" />
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="irsans_med text-lg text-center">
            مدیریت عکس‌های پروژه<br />
            <span className="text-base text-gray-600">{projectName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="my-4">
          <ImageUploader projectId={projectId} onUploadSuccess={handleUploadSuccess} />
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={images.map(img => img.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {images.map((img, index) => (
                <SortableImage
                  key={img.id}
                  image={img}
                  position={index + 1}
                  projectId={projectId}
                  onUpdate={onUpdate}
                />
              ))}
              {images.length === 0 && (
                <p className="text-center text-gray-500 irsans_med py-8">
                  هیچ عکسی آپلود نشده است
                </p>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </DialogContent>
    </Dialog>
  );
}