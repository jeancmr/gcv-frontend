import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface NovedadesAlertDialogProps {
  isDraftDialogOpen: boolean;
  setIsDraftDialogOpen: (open: boolean) => void;
  handleSaveDraft: () => void;
}

export const NovedadesAlertDialog = ({
  isDraftDialogOpen,
  setIsDraftDialogOpen,
  handleSaveDraft,
}: NovedadesAlertDialogProps) => {
  return (
    <AlertDialog open={isDraftDialogOpen} onOpenChange={setIsDraftDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Guardar novedad como borrador</AlertDialogTitle>
          <AlertDialogDescription>
            El formulario está completo. Si guardas ahora, la novedad quedará en estado borrador
            para que puedas revisarla después.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Seguir editando</AlertDialogCancel>
          <AlertDialogAction onClick={handleSaveDraft}>Guardar borrador</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
