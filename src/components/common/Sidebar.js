import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody
} from "@chakra-ui/react";
import { userState } from "../../slices/user/userSlice";

import {
  DashboardIcon,
  ActivityIcon,
  BlasterIcon,
  CheckIcon,
  UsersIcon,
  CollapseIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "../../assets/images/icons";
import Logo from "../../assets/images/hc_logo.svg";

const Sidebar = ({ isToggle, sidebarWidth, toggleSidebar, ...rest }) => {
  const [linkItems, setLinkItems] = useState(
    [
      { name: "Dashboard", url: "/dashboard", icon: DashboardIcon },
      {
        name: "Blaster", icon: BlasterIcon,
        subItems: [{ name: "SMS", url: "/blaster/sms", }],
        isOpen: false
      },
      {
        name: "Activity", icon: ActivityIcon,
        subItems: [
          { name: "My Activities", url: "/activity/my-activities", },
          { name: "Audit Trail", url: "/activity/audit-trail", authorize: "ADMIN" }
        ],
        isOpen: false
      },
      { name: "Users", url: "/users", icon: UsersIcon, authorize: "ADMIN" }
    ]
  );

  const handleSubmenuClick = (name, hasSubItems) => {
    if (hasSubItems) {
      const newState = linkItems.map(link => {
        if (link.name === name) {
          return { ...link, isOpen: !link.isOpen };
        }

        return link;
      });

      setLinkItems(newState);
    }
  };

  return (
    <Box
      display="flex"
      transition="0.5s ease"
      color="white"
      bg="bg.primary"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={sidebarWidth}
      pos="fixed"
      h="full"
      zIndex={2}
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx={isToggle ? "0" : "24px"}
        transition="0.5s ease"
        justifyContent={isToggle ? "center" : "flex-start"}
      >
        <img src={Logo} alt="Logo" width={28} height={32} />
        {
          !isToggle &&
          <Text ml="8px" fontSize="2xl" fontFamily="sans-serif" fontWeight="bold">
            HEDWIG
          </Text>
        }
      </Flex>
      {linkItems.map((link) => {
        if (isToggle && link.subItems) {
          return (
            <WithPopover key={link.name} link={link} isToggle={isToggle} handleSubmenuClick={handleSubmenuClick} />
          );
        }

        return (
          <Fragment key={link.name}>
            <NavItem
              name={link.name}
              icon={link.icon}
              url={link.url}
              subItems={link.subItems}
              isToggle={isToggle}
              isOpen={link.isOpen}
              authorize={link.authorize}
              handleSubmenuClick={handleSubmenuClick}
            >
              {link.name}
            </NavItem>

            {
              (link.subItems && link.isOpen) && link.subItems.map((subItem) => (
                <NavItem
                  key={subItem.name}
                  isToggle={isToggle}
                  isSubitem={true}
                  url={subItem.url}
                  authorize={subItem.authorize}
                  handleSubmenuClick={handleSubmenuClick}
                >
                  {subItem.name}
                </NavItem>
              ))
            }
          </Fragment>
        );
      })}
      <Box
        position="absolute"
        transition="0.5s ease"
        right="16px"
        bottom="5px"
        cursor="pointer"
        marginBottom="6px"
        transform={isToggle ? "rotate(180deg)" : "none"}
      >
        <img src={CollapseIcon} alt="Logo" width={28} height={20} onClick={toggleSidebar} />
      </Box>
    </Box>
  );
};

const NavItem = ({
  name,
  isToggle,
  isOpen,
  icon,
  url,
  subItems,
  isSubitem,
  authorize,
  children,
  handleSubmenuClick,
  ...rest
}) => {
  const { pathname } = useLocation();
  const { details } = useSelector(userState);

  const role = details && details.role === 1 ? "ADMIN" : "COORDINATOR";

  if (authorize && authorize !== role) {
    return;
  }

  return (
    <NavLink to={url ? url : "#"} onClick={() => handleSubmenuClick(name, subItems)}>
      <Flex
        transition="0.5s ease"
        align="center"
        justifyContent={isToggle ? (isSubitem ? "flex-start" : "center") : "flex-start"}
        height="46px"
        py="4"
        px={isToggle ? isSubitem ? "16px" : "0" : "26px"}
        role="group"
        cursor="pointer"
        bg={pathname === url ? isToggle && isSubitem ? "bg.primary" : "#4829AA" : "none"}
        fontWeight={pathname === url && isToggle && isSubitem ? 500 : "normal"}
        _hover={{ bg: isToggle && isSubitem ? "bg.primary" : "#4829AA" }}
        {...rest}
      >
        {
          icon &&
          <img src={icon} alt="Logo" width={16} height={16} />
        }
        {
          (!isToggle || (isToggle && isSubitem)) &&
          <Flex ml={!isToggle ? (isSubitem ? "33px" : "17px") : "0"} justifyContent="space-between" alignItems="center" w="full">
            <span>{children}</span>
            {
              (isToggle && isSubitem && pathname === url) &&
              <span><img src={CheckIcon} alt="CheckIcon" width={20} height={20} /></span>
            }
          </Flex>
        }
        {
          (subItems && !isToggle) &&
          <Box ml="auto" pt="10px">
            <img src={isOpen ? ChevronUpIcon : ChevronDownIcon} alt="down" width={20} height={20} />
          </Box>
        }
      </Flex>
    </NavLink>
  );
};

const WithPopover = ({
  link,
  isToggle,
  handleSubmenuClick
}) => {
  return (
    <Popover placement="right-start" trigger="hover">
      <PopoverTrigger trigger="hover">
        <Box>
          <NavItem
            name={link.name}
            icon={link.icon}
            url={link.url}
            subItems={link.subItems}
            isToggle={isToggle}
            isOpen={link.isOpen}
            authorize={link.authorize}
            handleSubmenuClick={handleSubmenuClick}
          >
            {link.name}
          </NavItem>
        </Box>
      </PopoverTrigger>
      <PopoverContent bg="#4829AA" border="none" ml="-8px" w="230px">
        <PopoverBody px={0}>
          {
            link.subItems && link.subItems.map((subItem) => (
              <NavItem
                key={subItem.name}
                isToggle={isToggle}
                isSubitem={true}
                url={subItem.url}
                handleSubmenuClick={handleSubmenuClick}
              >
                {subItem.name}
              </NavItem>
            ))
          }
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Sidebar;