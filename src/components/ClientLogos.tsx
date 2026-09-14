import Image from "next/image";

const CLIENTS = [
  { name: "Sunjoy Group", src: "/images/clients/sunjoy-group.webp" },
  { name: "VLocker", src: "/images/clients/vlocker.webp" },
  { name: "STATS ChipPAC", src: "/images/clients/stats-chippac.webp" },
  { name: "Trelleborg", src: "/images/clients/trelleborg.webp" },
  { name: "Sevenjoy", src: "/images/clients/sevenjoy.webp" },
  { name: "Arte by Dr M", src: "/images/clients/arte-by-dr-m.webp" },
  { name: "Kroll", src: "/images/clients/kroll.webp" },
  { name: "ADM", src: "/images/clients/adm.webp" },
  { name: "OOM Institute", src: "/images/clients/oom-institute.webp" },
  { name: "DD", src: "/images/clients/dd.webp" },
  { name: "MCAS Darul Arqam", src: "/images/clients/mcas-darul-arqam.webp" },
] as const;

/** Client logo grid for the "Trusted By" sections on the homepage and
 * about page. */
export default function ClientLogos() {
  return (
    <div className="client-grid">
      {CLIENTS.map((client) => (
        <div key={client.name} className="client-logo" title={client.name}>
          <Image
            src={client.src}
            alt={`${client.name} client logo`}
            sizes="100px"
            width={1024}
            height={1024}
            className="h-14 w-14 rounded object-contain"
          />
        </div>
      ))}
    </div>
  );
}
