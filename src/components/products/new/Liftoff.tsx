'use client';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import TagInput from './Taginput';
import {usePrivy, useWallets} from '@privy-io/react-auth';
import {ethers} from 'ethers';
import {podsContractAddress} from '../../../../utils/constants';
import {podsABI} from '../../../../utils/abi';

const LiftOff = (props: any) => {
  const {user} = usePrivy();
  const {wallets} = useWallets();
  const {formData, setFormData} = props;
  const [tags, setTags] = useState(formData.tags);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    console.log(value);
    setFormData({...formData, [name]: value});
  };
  const wallet = wallets[0];

  async function signMessage() {
    if (user) {
      const provider = await wallet.getEthersProvider();
      await wallet.switchChain(84532);
      const signer = provider.getSigner();
      const helloWorldContract = new ethers.Contract(podsContractAddress, podsABI, signer);
      const count = await helloWorldContract.getProductsCount();
      console.log(count);
    }
  }

  useEffect(() => {
    setFormData({...formData, tags: tags});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-8 font-primary">
      <div className="w-full flex flex-col sm:flex-row justify-start items-start gap-10 md:gap-16">
        <div className="h-[80vh] aspect-square flex flex-row justify-center items-center relative rounded-lg border border-cardGray-700 hover:border-gray-700 group">
          <Image
            src={'/onlyframes.png'}
            alt="Logo"
            fill={true}
            style={{objectFit: 'contain'}}
            loading="lazy"
            className="group-hover:scale-110 transition-transform duration-75"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vh, 80vh"
          />
        </div>
        <div className="w-full h-full flex flex-col justify-start items-start gap-16">
          <div className="w-full h-full flex flex-col justify-start items-start flex-wrap gap-3">
            <h2 className="text-4xl text-teal-400 font-medium">{formData.name}</h2>
            <h3 className="font-mono truncate text-neutral-300">
              By {formData.author || '0x48574865465864658465846564'}
            </h3>
            <h1 className="text-5xl text-amber-400 font-thin">$ {formData.price}</h1>
          </div>
          <div className="w-full h-full flex flex-col justify-start items-start gap-8">
            <div className="w-full h-fit flex flex-col gap-3">
              <label htmlFor="CTA">
                <h1 className="text-xl text-neutral-200 font-semibold">Call To Action</h1>
              </label>
              <select
                id="CTA"
                name="CTA"
                onChange={handleInputChange}
                className="w-full bg-transparent text-teal-300 py-3 px-5 rounded-lg border border-neutral-400 hover:border-neutral-300 appearance-none"
                required
                value={formData.CTA}
              >
                <option value="option1">Buy Now</option>
                <option value="option2">I want this!</option>
                <option value="option3">Get this now</option>
                <option value="option4">Pay</option>
              </select>
            </div>
            <TagInput tags={tags} setTags={setTags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiftOff;
