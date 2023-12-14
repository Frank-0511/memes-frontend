import {
  Button,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { Key, useEffect, useState } from "react";

import Image from "next/image";
import { MaterialSymbolsDelete } from "@/assets/icons/MaterialSymbolsDelete";
import { MaterialSymbolsEdit } from "@/assets/icons/MaterialSymbolsEdit";
import { MdiEye } from "@/assets/icons/MdiEye";
import { useMemesContext } from "@/context/MemeContext";

const TableMemes = () => {
  const { memes, page, setPage, totalPage, loading, pageSize, setPageSize } =
    useMemesContext();
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    setInitialLoading(false);
  }, []);

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
        totalPage > 0 ? (
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

            <Select
              className="max-w-[70px] ml-4"
              style={{ height: "36px" }}
              selectedKeys={[pageSize] as Key[]}
              onSelectionChange={(selectedKeys) =>
                setPageSize(Array.from(selectedKeys)[0] as number)
              }
            >
              {[
                {
                  label: "5",
                  value: 5,
                },
                {
                  label: "10",
                  value: 10,
                },
                {
                  label: "15",
                  value: 15,
                },
                {
                  label: "20",
                  value: 20,
                },
              ].map((pageSize) => (
                <SelectItem key={pageSize.value} value={pageSize.value}>
                  {pageSize.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        ) : null
      }
      classNames={{
        wrapper: "bg-transparent shadow-none",
        table: "bg-sky-100  rounded-lg min-h-[400px]",
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
      <TableBody
        items={memes}
        loadingContent={<Spinner label="Loading..." />}
        loadingState={initialLoading || loading ? "loading" : "idle"}
      >
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
