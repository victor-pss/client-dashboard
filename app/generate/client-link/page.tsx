'use client';
import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import CryptoJS from 'crypto-js';
import Nav from '../../components/Nav';

interface Inputs {
  clientId: string
}

export default function Generator() {
  const [clientURL, setClientURL] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    const secretKey: any = process.env.NEXT_PUBLIC_SECRET_ENC_KEY;
    const encrypted = CryptoJS.AES.encrypt(data.clientId, secretKey);
    const encoded = encodeURIComponent(encrypted.toString());

    setCopied(false);
    if (typeof window !== 'undefined') {
      const path = location.protocol + '//' + location.host + '/client/' + encoded;
      setClientURL(path);
    } else {
      setClientURL('error: please contact the administrator');
    }
  }

  // console.log(watch("clientId"));

  const onClickHandler = () => {
    if (clientURL) {
      navigator.clipboard.writeText(clientURL);
      console.log('Copied to clipboard:', clientURL);
      setCopied(true);
    }
  }

  let tooltip = copied === false ? (
    <span className="absolute scale-0 transition-all rounded text-sm text-white group-hover:scale-100 border border-sky-500 px-2 ml-2 bg-sky-400">Click to copy!</span>
  ) : (
    <span className="absolute scale-100 transition-all rounded text-sm text-white border border-sky-500 px-2 ml-2 bg-sky-400">Link copied to Clipboard!</span>
  );

  return (
    <>
      <Nav clientId='' projectManager='' title='Generate Client Link'>
        <div className="m-auto mt-10">
          <form className='flex flex-col m-auto w-6/12' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col mb-3'>
              <label htmlFor="clientId" className="block mb-2 text-sm font-medium text-gray-700">Enter Client ID</label>
              <input className='bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5' required defaultValue="" {...register('clientId')} />
            </div>
            <input className='box-content bg-sky-400 border border-sky-50 rounded-lg p-2.5' type='submit' />
          </form>

          <div className="m-auto mt-10 w-6/12">
            <h2 className="text-gray-700">Client Link</h2>
            <div className="group relative flex">
              <p className="text-gray-700 text-sm" onClick={() => onClickHandler()}>{clientURL} {tooltip}</p>
            </div>
          </div>
        </div>
      </Nav >
    </>
  )
}
