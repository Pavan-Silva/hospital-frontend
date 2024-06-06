import { useLocation, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaRegSave } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormHeader from "@/components/FormHeader";
import { useMutation, useQuery } from "@tanstack/react-query";
import DoctorService from "@/services/DoctorService";
import { Doctor } from "@/components/doctors/Columns";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBox from "@/components/ErrorBox";

const formSchema = z.object({
  firstName: z.string().min(3, {
    message: "Must be at least 3 characters.",
  }),

  lastName: z.string().min(3, {
    message: "Must be at least 3 characters.",
  }),

  phone: z.string().regex(new RegExp(/^[0-9]{10}$/), {
    message: "number is invalid.",
  }),

  nic: z
    .string()
    .regex(
      new RegExp(
        /^(([5,6,7,8,9]{1})([0-9]{1})([0,1,2,3,5,6,7,8]{1})([0-9]{6})([v|V|x|X]))|(([1,2]{1})([0,9]{1})([0-9]{2})([0,1,2,3,5,6,7,8]{1})([0-9]{7}))/gm
      ),
      {
        message: "is invalid.",
      }
    ),

  gender: z.string(),

  specialization: z.string().min(3, {
    message: "Must be at least 3 characters.",
  }),
});

const DoctorForm = () => {
  const { query } = useParams();
  const location = useLocation();

  const {
    data: pendingDoctor,
    error,
    isLoading,
  } = useQuery<Doctor>({
    queryKey: ["doctors"],
    queryFn: () => DoctorService.getById(query as string),
    enabled: query !== "add" && query ? true : false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      firstName: pendingDoctor?.name?.split(" ")[0] || "",
      lastName: pendingDoctor?.name?.split(" ")[1] || "",
      gender: pendingDoctor?.gender || "",
      phone: pendingDoctor?.phone || "",
      nic: pendingDoctor?.nic || "",
      specialization: pendingDoctor?.specialization || "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["doctors"],
    mutationFn: (data: Doctor) =>
      pendingDoctor?._id
        ? DoctorService.update(pendingDoctor._id, data)
        : DoctorService.create(data),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const doctor: Doctor = {
      name: data.firstName + " " + data.lastName,
      phone: data.phone,
      gender: data.gender,
      nic: data.nic,
    };

    mutate(doctor);
  };

  const handleReset = () => {
    form.reset({
      firstName: "",
      lastName: "",
      gender: "",
      phone: "",
      nic: "",
      specialization: "",
    });
  };

  return (
    <div className="rounded-md py-4 px-5 bg-white">
      <FormHeader
        title={`${query === "add" ? "Add" : "Edit"} Doctor`}
        url={location.pathname}
        handleFormRefresh={handleReset}
      />
      {error && query !== "add" && <ErrorBox message={error.message} />}

      {isLoading && query !== "add" ? (
        <LoadingSpinner />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 mt-5"
          >
            <div className="flex gap-5 flex-col lg:gap-3 lg:flex-row">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <span className="text-red-500">* </span>
                      First Name
                    </FormLabel>

                    <FormMessage className="ml-1 inline" />

                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <span className="text-red-500">* </span>
                      Last Name
                    </FormLabel>

                    <FormMessage className="ml-1 inline" />

                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    <span className="text-red-500">* </span>
                    Phone
                  </FormLabel>

                  <FormMessage className="ml-1 inline" />

                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nic"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    <span className="text-red-500">* </span>
                    NIC
                  </FormLabel>

                  <FormMessage className="ml-1 inline" />

                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-5 flex-col lg:gap-3 lg:flex-row">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <span className="text-red-500">* </span>
                      Gender
                    </FormLabel>

                    <FormMessage className="ml-1 inline" />

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select a gender"
                            {...field}
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <span className="text-red-500">* </span>
                      Specialization
                    </FormLabel>

                    <FormMessage className="ml-1 inline" />

                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3 ml-auto mt-3 mb-1">
              {query !== "add" && (
                <Button
                  variant="outline"
                  className="text-red-500 border-red-100"
                >
                  <MdDeleteOutline className="mr-1 size-5" />
                  Delete
                </Button>
              )}

              <Button
                type="submit"
                className={`${query === "add" ? "w-32" : ""}`}
              >
                <FaRegSave className="mr-2 size-4" />
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default DoctorForm;
