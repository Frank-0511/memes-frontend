import { MemeDefaultValues, MemeSchema, MemeSchemaType } from "./schema";
import { MutableRefObject, useEffect } from "react";

import InputCustom from "@/components/InputCustom";
import { createMemeApi } from "@/services/memes";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormCreateProps {
  formRef: MutableRefObject<HTMLFormElement | null>;
  setSubmitting: (value: boolean) => void;
}

const FormCreate = ({ formRef, setSubmitting }: FormCreateProps) => {
  const { data: session } = useSession();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<MemeSchemaType>({
    resolver: zodResolver(MemeSchema),
    defaultValues: MemeDefaultValues,
  });

  useEffect(() => {
    if (!isSubmitting) return;
    setSubmitting(isSubmitting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting]);

  const onSubmit = async (data: MemeSchemaType) => {
    if (!session) {
      return;
    }
    const response = await createMemeApi(data, session.user.token);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <InputCustom
        className="mb-4"
        control={control}
        name="name"
        label="Nombre"
        placeholder="Nombre"
      />
      <InputCustom
        className="mb-4"
        control={control}
        name="description"
        label="Descripción"
        placeholder="Descripción"
      />
      <InputCustom
        className="mb-4"
        control={control}
        name="url"
        label="Imagen"
        placeholder="Imagen"
      />
      <InputCustom
        className="mb-4"
        control={control}
        name="numberOfLikes"
        label="Cantidad de likes"
        placeholder="Cantidad de likes"
        type="number"
      />
      <InputCustom
        className="mb-4"
        control={control}
        name="numberOfComments"
        label="Cantidad de comentarios"
        placeholder="Cantidad de comentarios"
        type="number"
      />
    </form>
  );
};

export default FormCreate;
