"use client";

import { ReactNode } from "react";
import CenterOnLgScreen from "./CenterOnLgScreen";

type LoadingComponentProps<T> = {
  loading: boolean;
  empty?: boolean;
  error?: boolean;
  data?: T;
  loadingComponent?: ReactNode;
  emptyComponent?: ReactNode;
  errorComponent?: ReactNode;
  children?: ((data: T) => ReactNode) | ReactNode;
};

const LoadingComponent = <T,>({
  loading,
  empty = false,
  error = false,
  data,
  loadingComponent,
  emptyComponent,
  errorComponent,
  children,
}: LoadingComponentProps<T>) => {
  if (loading) {
    return loadingComponent ?? <CenterOnLgScreen>Loading...</CenterOnLgScreen>;
  }

  if (error) {
    return errorComponent ?? <CenterOnLgScreen>Error</CenterOnLgScreen>;
  }

  if (empty) {
    return (
      emptyComponent ?? (
        <CenterOnLgScreen>
          <EmptyComponent />
        </CenterOnLgScreen>
      )
    );
  }

  if (typeof children === "function") {
    // safe cast: children will only be called if data is defined
    return <>{data !== undefined ? children(data) : null}</>;
  }

  return <>{children}</>;
};

export default LoadingComponent;
