"use client"
import Image from "next/image";
import LodgeLogo from "@/public/images/Lodge.png";
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
import { motion } from "framer-motion";
import { useAnimate } from "framer-motion"

export default function LodgeNav({ type, lenis }) {
    const [mobileMenu, setMobileMenu] = useState({
        left: false,
        bottom: false,
        right: false,
    });
    const [itemsMenu, setItemsMenu] = useState({
        aboutUs: false,
        services: false,
    });
    const [activeServiceMenu, setActiveServiceMenu] = useState({
        designAndExe: false,
        preOrderProjects: false,
        activeProjects: false,
        contribute: false,
    });
    const [scope, animate] = useAnimate()
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
    const scrollToLodge = () => {
        lenis.scrollTo('#loj', {
            offset: -120,
            duration: 3,
        });
    };
    const scrollToContact = () => {
        lenis.scrollTo('#contact', {
            offset: -120,
            duration: 3,
        });
    };
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
    const toggleActiveServiceMenu = (service) => () => {   
        setActiveServiceMenu({
            designAndExe: service === "designAndExe",
            preOrderProjects: service === "preOrderProjects",
            activeProjects: service === "activeProjects",
            contribute: service === "contribute",
        })
    }
    return (
        <>
            <div className="navbar xl:flex flex-row justify-between lg:px-[7rem] px-[3rem] py-2" style={{direction: "rtl"}}>
            <div className="flex-1">
                <Link className="normal-case text-xl" href={"/"}>
                    <Image src={LodgeLogo} width={55} />
                </Link>
            </div>
            <div className="hidden md:hidden lg:flex lg:flex-row lg:gap-[3.5rem] yekanb text-lg">
                <h3 onClick={toggleItemsMenu('aboutUs', itemsMenu.aboutUs ? false : true)} className="cursor-pointer">درباره ما</h3>
                <h3 onClick={toggleItemsMenu('services', itemsMenu.services ? false : true)} className="cursor-pointer">فعالیت ها</h3>
                <Link href={"/projects"}><h3>پروژه ها</h3></Link>
                <Link href={"/"} onClick={scrollToLodge}><h3 className="cursor-pointer">پرتو جی شید</h3></Link>
                <Link href={"#contact"} onClick={scrollToContact}><h3 className="cursor-pointer">تماس با ما</h3></Link>
            </div>
            <button className="xl:hidden lg:hidden md:flex flex flex-row gap-[3.5rem] yekanb text-lg text-white" style={{boxShadow: 'none'}} sx={{boxShadow: 'none'}} onClick={toggleMobileMenu('right', true)}><MenuIcon className="menuIcon" /></button>
        </div>
        <Drawer anchor={'right'} open={mobileMenu['right']} onClose={toggleMobileMenu('right', false)}>
            <List sx={{width: '70vw', height: '100vh', direction: 'rtl', backgroundColor: 'rgb(20,20,20)', color: '#ffffff'}} className="text-2xl yekan">
                <ListItem disablePadding><ListItemButton><h3 className="py-2 cursor-pointer">درباره ما</h3></ListItemButton></ListItem>
                <Divider />
                <ListItem disablePadding><ListItemButton><h3 className="py-2 cursor-pointer">فعالیت ها</h3></ListItemButton></ListItem>
                <Divider />
                <ListItem disablePadding><ListItemButton><Link href={"/projects"}><h3 className="py-2">پروژه ها</h3></Link></ListItemButton></ListItem>
                <Divider />
                <ListItem disablePadding><ListItemButton><Link href={"/#loj"} onClick={scrollToLodge} ><h3 className="py-2 cursor-pointer">گروه ساختمانی لژ</h3></Link></ListItemButton></ListItem>
                <Divider />
                <ListItem disablePadding><ListItemButton><Link href={"#contact"} onClick={scrollToContact}><h3 className="py-2 cursor-pointer">تماس با ما</h3></Link></ListItemButton></ListItem>
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
            <div className="h-[40rem] py-[8rem] bg-[rgba(12,14,70,1)] text-white flex flex-col gap-7 px-[12rem] yekan" style={{direction: 'rtl'}}>
                <div className="servicesDrawerBg h-[29rem] w-[50rem] mx-4" style={{position: 'absolute'}}>
                    <div className="designAndExeDrawerService w-[100%] h-[100%]
                    flex flex-row items-center justify-center">
                        <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                            opacity: activeServiceMenu.designAndExe ? 0.6 : 0,
                            x: activeServiceMenu.designAndExe ? 0 : 100,
                        }}
                        transition={{duration: 0.3}}
                        className="designAndExe w-[45%] h-[100%]">
                            <Image width="600" height="600" style={{width: "100%", height: "100%"}} alt="Design Projects and Execution from 0 to 100" src={"/images/DesignAndExe.jpg"} />
                        </motion.div>
                        <motion.div className="designAndExe w-[55%] h-[100%]
                        flex flex-col items-start justify-center gap-3 px-8"
                        initial={{ opacity: 0, x: 150 }}
                        animate={{
                            opacity: activeServiceMenu.designAndExe ? 0.6 : 0,
                            x: activeServiceMenu.designAndExe ? 0 : 100,
                        }}
                        transition={{duration: 0.9}}>
                            <h2 className="text-xl font-bold" >طراحی و اجرا:</h2>
                            <h5 className="text-lg">طراحی و اجرای پروژه از صفر تا صد</h5>
                        </motion.div>
                    </div>
                </div>
                <div className="servicesDrawerBg h-[29rem] w-[50rem] mx-4" style={{position: 'absolute'}}>
                    <div className="preOrderProjectsDrawerService w-[100%] h-[100%]
                    flex flex-row items-center justify-center">
                        <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                            opacity: activeServiceMenu.preOrderProjects ? 0.6 : 0,
                            x: activeServiceMenu.preOrderProjects ? 0 : 100,
                        }}
                        transition={{duration: 0.3}}
                        className="preOrderProjects w-[45%] h-[100%]">
                            <Image width="600" height="600" style={{width: "100%", height: "100%"}} alt="Preorder Active Projects of Lodge Co" src={"/images/PreOrder.jpg"} />
                        </motion.div>
                        <motion.div className="preOrderProjects w-[55%] h-[100%]
                        flex flex-col items-start justify-center gap-3 px-8"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                            opacity: activeServiceMenu.preOrderProjects ? 0.6 : 0,
                            x: activeServiceMenu.preOrderProjects ? 0 : 100,
                        }}
                        transition={{duration: 0.9}}>
                            <h2 className="text-xl font-bold" >پروژه های پیش فروش:</h2>
                            <h5 className="text-lg">پیش فروش پروژه های در حال ساخت گروه ساختمانی لژ </h5>
                        </motion.div>
                    </div>
                </div>
                <div className="servicesDrawerBg h-[29rem] w-[50rem] mx-4" style={{position: 'absolute'}}>
                    <div className="activeProjectsDrawerService w-[100%] h-[100%]
                    flex flex-row items-center justify-center">
                        <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                            opacity: activeServiceMenu.activeProjects ? 0.6 : 0,
                            x: activeServiceMenu.activeProjects ? 0 : 100,
                        }}
                        transition={{duration: 0.3}}
                        className="activeProjects w-[45%] h-[100%]">
                            <Image width="600" height="600" style={{width: "100%", height: "100%"}} alt="Parto Jeyshid Active Projects" src={"/images/activeProjects.jpg"} />
                        </motion.div>
                        <motion.div className="activeProjects w-[55%] h-[100%]
                        flex flex-col items-start justify-center gap-3 px-8"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                            opacity: activeServiceMenu.activeProjects ? 0.6 : 0,
                            x: activeServiceMenu.activeProjects ? 0 : 100,
                        }}
                        transition={{duration: 0.9}}>
                            <h2 className="text-xl font-bold" >پروژه های فعال:</h2>
                            <h5 className="text-lg">پرتو جی شید با فعالیت عمده در زمینه های ابنیه و تاسیسات در حال ادامه دادن به فعالیت خود می باشد</h5>
                        </motion.div>
                    </div>
                </div>
                <div className="servicesDrawerBg h-[29rem] w-[50rem] mx-4" style={{position: 'absolute'}}>
                    <div className="activeProjectsDrawerService w-[100%] h-[100%]
                    flex flex-row items-center justify-center">
                        <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                            opacity: activeServiceMenu.contribute ? 0.6 : 0,
                            x: activeServiceMenu.contribute ? 0 : 100,
                        }}
                        transition={{duration: 0.3}}
                        className="activeProjects w-[45%] h-[100%]">
                            <Image width="600" height="600" style={{width: "100%", height: "100%"}} alt="Contribution in Projects" src={"/images/Coperation.jpg"} />
                        </motion.div>
                        <motion.div className="activeProjects w-[55%] h-[100%]
                        flex flex-col items-start justify-center gap-3 px-8"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                            opacity: activeServiceMenu.contribute ? 0.6 : 0,
                            x: activeServiceMenu.contribute ? 0 : 100,
                        }}
                        transition={{duration: 0.9}}>
                            <h2 className="text-xl font-bold" >مشارکت در ساخت:</h2>
                            <h5 className="text-lg">گروه ساختمانی لژ</h5>
                        </motion.div>
                    </div>
                </div>
                <div className="servicesDrawerItems flex flex-col gap-[4rem]" style={{position: 'relative', left: 30, top: 12}}>
                    <h3 className="text-[30px] cursor-pointer" onClick={toggleActiveServiceMenu("designAndExe")}><span className="pl-2">1</span> طراحی و اجرا </h3>
                    <h3 className="text-[30px] cursor-pointer" onClick={toggleActiveServiceMenu("preOrderProjects")}><span className="pl-2">2</span> پروژه های پیش فروش </h3>
                    <h3 className="text-[30px] cursor-pointer" onClick={toggleActiveServiceMenu("activeProjects")}><span className="pl-2">3</span> پروژه های فعال </h3>
                    <h3 className="text-[30px] cursor-pointer" onClick={toggleActiveServiceMenu("contribute")}><span className="pl-2">4</span> مشارکت در ساخت </h3>
                </div>
            </div>
        </Drawer>
        </>
    );
}