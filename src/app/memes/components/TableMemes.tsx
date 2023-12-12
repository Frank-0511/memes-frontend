import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";

import Image from "next/image";
import { Key } from "react";
import { MaterialSymbolsDelete } from "@/assets/icons/MaterialSymbolsDelete";
import { MaterialSymbolsEdit } from "@/assets/icons/MaterialSymbolsEdit";
import { MdiEye } from "@/assets/icons/MdiEye";
import { useMemesContext } from "@/context/MemeContext";

const TableMemes = () => {
  const { memes, page, setPage, totalPage } = useMemesContext();

  const renderTableCell = (columnKey: Key, item: any) => {
    if (columnKey === "actions")
      return (
        <div className="flex flex-col gap-y-4 w-full">
          <Button
            aria-label="Visualizar"
            className="w-min px-4 flex !gap-x-2"
            color="default"
            isIconOnly
            variant="light"
          >
            <MdiEye height={16} width={16} />
            <span>Visualizar</span>
          </Button>
          <Button
            aria-label="Editar"
            className="w-min px-4 flex !gap-x-2"
            color="primary"
            isIconOnly
            variant="light"
          >
            <MaterialSymbolsEdit height={16} width={16} /> Editar
          </Button>
          <Button
            aria-label="Eliminar"
            className="w-min px-4 flex !gap-x-2"
            color="danger"
            isIconOnly
            variant="light"
          >
            <MaterialSymbolsDelete height={16} width={16} /> Eliminar
          </Button>
        </div>
      );
    if (columnKey === "url")
      return (
        <Image
          alt={getKeyValue(item, "name")}
          height={100}
          loader={() => getKeyValue(item, columnKey)}
          src={getKeyValue(item, columnKey)}
          unoptimized
          width={200}
        />
      );
    return getKeyValue(item, columnKey);
  };

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={totalPage}
            onChange={(page: number) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px] bg-transparent shadow-none",
        table: "bg-sky-100  rounded-lg",
        th: "bg-sky-100 text-black text-lg",
      }}
      isStriped
    >
      <TableHeader>
        <TableColumn key="url" width={216}>
          Imagen
        </TableColumn>
        <TableColumn key="name">Nombre</TableColumn>
        <TableColumn key="numberOfLikes">Cantidad de likes</TableColumn>
        <TableColumn key="actions" width={300}>
          Acciones
        </TableColumn>
      </TableHeader>
      <TableBody items={memes}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>{renderTableCell(columnKey, item)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TableMemes;
