
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const petFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  type: z.enum(["Dog", "Cat", "Other"]),
  age: z.enum(["Young", "Adult", "Senior"]),
  gender: z.enum(["Male", "Female"]),
  size: z.enum(["Small", "Medium", "Large"]),
  breed: z.string().min(2, "Breed must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  image: z.string().min(1, "An image is required."),
});

type PetFormValues = z.infer<typeof petFormSchema>;

export function AddPetForm() {
  const form = useForm<PetFormValues>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: "",
      type: "Dog",
      age: "Young",
      gender: "Male",
      size: "Medium",
      breed: "",
      description: "",
      image: "",
    },
  });

  const [isDragging, setIsDragging] = React.useState(false);
  const imageValue = form.watch("image");

  React.useEffect(() => {
    // Revoke the object URL to avoid memory leaks
    return () => {
      if (imageValue && imageValue.startsWith("blob:")) {
        URL.revokeObjectURL(imageValue);
      }
    };
  }, [imageValue]);

  function onSubmit(data: PetFormValues) {
    // In a real application, you would send this data to your backend to be saved.
    // The image data is a temporary blob URL. For a real app, you'd upload the file to a storage service.
    console.log("New pet data:", data);
    toast.success("New pet added!", {
      description: `${data.name} is ready for adoption. This is for demonstration and won't be saved permanently.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet Name</FormLabel>
                <FormControl>
                  <Input placeholder="Buddy" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breed</FormLabel>
                <FormControl>
                  <Input placeholder="Golden Retriever" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pet type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Dog">Dog</SelectItem>
                    <SelectItem value="Cat">Cat</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pet age" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Young">Young</SelectItem>
                    <SelectItem value="Adult">Adult</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pet gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pet size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Small">Small</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Large">Large</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <div
                onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file && file.type.startsWith("image/")) {
                    const currentImage = form.getValues("image");
                    if (currentImage && currentImage.startsWith("blob:")) {
                        URL.revokeObjectURL(currentImage);
                    }
                    const imageUrl = URL.createObjectURL(file);
                    field.onChange(imageUrl);
                  }
                }}
                className={cn(
                  "flex justify-center items-center w-full p-6 border-2 border-dashed rounded-md cursor-pointer transition-colors",
                  isDragging ? "border-primary bg-primary/10" : "border-input hover:border-primary/50"
                )}
              >
                <FormControl>
                  <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-full text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    <Input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const currentImage = form.getValues("image");
                          if (currentImage && currentImage.startsWith("blob:")) {
                            URL.revokeObjectURL(currentImage);
                          }
                          const imageUrl = URL.createObjectURL(file);
                          field.onChange(imageUrl);
                        }
                      }}
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
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about this pet"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Pet</Button>
      </form>
    </Form>
  );
}
