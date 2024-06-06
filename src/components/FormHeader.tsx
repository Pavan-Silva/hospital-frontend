import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { IoMdRefresh } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const FormHeader = ({
  title,
  url,
  handleFormRefresh,
}: {
  title: string;
  url: string;
  handleFormRefresh: () => void;
}) => {
  return (
    <div className="flex items-center">
      <div>
        <div className="flex gap-2">
          <Link to={`/${url.split("/")[1]}`}>
            <Button variant="ghost" size="icon" className="-ml-2">
              <FaArrowLeft className="size-5" />
            </Button>
          </Link>

          <span className="text-3xl font-semibold -ml-1">{title}</span>
        </div>

        <Breadcrumb className="mt-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            {url.split("/").map((item, index) =>
              url.split("/").length - 1 !== index ? (
                <>
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={`/${item}`} className="capitalize">
                      {item}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator key={item} />
                </>
              ) : (
                <BreadcrumbItem key={index}>
                  <BreadcrumbPage className="capitalize">{item}</BreadcrumbPage>
                </BreadcrumbItem>
              )
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Button
        variant="outline"
        className="ml-auto text-gray-600"
        onClick={handleFormRefresh}
      >
        <IoMdRefresh className="mr-2 size-4" />
        Refresh
      </Button>
    </div>
  );
};
export default FormHeader;
