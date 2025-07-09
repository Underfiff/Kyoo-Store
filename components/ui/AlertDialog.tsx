import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";

interface CustomAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const CustomAlertDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: CustomAlertDialogProps) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger asChild>
        
      </AlertDialog.Trigger>
      <AlertDialog.Content className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
        {/* Ensure the title is present for accessibility */}
        <AlertDialog.Title className="sr-only">
          Konfirmasi Hapus
        </AlertDialog.Title>

        <div className="text-lg font-semibold mb-4">Konfirmasi Hapus</div>
        <p className="text-sm mb-6">
          Yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="flex justify-end gap-2">
          <AlertDialog.Cancel asChild>
            <Button variant="outline">Batal</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button onClick={onConfirm} variant="destructive">
              Hapus
            </Button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
