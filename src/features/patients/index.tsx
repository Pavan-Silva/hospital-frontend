import { DataTable } from "@/components/DataTable";
import { Patient, columnsPatient } from "@/components/patients/Columns";
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

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/patients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setPatients(data));
  });

  return (
    <div className="bg-white rounded-md py-3 px-5">
      <div className="flex items-center">
        <div>
          <span className="text-3xl font-semibold -ml-1">Patients</span>

          <Breadcrumb className="mt-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>Patients</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Link to="/" className="ml-auto">
          <Button className="gap-2 bg-purple">
            <IoPersonAddOutline className="size-4" />
            Add Patient
          </Button>
        </Link>
      </div>

      <div className="mt-5">
        <DataTable data={patients} columns={columnsPatient} />
      </div>
    </div>
  );
};

export default Patients;
