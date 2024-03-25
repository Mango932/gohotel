import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    onDelete: (value: TData) => void;
}

const DataTableRowActions = <TData, >({row, onDelete}: DataTableRowActionsProps<TData>) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onDelete(row.original)}
              >
                Cancel Booking
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
    );
};


export default DataTableRowActions;