"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { MobileMenu } from "./MobileMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APIService } from "@/lib/APIService";

const registration = [
  { name: "Sign In", href: "/signin" },
  { name: "Sign Up", href: "/signup" },
];

const pages = [
  { name: "Artists", href: "/artists" },
  { name: "Location", href: "/#location-section" },
];

export const Menu = () => {
  const [registrationLink, setRegistrationLink] = useState(registration[0]);
  const pathname = usePathname();
  const [categories, setCategories] = useState([
    {
      name: "Gallery",
      featured: [
      {
        name: 'Tattoo',
        href: `/gallery/1`,
        imageSrc: '/image/gallery/category/Tattoo.jpg',
        imageAlt: 'Tattoo',
      },
      {
        name: 'Makeup',
        href: `/gallery/4`,
        imageSrc: '/image/gallery/category/Makeup.png',
        imageAlt: 'Makeup',
      },
      {
        name: 'PhotoStudio',
        href: `/gallery/2`,
        imageSrc: '/image/gallery/category/PhotoStudio.jpg',
        imageAlt: 'Photo Studio',
      },
      {
        name: 'Nail Art',
        href: `/gallery/5`,
        imageSrc: '/image/gallery/category/NailArt.png',
        imageAlt: 'Microblading',
      }
    ],
    },
  ]);

  useEffect(() => {
    if (pathname === "/signin") {
      setRegistrationLink(registration[1]);
    } else {
      setRegistrationLink(registration[0]);
    }
    const apiService = new APIService();

    async function getServices() {
      let services = await apiService.Services.getAll();
      let newCategories = [
        {
          name: "Gallery",
          featured: [],
        },
      ];
      for (let service of services) {
        newCategories[0].featured.push({
          name: service.name,
          href: `/gallery/${service.id}`,
          imageSrc: service.image,
          imageAlt: service.description,
        });
      }
      setCategories(newCategories);
    }
    getServices();
  }, [pathname]);

  return (
    <>
      <MobileMenu categories={categories} pages={pages} />
      <header className="hidden lg:block relative">
        <nav
          aria-label="Top"
          className="absolute inset-x-0 top-0 z-20 bg-transparent"
        >
          {/* Secondary navigation */}
          <div className="bg-transparent">
            <div className="flex justify-between px-4 sm:px-6 lg:px-8">
              <div className="p-8 flex h-16 items-center justify-between">
                {/* Desktop menu */}
                <div className="hidden h-full lg:flex">
                  {/* Flyout menus */}
                  <PopoverGroup className="inset-x-0 bottom-0 px-4">
                    <div className="flex h-full justify-center space-x-8">
                      {/* Logo (lg+) */}
                      <div className="hidden lg:flex lg:flex-1 lg:items-center">
                        <a href="/">
                          <span className="sr-only">Grape</span>
                          <img
                            alt="Beauty and art in the form of a grapevine logo."
                            src="/images/logo.png"
                            className="h-8 w-auto"
                          />
                        </a>
                      </div>
                      {categories.map((category) => (
                        <Popover key={category.name} className="flex">
                          <div className="relative flex">
                            <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-white-700 transition-colors duration-200 ease-out hover:text-red-400 data-[open]:text-white">
                              {category.name}
                              <span
                                aria-hidden="true"
                                className="absolute inset-x-0 -bottom-px z-10 h-0.5 transition duration-200 ease-out group-data-[open]:bg-black"
                              />
                            </PopoverButton>
                          </div>

                          <PopoverPanel
                            transition
                            className="group absolute inset-x-0 top-full z-10 bg-white text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                          >
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 top-1/2 bg-white shadow"
                            />
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                            >
                              <div className="h-px w-full bg-transparent transition-colors duration-200 ease-out group-data-[open]:bg-gray-200" />
                            </div>

                            <div className="relative">
                              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                  {category.featured.map((item) => (
                                    <div
                                      key={item.name}
                                      className="relative hover:opacity-75"
                                    >
                                      <img
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className="aspect-square w-full rounded-md bg-gray-100 object-cover transition-opacity duration-300"
                                      />
                                      <a
                                        href={item.href}
                                        className="mt-4 block font-medium text-gray-900"
                                      >
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0 z-10"
                                        />
                                        {item.name}
                                      </a>
                                      <p
                                        aria-hidden="true"
                                        className="mt-1 hidden"
                                      >
                                        Book now
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </PopoverPanel>
                        </Popover>
                      ))}
                      {pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-white hover:text-red-400"
                          onClick={(e) => {
                            if (page.href === "/#location-section") {
                              e.preventDefault();
                              if (window.location.pathname === "/") {
                                const section =
                                  document.getElementById("location-section");
                                if (section) {
                                  section.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }
                              } else {
                                window.location.href = "/";
                                setTimeout(() => {
                                  const section =
                                    document.getElementById("location-section");
                                  if (section) {
                                    section.scrollIntoView({
                                      behavior: "smooth",
                                    });
                                  }
                                }, 300);
                              }
                            }
                          }}
                        >
                          {page.name}
                        </a>
                      ))}
                    </div>
                  </PopoverGroup>
                </div>
              </div>
              <div className="hidden lg:flex flex-1 items-center justify-end gap-4">
                <div className="group relative flex items-center justify-center text-sm font-medium text-white-700 transition-colors duration-200 ease-out hover:text-red-400 data-[open]:text-white">
                  <a
                    href={registrationLink.href}
                    className="text-sm font-medium text-white-700 hover:text-gray-500"
                  >
                    {registrationLink.name}
                  </a>
                </div>
                <Link href="/booking">
                  <button
                    type="button"
                    className="p-1 text-white hover:text-gray-500 border-2 border-white "
                  >
                    Book an appointment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
