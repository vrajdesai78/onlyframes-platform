"use client";
import { useState } from "react";
import ProductRow from "./rows";
import { ChevronLeft, ChevronRight } from "@/icons";

const ProductTable = (props: any) => {
  const { productsData } = props;
  const [baseIdx, setBaseIdx] = useState(0);
  const columns = [
    { id: "position", label: "Sl No." },
    { id: "title", label: "Title" },
    { id: "price", label: "Price" },
    { id: "status", label: "Status" },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-0 relative border border-teal-400 rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-md bg-gradient-to-br from-[#1c1c1c]/50 to-[#1f1f1f]/60 text-white">
      <table className="w-full h-full flex md:table overflow-auto table-auto text-sm text-left">
        <thead className="hidden md:table-header-group text-lg">
          <tr className="table-row text-teal-500 underline underline-offset-4 font-medium tracking-wider text-base">
            {columns.map((column) => (
              <th
                scope="col"
                className="table-cell text-left px-6 py-2"
                key={column.id}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full group divide-y md:divide-y-0 divide-cardGray-700">
          {productsData
            .slice(baseIdx, baseIdx + 5)
            .map((item: any, idx: any) => {
              return (
                <ProductRow key={item._id} idx={baseIdx + idx} {...item} />
              );
            })}
        </tbody>
      </table>
      <div className="w-full flex flex-row justify-between items-center px-10 py-2 gap-5 border-t border-teal-700  text-neutral-300 text-sm">
        <div className="w-fit h-full flex flex-row justify-start items-center">
          <h3>
            Showing {baseIdx} to {Math.min(baseIdx + 5, productsData.length)} of{" "}
            {productsData.length} entries
          </h3>
        </div>
        <div className="w-fit h-full flex flex-row justify-end items-center divide-x-2">
          <div
            className="w-fit h-full flex flex-row justify-around gap-2 items-center px-4 group hover:text-white"
            onClick={() => baseIdx >= 5 && setBaseIdx(baseIdx - 5)}
          >
            <div className="transform group-hover:-translate-x-1 transition-transform">
              <ChevronLeft className="w-3 h-3" />
            </div>
            <h5 className="hidden sm:flex">Newer</h5>
          </div>
          <div
            className="w-fit h-full flex flex-row justify-around gap-2 items-center px-4 group hover:text-white"
            onClick={() =>
              baseIdx < productsData.length - 5 && setBaseIdx(baseIdx + 5)
            }
          >
            <h5 className="hidden sm:flex">Older</h5>
            <div className="transform group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
