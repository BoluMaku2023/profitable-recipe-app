import Link from "next/link";
import Image from "next/image";

export default function LogoText() {
  return (
    <Link className="w-fit" href="/dashboard">
      <div className="flex items-center gap-2 w-fit justify-start px-2">
        <div className="relative">
          <Image
            src="/images/recipe_logo.png"
            width={30}
            height={30}
            alt="ProfitTable_logos"
            className="object-contain w-10"
          />
        </div>
        <h2 className="text-[20px] text-bgYellow uppercase font-semibold">ProfiTable</h2>
      </div>
    </Link>
  );
}
