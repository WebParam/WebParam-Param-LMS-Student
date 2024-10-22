

import SidebarData from "@/data/discussion/discussion-sidebar.json";

export interface ISidebarData {
    [key: string]: { link: string; text: string; icon: string }[];
  }

  export function GetSideBarData(){
    var access = process.env.NEXT_PUBLIC_ACCESS?? "ALL_ACCESS";
    const sideBar = (SidebarData as ISidebarData)[access] as any[];
    return sideBar;
  }