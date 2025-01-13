"use client"

import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type ClinicalCase = {
  id: string
  age: number
  sex: "male" | "female" | "other"
  weight: number
  consultationReason: string
  diagnosis: string
  treatment: string
}

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
  ]
  
  
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Age
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("age")}</div>,
    },
    {
      accessorKey: "sex",
      header: "Sex",
      cell: ({ row }) => <div className="capitalize">{row.getValue("sex")}</div>,
    },
    {
      accessorKey: "weight",
      header: () => <div className="text-right">Weight (kg)</div>,
      cell: ({ row }) => {
        const weight = parseFloat(row.getValue("weight"))
        return <div className="text-right font-medium">{weight}</div>
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
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const clinicalCase = row.original
  
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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(clinicalCase.id)}
              >
                Copy case ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View full case details</DropdownMenuItem>
              <DropdownMenuItem>Edit case</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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
  })

  // Function to generate the JSON file
  const generateJson = () => {
    const selectedCases = table.getSelectedRowModel().rows.map(row => row.original)
    const jsonBlob = new Blob([JSON.stringify(selectedCases, null, 2)], { type: 'application/json' })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(jsonBlob)
    link.download = "selected_clinical_cases.json"
    link.click()
  }

  return (
    <div className="w-full bg-white-50 p-2 rounded-md shadow-6dp font-inter">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by diagnosis..."
          value={(table.getColumn("diagnosis")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("diagnosis")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border-none ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
{/*           <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button> */}
          <Button
            size="sm"
            onClick={generateJson}
            disabled={table.getFilteredSelectedRowModel().rows.length === 0}
            className="bg-accent-600 text-white hover:bg-accent-500 text-white-50"
          >
            Generer
          </Button>
        </div>
      </div>
    </div>
  )
}
