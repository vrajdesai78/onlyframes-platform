import { AddBtn, ProductTable, StatsCard } from "@/components";
import { NextPage } from "next";

const statsData = [
  {
    label: "Total Products",
    desc: "Total number of products you have in your store",
    value: 16,
  },
  {
    label: "Total Sales",
    desc: "Total number of products sold",
    value: 9,
  },
  {
    label: "Total Revenue",
    desc: "Total revenue generated from sales",
    value: "$569",
  },
  {
    label: "Active Customers",
    desc: "Recurring customer count in your store",
    value: "47",
  },
];

const productsData = [
  {
    title: "Product 1",
    description: "Product 1 description",
    price: 100,
    status: "Active",
    _id: "1",
    id: 1,
    idx: 0,
  },
  {
    title: "Product 2",
    description: "Product 2 description",
    price: 200,
    status: "Inactive",
    _id: "2",
    id: 2,
    idx: 1,
  },
  {
    title: "Product 3",
    description: "Product 3 description",
    price: 300,
    status: "Active",
    _id: "3",
    id: 3,
    idx: 2,
  },
  {
    title: "Product 4",
    description: "Product 4 description",
    price: 400,
    status: "Inactive",
    _id: "4",
    id: 4,
    idx: 3,
  },
  {
    title: "Product 5",
    description: "Product 5 description",
    price: 500,
    status: "Active",
    _id: "5",
    id: 5,
    idx: 4,
  },
  {
    title: "Product 6",
    description: "Product 6 description",
    price: 600,
    status: "Inactive",
    _id: "6",
    id: 6,
    idx: 5,
  },
  {
    title: "Product 7",
    description: "Product 7 description",
    price: 700,
    status: "Active",
    _id: "7",
    id: 7,
    idx: 6,
  },
  {
    title: "Product 8",
    description: "Product 8 description",
    price: 800,
    status: "Inactive",
    _id: "8",
    id: 8,
    idx: 7,
  },
  {
    title: "Product 9",
    description: "Product 9 description",
    price: 900,
    status: "Active",
    _id: "9",
    id: 9,
    idx: 8,
  },
  {
    title: "Product 10",
    description: "Product 10 description",
    price: 1000,
    status: "Inactive",
    _id: "10",
    id: 10,
    idx: 9,
  },
];

const Products: NextPage = () => {
  return (
    <div className="flex-1 w-full pt-40 pb-5 px-5 md:px-40 overflow-visible flex flex-col justify-start items-start">
      <div className="w-full flex flex-col justify-evenly items-center gap-8 relative">
        <div className="relative flex place-items-center before:absolute before:h-[50px] before:w-[180px] sm:before:h-[200px] md:before:w-[780px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[200px] sm:after:h-[180px] sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-teal-200 after:via-teal-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-teal-500 before:dark:opacity-10 after:dark:from-teal-400 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[260px] z-[-1]">
          <h1 className="text-5xl lg:text-6xl text-white font-title">
            Your growth
          </h1>
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-end items-center z-0">
          <AddBtn />
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 justify-evenly items-center gap-4">
          {statsData.map((item) => {
            return <StatsCard key={item.label} {...item} />;
          })}
        </div>
        <ProductTable productsData={productsData} />
      </div>
    </div>
  );
};

export default Products;
