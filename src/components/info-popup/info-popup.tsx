import { useState, ReactNode } from "react";
import { Popover, IconButton, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "./info-popup.scss";

interface InfoPopupProps {
  content: string | ReactNode; // Accepts string or JSX
  icon?: ReactNode; // Custom icon (optional), default is HelpOutlineIcon
}

const InfoPopup: React.FC<InfoPopupProps> = ({
  content,
  icon = <HelpOutlineIcon />, // Default icon
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "info-popover" : undefined;

  return (
    <>
      <IconButton onClick={handleClick} className="info-icon">
        {icon}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top", // Popover appears above the icon
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom", // Arrow aligns with bottom of popover
          horizontal: "center",
        }}
        className="info-popup"
        disableScrollLock={true} // Prevents unnecessary scrollbars
      >
        <div className="popover-content">
          <Typography className="popover-text">{content}</Typography>
        </div>
      </Popover>
    </>
  );
};

export default InfoPopup;
