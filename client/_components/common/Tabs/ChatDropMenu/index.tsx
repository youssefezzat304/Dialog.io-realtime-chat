"use client";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { ComponentProps, useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IconButton, Tooltip } from "@mui/material";
import useMediaQuery from "@/hooks/useMediaQuery";
import useTabsStore from "@/services/stores/tabs.store";

export default function ChatDropMenu({ ...props }: ComponentProps<"div">) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { isMobile } = useMediaQuery();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setChatInfo = useTabsStore((state) => state.setChatInfo),
    handleChatInfo = () => {
      handleClose();
      setChatInfo(true);
    };

  return (
    <div {...props}>
      <Tooltip title="Settings">
        <IconButton
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <HiOutlineDotsVertical />
        </IconButton>
      </Tooltip>
      <StyledMenu
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleChatInfo} disableRipple>
          Contact info
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Mute
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Archive
        </MenuItem>
        {isMobile && (
          <>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleClose} disableRipple>
              Search
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              Voice Call
            </MenuItem>
          </>
        )}
      </StyledMenu>
    </div>
  );
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));
