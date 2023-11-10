"use client"
import Image from "next/image";
import partoLogo from "@/public/partoLogo.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Nav({ type }) {
    const [mobileMenu, setMobileMenu] = useState({
        left: false,
        bottom: false,
        right: false,
    });
    const [itemsMenu, setItemsMenu] = useState({
        aboutUs: false,
        services: false,
    });
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (type == 'transparent') {
            gsap.set(".navbar", {
            backgroundColor: 'rgba(255,255,255,0)',
            });
            gsap.to(".navbar", {
                scrollTrigger: {
                    scrub: 0.8,
                    start: "top+=200px",
                    end: "+=1",
                },
                backgroundColor: "rgba(255,255,255,1)",
                color: "#000000",
                boxShadow: "0px 1px 15px 1px rgb(144, 144, 144)",
            });
            gsap.to(".menuIcon", {
                scrollTrigger: {
                    scrub: 0.8,
                    start: "top+=200px",
                    end: "+=1",
                },
                color: "#000000",
                boxShadow: "0px 1px 15px 1px rgb(144, 144, 144)",
            });
        } else if (type == 'solid') {
            gsap.set(".navbar", {
                backgroundColor: "rgba(255,255,255,1)",
                color: "#000000",
                boxShadow: "0px 1px 15px 1px rgb(144, 144, 144)",
            });
        }
    }, []);
    const toggleMobileMenu = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setMobileMenu({ ...mobileMenu, [anchor]: open });
    };

    const toggleItemsMenu = (item, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setItemsMenu({ ...mobileMenu, [item]: open });
    };
    return (
        <>
            <div className="navbar xl:flex flex-row justify-between lg:px-[7rem] px-[3rem] py-4" style={{direction: "rtl"}}>
            <div className="flex-1">
                <Link className="normal-case text-xl" href={"/"}>
                    <Image src={partoLogo} width={55} />
                </Link>
            </div>
            <div className="hidden md:hidden lg:flex lg:flex-row lg:gap-[3.5rem] yekanb text-lg">
                <h3 onClick={toggleItemsMenu('aboutUs', itemsMenu.aboutUs ? false : true)} className="cursor-pointer">درباره ما</h3>
                <h3 onClick={toggleItemsMenu('services', itemsMenu.services ? false : true)} className="cursor-pointer">فعالیت ها</h3>
                <Link href={"/projects"}><h3>پروژه ها</h3></Link>
                <Link href={"/#loj"}><h3 className="cursor-pointer">گروه ساختمانی لژ</h3></Link>
                <Link href={"#contact"}><h3 className="cursor-pointer">تماس با ما</h3></Link>
            </div>
            <button className="xl:hidden lg:hidden md:flex flex flex-row gap-[3.5rem] yekanb text-lg text-white" style={{boxShadow: 'none'}} sx={{boxShadow: 'none'}} onClick={toggleMobileMenu('right', true)}><MenuIcon className="menuIcon" /></button>
        </div>
        <Drawer anchor={'right'} open={mobileMenu['right']} onClose={toggleMobileMenu('right', false)}>
            <List sx={{width: '70vw', height: '100vh', direction: 'rtl', backgroundColor: 'rgb(20,20,20)', color: '#ffffff'}} className="text-2xl yekan">
                <ListItem disablePadding>
                    <ListItemButton><h3 className="py-2 cursor-pointer">درباره ما</h3></ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton><h3 className="py-2 cursor-pointer">فعالیت ها</h3></ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton><Link href={"/projects"}><h3 className="py-2">پروژه ها</h3></Link></ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton><h3 className="py-2 cursor-pointer">گروه ساختمانی لژ</h3></ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton><h3 className="py-2 cursor-pointer">تماس با ما</h3></ListItemButton>
                </ListItem>
            </List>
        </Drawer>
        <Drawer anchor={'top'} open={itemsMenu['aboutUs']} onClose={toggleItemsMenu('aboutUs', false)} style={{zIndex: 20}}>
            <div className="h-[70vh] py-[10rem] bg-[rgba(12,14,70,1)] text-white flex flex-col gap-7 px-[12rem]">
                <h3 className="text-2xl"><span className="pr-6">1</span> At a Glance</h3>
                <h3 className="text-2xl"><span className="pr-6">2</span> History</h3>
                <h3 className="text-2xl"><span className="pr-6">3</span> Strategy</h3>
                <h3 className="text-2xl"><span className="pr-6">4</span> Leadership</h3>
            </div>
        </Drawer>
        <Drawer anchor={'top'} open={itemsMenu['services']} onClose={toggleItemsMenu('services', false)} style={{zIndex: 20}}>
            <div className="h-[70vh] py-[10rem] bg-[rgba(12,14,70,1)] text-white flex flex-col gap-7 px-[12rem] yekan" style={{direction: 'rtl'}}>
                <h3 className="text-2xl"><span className="pl-6">1</span> طراحی و اجرا </h3>
                <h3 className="text-2xl"><span className="pl-6">2</span> پروژه های پیش فروش </h3>
                <h3 className="text-2xl"><span className="pl-6">3</span> پروژه های فعال </h3>
                <h3 className="text-2xl"><span className="pl-6">4</span> مشارکت در ساخت </h3>
            </div>
        </Drawer>
        </>
    );
}