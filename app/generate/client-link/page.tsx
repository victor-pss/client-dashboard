'use client';
import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import CryptoJS from 'crypto-js';

interface Inputs {
  clientId: string
}

export default function Generator() {
  const [clientURL, setClientURL] = React.useState<string | null>(null);

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

    if (typeof window !== 'undefined') {
      const path = location.protocol + '//' + location.host + '/client/' + encoded;
      setClientURL(path);
    } else {
      setClientURL('error: please contact the administrator');
    }
  }

  // console.log(watch("clientId"));

  return (
    <>
      <h2>Generator</h2>
      <form className='flex flex-col m-auto w-1/2' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col mb-3'>
          <label htmlFor="clientId">Client Id</label>
          <input className='text-gray-700 border-black rounded' defaultValue="PROJ.N." {...register('clientId')} />
        </div>
        <input className='box-content bg-sky-400 border-sky-50 rounded' type='submit' />
      </form>

      <h2 className="text-gray-700">{clientURL}</h2>
    </>
  )
}
