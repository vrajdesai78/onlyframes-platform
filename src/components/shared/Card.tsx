'use client';
import {useRouter} from 'next/navigation';
/* eslint-disable @next/next/no-img-element -- To avoid img element warning */
import React, {useState} from 'react';

interface Card {
  name: string;
  price: number;
  image: string;
  label: React.ReactElement;
  link: string;
}

const Card = ({name, price, image, label, link}: Card) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="flex flex-col w-fit bg-[#141414] bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-xl shadow-md p-6">
      <img
        src={image}
        alt={name}
        width={300}
        height={300}
        className="object-fill bg-amber-400 rounded-xl"
      />
      <h2 className="text-xl text-teal-400 font-primary font-medium truncate mt-3">{name}</h2>
      <span className="flex flex-row justify-between items-center">
        <p className="text-gray-300 font-primary font-normal">{price} ETH</p>
        <button
          onClick={() => {}}
          className="bg-gradient-to-br from-[#ffd84b] from-[20%] to-[#b67e2b] hover:from-[#ffd643] hover:from-[20%] hover:to-[#c18d40] font-primary font-medium items-center rounded-lg px-5 py-1.5 disabled:opacity-70 disabled:cursor-progress"
          disabled={isLoading}
        >
          {label}
        </button>
      </span>
    </div>
  );
};

export default Card;
