import React from 'react';
import DOMPurify from 'dompurify';

const Card: React.FC<{ status: string, title: string, id: string, description: string }> = ({ title, description, status }: any) => {
  const descriptionString = typeof description === 'string' ? description : '';

  const modifiedDescription = descriptionString.replace(/<a href=/gmi, '<a target="_blank" href=');

  const sanitizedDescription = DOMPurify.sanitize(modifiedDescription);

  return (
    <div
      className="relative flex flex-col bg-clip-border rounded-xl bg-gradient-to-br from-[#802BB1] to-[#0024C0] text-white shadow-gray-500 shadow-md w-full max-w-[40rem] p-8 mb-4">
      <div
        className="relative pb-2 m-0 mb-2 overflow-hidden text-center text-gray-700 bg-transparent border-b rounded-none shadow-none bg-clip-border border-white/30">
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-white uppercase">
          {status}
        </p>
        <h1 className="flex justify-center gap-1 mt-2 font-sans antialiased font-normal tracking-normal text-white text-xl">
          {title}
        </h1>
      </div>
      <div className="p-0">
        <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit" dangerouslySetInnerHTML={{ __html: sanitizedDescription }}>
        </p>
      </div>
    </div>
  );
}

export default Card;
