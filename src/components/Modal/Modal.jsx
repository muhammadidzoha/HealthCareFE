import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

export default function Modal({isOpen = false, setIsOpen = () => {}, title = "", children}) {

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="default">Buka Modal</Button>
      </DialogTrigger> */}
      <DialogContent forceMount className="pointer-events-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        {/* <Button onClick={() => setIsOpen(false)}>Tutup</Button> */}
      </DialogContent>
    </Dialog>
  );
}
