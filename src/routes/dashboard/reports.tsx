import { createFileRoute } from "@tanstack/react-router";
import { Typography } from "@mui/material";

export const Route = createFileRoute("/dashboard/reports")({
  component: ReportsComponent,
});

function ReportsComponent() {
  return <Typography variant="h4">Reports</Typography>;
}
