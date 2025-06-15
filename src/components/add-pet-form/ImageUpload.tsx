
import * as React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { UploadCloud } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PetFormValues } from "./schema";

interface ImageUploadProps {
  field: ControllerRenderProps<PetFormValues, "image">;
}

export function ImageUpload({ field }: ImageUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    // Revoke the object URL to avoid memory leaks when the component unmounts or the image changes.
    const currentUrl = field.value;
    return () => {
      if (currentUrl && currentUrl.startsWith("blob:")) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [field.value]);

  const handleFileSelect = (file: File | undefined) => {
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      field.onChange(imageUrl);
    }
  };

  return (
    <FormItem>
      <FormLabel>Image</FormLabel>
      <div
        onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFileSelect(e.dataTransfer.files?.[0]);
        }}
        className={cn(
          "flex justify-center items-center w-full p-6 border-2 border-dashed rounded-md cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/10" : "border-input hover:border-primary/50"
        )}
      >
        <FormControl>
          <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-full text-center">
            <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            <Input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
            />
          </label>
        </FormControl>
      </div>
      <FormDescription>
        Upload a picture of the pet.
      </FormDescription>
      <FormMessage />
      {field.value && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Image Preview:</p>
          <img src={field.value} alt="Pet preview" className="w-40 h-40 object-cover rounded-md border" />
        </div>
      )}
    </FormItem>
  );
}
