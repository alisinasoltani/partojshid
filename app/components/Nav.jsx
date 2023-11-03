"use client"
import Image from "next/image";
import partoLogo from "@/public/partoLogo.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Nav({ type }) {
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
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
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };
    return (
        <>
            <div className="navbar xl:flex flex-row justify-between lg:px-[7rem] px-[3rem] py-4" style={{direction: "rtl"}}>
            <div className="flex-1">
                <a className="normal-case text-xl">
                    <Image src={partoLogo} width={55} />
                </a>
            </div>
            <div className="hidden lg:flex lg:flex-row lg:gap-[3.5rem] yekanb text-lg">
                <h3>درباره ما</h3>
                <h3>خدمات</h3>
                <Link href={"/projects"}><h3>پروژه ها</h3></Link>
                <h3>گروه ساختمانی لژ</h3>
                <h3>تماس با ما</h3>
            </div>
            <Button className="lg:hidden flex flex-row gap-[3.5rem] yekanb text-lg text-white" style={{boxShadow: 'none'}} sx={{boxShadow: 'none'}} onClick={toggleDrawer('right', true)}><MenuIcon className="menuIcon" /></Button>
        </div>
        <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
            <List sx={{width: '70vw', height: '100vh', direction: 'rtl', backgroundColor: 'rgb(20,20,20)', color: '#ffffff'}} className="text-2xl yekan">
                <ListItem disablePadding>
                    <ListItemButton><h3 className="py-2">درباره ما</h3></ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton><h3 className="py-2">خدمات</h3></ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton><Link href={"/projects"}><h3 className="py-2">پروژه ها</h3></Link></ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton><h3 className="py-2">گروه ساختمانی لژ</h3></ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton><h3 className="py-2">تماس با ما</h3></ListItemButton>
                </ListItem>
            </List>
        </Drawer>
        </>
    );
}