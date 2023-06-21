import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useState } from "react";

type Image = {
  id: number;
  href: string;
  imageSrc: string;
  username: string;
};

export async function getStaticProps({ images }: { images: Image[] }) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );
  const { data } = await supabaseAdmin.from("images").select("*").order("id");
  return {
    props: {
      images: data,
    },
  };
}

export default function Gallery({ images }: { images: Image[] }) {
  return (
    <div>
      <div>
        {/* <Image src="https://demo-ngo.vercel.app/images/projects/3.jpg" /> */}
        {images.map(image=>(
          <BlurImage key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

function BlurImage({ image }: { image: Image }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <a href={image.href}>
      <div>
        <Image
          //src="https://demo-ngo.vercel.app/images/projects/3.jpg"
          src={image.imageSrc}
          alt="house"
          width={500}
          height={400}
          objectFit="cover"
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
    </a>
  );
}
