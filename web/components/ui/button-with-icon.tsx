"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ButtonWithIconProps {
  label?: string;
  href?: string;
  onClick?: () => void;
}

const ButtonWithIcon = ({ label = "Let's Collaborate", href, onClick }: ButtonWithIconProps) => {
  const inner = (
    <Button
      onClick={onClick}
      className="relative text-sm font-semibold rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer bg-[#3EBD7A] text-white hover:bg-[#30A868] border-0"
    >
      <span className="relative z-10 transition-all duration-500">{label}</span>
      <div className="absolute right-1 w-10 h-10 bg-white text-[#3EBD7A] rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </div>
    </Button>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }
  return inner;
};

export default ButtonWithIcon;
