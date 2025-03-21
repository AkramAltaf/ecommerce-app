import { useState, ReactNode } from "react";
import { Popover, IconButton, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "./info-popup.scss"; // Import the SCSS file for styling

interface InfoPopupProps {
  content: string | ReactNode; // Text or JSX content to display
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

  return (
    <>
      <IconButton onClick={handleClick} className="info-icon">
        {icon}
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top", // Popover appears above the icon
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom", // Arrow starts from the bottom of popover
          horizontal: "center",
        }}
        className="info-popup"
      >
        <div className="popover-content">
          <div className="popover-arrow" />
          <Typography className="popover-text">{content}</Typography>
        </div>
      </Popover>
    </>
  );
};

export default InfoPopup;
