/* eslint-disable @next/next/no-img-element */
'use client';

import {useLogin, useLogout, usePrivy, useWallets} from '@privy-io/react-auth';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';
import {ethers} from 'ethers';
import {podsContractAddress} from '../../../utils/constants';
import {podsABI} from '../../../utils/abi';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const {ready, authenticated, user, createWallet} = usePrivy();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const {wallets} = useWallets();

  async function signMessage() {
    const wallet = wallets[0];
    const provider = await wallet.getEthersProvider();
    await wallet.switchChain(84532);
    const signer = provider.getSigner();
    const message = 'Hello, world!';
    const signature = await signer.signMessage(message);
    console.log('🔑 🎉 Signature', {signature});
    const podsContract = new ethers.Contract(podsContractAddress, podsABI, signer);
    const podsBalance = await podsContract.getProductsCount(wallet.address);
    console.log('🔑 🎉 Pods balance', {podsBalance});
  }

  async function createGate() {
    const res = await fetch('/api/dynamic', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Super User Gate - 3',
        outcome: 'scope',
        rules: [
          {
            address: {
              contractAddress: '0xF6a6a8bfE18aA7691713eeAbc30d8C48C821482b',
              networkId: 84532,
            },
            filter: {
              amount: 1,
            },
            type: 'nft',
          },
        ],
        scope: 'superuser',
      }),
    });
    const data = await res.json();
    console.log('🔑 🎉 Response', {data});
  }

  async function getReputationScore(username: string) {
    const res = await fetch('/api/karma3', {
      method: 'POST',
      body: JSON.stringify(username),
    });
    const data = await res.json();
    console.log('🔑 🎉 Response', {data});
  }

  const {login} = useLogin({
    async onComplete(user) {
      if (authenticated) {
        if (wallets.length === 0) {
          const res = createWallet();
          console.log('🔑 🎉 Wallet created', {res});
        }
      }
      console.log('🔑 🎉 User', {user});

      await createGate();
      setIsLoggedIn(true);
      console.log('🔑 🎉 Login success', {user});
      toast.success('Login successful!', {
        icon: '🎉',
        style: {
          borderRadius: '10px',
        },
      });
    },
    onError(error) {
      console.log('🔑 🚨 Login error', {error});
      toast.error('Login failed. Please try again.', {
        icon: '🚨',
        style: {
          borderRadius: '10px',
        },
      });
    },
  });

  const {logout} = useLogout({
    onSuccess: () => {
      toast.success('Logout successful!', {
        icon: '👋',
        style: {
          borderRadius: '10px',
        },
      });
      setIsLoggedIn(false);
    },
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-opacity-20 backdrop-filter backdrop-blur-md mx-5 md:mx-16 lg:mx-20 md:px-10 my-2 border border-neutral-600 bg-[#141414]/40 rounded-xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex">
          <Link
            href="/"
            className="self-center text-2xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffd84b] from-[20%] to-[#b67e2b] font-title font-semibold whitespace-nowrap"
          >
            OnlyFrames
          </Link>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg lg:hidden bg-gray-600/50 hover:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full lg:block lg:w-auto ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          id="navbar-default"
        >
          <ul className="font-medium font-primary flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-10 rtl:space-x-reverse md:mt-0">
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 ${
                  pathname === '/'
                    ? 'text-[#34d399] hover:text-white'
                    : 'text-gray-300 hover:text-[#34d399]'
                } rounded-lg hover:bg-neutral-900/40 md:hover:bg-transparent md:border-0 md:hover:text-[#34d399] md:p-0`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/discover"
                className={`block py-2 px-3 ${
                  pathname === '/discover'
                    ? 'text-[#34d399] hover:text-white'
                    : 'text-gray-300 hover:text-[#34d399]'
                } rounded-lg hover:bg-neutral-900/40 md:hover:bg-transparent md:border-0 md:hover:text-[#34d399] md:p-0`}
              >
                Discover
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={`block py-2 px-3 ${
                  pathname === '/products'
                    ? 'text-[#34d399] hover:text-white'
                    : 'text-gray-300 hover:text-[#34d399]'
                } rounded-lg hover:bg-neutral-900/40 md:hover:bg-transparent md:border-0 md:hover:text-[#34d399] md:p-0`}
              >
                Products
              </Link>
            </li>
          </ul>
          <div className="flex flex-row items-center font-primary gap-2">
            <button
              className="flex md:hidden w-fit px-5 py-2 text-neutral-700 bg-gradient-to-tr from-teal-400 to-amber-400 rounded-lg hover:from-teal-500 hover:to-amber-500 hover:text-gray-50 hover:shadow-lg"
              onClick={login}
              disabled={!ready || authenticated}
            >
              {isLoggedIn ? (
                <span className="flex flex-row items-center gap-x-4">
                  <img src={user?.farcaster?.pfp!} alt="icon" className="w-10 h-10 rounded-full" />
                  {user?.farcaster?.username}
                </span>
              ) : (
                'Connect Farcaster'
              )}
            </button>
            {isLoggedIn && (
              <button
                className="flex md:hidden w-fit px-5 py-1.5 text-neutral-300 border border-teal-400 hover:border-0 hover:bg-gradient-to-tr hover:from-teal-500 hover:to-amber-500 hover:text-gray-50 hover:shadow-lg rounded-lg"
                onClick={logout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <button
            className="hidden md:flex w-fit px-5 py-2 text-neutral-700 bg-gradient-to-tr from-teal-400 to-amber-400 rounded-lg hover:from-teal-500 hover:to-amber-500 hover:text-gray-50 hover:shadow-lg"
            onClick={login}
            disabled={!ready && authenticated}
          >
            {isLoggedIn ? (
              <span className="flex flex-row items-center gap-x-4">
                <img src={user?.farcaster?.pfp!} alt="icon" className="w-10 h-10 rounded-full" />
                {user?.farcaster?.username}
              </span>
            ) : (
              'Connect Farcaster'
            )}
          </button>
          {isLoggedIn && (
            <button
              className="hidden md:flex w-fit px-5 py-1.5 text-neutral-300 border border-teal-400 hover:border-0 hover:bg-gradient-to-tr hover:from-teal-500 hover:to-amber-500 hover:text-gray-50 hover:shadow-lg rounded-lg"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
