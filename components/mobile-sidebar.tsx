"use client"


import { X } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import logo from "../public/images/logo2.png"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] text-paragraph-md font-inter font-regular bg-white-50">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between text-paragraph-md font-inter font-regular">
          <Link className="flex items-center gap-2" href={"/"}>
          <Image src={logo} alt="Agrinet logo" className=" w-8 h-[24px] " />
            <p className="font-poppins text-heading-desktop-h6  font-semibold text-left text-secondary-700">
              CasClinique
            </p>
          </Link>

          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-8 mt-8 ml-10 text-paragraph-md font-inter font-regular">
          <Link
            href="/"
            className=" hover:text-accent-500 transition-colors"
            onClick={onClose}
          >
            Home
          </Link>

          <Link
            href="/filter"
            className=" hover:text-accent-500 transition-colors"
            onClick={onClose}
          >
            Formulaire
          </Link>
          <Link
            href="/home"
            className=" hover:text-accent-500 transition-colors"
            onClick={onClose}
          >
            Resultat
          </Link>
          <Link
            href="/history"
            className=" hover:text-accent-500 transition-colors"
            onClick={onClose}
          >
            Historique
          </Link>
          <Link
            href="/help"
            className=" hover:text-accent-500 transition-colors"
            onClick={onClose}
          >
            Aide
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

