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
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBox from "@/components/ErrorBox";
import PatientService from "@/services/PatientService";
import { patientFormSchema } from "@/features/patients/FormSchema";
import { Patient } from "./Columns";
import { Doctor } from "../doctors/Columns";

const PatientForm = () => {
  const { query } = useParams();
  const location = useLocation();

  const {
    data: editablePatient,
    error,
    isLoading,
  } = useQuery<Patient>({
    queryKey: ["patients"],
    queryFn: () => PatientService.getById(query as string),
    enabled: query !== "add",
  });

  const { mutate } = useMutation({
    mutationKey: ["patients"],
    mutationFn: (data: Doctor) =>
      editablePatient?._id
        ? PatientService.update(editablePatient._id, data)
        : PatientService.create(data),
  });

  const { mutate: deletePatient } = useMutation({
    mutationKey: ["patients"],
    mutationFn: () => PatientService.deleteById(editablePatient?._id as string),
  });

  const form = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    values: {
      firstName: editablePatient?.name?.split(" ")[0] || "",
      lastName: editablePatient?.name?.split(" ")[1] || "",
      gender: editablePatient?.gender || "",
      phone: editablePatient?.phone || "",
      nic: editablePatient?.nic || "",
      address: editablePatient?.address || "",
    },
  });

  const onSubmit = (data: z.infer<typeof patientFormSchema>) => {
    const patient: Patient = {
      name: data.firstName + " " + data.lastName,
      phone: data.phone,
      gender: data.gender,
      nic: data.nic,
      address: data.address,
    };

    mutate(patient);
  };

  const handleReset = () => {
    form.reset({
      firstName: "",
      lastName: "",
      gender: "",
      phone: "",
      nic: "",
      address: "",
    });
  };

  return (
    <div className="rounded-md py-4 px-5 bg-white">
      <FormHeader
        title={`${query === "add" ? "Add" : "Edit"} Patient`}
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
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <span className="text-red-500">* </span>
                      Address
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
                  type="button"
                  onClick={() => deletePatient()}
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

export default PatientForm;
