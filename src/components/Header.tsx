"use client";
import React, { useEffect, useRef } from "react";
import Logo from "./ui/Logo";
import { AlignJustify, Bell, LogOut, X } from "lucide-react";
import Link from "next/link";
import Button from "./ui/Button";
import { navLinks, navUserAuthLinks } from "@/utils/contents/HomePage.content";
import { useNavStore } from "@/store/variables";
import { useRouter } from "next/navigation";
import { loginRoute, registerRoute } from "@/utils/Routes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import gsap from "gsap";
import * as Icons from "lucide-react";
import LogoutModal from "./modals/LogoutModal";
import { useLogoutModal } from "@/store/Modals";

interface AuthNavigationItemProps {
  icon: keyof typeof Icons; // Ensure the icon is a key from Icons
  title: string;
  href: string;
  css: string;
}

const AuthNavigationItem: React.FC<AuthNavigationItemProps> = ({
  icon,
  title,
  href,
  css,
}) => {
  // Dynamically get the icon component
  const { toggleUserNav, closeNav } = useNavStore();
  const router = useRouter();
  const Icon = Icons[icon] as React.ComponentType<{
    size?: number;
    className: string;
  }>;

  const gotoRoute = () => {
    router.push(href);
    toggleUserNav();
    closeNav();
  };

  return (
    <div
      // href={href}
      onClick={gotoRoute}
      className="flex items-center gap-3 px-4 py-3 duration-150 hover:bg-[#0000000F]"
    >
      <Icon size={24} className="text-[#00000066]" />
      <span className={`text-paragraph-md ${css}`}>{title}</span>
    </div>
  );
};

