import { DataTable } from "@/components/DataTable";
import ErrorBox from "@/components/ErrorBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Patient, columnsPatient } from "./Columns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import PatientService from "@/services/PatientService";
import { useQuery } from "@tanstack/react-query";
import { IoPersonAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Patients = () => {
  const { data, error, isLoading } = useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: PatientService.getAll,
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

        <Link to="/patients/add" className="ml-auto">
          <Button className="gap-2 bg-purple">
            <IoPersonAddOutline className="size-4" />
            Add Patient
          </Button>
        </Link>
      </div>

      <div className="mt-5">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorBox message={error.message} />
        ) : (
          <DataTable data={data || []} columns={columnsPatient} />
        )}
      </div>
    </div>
  );
};

export default Patients;
