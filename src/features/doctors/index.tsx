import { DataTable } from "@/components/DataTable";
import ErrorBox from "@/components/ErrorBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Doctor, columnsDoctor } from "@/components/doctors/Columns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import DoctorService from "@/services/DoctorService";
import { useQuery } from "@tanstack/react-query";
import { IoPersonAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Doctors = () => {
  const { data, error, isLoading } = useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: DoctorService.getAll,
  });

  return (
    <div className="bg-white rounded-md py-3 px-5">
      <div className="flex items-center">
        <div>
          <span className="text-3xl font-semibold -ml-1">Doctors</span>

          <Breadcrumb className="mt-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>Doctors</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Link to={`/doctors/add`} className="ml-auto">
          <Button className="gap-2 bg-purple">
            <IoPersonAddOutline className="size-4" />
            Add Doctor
          </Button>
        </Link>
      </div>

      <div className="mt-5">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorBox message={error.message} />
        ) : (
          <DataTable data={data || []} columns={columnsDoctor} />
        )}
      </div>
    </div>
  );
};

export default Doctors;
