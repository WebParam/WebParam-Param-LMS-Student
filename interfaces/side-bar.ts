export default interface StudentMobileProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export interface SidebarData {
    [key: string]: { link: string; text: string; icon: string }[];
  }

  