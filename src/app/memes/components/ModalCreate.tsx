import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { MouseEvent, useRef, useState } from "react";

import FormCreate from "./FormCreate";

const ModalCreate = () => {
  const [isOpen, setOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onClose = () => setOpen(false);

  const handleCreate = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <>
      <Button color="primary" size="md" onClick={() => setOpen(true)}>
        Crear
      </Button>
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Meme
              </ModalHeader>
              <ModalBody>
                <FormCreate formRef={formRef} setSubmitting={setSubmitting} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={handleCreate}>
                  Crear
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCreate;
