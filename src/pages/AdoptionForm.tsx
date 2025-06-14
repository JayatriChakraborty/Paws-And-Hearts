
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const adoptionFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }),
  address: z.string().min(5, { message: "Please enter a full address." }),
  city: z.string().min(2, { message: "Please enter a city." }),
  state: z.string().min(2, { message: "Please enter a state." }),
  zip: z.string().min(5, { message: "Please enter a valid 5-digit zip code." }),
  residenceType: z.enum(["house", "apartment", "condo"], { required_error: "You need to select a residence type." }),
  ownershipStatus: z.enum(["own", "rent"], { required_error: "You need to select ownership status." }),
  householdAdults: z.coerce.number().min(1, { message: "There must be at least one adult." }),
  householdChildren: z.coerce.number().min(0),
  previousPets: z.string().min(10, { message: "Please describe your experience with pets." }),
  vetInfo: z.string().min(5, { message: "Please provide veterinarian information." }),
  reason: z.string().min(20, { message: "Please tell us why you want to adopt (min 20 characters)." }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions to proceed.",
  }),
});

type AdoptionFormValues = z.infer<typeof adoptionFormSchema>;

const AdoptionForm = () => {
  const form = useForm<AdoptionFormValues>({
    resolver: zodResolver(adoptionFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      householdAdults: 1,
      householdChildren: 0,
      previousPets: "",
      vetInfo: "",
      reason: "",
      agreeToTerms: false,
    },
  });

  function onSubmit(data: AdoptionFormValues) {
    console.log(data);
    toast.success("Adoption Application Submitted!", {
      description: "Thank you! We have received your application and will be in touch soon.",
    });
    form.reset();
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight">Adoption Application</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Thank you for your interest in giving a loving home to one of our pets.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <section className="space-y-4 p-6 border rounded-lg">
                <h2 className="text-2xl font-semibold">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem><FormLabel>Street Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Anytown" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem><FormLabel>State / Province</FormLabel><FormControl><Input placeholder="CA" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="zip" render={({ field }) => (
                    <FormItem><FormLabel>Zip / Postal Code</FormLabel><FormControl><Input placeholder="12345" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </section>

              <section className="space-y-4 p-6 border rounded-lg">
                <h2 className="text-2xl font-semibold">Household Information</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <FormField control={form.control} name="residenceType" render={({ field }) => (
                    <FormItem className="space-y-3"><FormLabel>What is your residence type?</FormLabel><FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="house" /></FormControl><FormLabel className="font-normal">House</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="apartment" /></FormControl><FormLabel className="font-normal">Apartment</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="condo" /></FormControl><FormLabel className="font-normal">Condo</FormLabel></FormItem>
                      </RadioGroup>
                    </FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="ownershipStatus" render={({ field }) => (
                    <FormItem className="space-y-3"><FormLabel>Do you own or rent?</FormLabel><FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="own" /></FormControl><FormLabel className="font-normal">Own</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="rent" /></FormControl><FormLabel className="font-normal">Rent</FormLabel></FormItem>
                      </RadioGroup>
                    </FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                 <div className="grid md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="householdAdults" render={({ field }) => (
                    <FormItem><FormLabel>Number of adults in household?</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="householdChildren" render={({ field }) => (
                    <FormItem><FormLabel>Number of children in household?</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </section>

              <section className="space-y-4 p-6 border rounded-lg">
                <h2 className="text-2xl font-semibold">Pet & Vet History</h2>
                <FormField control={form.control} name="previousPets" render={({ field }) => (
                  <FormItem><FormLabel>Please describe your experience with previous pets.</FormLabel><FormControl>
                    <Textarea placeholder="Tell us about pets you've owned in the past, their breeds, and how long you had them." {...field} />
                  </FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="vetInfo" render={({ field }) => (
                  <FormItem><FormLabel>Veterinarian Name & Phone Number</FormLabel><FormControl>
                    <Input placeholder="Dr. Doolittle, (555) 555-5555" {...field} />
                  </FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="reason" render={({ field }) => (
                  <FormItem><FormLabel>Why do you want to adopt a pet at this time?</FormLabel><FormControl>
                    <Textarea placeholder="Describe your lifestyle and how a new pet will fit into it." {...field} />
                  </FormControl><FormMessage /></FormItem>
                )} />
              </section>

              <section className="space-y-4 p-6 border rounded-lg">
                <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Agree to terms and conditions</FormLabel>
                      <FormDescription>
                        You agree to our <Link to="/terms" className="underline">Terms of Service and Adoption Policy</Link>.
                      </FormDescription>
                       <FormMessage />
                    </div>
                  </FormItem>
                )} />
              </section>

              <Button type="submit" size="lg" className="w-full">Submit Application</Button>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdoptionForm;
