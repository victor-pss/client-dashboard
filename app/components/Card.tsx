import React from 'react';
import DOMPurify from 'dompurify';

const Card: React.FC<{ 
  status: string,
  title: string, 
  id: string,
  description: string,
  accent: string,
  primary: string,
  textColor: string,
  border: string }> = ({ 

  title,
  description,
  status,
  accent="#802BB1",
  primary="#0024C0",
  textColor="#fff",
  border }: any) => {

  const descriptionString = typeof description === 'string' ? description : '';

  const modifiedDescription = descriptionString.replace(/<a href=/gmi, `<a target="_blank" className="text-pretty" style={{ color: '${textColor}'}} href=`);

  const sanitizedDescription = DOMPurify.sanitize(modifiedDescription);

  return (
    <div 
      style={{ background: `linear-gradient(to bottom right, ${accent}, ${primary})`,
               color: `${textColor}`,
               border: `4px solid ${border}`,
               }}
      className={`relative flex flex-col bg-clip-border rounded-xl shadow-gray-500 shadow-md w-full max-w-[40rem] 2xl:max-w-full p-8 mb-4`}>
      <div
        className="relative pb-2 m-0 mb-2 overflow-hidden text-center bg-transparent border-b rounded-none shadow-none bg-clip-border border-white/30">
        <p className="block font-sans text-sm antialiased font-normal leading-normal uppercase">
          {status}
        </p>
        <h1 className="flex justify-center gap-1 mt-2 font-sans antialiased font-normal tracking-normal text-xl">
          {title}
        </h1>
      </div>
      <div className="p-0">
        <p className="block font-sans text-base antialiased font-normal text-pretty overflow-hidden leading-relaxed " dangerouslySetInnerHTML={{ __html: sanitizedDescription }}>
        </p>
      </div>
    </div>
  );
}

export default Card;
