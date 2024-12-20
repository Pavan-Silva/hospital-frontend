import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import AppointmentService from "@/services/AppointmentService";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import DoctorService from "@/services/DoctorService";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { appointmentFormSchema } from "@/features/appointments/FormSchema";
import { Doctor } from "../doctors/Columns";
import { Appointment } from "./Columns";
import { useToast } from "@/hooks/useToast";
import { useDialog } from "@/hooks/useDialog";

const AppointmentForm = () => {
  const { query } = useParams();
  const location = useLocation();
  const toast = useToast();
  const dialog = useDialog();
  const navigate = useNavigate();

  const {
    data: editableAppointment,
    error,
    isLoading,
  } = useQuery<Appointment>({
    queryKey: ["appointments"],
    queryFn: () => AppointmentService.getById(query as string),
    enabled: query !== "add",
  });

  const {
    data: doctors,
    error: doctorsError,
    isLoading: doctorsAreLoading,
  } = useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: () => DoctorService.getAll(),
  });

  const { mutate } = useMutation({
    mutationKey: ["appointments"],
    mutationFn: (data: Appointment) =>
      editableAppointment?._id
        ? AppointmentService.update(editableAppointment?._id, data)
        : AppointmentService.create(data),

    onError: () => toast.error(),
    onSuccess: () => {
      toast.success();
      navigate("/appointments");
    },
  });

  const { mutate: deleteAppointment } = useMutation({
    mutationKey: ["appointments"],
    mutationFn: () =>
      AppointmentService.deleteById(editableAppointment?._id as string),

    onError: () => toast.error(),
    onSuccess: () => {
      toast.success();
      navigate("/appointments");
    },
  });

  const form = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
    values: {
      patientId: editableAppointment?.patientId || "",
      doctor: editableAppointment?.doctorId || "",
      date: editableAppointment?.date || new Date().toDateString(),
    },
  });

  const onSubmit = (data: z.infer<typeof appointmentFormSchema>) => {
    const appointment: Appointment = {
      patientId: data.patientId,
      doctorId: data.doctor,
      date: data.date,
    };

    dialog.open(`${query === "add" ? "Create" : "Edit"} Appointment`, () => {
      mutate(appointment);
    });
  };

  const handleReset = () => {
    form.reset({
      patientId: "",
      doctor: "",
      date: new Date().toDateString(),
    });
  };

  return (
    <div className="rounded-md py-4 px-5 bg-white">
      <FormHeader
        title={`${query === "add" ? "Add" : "Edit"} Appointment`}
        url={location.pathname}
        handleFormRefresh={handleReset}
      />

      {error || doctorsError ? (
        <ErrorBox
          message={
            error?.message || doctorsError?.message || "Something went wrong"
          }
        />
      ) : null}

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
                name="patientId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <span className="text-red-500">* </span>
                      Patient Id
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
                name="doctor"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <span className="text-red-500">* </span>
                      Doctor
                    </FormLabel>

                    <FormMessage className="ml-1 inline" />

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={
                              doctorsError !== null || doctorsAreLoading
                            }
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value && doctors
                              ? doctors?.find(
                                  (doctor) => doctor._id === field.value
                                )?.name
                              : "Select doctor"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      {doctors && (
                        <PopoverContent className="w-[500px] p-0">
                          <Command>
                            <CommandInput placeholder="Search doctor..." />
                            <CommandEmpty>Doctor not found.</CommandEmpty>

                            <CommandList>
                              {doctors?.map((doctor, index) => (
                                <CommandItem
                                  value={doctor.name}
                                  key={index}
                                  onSelect={() => {
                                    form.setValue(
                                      "doctor",
                                      doctor._id as string
                                    );
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      doctor._id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {doctor.name}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      )}
                    </Popover>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-5 items-center">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <span className="text-red-500">* </span>
                      Date
                    </FormLabel>

                    <FormMessage className="ml-1 inline" />

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={(date) => {
                            form.setValue(
                              "date",
                              date?.toDateString() as string
                            );
                          }}
                          disabled={(date: Date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant={"outline"}
                className="mt-auto text-purple border-purple border-opacity-50 hover:bg-purple hover:bg-opacity-5 hover:text-purple"
              >
                <FaRegSave className="mr-2 size-4" />
                Check Availability
              </Button>
            </div>

            <div className="flex gap-3 ml-auto mt-3 mb-1">
              {query !== "add" && (
                <Button
                  variant="outline"
                  type="button"
                  className="text-red-500 border-red-100"
                  onClick={() => {
                    dialog.open("Delete Appointment", () => {
                      deleteAppointment();
                    });
                  }}
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

export default AppointmentForm;