const Header = () => {
  const { closeNav, isNavOpen, openNav, isUserNavOpen, toggleUserNav } =
    useNavStore();
  const { openModal } = useLogoutModal();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { status, data } = useSession();
  const user = data?.user;
  const router = useRouter();

  // console.log(status, data);

  const gotoLogin = () => {
    router.push(loginRoute);
    closeNav();
  };
  const gotoRegister = () => {
    router.push(registerRoute);
    closeNav();
  };

  useEffect(() => {
    if (isUserNavOpen) {
      gsap.fromTo(
        dropdownRef.current,
        { autoAlpha: 0, y: -20 }, // Start state: hidden and slightly above
        { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, // End state: visible and in place
      );
    } else {
      gsap.to(dropdownRef.current, {
        autoAlpha: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isUserNavOpen]);

  return (
    <>
      <header className="fixed left-0 right-0 top-11 z-40 h-[50px] w-screen lg:top-12 lg:h-[80px]">
        <div
          onClick={closeNav}
          className={` ${isNavOpen ? "translate-x-0 duration-150" : "duration-150 max-lg:translate-x-[200%]"} fixed bottom-0 left-0 right-0 top-0 z-30 bg-fill-weakInverse backdrop-blur-[2px] lg:hidden`}
        ></div>
        <div
          className={` ${!isNavOpen && "backdrop-blur-sm"} container flex h-full items-center justify-between rounded-[1000px] bg-fill-weak px-4 py-3 lg:px-8 lg:py-5`}
        >
          <Logo type="black" />
          <nav
            className={`${isNavOpen ? "translate-x-0 duration-150" : "duration-150 max-lg:translate-x-[200%]"} fixed left-0 right-0 top-0 z-50 min-h-[50vh] px-8 ${status === "authenticated" ? "pb-8" : "pb-20"} pt-10 max-lg:bg-white lg:static lg:flex lg:min-h-full lg:p-0`}
          >
            <div className="flex justify-end">
              <X
                onClick={closeNav}
                size={24}
                className="text-stroke-selected lg:hidden"
              />
            </div>

            {status === "authenticated" && (
              <ul className="my-auto flex flex-col items-center gap-6 text-[16px] font-bold max-lg:mt-9 max-lg:hidden lg:flex-row">
                {navLinks?.map((l, i) => (
                  <li onClick={closeNav} key={i}>
                    <Link href={l.router}>{l.title}</Link>
                  </li>
                ))}
              </ul>
            )}

            {status !== "authenticated" ? (
              <>
                <ul className="my-auto flex flex-col items-center gap-6 text-[16px] font-bold max-lg:mt-9 lg:flex-row">
                  {navLinks?.map((l, i) => (
                    <li onClick={closeNav} key={i}>
                      <Link href={l.router}>{l.title}</Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-[100px] flex flex-col gap-7 lg:hidden">
                  <Button
                    fn={gotoLogin}
                    style="reverse"
                    type="button"
                    css="w-full lg:w-fit"
                  >
                    Log in
                  </Button>
                  <Button
                    fn={gotoRegister}
                    style="primary"
                    type="button"
                    css="w-full lg:w-fit"
                  >
                    Create account
                  </Button>
                </div>
              </>
            ) : (
              <>
                <ul className="-mx-4 my-auto flex flex-col text-[16px] font-bold max-lg:mt-6 lg:hidden lg:flex-row">
                  {navUserAuthLinks
                    ?.filter((l) => l.title.toLowerCase() !== "view profile")
                    .map((l, i) => (
                      <AuthNavigationItem
                        key={i}
                        icon={l.icon as keyof typeof Icons}
                        title={l.title}
                        href={l.router}
                        css="text-title-md"
                      />
                    ))}
                  <div
                    onClick={() => openModal()}
                    className="bordert flex cursor-pointer items-center gap-3 border-[#0000001A] px-4 py-4 duration-150 hover:bg-[#0000000F]"
                  >
                    <LogOut size={24} className="text-[#00000066]" />
                    <span className="text-title-md text-text-strong">
                      Log out
                    </span>
                  </div>
                  <div className="mx-4 mt-6 flex items-center gap-3">
                    <div className="h-12 min-h-12 w-12 min-w-12 overflow-hidden rounded-full">
                      <Image
                        className="h-full w-full object-cover"
                        height={100}
                        width={100}
                        src={user?.profilePicture || "/images/user.svg"}
                        alt="user profile picture"
                      />
                    </div>
                    <div className="itemc-center flex flex-col">
                      <h3 className="text-title-lg text-text-strong">
                        {user?.firstname}
                      </h3>
                      <p className="-mt-1 text-paragraph-md font-normal">
                        View profile
                      </p>
                    </div>
                  </div>
                </ul>
              </>
            )}
          </nav>

          {status !== "authenticated" ? (
            <div className="hidden gap-2 lg:flex">
              <Button
                fn={gotoLogin}
                style="reverse"
                type="button"
                css="w-full lg:w-fit"
              >
                Log in
              </Button>
              <Button
                fn={gotoRegister}
                style="primary"
                type="button"
                css="w-full lg:w-fit"
              >
                Create account
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 lg:gap-6">
              <Bell className="h-5 text-[#00000066] lg:h-10" />

              <div className="relative cursor-pointer">
                <div
                  onClick={toggleUserNav}
                  className="h-7 w-7 overflow-hidden rounded-full max-lg:hidden lg:h-10 lg:w-10"
                >
                  <Image
                    className="h-full w-full object-cover"
                    height={100}
                    width={100}
                    src={user?.profilePicture || "/images/user.svg"}
                    alt="user profile picture"
                  />
                </div>
                <div
                  onClick={openNav}
                  className="h-7 w-7 overflow-hidden rounded-full lg:hidden lg:h-10 lg:w-10"
                >
                  <Image
                    className="h-full w-full object-cover"
                    height={100}
                    width={100}
                    src={user?.profilePicture || "/images/user.svg"}
                    alt="user profile picture"
                  />
                </div>
                {isUserNavOpen && (
                  <>
                    <div
                      ref={dropdownRef}
                      className="absolute -right-4 top-14 w-[224px] rounded-2xl border border-[#0000001A] bg-white py-2 shadow-overlay max-lg:hidden xs:-right-3 lg:-right-7 lg:top-20"
                    >
                      {navUserAuthLinks?.map((l, i) => (
                        <AuthNavigationItem
                          css="text-text-strong"
                          key={i}
                          icon={l.icon as keyof typeof Icons}
                          title={l.title}
                          href={l.router}
                        />
                      ))}
                      <div
                        onClick={() => openModal()}
                        className="bordert flex cursor-pointer items-center gap-3 border-[#0000001A] px-4 py-4 duration-150 hover:bg-[#0000000F]"
                      >
                        <LogOut size={24} className="text-[#00000066]" />
                        <span className="text-paragraph-md text-text-strong">
                          Log out
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {status !== "authenticated" && (
            <AlignJustify
              onClick={openNav}
              className="text-icon-neutral lg:hidden"
              size={24}
            />
          )}
        </div>
      </header>
      <LogoutModal />
    </>
  );
};

export default Header;
