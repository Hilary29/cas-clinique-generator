"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { utils, writeFile } from "xlsx";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type ClinicalCase = {
  id: string;
  age: number;
  sex: "male" | "female" | "other";
  weight: number;
  consultationReason: string;
  diagnosis: string;
  treatment: string;
};

const data: ClinicalCase[] = [
  {
    id: "case1",
    age: 45,
    sex: "male",
    weight: 80,
    consultationReason: "Toux persistante et fièvre",
    diagnosis: "Pneumonie",
    treatment: "Antibiotiques et repos",
  },
  {
    id: "case2",
    age: 32,
    sex: "female",
    weight: 65,
    consultationReason: "Maux de tête sévères",
    diagnosis: "Migraine",
    treatment: "Médicaments contre la douleur et changements de mode de vie",
  },
  {
    id: "case3",
    age: 58,
    sex: "male",
    weight: 90,
    consultationReason: "Douleur thoracique et essoufflement",
    diagnosis: "Infarctus du myocarde",
    treatment: "Angioplastie d'urgence et médication",
  },
  {
    id: "case4",
    age: 27,
    sex: "female",
    weight: 55,
    consultationReason: "Douleur abdominale et nausées",
    diagnosis: "Appendicite",
    treatment: "Appendicectomie",
  },
  {
    id: "case5",
    age: 70,
    sex: "female",
    weight: 68,
    consultationReason: "Douleur articulaire et raideur",
    diagnosis: "Arthrite rhumatoïde",
    treatment: "Médicaments anti-inflammatoires et thérapie physique",
  },
];

export const columns: ColumnDef<ClinicalCase>[] = [
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
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => <div>{row.getValue("age")}</div>,
  },
  {
    accessorKey: "sex",
    header: "Sex",
    cell: ({ row }) => <div className="capitalize">{row.getValue("sex")}</div>,
  },
  {
    accessorKey: "weight",
    header: "Weight (kg)",
    cell: ({ row }) => {
      const weight = parseFloat(row.getValue("weight"));
      return <div className="text-right font-medium">{weight}</div>;
    },
  },
  {
    accessorKey: "consultationReason",
    header: "Consultation Reason",
    cell: ({ row }) => <div>{row.getValue("consultationReason")}</div>,
  },
  {
    accessorKey: "diagnosis",
    header: "Diagnosis",
    cell: ({ row }) => <div>{row.getValue("diagnosis")}</div>,
  },
  {
    accessorKey: "treatment",
    header: "Treatment",
    cell: ({ row }) => <div>{row.getValue("treatment")}</div>,
  },
];

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [showPopup, setShowPopup] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const exportData = (format: "json" | "xml" | "csv" | "xls") => {
    const selectedCases = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);

    if (selectedCases.length === 0) {
      setShowPopup(true);
      return;
    }

    switch (format) {
      case "json":
        const jsonBlob = new Blob([JSON.stringify(selectedCases, null, 2)], {
          type: "application/json",
        });
        downloadFile(jsonBlob, "selected_clinical_cases.json");
        break;

      case "xml":
        const xmlContent = `
          <ClinicalCases>
            ${selectedCases
              .map(
                (caseData) => `
            <ClinicalCase>
              <id>${caseData.id}</id>
              <age>${caseData.age}</age>
              <sex>${caseData.sex}</sex>
              <weight>${caseData.weight}</weight>
              <consultationReason>${caseData.consultationReason}</consultationReason>
              <diagnosis>${caseData.diagnosis}</diagnosis>
              <treatment>${caseData.treatment}</treatment>
            </ClinicalCase>`
              )
              .join("")}
          </ClinicalCases>
        `;
        const xmlBlob = new Blob([xmlContent], { type: "application/xml" });
        downloadFile(xmlBlob, "selected_clinical_cases.xml");
        break;

      case "csv":
        const headers = Object.keys(selectedCases[0]);
        const csvContent = [
          headers.join(","),
          ...selectedCases.map((caseData) =>
            headers
              .map((header) => caseData[header as keyof ClinicalCase])
              .join(",")
          ),
        ].join("\n");
        const csvBlob = new Blob([csvContent], { type: "text/csv" });
        downloadFile(csvBlob, "selected_clinical_cases.csv");
        break;

      case "xls":
        const worksheet = utils.json_to_sheet(selectedCases);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Clinical Cases");
        writeFile(workbook, "selected_clinical_cases.xlsx");
        break;
    }
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className="w-full bg-white-50 p-2 rounded-md shadow-md font-inter">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="bg-white-50 p-4 rounded-md shadow-lg text-center">
            <p className="mb-4">Veuillez sélectionner au moins un élément avant de générer un fichier.</p>
            <Button
              onClick={() => setShowPopup(false)}
              className="bg-warning-300 text-white"
            >
              OK
            </Button>
          </div>
        </div>
      )}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by diagnosis..."
          value={
            (table.getColumn("diagnosis")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("diagnosis")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end space-x-2 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-accent-600 text-white-50">
              Exporter les données
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => exportData("json")}>
              JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportData("xml")}>
              XML
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportData("csv")}>
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportData("xls")}>
              XLS
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}