import {
  Appointment,
  columnsAppointment,
} from "@/components/appointments/Columns";
import { DataTable } from "@/components/DataTable";
import ErrorBox from "@/components/ErrorBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import AppointmentService from "@/services/AppointmentService";
import { useQuery } from "@tanstack/react-query";
import { IoPersonAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Appointments = () => {
  const { data, error, isLoading } = useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: AppointmentService.getAll,
  });

  return (
    <div className="bg-white rounded-md py-3 px-5">
      <div className="flex items-center">
        <div>
          <span className="text-3xl font-semibold -ml-1">Appointments</span>

          <Breadcrumb className="mt-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>Appointments</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Link to="/appointments/add" className="ml-auto">
          <Button className="gap-2 bg-purple">
            <IoPersonAddOutline className="size-4" />
            Add Appointment
          </Button>
        </Link>
      </div>

      <div className="mt-5">
        {isLoading || !data ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorBox message={error.message} />
        ) : (
          <DataTable data={data} columns={columnsAppointment} />
        )}
      </div>
    </div>
  );
};

export default Appointments;
