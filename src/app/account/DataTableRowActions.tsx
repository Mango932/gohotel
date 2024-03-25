import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Row } from "@tanstack/react-table";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    onDelete: (value: TData) => void;
}

const DataTableRowActions = <TData,>({
    row,
    onDelete,
}: DataTableRowActionsProps<TData>) => {
    return (
        <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            onClick={() => onDelete(row.original)}
        >
            <TrashIcon className="h-4 w-4" />
        </Button>
    );
};

export default DataTableRowActions;
