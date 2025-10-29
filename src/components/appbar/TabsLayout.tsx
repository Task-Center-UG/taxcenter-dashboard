import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  disablePadding?: boolean;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, disablePadding, ...other } = props;
  return (
    <div
      role="tabpanel"
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
      style={{ display: value === index ? "block" : "none", height: "100%" }}
      {...other}
    >
      <Box sx={{ p: disablePadding ? 0 : 3, height: "100%" }}>{children}</Box>
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `custom-tab-${index}`,
    "aria-controls": `custom-tabpanel-${index}`,
  };
}

export interface TabsLayoutProps {
  labels: string[];
  panels: React.ReactNode[];
  initialTab?: number;
  tabVariant?: "standard" | "fullWidth" | "scrollable";
  onTabChange?: (event: React.SyntheticEvent, newValue: number) => void;
  disableContentPadding?: boolean;
  mountInactiveTabs?: boolean;
  orientation?: "horizontal" | "vertical";
}

const TabsLayout: React.FC<TabsLayoutProps> = ({
  labels,
  panels,
  initialTab = 0,
  onTabChange,
  tabVariant = "standard",
  disableContentPadding = false,
  mountInactiveTabs = false,
  orientation = "horizontal",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabQuery = searchParams.get("toptab");
  const activeTabIndex = labels.findIndex((label) => label === tabQuery);
  const value = activeTabIndex !== -1 ? activeTabIndex : initialTab;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("toptab", labels[newValue]);
    router.push(`${pathname}?${newParams.toString()}`);
    if (onTabChange) {
      onTabChange(event, newValue);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: orientation === "vertical" ? "row" : "column",
      }}
    >
      <Box
        sx={{
          borderBottom: orientation === "vertical" ? 0 : 2,
          borderRight: orientation === "vertical" ? 2 : 0,
          borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <Tabs
          value={value}
          variant={tabVariant}
          onChange={handleChange}
          aria-label="custom tabs"
          orientation={orientation}
        >
          {labels.map((label, idx) => (
            <Tab key={label} label={label} {...a11yProps(idx)} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        {mountInactiveTabs ? (
          panels.map((panel, idx) => (
            <CustomTabPanel
              key={idx}
              value={value}
              index={idx}
              disablePadding={disableContentPadding}
            >
              {panel}
            </CustomTabPanel>
          ))
        ) : (
          <CustomTabPanel
            value={value}
            index={value}
            disablePadding={disableContentPadding}
          >
            {panels[value]}
          </CustomTabPanel>
        )}
      </Box>
    </Box>
  );
};

export default TabsLayout;
