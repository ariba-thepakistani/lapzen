import React from 'react';
import Image from 'next/image';

const TeamGrid = () => {
  const teamMembers = [
    {
      name: "Mr. ASIM",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/images/WhatsApp_Image_2025-11-01_at_9_41_48_AM-2.jpg",
      content: (
        <>
          <p className="mb-4">The Owner of <a href="/collections/all" className="text-[#002b5c] hover:underline">LAPZEN</a></p>
          <p className="mb-4">A Tech Enthusiast</p>
          <p className="mb-4">Founder of LAPZEN</p>
          <p>
            <strong>Any Query,</strong><br />
            Feel Free to contact us at <a href="https://wa.me/+9230900022" className="text-[#002b5c] hover:underline">Whatsapp</a>
          </p>
        </>
      )
    },
    {
      name: "Mr. KASHIF",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/images/images-3.png",
      content: (
        <>
          <p className="mb-4">The Developer of the store.</p>
          <p>Maintaining the Live Store <a href="/collections/all" className="text-[#002b5c] hover:underline">LAPZEN</a> for our valuable Customers.</p>
        </>
      )
    },
    {
      name: "Mrs. NIBA",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/images/download-4.jpg",
      content: (
        <>
          <p className="mb-4">
            Co-Founder of <a href="https://lapzen.store" className="text-[#002b5c] hover:underline">LAPZEN</a><br />
            The Marketing Mastermind of Team <a href="/collections/all" className="text-[#002b5c] hover:underline">LAPZEN</a>
          </p>
          <p className="mb-4">Digital Marketing Manager</p>
          <p>Social Media Marketer</p>
        </>
      )
    }
  ];

  return (
    <section className="bg-white">
      {/* Rich Text Intro Section */}
      <div className="py-[60px] px-5">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[64px] font-bold italic uppercase leading-[1.1] mb-4">
            LAPZEN
          </h2>
          <div className="text-[16px] text-black">
            <p>Introducing the tech team</p>
          </div>
        </div>
      </div>

      {/* Team Grid Section */}
      <div className="pb-[60px] px-5">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="flex flex-col animate--slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-full aspect-square overflow-hidden mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="text-[24px] font-semibold mb-4 leading-tight">
                    {member.name}
                  </h3>
                  <div className="text-[16px] leading-[1.6] text-[#000000]">
                    {member.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;