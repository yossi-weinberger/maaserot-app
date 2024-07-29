"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "דף הבית", iconSrc: "./icons/home.svg", path: "/" },
    {
      name: "הוספת הכנסה/תרומה",
      iconSrc: "./icons/plus-circle.svg",
      path: "/add",
    },
    {
      name: "היסטוריה",
      iconSrc: "./icons/business-report.svg",
      path: "/history",
    },
    { name: "הגדרות", iconSrc: "./icons/wallet.svg", path: "/settings" },
    { name: "אודות", iconSrc: "./icons/accounting.svg", path: "/about" },
  ];

  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <h1 className={styles.title}>מחשבון מעשרות</h1>
        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <li key={item.name} className={styles.menuItem}>
              <Link
                href={item.path}
                className={`${styles.menuLink} ${
                  pathname === item.path ? styles.active : ""
                }`}
                onClick={() => router.push(item.path)}
              >
                <Image
                  src={item.iconSrc}
                  alt={item.name}
                  width={24}
                  height={24}
                  className={styles.icon}
                />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
// "use client";

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter, usePathname } from "next/navigation";
// import styles from "./Sidebar.module.css";

// export const Sidebar: React.FC = () => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const menuItems = [
//     { name: "דף הבית", iconSrc: "/icons/home.svg", path: "/" },
//     {
//       name: "הוספת הכנסה/תרומה",
//       iconSrc: "/icons/plus-circle.svg",
//       path: "/add",
//     },
//     {
//       name: "היסטוריה",
//       iconSrc: "/icons/business-report.svg",
//       path: "/history",
//     },
//     { name: "הגדרות", iconSrc: "/icons/wallet.svg", path: "/settings" },
//     { name: "אודות", iconSrc: "/icons/accounting.svg", path: "/about" },
//   ];

//   return (
//     <nav className={styles.sidebar}>
//       <div className={styles.sidebarContent}>
//         <h1 className={styles.title}>מחשבון מעשרות</h1>
//         <ul className={styles.menu}>
//           {menuItems.map((item) => (
//             <li key={item.name} className={styles.menuItem}>
//               <Link
//                 href={item.path}
//                 className={`${styles.menuLink} ${
//                   pathname === item.path ? styles.active : ""
//                 }`}
//                 onClick={() => router.push(item.path)}
//               >
//                 <Image
//                   src={item.iconSrc}
//                   alt={item.name}
//                   width={24}
//                   height={24}
//                   className={styles.icon}
//                 />
//                 <span>{item.name}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// };
