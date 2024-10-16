import React from "react";
import { Copy } from "lucide-react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

const CardIntro = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="font-semibold text-orange-400  mt-2 hover:bg-orange-300 hover:text-black"
        >
          Learn more
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-orange-400">Learn More</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet,
            sequi ipsam. Optio dolores nostrum assumenda veniam deleniti quia,
            corporis alias. Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Placeat, eveniet?
          </DialogDescription>
        </DialogHeader>
        {/* <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2"></div>
        </div> */}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardIntro;

// export function DialogCloseButton() {
//   return (
//   );
// }
