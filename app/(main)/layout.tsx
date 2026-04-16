import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      {children}
      <Paper
        sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Discover" value="recents" />
          <BottomNavigationAction label="Shelfs" value="recents" />
        </BottomNavigation>
      </Paper>
    </React.Fragment>
  );
}
