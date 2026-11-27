import Image from "next/image";
import Link from "next/link";

export function StoreLogo() {
  return (
    <Link href="/" aria-label="ChocoFest BD home" className="flex flex-none items-center max-[900px]:mr-auto">
      <Image
        src="/brand/logo.png"
        alt="ChocoFest BD"
        width={641}
        height={360}
        preload
        className="block h-[62px] w-auto max-[900px]:h-11 max-[360px]:hidden"
      />
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={400}
        height={256}
        className="hidden h-[34px] w-auto max-[360px]:block"
      />
    </Link>
  );
}
