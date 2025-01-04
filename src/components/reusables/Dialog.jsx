import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DialogComponent = (props) => {
  return (
    <Dialog>
      <DialogTrigger>{props.title}</DialogTrigger>
      <DialogContent className="h-[80vh]">
        <DialogHeader>
          <DialogTitle>{props.subtitle}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        {props.form && props.form}
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
