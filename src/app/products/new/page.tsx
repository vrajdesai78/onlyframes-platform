'use client';

import {NextPage} from 'next';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {ChevronLeft, ChevronRight} from '@/icons';
import {Breadcrumb, Customize, Launchpad, LiftOff} from '@/components';

enum Category {
  'Music Royalty',
  'NFT, Collectibles or Art',
  'Newsletter',
  'E book',
  'Course or Tutorial',
  'Digital Good',
  'Podcast',
  'Audiobook',
  'Physical Good',
  'Miscellaneous',
}

const CreateProduct: NextPage = () => {
  const tabItems = ['Launchpad', 'Customize', 'LiftOff'];
  const [activeTab, setActiveTabState] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: undefined,
    author: 'FID',
    genre: 'Miscellaneous',
    price: undefined,
    description: undefined,
    thumbnail: undefined,
    file_upload: undefined,
    CTA: 'Buy Now',
    tags: [],
  });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const setActiveTab = (newTab: number) => {
    if (newTab == 0) setActiveTabState(newTab);
    else if (newTab == 1) {
      formData.name && formData.genre && formData.price && setActiveTabState(newTab);
    } else if (newTab == 2) {
      formData.name &&
        formData.genre &&
        formData.price &&
        formData.description &&
        setActiveTabState(newTab);
    } else if (newTab === 3)
      formData.name && formData.genre && formData.price && formData.description && poster();
  };

  const poster = async () => {
    router.push('/products');
  };

  return (
    <div className="flex-1 w-full pt-40 pb-10 px-5 md:px-40 flex flex-col justify-start items-start">
      <div className="w-full flex flex-col justify-evenly items-center gap-8 relative">
        <div className="relative flex place-items-center before:absolute before:h-[50px] before:w-[180px] sm:before:h-[200px] md:before:w-[780px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[200px] sm:after:h-[180px] sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-teal-200 after:via-teal-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-teal-500 before:dark:opacity-10 after:dark:from-teal-400 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[260px] z-[-1]">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-title">
            What&apos;s brewing in your creative cauldron?
          </h1>
        </div>
        <form
          className="flex w-full flex-col justify-start items-start gap-10"
          onSubmit={handleSubmit}
        >
          <div className="w-full h-fit flex justify-between items-center font-primary">
            <Breadcrumb activeTab={activeTab} setActiveTab={setActiveTab} tabItems={tabItems} />
            <div className="w-60 h-fit flex flex-row justify-end gap-3">
              <button
                type="button"
                className="w-fit h-fit px-3 py-1.5 flex flex-row items-center justify-evenly gap-2 text-gray-300 border border-neutral-300 hover:border-neutral-400 font-normal rounded-lg group"
                onClick={() => setActiveTab(activeTab - 1)}
              >
                <div className="transform group-hover:-translate-x-1 transition-transform">
                  <ChevronLeft className="w-3 h-3" />
                </div>
                Back
              </button>
              <button
                type="submit"
                className="w-fit h-fit px-3 py-1.5 flex flex-row items-center justify-evenly gap-2 text-gray-300 border border-neutral-300 hover:border-neutral-400 font-normal rounded-lg group"
                onClick={() => setActiveTab(activeTab + 1)}
              >
                Next
                <div className="transform group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="w-3 h-3" />
                </div>
              </button>
            </div>
          </div>
          {activeTab === 0 && <Launchpad formData={formData} setFormData={setFormData} />}
          {activeTab === 1 && <Customize formData={formData} setFormData={setFormData} />}
          {activeTab === 2 && <LiftOff formData={formData} setFormData={setFormData} />}
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
