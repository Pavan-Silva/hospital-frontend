import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { Doctor } from "../doctors/Columns";
import { Patient } from "../patients/Columns";

export type Appointment = {
  _id?: string;
  doctorId: string;
  patientId: string;
  date: string;
  doctor?: Doctor;
  patient?: Patient;
};

export const columnsAppointment: ColumnDef<Appointment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "doctor",
    accessorFn: (row) => row.doctor?.name,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Doctor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("doctor")}</div>
    ),
  },

  {
    accessorKey: "patient",
    accessorFn: (row) => row.patient?.name,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("patient")}</div>
    ),
  },

  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to={`/appointments/${appointment._id}`}>Edit</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
