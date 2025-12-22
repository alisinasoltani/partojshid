"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  // DrawerDescription,
  // DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// A reusable component for list items within the dropdown
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

interface InputMenuItem {
  title: string;
  description: string;
  url: string;
}

interface InputMenu {
  title: string;
  menu_items: InputMenuItem[];
  url: string;
}

interface Input {
  logo: string;
  about: InputMenu;
  activities: InputMenu;
  projects: InputMenu;
  lodge: InputMenu;
  contact: InputMenu;
}

// Main Navbar Component
export default function Navbar({ input }: { input: Input }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper component for mobile nav links to auto-close the drawer
  const MobileNavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className="block p-2 rounded-md hover:bg-accent"
      onClick={() => setMobileMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-100 bg-white/30 backdrop-blur-md border-b border-gray-200/50">
      <div className="irsans_med container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 gap-x-6">

        {/* === Mobile Menu Button & Drawer === */}
        <div className="md:hidden">
          <Drawer
            open={mobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
            direction="left" // Opens from the left
          >
            <DrawerTitle></DrawerTitle>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent
              className="bg-white z-100 h-full max-w-xs"
              style={{ direction: "rtl" }} // Set drawer content to RTL
            >
              <nav className="p-4">

                {/* Accordion for nested links */}
                <Accordion type="single" collapsible className="w-full">
                  {
                    input?.projects?.menu_items?.length ?
                      <AccordionItem value="item-1">
                        <AccordionTrigger>{input.projects.title}</AccordionTrigger>
                        <AccordionContent className="pr-2">
                          {
                            input.projects.menu_items.map((project) => (
                              <MobileNavLink href={project.url}>
                                {project.title}
                              </MobileNavLink>
                            ))
                          }
                        </AccordionContent>
                      </AccordionItem>
                      :
                      <MobileNavLink href={input.projects.url}>
                        {input.projects.title}
                      </MobileNavLink>
                  }

                  {/* فعالیت ها */}
                  {
                    input.activities.menu_items.length ?
                      <AccordionItem value="item-2">
                        <AccordionTrigger>{input.activities.title}</AccordionTrigger>
                        <AccordionContent className="pr-2">
                          {
                            input.activities.menu_items.map((project) => (
                              <MobileNavLink href={project.url}>
                                {project.title}
                              </MobileNavLink>
                            ))
                          }
                        </AccordionContent>
                      </AccordionItem>
                      :
                      <MobileNavLink href={input.activities.url}>
                        {input.activities.title}
                      </MobileNavLink>
                  }

                  {/* درباره ما */}
                  {
                    input.about.menu_items.length ?
                      <AccordionItem value="item-3">
                        <AccordionTrigger>{input.about.title}</AccordionTrigger>
                        <AccordionContent className="pr-2">
                          {
                            input.about.menu_items.map((project) => (
                              <MobileNavLink href={project.url}>
                                {project.title}
                              </MobileNavLink>
                            ))
                          }
                        </AccordionContent>
                      </AccordionItem>
                      :
                      <MobileNavLink href={input.about.url}>
                        {input.about.title}
                      </MobileNavLink>
                  }
                </Accordion>

                {/* Simple Links */}
                {
                  input?.lodge?.menu_items?.length ?
                    <AccordionItem value="item-4">
                      <AccordionTrigger>{input.lodge.title}</AccordionTrigger>
                      <AccordionContent className="pr-2">
                        {
                          input.lodge.menu_items.map((project) => (
                            <MobileNavLink href={project.url}>
                              {project.title}
                            </MobileNavLink>
                          ))
                        }
                      </AccordionContent>
                    </AccordionItem>
                    :
                    <MobileNavLink href={input.lodge.url}>
                      {input.lodge.title}
                    </MobileNavLink>
                }

                {
                  input?.contact?.menu_items?.length ?
                    <AccordionItem value="item-5">
                      <AccordionTrigger>{input.contact.title}</AccordionTrigger>
                      <AccordionContent className="pr-2">
                        {
                          input.contact.menu_items.map((project) => (
                            <MobileNavLink href={project.url}>
                              {project.title}
                            </MobileNavLink>
                          ))
                        }
                      </AccordionContent>
                    </AccordionItem>
                    :
                    <MobileNavLink href={input.contact.url}>
                      {input.contact.title}
                    </MobileNavLink>
                }
              </nav>
            </DrawerContent>
          </Drawer>
        </div>

        <div></div>

        {/* === Desktop Navigation Menu === */}
        <NavigationMenu className="hidden md:flex md:justify-between">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="#contact"
                  className={navigationMenuTriggerStyle()}
                >
                  تماس با ما
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/lodge" className={navigationMenuTriggerStyle()}>
                  گروه ساختمانی لژ
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/projects" className={navigationMenuTriggerStyle()}>
                  پروژه ها
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="gap-1"
                style={{ direction: "rtl" }}
              >
                فعالیت ها
              </NavigationMenuTrigger>
              <NavigationMenuContent className="z-110 bg-white/98 backdrop-blur-md border-b border-gray-200">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]" style={{ direction: 'rtl' }}>
                  <ListItem
                    href="#"
                    title="طراحی و اجرا"
                    className="irsans_bold"
                  >
                    <span className="irsans_reg">
                      اجرای پروژه‌های ساختمانی از صفر تا صد.
                    </span>
                  </ListItem>
                  <ListItem
                    href="#"
                    title=" پروژه های پیش فروش"
                    className="irsans_bold"
                  >
                    <span className="irsans_reg">
                      پیش فروش پروژه های در حال ساخت گروه ساختمانی لژ.
                    </span>
                  </ListItem>
                  <ListItem
                    href="#"
                    title="پروژه های فعال"
                    className="irsans_bold"
                  >
                    <span className="irsans_reg text-[12px]">
                      پرتو جی شید با فعالیت در زمینه های ابنیه و تاسیسات در حال ادامه فعالیت های خود می باشد.
                    </span>
                  </ListItem>
                  <ListItem
                    href="#"
                    title="مشارکت در ساخت"
                    className="irsans_bold"
                  >
                    <span className="irsans_reg">
                      گروه ساختمانی لژ
                    </span>
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="gap-1"
                style={{ direction: "rtl" }}
              >
                درباره ما
              </NavigationMenuTrigger>
              <NavigationMenuContent className="z-110 bg-white/98 backdrop-blur-lg border-b border-gray-200">
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]" style={{ direction: 'rtl' }}>
                  {/* <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          گروه ساختمانی لژ
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          پیشرو در ساخت و ساز مدرن و با کیفیت.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li> */}
                  <ListItem href="/about/history" title="در یک نگاه">

                  </ListItem>
                  <ListItem href="/about/team" title="تاریخچه">

                  </ListItem>
                  <ListItem href="/about/values" title="استراتژی">

                  </ListItem>
                  <ListItem href="/about/values" title="مدیریت">

                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* === Logo === */}
        <div className="flex items-center">
          <Link href="/">
            <Image src={input.logo} alt="Logo" width={40} height={40} />
          </Link>
        </div>
      </div>
    </header>
  );
}