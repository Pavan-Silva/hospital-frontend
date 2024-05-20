import {
  Appointment,
  columnsAppointment,
} from "@/components/appointments/Columns";
import { DataTable } from "@/components/DataTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/appointments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setAppointments(data));
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

        <Link to="/" className="ml-auto">
          <Button className="gap-2 bg-purple">
            <IoPersonAddOutline className="size-4" />
            Add Appointment
          </Button>
        </Link>
      </div>

      <div className="mt-5">
        <DataTable data={appointments} columns={columnsAppointment} />
      </div>
    </div>
  );
};

export default Appointments;
