// /components/Navbar.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/favicon.ico";
import { Menu } from "lucide-react"; // Import the menu icon

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
  DrawerDescription,
  DrawerHeader,
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

// Main Navbar Component
export default function Navbar() {
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
                  {/* پروژه ها */}
                  <AccordionItem value="item-1">
                    <AccordionTrigger>پروژه ها</AccordionTrigger>
                    <AccordionContent className="pr-2">
                      <MobileNavLink href="/projects/residential">
                        پروژه‌های مسکونی
                      </MobileNavLink>
                      <MobileNavLink href="/projects/commercial">
                        پروژه‌های تجاری
                      </MobileNavLink>
                      <MobileNavLink href="/projects/completed">
                        پروژه‌های تکمیل شده
                      </MobileNavLink>
                      <MobileNavLink href="/projects/current">
                        پروژه‌های در حال ساخت
                      </MobileNavLink>
                    </AccordionContent>
                  </AccordionItem>

                  {/* فعالیت ها */}
                  <AccordionItem value="item-2">
                    <AccordionTrigger>فعالیت ها</AccordionTrigger>
                    <AccordionContent className="pr-2">
                      <MobileNavLink href="/activities/construction">
                        پیمانکاری و ساخت
                      </MobileNavLink>
                      <MobileNavLink href="/activities/management">
                        مدیریت پیمان
                      </MobileNavLink>
                      <MobileNavLink href="/activities/consulting">
                        مشاوره و طراحی
                      </MobileNavLink>
                      <MobileNavLink href="/activities/investment">
                        سرمایه‌گذاری
                      </MobileNavLink>
                    </AccordionContent>
                  </AccordionItem>

                  {/* درباره ما */}
                  <AccordionItem value="item-3">
                    <AccordionTrigger>درباره ما</AccordionTrigger>
                    <AccordionContent className="pr-2">
                      <MobileNavLink href="/about/history">
                        تاریخچه ما
                      </MobileNavLink>
                      <MobileNavLink href="/about/team">تیم ما</MobileNavLink>
                      <MobileNavLink href="/about/values">
                        ارزش‌های ما
                      </MobileNavLink>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Simple Links */}
                <MobileNavLink href="/group">گروه ساختمانی لژ</MobileNavLink>
                <MobileNavLink href="/contact">تماس با ما</MobileNavLink>
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
              <NavigationMenuContent className="bg-white">
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
              <NavigationMenuContent className="bg-white">
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
            <Image src={logo} alt="Logo" width={40} height={40} />
          </Link>
        </div>
      </div>
    </header>
  );
}