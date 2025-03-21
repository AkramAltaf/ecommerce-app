import { Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import InfoPopover from "../components/info-popup/info-popup";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div>
      <Typography>Hello from About!</Typography>
      <InfoPopover content="I want this component to be reusable where I can pass just the content as mandatory props and icon as optional prop to use different icons based on the requirement." />
    </div>
  );
}
