import { Box } from "@mui/material";

const CenterOnLgScreen = ({
  className,
  element,
  children,
  ...props
}: Partial<
  Readonly<{
    element?: any;
    props: any;
    className: string;
    children: React.ReactNode;
  }>
>) => (
  <Box
    className={`lg:container px-4 py-16 lg:mx-auto lg:px-8 ${className}`}
    {...props}
    component={(props as any)?.component || "main"}
  >
    {children}
  </Box>
);

export default CenterOnLgScreen;
